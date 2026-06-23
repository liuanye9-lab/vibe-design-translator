// ============================================================
// Vibe Design Translator - Material Agent API
// ============================================================
// POST /api/ai/material-agent
//
// Server-side Agnes integration for the homepage material advisor.
// The browser never receives the Agnes API key.

import { NextRequest, NextResponse } from "next/server";
import {
  MATERIAL_ASSETS,
  buildMaterialContextForAgent,
  getMaterialAssetsByIds,
  searchMaterialAssets,
  summarizeMaterialLibraryForPrompt,
} from "@/lib/material-library";
import type { MaterialAgentBlueprintRow, MaterialAgentResult, MaterialCategory } from "@/lib/types";

type AgnesMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type AgnesChoice = {
  message?: {
    content?: string;
  };
};

type AgnesResponse = {
  choices?: AgnesChoice[];
};

type RawMaterialAgentResult = Partial<MaterialAgentResult> & {
  recommendedCards?: string[];
  recommendedCardIds?: string[];
};

interface ApiSuccess {
  success: true;
  data: MaterialAgentResult;
}

interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: string;
  };
}

const AGNES_API_BASE = process.env.AGNES_API_BASE || "https://apihub.agnes-ai.com/v1";
const AGNES_API_KEY = process.env.AGNES_API_KEY || "";
const AGNES_TEXT_MODEL = process.env.AGNES_TEXT_MODEL || "Agnes-2.0-Flash";
const AGNES_TEXT_MODEL_FALLBACKS = Array.from(new Set([
  AGNES_TEXT_MODEL,
  AGNES_TEXT_MODEL.toLowerCase(),
  "agnes-2.0-flash",
  "Agnes-2.0-Flash",
]));

const validCategories: MaterialCategory[] = ["motion", "color", "ui", "layout", "typography"];
const validCategorySet = new Set(validCategories);

function extractJSON<T>(content: string): T {
  const cleaned = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("No JSON object found in Agnes response");
  }
  return JSON.parse(match[0]) as T;
}

