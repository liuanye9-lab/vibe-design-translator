// ============================================================
// Vibe Design Translator - Chinese Dictionary
// ============================================================

import { I18nDictionary } from "./types";

export const zh: I18nDictionary = {
  // ---------- Navigation ----------
  nav: {
    brand: "Vibe Translator",
    home: "首页",
    workspace: "工作台",
    patterns: "模式库",
    agent_runs: "Agent 工作流",
    settings: "设置",
    back: "返回",
    language_toggle: "中文 | EN",
  },

  // ---------- Common ----------
  common: {
    loading: "加载中...",
    error: "错误",
    success: "成功",
    cancel: "取消",
    confirm: "确认",
    save: "保存",
    delete: "删除",
    edit: "编辑",
    close: "关闭",
    copy: "复制",
    copied: "已复制",
    export: "导出",
    import: "导入",
    search: "搜索",
    filter: "筛选",
    sort: "排序",
    reset: "重置",
    submit: "提交",
    back: "返回",
    next: "下一步",
    previous: "上一步",
    finish: "完成",
    retry: "重试",
    refresh: "刷新",
    more: "更多",
    less: "收起",
    show: "显示",
    hide: "隐藏",
    enable: "启用",
    disable: "禁用",
    on: "开启",
    off: "关闭",
    yes: "是",
    no: "否",
    ok: "确定",
    apply: "应用",
    preview: "预览",
    download: "下载",
    upload: "上传",
    select: "选择",
    selected: "已选择",
    none: "无",
    empty: "暂无数据",
    no_results: "无结果",
    coming_soon: "即将推出",
    beta: "测试版",
    stable: "稳定版",
    version: "版本",
    phase: "阶段",
    step: "步骤",
    of: "共",
  },

  // ---------- Home Page ----------
  home: {
    badge: "面向 AI 编程的设计决策 SaaS",
    title_1: "将你的直觉感受转化为",
    title_2: "可执行的前端提示词",
    description: "不再与 AI 反复拉扯。描述你的设计愿景，获取精选方向，并为 Codex、Claude Code、Gemini 和 WorkBuddy 生成专属提示词。",
    subtitle: "无需注册 · 不连接 AI API · 无外部数据存储",
    how_label: "工作原理",
    how_title: "三条路径，通往更好的设计",
    step1_title: "描述你的愿景",
    step1_desc: "告诉 AI 你想要什么——或想避免什么。将模糊的感受转化为具体的设计规范。",
    step2_title: "选择设计方向",
    step2_desc: "从精选设计方向中选择契合目标的方向。每个方向都附带完整的执行策略。",
    step3_title: "获取可操作提示词",
    step3_desc: "生成工具专属提示词，含验收标准、反 AI 模板检查清单和分步指导。",
    supports: "支持生成以下工具的提示词",
    footer: "Vibe Design Translator — Phase 6。全局 i18n + 视觉素材系统。",
    footer_patterns: "设计模式",
    footer_settings: "设置",
    footer_pricing: "定价",
  },

  // ---------- Brief Page ----------
  brief: {
    loading: "加载中...",
    back: "返回首页",
    step_label: "第 1 步 / 共 3 步",
    title: "设计简报",
    subtitle: "告诉我们你的产品和设计目标。提供的细节越多，推荐的设计方向就越精准。",
    form_badge_1: "快速方向定位器",
    form_badge_2: "设计决策工坊",
    form_heading: "你在构建什么？",
    form_subheading: "告诉我们你的设计愿景",
    form_desc1: "回答几个问题，我们会为你推荐合适的设计方向。",
    form_desc2: "我们将把抽象感受转化为具体的设计规范。",
    form_product_label: "你在构建什么？",
    form_product_placeholder: "例如：面向 API 文档的开发者工具",
    form_category_label: "产品类别",
    form_category_placeholder: "选择一个类别",
    form_users_label: "为谁而做？",
    form_users_placeholder: "例如：构建 REST API 的开发者",
    form_impression_label: "第一印象 — 用户 3 秒内应该感受到什么？",
    form_impression_helper: "选择你希望唤起的情感反应",
    form_selected: "已选择",
    form_priority_label: "业务优先级 — 什么最重要？",
    form_priority_helper: "帮助我们为你的目标优化设计",
    form_visual_label: "视觉参考 — 哪种审美方向引起共鸣？",
    form_visual_helper: "抽象审美倾向（不是抄袭，只是寻找方向）",
    form_avoid_label: "你想避免哪些 AI 页面问题？",
    form_avoid_helper: "选择你最想预防的问题",
    form_audience_label: "主要受众 — 谁需要被打动？",
    form_goal_label: "页面目标 — 这个页面要完成什么？",
    form_goal_placeholder: "例如：推动内测注册，解释 API-first 理念，说服开发者试用产品",
    form_feeling_label: "期望感受 — 唤起的情感",
    form_feeling_helper: "选择你的页面应唤起的情感",
    form_avoid_feeling_label: "想避免 — 不想要的风格",
    form_avoid_feeling_helper: "选择你绝对不想要的风格",
    form_cta_label: "主要行动号召",
    form_cta_placeholder: "例如：免费试用、抢先体验、预约演示",
    form_intensity_label: "视觉强度",
    form_density_label: "内容密度",
    form_tool_label: "输出工具 — 你将使用哪个 AI 工具？",
    form_submit: "寻找我的方向",
    form_submit_alt: "生成设计方向",
    form_product_default: "我的产品",
  },

  // ---------- Directions Page ----------
  directions: {
    loading: "加载中...",
    back: "返回简报",
    step_label: "第 2 步 / 共 3 步",
    title: "设计方向",
    subtitle: "选择契合你愿景的设计方向。每个方向都附带完整的策略与视觉系统。",
    generate: "生成执行包",
    recommend: "推荐",
    best_for: "最适合",
    color_mood: "色彩基调",
    psychological_effect: "心理效应",
    risks: "风险提示",
    select_direction: "选择此方向",
    selected_direction: "已选择",
  },

  // ---------- Pack Page ----------
  pack: {
    loading: "正在生成执行包...",
    back: "返回方向",
    step_label: "第 3 步 / 共 3 步",
    title: "你的设计执行包",
    subtitle: "查看执行包并复制你首选工具的提示词。",
    direction_suffix: " 方向",
    view_all: "查看所有提示词",
    start_new: "重新开始",
    strategy: "设计策略",
    page_structure: "页面结构",
    visual_system: "视觉系统",
    interaction_system: "交互系统",
    acceptance_criteria: "验收标准",
    anti_ai_checklist: "反 AI 模板检查清单",
    color_system: "色彩系统",
    layout_thumbnail: "布局缩略图",
    interaction_flow: "交互流程",
    prompt_structure: "提示词结构",
  },

  // ---------- Compiler Page ----------
  compiler: {
    empty: "未找到设计简报。请从首页开始。",
    go_home: "前往首页",
    tag: "提示词编译器",
    title: "工具专属提示词",
    no_brief: "未找到设计简报。请从首页开始。",
    step_label: "提示词编译器",
    subtitle: "工具专属提示词",
    copy_prompt: "复制提示词",
    prompt_language: "提示词语言",
    chinese_prompt: "中文提示词",
    english_prompt: "English Prompt",
  },

  // ---------- Diagnosis Page ----------
  diagnosis: {
    tag: "诊断工具",
    title: "设计诊断",
    subtitle: "识别当前页面问题，获取可操作的优化提示词。",
    fail_title: "诊断失败",
    fail_desc: "诊断页面时发生错误。",
    retry: "返回重试",
    upload_title: "上传截图（可选）",
    upload_desc: "上传你的页面截图，帮助诊断系统更好地分析问题（当前为本地预览，未上传到云端）。",
    tip: "提示：此诊断结果不会自动保存。",
    go_workspace: "前往工作台创建项目",
    tip_suffix: "，以便保存诊断记录。",
    error_fail: "诊断请求失败",
    error_unknown: "发生未知错误",
    error_label: "诊断错误：",
    form_page_type: "页面类型",
    form_page_type_placeholder: "选择页面类型",
    form_desc_label: "页面描述",
    form_desc_placeholder: "描述你当前的页面。它是做什么的？包含什么内容？",
    form_pain_label: "主要痛点",
    form_pain_helper: "可多选",
    form_submit_loading: "分析中...",
    form_submit: "运行诊断",
    report_overall: "综合",
    report_score_good: "你的页面基础扎实，仍有改进空间。",
    report_score_medium: "你的页面显示出通用设计的迹象。建议参考下方的修复方案。",
    report_score_bad: "你的页面看起来像 AI 生成的模板。建议尽快重新设计。",
    report_provider: "提供方",
    report_provider_val: "Mock（本地）",
    report_mode: "降级到 Mock",
    report_tokens: "Token 用量",
    report_cost: "预估费用",
    report_breakdown: "评分详情",
    report_findings: "关键发现",
    report_fixes: "建议修复",
    report_prompt_title: "重构提示词",
    report_another: "诊断另一个页面",
    report_fresh: "重新开始",
    before: "修复前",
    after: "修复后",
    score_radar: "评分雷达",
    fix_strategy: "修复策略",
  },

  // ---------- Patterns Page ----------
  patterns: {
    tag: "设计模式库",
    title: "模式库",
    subtitle: "12 种原创设计模式，附带抽象信号与实现指导。不含第三方素材。",
    search: "搜索模式...",
    empty: "未找到匹配搜索的模式。",
    disclaimer_title: "设计模式声明",
    disclaimer_desc: "本库仅包含抽象设计信号与原创实现指导。不存储或引用第三方截图、Logo 或商标材料。所有模式旨在帮助你避免通用 AI 生成的界面，同时保持原创性。",
    category_all: "全部",
    category_layout: "布局",
    category_interaction: "交互",
    category_visual: "视觉风格",
    category_diagnosis: "诊断组件",
    category_prompt: "提示词组件",
    composition_title: "如何组合",
    composition_desc: "选择合适的模式组合，打造专业的设计页面。",
    suitable_for: "适合场景",
    avoid: "注意事项",
    prompt_snippet: "提示词片段",
  },

  // ---------- Workspace Page ----------
  workspace: {
    tag: "工作台",
    title: "项目工作台",
    subtitle: "管理你的设计项目与诊断记录",
    new: "新建项目",
    new_title: "新建项目",
    name_label: "项目名称",
    name_placeholder: "例如：我的产品落地页",
    type_label: "项目类型",
    cancel: "取消",
    create: "创建",
    empty_title: "暂无项目",
    empty_desc: "点击「新建项目」开始创建你的第一个设计项目，或者先从 Brief 页面创建。",
    empty_action: "新建项目",
    current: "当前",
    diagnose_count: "诊断 {n} 次",
    export_count: "导出 {n} 次",
    rename: "重命名",
    duplicate: "复制项目",
    export_json: "导出 JSON",
    export_md: "导出 Markdown",
    delete: "删除项目",
    delete_confirm: "确定要删除此项目吗？此操作不可撤销。",
    progress_map: "项目进度",
    status_brief: "简报",
    status_direction: "方向",
    status_pack: "执行包",
    status_prompt: "提示词",
    status_diagnosis: "诊断",
    recent_agent_run: "最近 Agent 运行",
    agent_status: "状态",
    agent_progress: "进度",
  },

  // ---------- Pricing Page ----------
  pricing: {
    tag: "定价",
    title: "简单透明的定价",
    subtitle: "选择适合你设计工作流的方案。所有方案均支持本地持久化存储。",
    free: "免费版",
    free_desc: "开始使用基础设计方向生成功能。",
    free_price: "$0",
    free_period: "永久",
    pro: "专业版",
    pro_desc: "适合希望完整使用设计决策工具的个人用户。",
    pro_price: "$19",
    pro_period: "/ 月",
    team: "团队版",
    team_desc: "适合需要共享设计记忆和品牌一致性的团队。",
    team_price: "$49",
    team_period: "/ 月 / 席位",
    popular: "最受欢迎",
    btn_free: "开始使用",
    btn_paid: "即将推出",
    note_label: "Phase 6 — 全局 i18n + 视觉素材系统",
    note_desc: "这是工程原型。真实定价和支付将在后续阶段添加。目前所有功能在测试期间免费开放。",
    feat_basic_direction: "基础设计方向生成",
    feat_3_exports: "每月 3 次提示词导出",
    feat_unlimited_exports: "无限提示词导出",
    feat_all_tools: "全部 AI 工具支持",
    feat_local_storage: "localStorage 本地持久化",
    feat_full_library: "完整模式库",
    feat_export_json: "导出 JSON / Markdown",
    feat_priority_support: "优先支持",
    feat_shared_memory: "共享设计记忆",
    feat_brand_consistency: "品牌一致性工具",
    feat_team_analytics: "团队数据分析",
  },

  // ---------- Settings Page ----------
  settings: {
    confirm_clear: "确定要清除所有数据吗？此操作不可撤销。",
    tag: "设置与数据",
    title: "设置",
    subtitle: "管理已保存的数据、历史记录和偏好设置。",
    state_title: "当前状态",
    brief_label: "设计简报",
    brief_empty: "未保存简报",
    direction_label: "已选方向",
    direction_empty: "未选择方向",
    tool_label: "首选工具",
    data_title: "数据管理",
    export: "导出数据 (JSON)",
    clear_history: "仅清除历史",
    clear_all: "清除所有数据",
    about_title: "关于数据存储",
    about_desc: "所有数据使用浏览器 localStorage 本地存储。不会发送到任何外部服务器。清除浏览器数据将删除所有已保存信息。",
    tech_title: "技术信息",
    tech_storage: "存储方式",
    tech_storage_val: "localStorage（浏览器）",
    tech_api: "AI API",
    tech_api_val: "已连接",
    tech_db: "数据库",
    tech_db_val: "无（Phase 6）",
    tech_phase: "阶段",
    tech_phase_val: "Phase 6 — 全局 i18n + 视觉素材系统",
    language_title: "语言设置",
    language_label: "界面语言",
    language_zh: "中文",
    language_en: "English",
    prompt_language_label: "提示词输出语言",
    prompt_language_desc: "选择生成提示词时使用的语言",
  },

  // ---------- Agent Runs ----------
  agent: {
    tag: "Agent 工作流",
    title: "Agent 工作流",
    subtitle: "查看和管理 Agent 执行记录。",
    empty: "暂无 Agent 运行记录",
    status: "状态",
    progress: "进度",
    events: "事件",
    steps: "步骤",
    started_at: "开始时间",
    completed_at: "完成时间",
    duration: "耗时",
    error: "错误",
    retry: "重试",
    cancel: "取消",
  },

  // ---------- Prompts ----------
  prompts: {
    role: "角色",
    goal: "目标",
    visual_direction: "视觉方向",
    tasks: "任务",
    constraints: "约束",
    acceptance_criteria: "验收标准",
    do_not: "禁止事项",
    codex_version: "Codex 版本",
    step_0: "检查项目结构",
    step_20: "建立视觉系统",
    step_40: "实现核心组件",
    step_60: "完成响应式与交互",
    step_80: "自检并修复问题",
    step_100: "输出修改总结",
  },

  // ---------- Options (label + description) ----------
  options: {
    // First Impression
    "fi_professional-reliable": {
      label: "专业可靠",
      description: "传达能力与信任感"
    },
    "fi_futuristic-experimental": {
      label: "未来感与实验性",
      description: "传达创新与前沿技术感"
    },
    "fi_calm-premium": {
      label: "沉稳高级",
      description: "低调奢华，精致审美"
    },
    "fi_friendly-intelligent": {
      label: "友好智能",
      description: "平易近人但不失精致"
    },
    "fi_developer-focused": {
      label: "锐利 · 开发者导向",
      description: "技术可信度与精确感"
    },

    // Business Priority
    "bp_convert-signup": {
      label: "转化注册",
      description: "推动用户注册或购买"
    },
    "bp_build-trust": {
      label: "建立信任与可信度",
      description: "建立权威与可靠性"
    },
    "bp_show-capability": {
      label: "展示产品实力",
      description: "展示功能与能力"
    },
    "bp_impress-investor": {
      label: "打动面试官 / 投资人",
      description: "作品集与路演演示"
    },
    "bp_explain-complexity": {
      label: "解释复杂功能",
      description: "教育与解释性内容"
    },

    // Visual Reference
    "vr_apple-minimal": {
      label: "类 Apple 极简",
      description: "干净克制，留白为主"
    },
    "vr_linear-structured": {
      label: "类 Linear 结构化",
      description: "系统化，信息密度高，专业"
    },
    "vr_stripe-conversion": {
      label: "类 Stripe 转化导向",
      description: "层级清晰，建立信任，有说服力"
    },
    "vr_vercel-developer": {
      label: "类 Vercel 开发者工具",
      description: "技术感，现代，支持暗色模式"
    },
    "vr_original": {
      label: "原创 / 无参考",
      description: "独特方向，无明显借鉴"
    },

    // Avoided AI Smell
    "ai_blue-purple-gradient": {
      label: "过度蓝紫渐变",
      description: "避免发光霓虹感的色彩过渡"
    },
    "ai_meaningless-glow": {
      label: "无意义的发光效果",
      description: "跳过每个卡片上的装饰性模糊和发光"
    },
    "ai_centered-everything": {
      label: "一切都完美居中",
      description: "增加不对称布局提升视觉趣味"
    },
    "ai_icon-overload": {
      label: "图标过载",
      description: "混合图标风格或降低图标密度"
    },
    "ai_vague-copy": {
      label: "通用文案与热词堆砌",
      description: "使用具体、原创的产品语言"
    },
    "ai_glass-overuse": {
      label: "玻璃效果滥用",
      description: "克制使用磨砂玻璃效果"
    },
    "ai_no-visual-rhythm": {
      label: "缺乏视觉节奏",
      description: "建立清晰的视觉层级和节奏"
    },
    "ai_weak-cta": {
      label: "弱 CTA",
      description: "强化行动号召的视觉权重"
    },

    // Audience
    "aud_real-users": {
      label: "真实用户",
      description: "终端客户或消费者"
    },
    "aud_interviewers": {
      label: "面试官",
      description: "招聘经理与 HR"
    },
    "aud_investors": {
      label: "投资人",
      description: "VC、天使投资人、潜在合作伙伴"
    },
    "aud_enterprise-clients": {
      label: "企业客户",
      description: "B2B 买家与决策者"
    },
    "aud_developers": {
      label: "开发者",
      description: "技术受众、同行、贡献者"
    },

    // Visual Intensity
    "intensity_minimal": {
      label: "极简",
      description: "最少的视觉元素"
    },
    "intensity_balanced": {
      label: "均衡",
      description: "平衡的视觉表现"
    },
    "intensity_expressive": {
      label: "表现力强",
      description: "丰富的视觉元素"
    },

    // Content Density
    "density_light": {
      label: "轻量",
      description: "大量留白，信息精简"
    },
    "density_standard": {
      label: "标准",
      description: "平衡的信息密度"
    },
    "density_dense": {
      label: "密集",
      description: "信息丰富，紧凑布局"
    },

    // Product Categories
    "cat_saas": {
      label: "SaaS 平台",
      description: "云端软件服务"
    },
    "cat_mobile": {
      label: "移动应用落地页",
      description: "App 推广页面"
    },
    "cat_ecommerce": {
      label: "电商",
      description: "在线商城"
    },
    "cat_portfolio": {
      label: "作品集",
      description: "个人或团队展示"
    },
    "cat_blog": {
      label: "博客 / 编辑",
      description: "内容发布平台"
    },
    "cat_marketing": {
      label: "营销活动",
      description: "推广与营销"
    },
    "cat_dashboard": {
      label: "仪表盘",
      description: "数据可视化后台"
    },
    "cat_docs": {
      label: "文档",
      description: "技术文档与帮助中心"
    },
    "cat_event": {
      label: "活动页面",
      description: "会议与活动推广"
    },
    "cat_other": {
      label: "其他",
      description: "其他类型"
    },

    // Desired Feelings
    "feel_trustworthy": { label: "可信" },
    "feel_premium": { label: "高级" },
    "feel_innovative": { label: "创新" },
    "feel_minimal": { label: "极简" },
    "feel_friendly": { label: "友好" },
    "feel_bold": { label: "大胆" },
    "feel_calm": { label: "沉稳" },
    "feel_elegant": { label: "优雅" },
    "feel_dynamic": { label: "动感" },
    "feel_intelligent": { label: "智能" },

    // Avoid Feelings
    "avoid_cheap": { label: "廉价" },
    "avoid_cluttered": { label: "杂乱" },
    "avoid_aggressive": { label: "激进" },
    "avoid_generic-ai": { label: "通用 AI 感" },
    "avoid_template": { label: "模板化" },
    "avoid_overwhelming": { label: "信息过载" },
    "avoid_confusing": { label: "令人困惑" },
    "avoid_dated": { label: "过时" },
    "avoid_inconsistent": { label: "不一致" },

    // Pain Points
    "pain_ai-template": {
      label: "看起来像 AI 生成的模板",
      description: "缺乏原创性和品牌感"
    },
    "pain_hierarchy": {
      label: "没有清晰的视觉层级",
      description: "信息主次不分"
    },
    "pain_colors": {
      label: "颜色随机或混乱",
      description: "色彩搭配不协调"
    },
    "pain_typography": {
      label: "排版不一致",
      description: "字体和字号混乱"
    },
    "pain_spacing": {
      label: "间距不协调",
      description: "留白和间距不统一"
    },
    "pain_animations": {
      label: "动画过多",
      description: "过度动效影响体验"
    },
    "pain_cta": {
      label: "CTA 或转化路径不清晰",
      description: "行动号召不明确"
    },
    "pain_personality": {
      label: "缺少品牌个性",
      description: "缺乏独特性和识别度"
    },

    // Page Types
    "pt_saas": { label: "SaaS 落地页" },
    "pt_portfolio": { label: "作品集" },
    "pt_ecommerce": { label: "电商产品页" },
    "pt_dashboard": { label: "仪表盘 / 管理后台" },
    "pt_blog": { label: "博客文章" },
    "pt_mobile": { label: "移动应用落地页" },
    "pt_docs": { label: "文档" },
    "pt_other": { label: "其他" },

    // Design Directions
    "dir_calm-professional": {
      label: "冷静专业型",
      description: "稳定、可信、权威。适合企业软件、金融服务、B2B SaaS 和专业咨询。"
    },
    "dir_soft-intelligent": {
      label: "柔和智能型",
      description: "平易近人 yet 前沿。适合 AI/ML 产品、开发者工具、生产力应用。"
    },
    "dir_experimental-premium": {
      label: "实验高级型",
      description: "大胆、创新、高端。适合创意机构、时尚品牌、奢侈品牌。"
    },

    // Workspace Categories
    "wc_landing": { label: "落地页" },
    "wc_product": { label: "产品页" },
    "wc_marketing": { label: "营销页" },
    "wc_dashboard": { label: "仪表盘" },
    "wc_other": { label: "其他" },

    // Tools
    "tool_codex": { label: "Codex" },
    "tool_claude-code": { label: "Claude Code" },
    "tool_gemini": { label: "Gemini" },
    "tool_workbuddy": { label: "WorkBuddy" },

    // Pattern Categories
    "pattern_layout": { label: "布局" },
    "pattern_interaction": { label: "交互" },
    "pattern_visual": { label: "视觉风格" },
    "pattern_diagnosis": { label: "诊断组件" },
    "pattern_prompt": { label: "提示词组件" },
  },
};
