import { Locale } from "@/lib/types";
import { en } from "./en";
import { zh } from "./zh";

export const DEFAULT_LOCALE: Locale = "zh";

const dictionaries = {
  zh: zh.messages,
  en: en.messages,
} as const;

export type TranslationKey = keyof typeof zh.messages;

export function normalizeLocale(locale: string | undefined | null): Locale {
  return locale === "en" ? "en" : "zh";
}

export function translate(
  locale: Locale,
  key: TranslationKey,
  values?: Record<string, string | number>
): string {
  let message: string = dictionaries[locale][key] ?? dictionaries.zh[key] ?? key;

  if (values) {
    for (const [name, value] of Object.entries(values)) {
      message = message.replaceAll(`{${name}}`, String(value));
    }
  }

  return message;
}

const optionTranslations: Record<string, { zh: string; en: string; zhDescription?: string; enDescription?: string }> = {
  "SaaS Platform": { zh: "SaaS 平台", en: "SaaS Platform" },
  "Mobile App Landing": { zh: "移动 App 落地页", en: "Mobile App Landing" },
  "E-commerce": { zh: "电商", en: "E-commerce" },
  Portfolio: { zh: "作品集", en: "Portfolio" },
  "Blog / Editorial": { zh: "博客 / 内容页", en: "Blog / Editorial" },
  "Marketing Campaign": { zh: "营销活动", en: "Marketing Campaign" },
  Dashboard: { zh: "仪表盘", en: "Dashboard" },
  Documentation: { zh: "文档站", en: "Documentation" },
  "Event Page": { zh: "活动页", en: "Event Page" },
  Other: { zh: "其他", en: "Other" },
  "SaaS Landing Page": { zh: "SaaS 落地页", en: "SaaS Landing Page" },
  "E-commerce Product Page": { zh: "电商产品页", en: "E-commerce Product Page" },
  "Dashboard / Admin": { zh: "仪表盘 / 后台", en: "Dashboard / Admin" },
  "Blog Post": { zh: "博客文章", en: "Blog Post" },

  Trustworthy: { zh: "可信赖", en: "Trustworthy" },
  Premium: { zh: "高级感", en: "Premium" },
  Innovative: { zh: "有创新感", en: "Innovative" },
  Minimal: { zh: "简洁", en: "Minimal" },
  Friendly: { zh: "友好", en: "Friendly" },
  Bold: { zh: "大胆", en: "Bold" },
  Calm: { zh: "冷静", en: "Calm" },
  Elegant: { zh: "优雅", en: "Elegant" },
  Dynamic: { zh: "有动势", en: "Dynamic" },
  Intelligent: { zh: "聪明", en: "Intelligent" },
  Cheap: { zh: "廉价", en: "Cheap" },
  Cluttered: { zh: "拥挤", en: "Cluttered" },
  Aggressive: { zh: "攻击性强", en: "Aggressive" },
  "Generic AI": { zh: "AI 模板感", en: "Generic AI" },
  "Template-like": { zh: "像模板", en: "Template-like" },
  Overwhelming: { zh: "压迫感强", en: "Overwhelming" },
  Confusing: { zh: "让人困惑", en: "Confusing" },
  Dated: { zh: "过时", en: "Dated" },
  Inconsistent: { zh: "不一致", en: "Inconsistent" },

  minimal: { zh: "克制", en: "Minimal" },
  balanced: { zh: "平衡", en: "Balanced" },
  expressive: { zh: "表现力强", en: "Expressive" },
  light: { zh: "轻量", en: "Light" },
  standard: { zh: "标准", en: "Standard" },
  dense: { zh: "高密度", en: "Dense" },

  "professional-reliable": { zh: "专业可靠", en: "Professional & Reliable", zhDescription: "传递能力、稳定性和可信度", enDescription: "Communicates competence and trustworthiness" },
  "futuristic-experimental": { zh: "前沿探索", en: "Futuristic & Experimental", zhDescription: "表达创新和技术前沿感", enDescription: "Signals innovation and cutting-edge technology" },
  "calm-premium": { zh: "冷静高级", en: "Calm & Premium", zhDescription: "克制、精致、不吵闹的高级感", enDescription: "Quiet luxury with refined aesthetics" },
  "friendly-intelligent": { zh: "友好且聪明", en: "Friendly & Intelligent", zhDescription: "亲近但不幼稚，清晰且有判断力", enDescription: "Approachable yet sophisticated" },
  "developer-focused": { zh: "锐利的开发者气质", en: "Sharp & Developer-focused", zhDescription: "强调技术可信度和精确感", enDescription: "Technical credibility and precision" },

  "convert-signup": { zh: "提升注册转化", en: "Convert Sign-ups", zhDescription: "推动注册、试用或购买", enDescription: "Drive user registration or purchase" },
  "build-trust": { zh: "建立信任与可信度", en: "Build Trust & Credibility", zhDescription: "建立权威、可靠和专业感", enDescription: "Establish authority and reliability" },
  "showcase-product": { zh: "展示产品能力", en: "Showcase Product Power", zhDescription: "突出功能、能力和差异点", enDescription: "Demonstrate features and capabilities" },
  "impress-stakeholders": { zh: "打动面试官或投资人", en: "Impress Interviewers/Investors", zhDescription: "适合作品集、路演和展示场景", enDescription: "Portfolio and pitch presentations" },
  "explain-complex": { zh: "解释复杂功能", en: "Explain Complex Features", zhDescription: "适合教育型、说明型内容", enDescription: "Educational and explanatory content" },

  "apple-minimal": { zh: "Apple 式极简", en: "Apple-like Minimal", zhDescription: "干净、克制、留白充足", enDescription: "Clean, restrained, whitespace-forward" },
  "linear-structured": { zh: "Linear 式结构化", en: "Linear-like Structured", zhDescription: "系统化、信息密度高、专业", enDescription: "Systematic, information-dense, professional" },
  "stripe-conversion": { zh: "Stripe 式转化导向", en: "Stripe-like Conversion", zhDescription: "层级清晰、建立信任、推动行动", enDescription: "Clear hierarchy, trust-building, persuasive" },
  "vercel-developer": { zh: "Vercel 式开发者工具", en: "Vercel-like Developer Tool", zhDescription: "技术感、现代、可适配深色模式", enDescription: "Technical, modern, dark mode capable" },
  original: { zh: "原创 / 不依赖参考", en: "Original / No Reference", zhDescription: "避免明显套用某个品牌风格", enDescription: "Unique direction without obvious inspiration" },

  "gradient-overload": { zh: "过量蓝紫渐变", en: "Excessive Blue-Purple Gradients" },
  "meaningless-glow": { zh: "无意义发光效果", en: "Meaningless Glow Effects" },
  "everything-centered": { zh: "所有内容都居中", en: "Everything Perfectly Centered" },
  "icon-overload": { zh: "图标过载", en: "Icon Overload" },
  "generic-copy": { zh: "空泛文案和 buzzword", en: "Generic Copy & Buzzwords" },
  "no-product-feel": { zh: "缺少真实产品感", en: "No Real Product Feel" },

  "real-users": { zh: "真实用户", en: "Real Users", zhDescription: "终端客户或消费者", enDescription: "End customers or consumers" },
  interviewers: { zh: "面试官", en: "Interviewers", zhDescription: "招聘经理、技术面试官或 HR", enDescription: "Hiring managers and recruiters" },
  investors: { zh: "投资人", en: "Investors", zhDescription: "VC、天使投资人或潜在合作方", enDescription: "VCs, angels, potential partners" },
  enterprise: { zh: "企业客户", en: "Enterprise Clients", zhDescription: "B2B 购买者和决策人", enDescription: "B2B buyers and decision makers" },
  developers: { zh: "开发者", en: "Developers", zhDescription: "技术受众、同行或贡献者", enDescription: "Technical audience, peers, contributors" },

  "Looks like AI-generated template": { zh: "看起来像 AI 生成模板", en: "Looks like AI-generated template" },
  "No clear visual hierarchy": { zh: "视觉层级不清晰", en: "No clear visual hierarchy" },
  "Colors feel random or messy": { zh: "颜色随机或混乱", en: "Colors feel random or messy" },
  "Typography inconsistent": { zh: "字体系统不一致", en: "Typography inconsistent" },
  "Spacing feels off": { zh: "间距不协调", en: "Spacing feels off" },
  "Too many animations": { zh: "动效过多", en: "Too many animations" },
  "Unclear CTA or conversion path": { zh: "CTA 或转化路径不清晰", en: "Unclear CTA or conversion path" },
  "Missing brand personality": { zh: "缺少品牌个性", en: "Missing brand personality" },
};

export function optionLabel(locale: Locale, value: string): string {
  return optionTranslations[value]?.[locale] ?? value;
}

export function optionDescription(locale: Locale, value: string, fallback?: string): string {
  const translated = optionTranslations[value];
  if (!translated) return fallback ?? "";
  return locale === "zh"
    ? translated.zhDescription ?? fallback ?? ""
    : translated.enDescription ?? fallback ?? "";
}