async function callAgnes(messages: AgnesMessage[]): Promise<string> {
  if (!AGNES_API_KEY) {
    throw new Error("AGNES_API_KEY not configured");
  }

  let lastError = "";
  for (const model of AGNES_TEXT_MODEL_FALLBACKS) {
    const response = await fetch(`${AGNES_API_BASE.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AGNES_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.25,
        max_tokens: 2400,
      }),
    });

    if (!response.ok) {
      lastError = `Agnes API ${response.status} (${model}): ${await response.text()}`;
      if (/model_not_found/i.test(lastError)) continue;
      throw new Error(lastError);
    }

    const data = await response.json() as AgnesResponse;
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error(`Agnes returned empty content (${model})`);
    }
    return content;
  }

  throw new Error(lastError || "Agnes API unavailable");
}

function normalizeBlueprintRows(rows: unknown, query: string): MaterialAgentBlueprintRow[] {
  const fallback: MaterialAgentBlueprintRow[] = [
    {
      rank: "1",
      title: "根据需求筛选素材证据",
      tags: ["素材推荐", "Agent"],
      reason: `围绕「${query.slice(0, 28)}」先确认动效、配色、UI、布局和字体的优先级。`,
      difficulty: 2,
      result: "提升推荐准确度 +30%",
      color: "blue",
    },
    {
      rank: "2",
      title: "输出可执行前端规则",
      tags: ["实现规则", "组件"],
      reason: "把灵感素材转成组件结构、状态、token 和响应式规则。",
      difficulty: 3,
      result: "提升落地效率 +35%",
      color: "green",
    },
    {
      rank: "3",
      title: "建立验收清单",
      tags: ["验收", "质量"],
      reason: "用可读性、动效克制、布局稳定和中文体验检查最终页面。",
      difficulty: 3,
      result: "降低返工风险 +25%",
      color: "orange",
    },
  ];

  if (!Array.isArray(rows)) return fallback;

  return rows.slice(0, 4).map((row, index) => {
    const item = row as Partial<MaterialAgentBlueprintRow>;
    const color = item.color === "green" || item.color === "orange" || item.color === "blue"
      ? item.color
      : (index === 0 ? "blue" : index === 1 ? "green" : "orange");
    return {
      rank: String(item.rank || index + 1),
      title: String(item.title || fallback[index]?.title || "推荐步骤"),
      tags: Array.isArray(item.tags) ? item.tags.slice(0, 3).map(String) : fallback[index]?.tags || ["设计"],
      reason: String(item.reason || fallback[index]?.reason || "基于当前需求生成前端设计动作。"),
      difficulty: Math.max(1, Math.min(5, Number(item.difficulty || fallback[index]?.difficulty || 3))),
      result: String(item.result || fallback[index]?.result || "提升方案清晰度"),
      color,
    };
  });
}

function normalizeResult(raw: RawMaterialAgentResult, query: string, fallback: boolean): MaterialAgentResult {
  const rawIds = raw.recommendedCardIds || raw.recommendedCards || [];
  const validIds = new Set(MATERIAL_ASSETS.map((asset) => asset.id));
  const ids = rawIds
    .map(String)
    .filter((id) => validIds.has(id))
    .slice(0, 6);
  const fallbackIds = searchMaterialAssets(query).slice(0, 6).map((asset) => asset.id);
  const recommendedCardIds = ids.length >= 3 ? ids : fallbackIds;
  const cards = getMaterialAssetsByIds(recommendedCardIds);
  const focusTabs = (raw.focusTabs || cards.map((card) => card.category).filter(Boolean))
    .filter((category): category is MaterialCategory => Boolean(category) && validCategorySet.has(category as MaterialCategory))
    .slice(0, 5);

  return {
    reply: String(raw.reply || `我已根据你的需求筛选素材库，优先推荐 ${cards.slice(0, 3).map((card) => card.title).join("、")}。`),
    summaryItems: Array.isArray(raw.summaryItems) && raw.summaryItems.length
      ? raw.summaryItems.slice(0, 5).map(String)
      : cards.slice(0, 4).map((card) => `${card.title}：${card.recommendationAngle || card.motionSpec}`),
    recommendedCardIds,
    blueprintRows: normalizeBlueprintRows(raw.blueprintRows, query),
    focusTabs: focusTabs.length ? focusTabs : ["motion", "color", "layout"],
    provider: fallback ? "local-fallback" : "agnes",
    fallback,
  };
}

function localFallback(query: string): MaterialAgentResult {
  return normalizeResult({
    reply: "Agnes 暂时不可用，我先用本地素材库规则给出推荐。你仍然可以看到素材来源、适用场景、避坑和前端实现规则。",
    recommendedCardIds: searchMaterialAssets(query).slice(0, 6).map((asset) => asset.id),
  }, query, true);
}

export async function POST(request: NextRequest) {
  let query = "";
  try {
    const body = await request.json();
    query = String(body.query || "").trim();
    if (!query) {
      return NextResponse.json<ApiError>({
        success: false,
        error: {
          code: "MISSING_QUERY",
          message: "query is required",
        },
      }, { status: 400 });
    }

    const systemPrompt = `你是 Vibe Design Translator 的 AI 设计素材推荐 Agent。
你的任务不是泛泛聊天，而是根据用户想法，从素材库中筛选动效、配色、UI、布局、字体素材，并输出可执行前端设计方向。

必须遵守：
1. 只使用素材库中存在的 asset id 作为 recommendedCardIds
2. 输出必须是严格 JSON object，不要 markdown，不要解释 JSON 外文本
3. 所有文本使用中文
4. 推荐必须覆盖动效、配色、UI、布局、字体中的关键维度，但不要强行每类都选满
5. Blueprint 必须能指导前端实现，包含推荐内容、推荐理由、实现难度和预期效果

素材库摘要：
${summarizeMaterialLibraryForPrompt()}

完整素材库上下文：
${buildMaterialContextForAgent()}

返回 schema：
{
  "reply": "给用户的一段中文 Agent 回复",
  "summaryItems": ["3-5 条设计方向总结"],
  "recommendedCardIds": ["必须来自素材库的 asset id，最多 6 个"],
  "focusTabs": ["motion" | "color" | "ui" | "layout" | "typography"],
  "blueprintRows": [
    {
      "rank": "1",
      "title": "推荐内容",
      "tags": ["动效设计", "首屏"],
      "reason": "为什么推荐",
      "difficulty": 1到5的数字,
      "result": "预期效果",
      "color": "blue" | "green" | "orange"
    }
  ]
}`;

    const content = await callAgnes([
      { role: "system", content: systemPrompt },
      { role: "user", content: `用户需求：${query}` },
    ]);
    const raw = extractJSON<RawMaterialAgentResult>(content);
    return NextResponse.json<ApiSuccess>({
      success: true,
      data: normalizeResult(raw, query, false),
    });
  } catch (error) {
    console.error("Material Agent API failed:", error);
    return NextResponse.json<ApiSuccess>({
      success: true,
      data: localFallback(query),
    });
  }
}
