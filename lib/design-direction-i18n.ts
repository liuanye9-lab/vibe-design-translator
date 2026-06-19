import type { Locale } from "@/lib/i18n/types";
import type { DesignDirection } from "@/lib/types";

type LocalizedDirectionText = Pick<
  DesignDirection,
  | "name"
  | "description"
  | "suitableFor"
  | "psychologicalEffect"
  | "visualKeywords"
  | "typography"
  | "layoutAdvice"
  | "interactionAdvice"
  | "risks"
>;

const zhDirectionText: Record<string, LocalizedDirectionText> = {
  "calm-professional": {
    name: "冷静专业型",
    description:
      "稳定、可信、有权威感。适合企业软件、金融服务、B2B SaaS 和专业咨询。它通过克制而不是装饰传达专业能力。",
    suitableFor: ["企业 SaaS 平台", "金融服务", "B2B 软件", "专业咨询", "法律服务", "医疗企业服务"],
    psychologicalEffect:
      "营造稳定和可靠的感受。用户会觉得自己正在与成熟、可信的专业团队打交道，并通过熟悉的交互模式降低认知负担。",
    visualKeywords: ["克制", "精确", "有组织", "平衡", "专业", "可信", "系统化", "权威"],
    typography:
      "干净的无衬线层级。使用 Inter 或系统无衬线字体，正文基础字号 16px。标题使用半粗到粗体，正文使用常规字重，行高保持 1.5-1.6。",
    layoutAdvice: [
      "使用充足留白，区块 padding 约 48-64px",
      "保持稳定一致的网格对齐",
      "关键内容优先采用单列结构",
      "次级导航可使用侧栏",
      "内容最大宽度居中控制在 1200px",
      "用字号和间距建立层级，而不是依赖装饰",
    ],
    interactionAdvice: [
      "悬停状态保持细微，例如透明度或颜色变化",
      "动画克制，时长控制在 150-200ms",
      "优先可用性而不是炫技",
      "交互可点击性要清晰",
      "避免跳跃、弹性过强的动效",
      "加载状态保持专业，不做过度骨架屏",
    ],
    risks:
      "可能显得冷淡或缺少人味。如果颜色过灰会显旧，也容易与其他企业级产品形成同质化。",
  },
  "soft-intelligent": {
    name: "柔和智能型",
    description:
      "平易近人且前沿。适合 AI/ML 产品、开发者工具、效率应用和现代科技公司，在技术可信度和人性化温度之间取得平衡。",
    suitableFor: ["AI/ML 产品", "开发者工具", "效率应用", "教育科技平台", "现代医疗产品", "消费级科技产品"],
    psychologicalEffect:
      "传达智能感但不制造压迫。用户会感到产品足够先进，同时易懂、可控、乐于帮助他们完成复杂任务。",
    visualKeywords: ["精致", "亲近", "现代", "干净", "智能", "温暖", "创新", "可信"],
    typography:
      "现代、略带人文感的无衬线字体。使用 Inter 或 Geist，正文 16px。正文使用 Regular，重点使用 Medium/Semibold，行高 1.6-1.7。",
    layoutAdvice: [
      "使用 56-72px 的宽松内边距，营造高级感",
      "通过分层卡片制造轻微纵深",
      "混合容器区块和全宽区块",
      "阴影柔和，不使用硬边阴影",
      "最大宽度约 1280px，可加入轻微非对称",
      "Hero 可使用克制的柔和渐变背景",
    ],
    interactionAdvice: [
      "使用平滑、有物理感的 300-400ms 动画",
      "微交互要响应及时但不抢戏",
      "悬停可使用轻微放大或上浮",
      "滚动时使用渐进揭示",
      "让 AI 能力显得可亲近",
      "避免强刺激和注意力抢夺型动画",
    ],
    risks:
      "在 AI/科技产品里容易显得泛化。紫蓝渐变过度使用会变成典型 AI 初创风，面向企业买家时可能显得太轻。",
  },
  "experimental-premium": {
    name: "实验高级型",
    description:
      "大胆、独特、记忆点强。适合创意机构、奢侈品牌、时尚和创新产品，通过非常规选择建立强品牌识别。",
    suitableFor: ["创意机构", "奢侈品牌", "时尚", "高端零售", "创新型初创公司", "设计工作室", "艺术平台"],
    psychologicalEffect:
      "制造好奇和高价值感。用户会觉得自己接触到的是独家、被精心打磨的体验，从而更愿意探索。",
    visualKeywords: ["独特", "奢华", "大胆", "策展感", "艺术化", "排他", "记忆点", "精心打磨"],
    typography:
      "高对比字体组合。可考虑衬线与无衬线混排，展示标题使用 64-96px，大胆压缩节奏；正文保持 15-16px 并提高行高。",
    layoutAdvice: [
      "有意识地使用非对称",
      "采用非常规网格结构",
      "把大面积负空间作为设计元素",
      "使用全宽图像并叠加排版",
      "最大宽度可放宽到 1400px 或取消限制",
      "有意打破预期版式，但保持可读路径",
    ],
    interactionAdvice: [
      "微交互可以更意外、更有记忆点",
      "可考虑自定义光标或特殊悬停",
      "使用滚动驱动叙事，但避免破坏可用性",
      "适度使用视差纵深",
      "悬停揭示可带内容转换",
      "可尝试手势式导航",
    ],
    risks:
      "风险较高，容易牺牲可访问性或可用性。过度设计会遮蔽内容，也可能劝退期待传统体验的用户，维护成本更高。",
  },
};

export function localizeDirection(direction: DesignDirection, locale: Locale): DesignDirection {
  if (locale !== "zh") return direction;
  const localized = zhDirectionText[direction.id];
  return localized ? { ...direction, ...localized } : direction;
}

export function localizeDirections(directions: DesignDirection[], locale: Locale): DesignDirection[] {
  return directions.map((direction) => localizeDirection(direction, locale));
}

export function getDirectionPreviewTitle(locale: Locale): string {
  return locale === "zh" ? "视觉预览" : "Visual preview";
}
