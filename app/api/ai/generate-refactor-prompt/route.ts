import { NextResponse } from "next/server";
import { getDesignAIProvider, getProviderStatus } from "@/lib/connectors/provider-registry";
import { mockDesignAI } from "@/lib/connectors/mock-provider";
import { toProviderError } from "@/lib/connectors/provider-utils";
import { normalizeLocale } from "@/lib/i18n";
import { ToolType } from "@/lib/types";
import { estimateUsage, getProviderUsage } from "@/lib/llm/provider-runtime";

export const dynamic = "force-dynamic";

const tools: ToolType[] = ["codex", "claude-code", "gemini", "workbuddy"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const report = body.report;
    const tool = body.tool as ToolType | undefined;
    const locale = normalizeLocale(body.locale);

    if (!report || !tool || !tools.includes(tool)) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "report and valid tool are required" } },
        { status: 400 }
      );
    }

    const provider = getDesignAIProvider();
    const providerStatus = getProviderStatus();
    let providerUsed = providerStatus.providerUsed;
    let fallbackProvider = providerStatus.fallbackProvider;
    let providerError = undefined;
    let prompt;

    try {
      prompt = await provider.generateRefactorPrompt(report, tool, locale);
    } catch (error) {
      providerError = toProviderError(error, providerStatus.providerUsed);

      if (providerStatus.providerUsed === "mock") {
        throw error;
      }

      prompt = await mockDesignAI.generateRefactorPrompt(report, tool, locale);
      providerUsed = "mock";
      fallbackProvider = "mock";
    }

    const usage = getProviderUsage(providerUsed) ?? estimateUsage({ report, tool, locale }, prompt);

    return NextResponse.json({
      data: { prompt, locale },
      meta: {
        locale,
        configuredProvider: providerStatus.configuredProvider,
        providerUsed,
        fallbackProvider,
        usage,
        error: providerError,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: "REFACTOR_PROMPT_FAILED",
          message: error instanceof Error ? error.message : "Failed to generate refactor prompt",
        },
      },
      { status: 500 }
    );
  }
}
