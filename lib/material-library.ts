import type { MaterialAsset, MaterialCategory, MaterialCategoryPlaybook, MaterialSource } from "@/lib/types";

export const MATERIAL_CATEGORIES: Array<{
  id: "all" | MaterialCategory;
  label: string;
  description: string;
}> = [
  { id: "all", label: "全部素材", description: "综合推荐动效、配色、UI、布局和字体" },
  { id: "motion", label: "动效设计", description: "转场、反馈、滚动、生成中状态和视频/动图表达" },
  { id: "color", label: "视觉色彩搭配", description: "品牌色、情绪色、可读性、深浅模式和渐变边界" },
  { id: "ui", label: "UI 设计", description: "控件、状态、卡片、表单、导航和组件细节" },
  { id: "layout", label: "布局排版", description: "信息架构、首屏、网格、密度、响应式和页面节奏" },
  { id: "typography", label: "字体选择", description: "中英文字体、字号层级、行高、字重和阅读体验" },
];

export const MATERIAL_SOURCES: MaterialSource[] = [
  {
    id: "pageflows",
    name: "Pageflows",
    href: "https://pageflows.com/",
    kind: "interaction-flow",
    signal: "流程拆解",
    note: "用于判断 onboarding、checkout、dashboard、表单和状态反馈是否完整。",
  },
  {
    id: "mobbin",
    name: "Mobbin",
    href: "https://mobbin.com/discover/apps/ios/latest",
    kind: "product-ui",
    signal: "真实 App 截图库",
    note: "用于校准移动端信息密度、列表结构、导航层级和控件状态。",
  },
  {
    id: "godly",
    name: "Godly",
    href: "https://godly.website/",
    kind: "website-inspiration",
    signal: "新鲜网页灵感",
    note: "用于捕捉 AI 工具、SaaS、创意网站中的新式首屏和动效表达。",
  },
  {
    id: "v0",
    name: "v0 Templates",
    href: "https://v0.app/templates",
    kind: "template",
    signal: "可执行组件结构",
    note: "用于把设计方向翻译成可落地的 React/Next 组件组合。",
  },
  {
    id: "awwwards",
    name: "Awwwards",
    href: "https://www.awwwards.com/websites/portfolio/",
    kind: "website-inspiration",
    signal: "高级视觉完成度",
    note: "用于判断作品集和品牌站的节奏、记忆点和非模板感。",
  },
  {
    id: "huemint",
    name: "Huemint",
    href: "https://huemint.com/brand-intersection/",
    kind: "color-system",
    signal: "品牌配色关系",
    note: "用于生成主色、辅助色、背景色和可读性之间的约束。",
  },
];

export const MATERIAL_CATEGORY_PLAYBOOKS: MaterialCategoryPlaybook[] = [
  {
    id: "motion",
    label: "动效设计",
    role: "负责把状态变化、生成过程、转场和视觉记忆点变成可感知体验。",
    cases: ["AI 生成中状态", "Hero 粒子背景", "滚动揭示", "卡片 hover 微反馈", "动图/视频素材预览"],
    useWhen: ["用户需要等待", "页面要建立科技感", "素材需要用动态方式解释", "首屏需要记忆点"],
    avoidWhen: ["信息密度极高的后台", "动效会影响阅读", "没有 reduced-motion 降级", "动画只为装饰存在"],
    frontendRules: ["所有动效必须有触发条件", "默认 120-420ms，品牌氛围动效可 8-12s", "transform/opacity 优先", "尊重 prefers-reduced-motion"],
    evaluationChecklist: ["是否解释了状态", "是否不抢正文", "是否有暂停或降级", "是否不会改变布局尺寸"],
  },
  {
    id: "color",
    label: "视觉色彩搭配",
    role: "负责定义品牌感、可读性、情绪和状态语义之间的约束。",
    cases: ["科技蓝柔和配色", "品牌交叉配色", "章节色块", "深浅模式 token", "状态色语义"],
    useWhen: ["新品牌起步", "AI 产品需要亲和感", "界面层级不清", "页面看起来像模板"],
    avoidWhen: ["已有严格品牌手册", "主色超过两个", "渐变遮挡文字", "状态色与品牌色冲突"],
    frontendRules: ["先定义背景/文字/边框，再定义主色", "每个色板必须过对比度检查", "状态色独立于品牌色", "使用 CSS variables/HSL token"],
    evaluationChecklist: ["主色是否克制", "文字是否可读", "暗色模式是否单独设计", "颜色是否支持业务优先级"],
  },
  {
    id: "ui",
    label: "UI 设计",
    role: "负责控件、卡片、表单、导航、状态反馈和组件细节。",
    cases: ["Agent 对话工作台", "来源证据卡片", "异步反馈闭环", "控制台层级", "收藏/筛选/导出操作"],
    useWhen: ["产品需要高频操作", "推荐需要可追溯", "状态多且容易混乱", "需要从 demo 走向真实工具"],
    avoidWhen: ["只有展示型内容", "卡片内嵌卡片过多", "按钮没有明确动作", "状态只靠颜色区分"],
    frontendRules: ["组件必须有 idle/loading/success/error", "按钮、tab、筛选器要有 selected/disabled/focus", "卡片高度稳定", "交互不改变布局"],
    evaluationChecklist: ["控件是否可扫读", "状态是否明确", "键盘和焦点是否可用", "组件是否可复用"],
  },
  {
    id: "layout",
    label: "布局排版",
    role: "负责信息架构、首屏结构、网格、密度、响应式和页面节奏。",
    cases: ["左侧 Agent + 右侧素材库", "Hero 区组件模板", "Dashboard 密度阶梯", "作品集编辑网格", "移动端横向画廊"],
    useWhen: ["用户需要比较素材", "页面目标复杂", "要同时展示对话和结果", "信息层级需要清晰"],
    avoidWhen: ["为了好看堆卡片", "桌面和移动端任务路径不同", "固定宽度导致小屏溢出", "没有优先级"],
    frontendRules: ["先定 app shell，再定内容区", "用 minmax/aspect-ratio 保持稳定", "移动端保留主任务路径", "Blueprint 和推荐卡片要能一起扫描"],
    evaluationChecklist: ["首屏是否一眼懂", "主次是否明确", "是否适配 390px", "筛选和结果是否位置稳定"],
  },
  {
    id: "typography",
    label: "字体选择",
    role: "负责中文/英文/数字/控件文本的层级、可读性和品牌气质。",
    cases: ["中文优先 UI 文案", "中英混排层级", "Hero 字号对比", "按钮/标签字体", "数字 tabular 对齐"],
    useWhen: ["中文模式仍有英文模板感", "页面信息密集", "品牌需要更高级", "中英文切换会跳版"],
    avoidWhen: ["负字距", "标题过大挤压内容", "按钮继承正文大小", "字体 fallback 未定义"],
    frontendRules: ["中文优先 PingFang SC/Noto Sans SC", "英文 Inter/Geist 作补充", "按钮和标签独立字号", "标题使用 clamp 但不按 vw 缩放"],
    evaluationChecklist: ["中文是否自然", "控件文字是否清晰", "中英切换是否稳定", "数字是否对齐"],
  },
];

export const MATERIAL_ASSETS: MaterialAsset[] = [
  {
    id: "m-space-scroll",
    patternId: "p1",
    title: "留白驱动的滚动呼吸感",
    category: "motion",
    sourceId: "awwwards",
    mediaKind: "css-motion",
    motionSpec: "大块留白配合 280ms fade-up，滚动进入时只移动 24-40px，不做夸张缩放。",
    useWhen: ["高客单价产品", "作品集", "需要建立信任的 SaaS 首屏"],
    avoidWhen: ["信息极密集的后台", "需要快速比较大量数据的页面"],
    designSignals: ["单视口单焦点", "大标题低噪音", "区块之间形成停顿"],
    frontendNotes: ["使用 IntersectionObserver", "section padding 72-120px", "优先控制 max-width 而不是塞卡片"],
    tags: ["landing", "premium", "scroll", "quiet"],
    directionFit: ["calm-professional", "experimental-premium"],
    recommendationAngle: "让页面在滚动时有节奏感，同时保留高级、克制的产品气质。",
    qualityScore: 92,
  },
  {
    id: "m-asymmetric-rail",
    patternId: "p2",
    title: "非对称素材轨道",
    category: "layout",
    sourceId: "godly",
    mediaKind: "animated-gif",
    motionSpec: "左右错位的图片或组件轨道缓慢漂移，hover 时局部暂停并显示说明。",
    useWhen: ["创意机构", "AI 产品展示", "作品集案例墙"],
    avoidWhen: ["法律金融页面", "强转化表单页"],
    designSignals: ["错位网格", "图片尺寸有主次", "滚动时保持版式张力"],
    frontendNotes: ["CSS grid-template-areas", "aspect-ratio 固定素材容器", "hover pause animation"],
    tags: ["gallery", "portfolio", "motion", "editorial"],
    directionFit: ["experimental-premium", "soft-intelligent"],
    recommendationAngle: "适合把多张参考、案例或产品截图组织成不呆板的素材墙。",
    qualityScore: 88,
  },
  {
    id: "m-card-stack-demo",
    patternId: "p3",
    title: "可展开的卡片堆叠演示",
    category: "ui",
    sourceId: "v0",
    mediaKind: "css-motion",
    motionSpec: "卡片 hover 上浮 6px，选中后展开为详情，后台卡片保持 8-12px 可见边缘。",
    useWhen: ["功能对比", "多方案选择", "案例摘要"],
    avoidWhen: ["严肃长文", "需要同时展示全部信息的表格"],
    designSignals: ["层叠关系", "前后景深", "点击后状态明确"],
    frontendNotes: ["framer-motion layout", "aria-expanded", "移动端改为纵向 accordion"],
    tags: ["cards", "compare", "stateful", "microinteraction"],
    directionFit: ["soft-intelligent", "calm-professional"],
    recommendationAngle: "适合把多个设计方向、方案或案例摘要做成可探索的层级结构。",
    qualityScore: 86,
  },
  {
    id: "m-duotone-console",
    patternId: "p4",
    title: "双色层级控制台",
    category: "ui",
    sourceId: "mobbin",
    mediaKind: "video",
    motionSpec: "层级变化只改变明度，选中/聚焦用单一强调色，数据刷新时做轻微 shimmer。",
    useWhen: ["开发者工具", "AI 工作台", "数据面板"],
    avoidWhen: ["生活方式品牌", "儿童或强情绪产品"],
    designSignals: ["层级靠明度", "强调色克制", "状态反馈一致"],
    frontendNotes: ["定义 elevation token", "focus-visible 明确", "loading skeleton 不改变布局"],
    tags: ["dashboard", "developer", "dark-mode", "state"],
    directionFit: ["calm-professional", "soft-intelligent"],
    recommendationAngle: "适合 AI 工作台、开发者工具和信息密度较高的后台界面。",
    qualityScore: 90,
  },
  {
    id: "m-color-chapters",
    patternId: "p5",
    title: "色块章节叙事",
    category: "color",
    sourceId: "huemint",
    mediaKind: "static-image",
    motionSpec: "章节切换时背景色通过 420ms 低对比渐变过渡，吸顶导航同步切换当前章节标记。",
    useWhen: ["品牌故事", "功能分层叙事", "服务介绍页"],
    avoidWhen: ["单一任务工具页", "需要极强专业克制的 B2B 页面"],
    designSignals: ["章节色彩有秩序", "相邻颜色不过度跳变", "文字对比稳定"],
    frontendNotes: ["CSS custom properties per section", "sticky progress nav", "contrast token 检查"],
    tags: ["brand", "color", "storytelling", "sections"],
    directionFit: ["soft-intelligent", "experimental-premium"],
    recommendationAngle: "适合把页面拆成可记忆的视觉章节，让用户知道自己浏览到哪里。",
    qualityScore: 87,
  },
  {
    id: "m-muted-gradient-media",
    patternId: "p6",
    title: "柔和渐变媒体层",
    category: "color",
    sourceId: "godly",
    mediaKind: "animated-gif",
    motionSpec: "渐变背景以 8-12s 慢速移动，前景内容不跟随漂移，避免廉价炫光。",
    useWhen: ["AI 产品首屏", "视觉化能力解释", "图片上叠文字"],
    avoidWhen: ["已有复杂截图背景", "需要纯白高可信界面"],
    designSignals: ["低透明度渐变", "文字可读", "不抢主体"],
    frontendNotes: ["background-size 160%", "prefers-reduced-motion", "叠层透明度 10-24%"],
    tags: ["hero", "gradient", "ai", "atmosphere"],
    directionFit: ["soft-intelligent", "experimental-premium"],
    recommendationAngle: "适合 AI 产品营造科技感，但需要严格控制透明度和文字可读性。",
    qualityScore: 84,
  },
  {
    id: "m-type-scale",
    patternId: "p7",
    title: "字号对比节奏",
    category: "typography",
    sourceId: "awwwards",
    mediaKind: "static-image",
    motionSpec: "大标题入场只做 opacity 和 16px 位移，避免文字缩放造成 AI 模板味。",
    useWhen: ["强主张首屏", "价格锚点", "关键卖点"],
    avoidWhen: ["大量正文阅读", "需要极小屏密度的移动工具"],
    designSignals: ["标题和正文差距明确", "字重层级清楚", "周围有留白"],
    frontendNotes: ["clamp 控制标题", "按钮文字单独定义 size", "避免负字距"],
    tags: ["typography", "hero", "hierarchy", "copy"],
    directionFit: ["calm-professional", "experimental-premium"],
    recommendationAngle: "适合把一句核心主张做强，让视觉重心靠文字而不是装饰撑起来。",
    qualityScore: 91,
  },
  {
    id: "m-bilingual-type",
    patternId: "p8",
    title: "中英混排层级",
    category: "typography",
    sourceId: "mobbin",
    mediaKind: "reference-link",
    motionSpec: "语言切换时保持布局尺寸稳定，只做 160ms opacity 过渡。",
    useWhen: ["国际品牌", "双语产品", "面向海外用户的中文团队"],
    avoidWhen: ["单语言强转化页", "字体资源受限的低端设备"],
    designSignals: ["中英文角色分工", "行高匹配", "切换不跳版"],
    frontendNotes: ["locale copy 长度预算", "font fallback 明确", "按钮宽度使用 min-width"],
    tags: ["i18n", "typography", "brand", "global"],
    directionFit: ["calm-professional", "experimental-premium"],
    recommendationAngle: "适合中英文切换、国际化品牌和需要稳定排版的工具界面。",
    qualityScore: 89,
  },
  {
    id: "m-magnetic-cta",
    patternId: "p9",
    title: "磁吸 CTA 微交互",
    category: "motion",
    sourceId: "pageflows",
    mediaKind: "css-motion",
    motionSpec: "桌面端鼠标接近时最大位移 8px，离开用 spring 回弹；触屏只保留 press feedback。",
    useWhen: ["主 CTA", "导航高亮", "可探索的案例入口"],
    avoidWhen: ["密集表单", "表格行操作", "移动端主流程"],
    designSignals: ["可点击感增强", "反馈不打扰阅读", "移动端降级"],
    frontendNotes: ["pointer fine 才启用", "transform 不影响布局", "focus state 不依赖 hover"],
    tags: ["cta", "interaction", "microfeedback", "desktop"],
    directionFit: ["soft-intelligent", "experimental-premium"],
    recommendationAngle: "适合增强主操作的点击感，但只应该用于少数高价值入口。",
    qualityScore: 80,
  },
  {
    id: "m-scroll-reveal-system",
    patternId: "p10",
    title: "滚动揭示编排系统",
    category: "motion",
    sourceId: "pageflows",
    mediaKind: "animated-gif",
    motionSpec: "同组元素错峰 80-140ms，图片先出现，文字随后进入，CTA 最后确认。",
    useWhen: ["长落地页", "产品说明", "案例故事"],
    avoidWhen: ["后台工具", "首屏必须立即展示全部内容的页面"],
    designSignals: ["先视觉后文字", "错峰节奏", "减少动画偏好可关闭"],
    frontendNotes: ["data-reveal delay token", "server render 初始可读", "mobile 降低位移距离"],
    tags: ["scroll", "story", "landing", "motion"],
    directionFit: ["soft-intelligent", "experimental-premium"],
    recommendationAngle: "适合长页面的叙事节奏，让图片、文字和 CTA 按优先级出现。",
    qualityScore: 93,
  },
  {
    id: "m-gesture-gallery",
    patternId: "p11",
    title: "手势素材画廊",
    category: "layout",
    sourceId: "mobbin",
    mediaKind: "video",
    motionSpec: "横向滑动带惯性，卡片吸附到中心，边缘保留下一张预览。",
    useWhen: ["移动优先展示", "作品集图库", "案例轮播"],
    avoidWhen: ["桌面信息检索", "需要 SEO 展开内容的页面"],
    designSignals: ["滑动反馈清晰", "边界有阻尼", "有可发现的控制"],
    frontendNotes: ["scroll-snap", "touch-action pan-y", "键盘左右键支持"],
    tags: ["mobile", "gesture", "gallery", "snap"],
    directionFit: ["experimental-premium", "soft-intelligent"],
    recommendationAngle: "适合移动端或横向素材浏览，能自然露出下一张内容。",
    qualityScore: 83,
  },
  {
    id: "m-feedback-loop",
    patternId: "p12",
    title: "异步反馈闭环",
    category: "ui",
    sourceId: "pageflows",
    mediaKind: "css-motion",
    motionSpec: "点击后 100ms 内进入 loading，成功用 600ms check reveal，失败保留恢复入口。",
    useWhen: ["AI 生成", "上传分析", "表单提交", "保存设置"],
    avoidWhen: ["纯展示页面", "没有异步状态的静态内容"],
    designSignals: ["即时响应", "进度可见", "错误可恢复"],
    frontendNotes: ["idle/loading/success/error 四态", "disable double submit", "错误文案绑定 next action"],
    tags: ["agent", "async", "loading", "state"],
    directionFit: ["calm-professional", "soft-intelligent"],
    recommendationAngle: "适合 AI 生成、上传分析、保存配置等必须让用户放心等待的场景。",
    qualityScore: 95,
  },
  {
    id: "m-agent-chat-shell",
    patternId: "p4",
    title: "Agent 对话式筛选工作台",
    category: "ui",
    sourceId: "v0",
    mediaKind: "reference-link",
    motionSpec: "输入后先追加用户气泡，再用 240ms skeleton 展示检索中状态，推荐结果从高到低渐入。",
    useWhen: ["AI 工具", "素材检索", "需求不明确的设计咨询", "多轮推荐"],
    avoidWhen: ["一次性静态目录", "用户只需要浏览全部素材"],
    designSignals: ["左侧对话", "右侧结果", "推荐理由可追溯", "筛选条件可见"],
    frontendNotes: ["保留 query state", "推荐结果可重新排序", "每条推荐展示来源和实现要点"],
    tags: ["agent", "chat", "recommendation", "workspace"],
    directionFit: ["soft-intelligent", "calm-professional"],
    recommendationAngle: "把模糊需求变成可筛选、可解释、可执行的素材推荐路径。",
    qualityScore: 96,
  },
  {
    id: "m-source-evidence-card",
    patternId: "p3",
    title: "来源证据卡片",
    category: "ui",
    sourceId: "pageflows",
    mediaKind: "static-image",
    motionSpec: "hover 时只提升边框和阴影，不改变卡片尺寸；展开后展示来源、适用场景、避坑和实现规则。",
    useWhen: ["素材库", "案例推荐", "设计决策评审"],
    avoidWhen: ["纯图片瀑布流", "用户只需要收藏图片"],
    designSignals: ["来源清楚", "理由明确", "可落地规则优先", "不是只看图"],
    frontendNotes: ["卡片固定高度", "外链独立按钮", "摘要不要超过三行"],
    tags: ["evidence", "library", "cards", "source"],
    directionFit: ["calm-professional", "soft-intelligent"],
    recommendationAngle: "让推荐不只是灵感图，而是带出处、判断标准和前端实现线索。",
    qualityScore: 94,
  },
  {
    id: "m-brand-intersection-palette",
    patternId: "p5",
    title: "品牌交叉配色",
    category: "color",
    sourceId: "huemint",
    mediaKind: "static-image",
    motionSpec: "颜色切换使用 180ms crossfade，避免色板跳变造成误判。",
    useWhen: ["新品牌", "SaaS 首屏", "AI 产品", "需要建立差异化的工具"],
    avoidWhen: ["已有严格品牌手册", "医疗金融强合规色彩"],
    designSignals: ["主色不超过一个", "辅助色服务状态", "背景色先保证可读"],
    frontendNotes: ["用 HSL token", "检查 WCAG 对比度", "深色和浅色模式分开定义"],
    tags: ["palette", "brand", "contrast", "token"],
    directionFit: ["soft-intelligent", "experimental-premium", "calm-professional"],
    recommendationAngle: "从品牌印象和界面可读性之间找交集，而不是堆渐变。",
    qualityScore: 97,
  },
  {
    id: "m-dashboard-density-ladder",
    patternId: "p4",
    title: "后台信息密度阶梯",
    category: "layout",
    sourceId: "mobbin",
    mediaKind: "static-image",
    motionSpec: "密度切换不做大动画，只用行高、间距和分组边界的 160ms 过渡。",
    useWhen: ["Dashboard", "Agent 控制台", "CRM", "开发者平台"],
    avoidWhen: ["作品集首屏", "品牌叙事长页"],
    designSignals: ["导航稳定", "列表优先", "重复操作路径短", "状态对比清楚"],
    frontendNotes: ["用 grid minmax", "表格和卡片不要混用过多", "移动端优先保留任务路径"],
    tags: ["dashboard", "density", "layout", "saas"],
    directionFit: ["calm-professional"],
    recommendationAngle: "帮助工具类产品从好看走向高频可用，避免卡片堆砌。",
    qualityScore: 92,
  },
  {
    id: "m-template-to-component-map",
    patternId: "p3",
    title: "模板到组件映射",
    category: "layout",
    sourceId: "v0",
    mediaKind: "reference-link",
    motionSpec: "组件切换只更新局部区域，保留页面骨架，减少用户迷失。",
    useWhen: ["从想法生成前端", "组件库搭建", "MVP 快速落地"],
    avoidWhen: ["需要完全原创艺术方向的品牌站"],
    designSignals: ["组件职责清晰", "状态可复用", "页面结构可拆分"],
    frontendNotes: ["先定义 app shell", "再定义卡片/表单/列表 primitive", "最后生成页面组合"],
    tags: ["component", "template", "nextjs", "implementation"],
    directionFit: ["calm-professional", "soft-intelligent"],
    recommendationAngle: "把灵感翻译成能交给 Codex/Claude Code 的组件结构。",
    qualityScore: 90,
  },
  {
    id: "m-editorial-portfolio-grid",
    patternId: "p2",
    title: "编辑感作品集网格",
    category: "layout",
    sourceId: "awwwards",
    mediaKind: "animated-gif",
    motionSpec: "大图与小图错峰出现，滚动速度不同但位移不超过 18px。",
    useWhen: ["设计师作品集", "创意机构", "案例合集", "品牌展示"],
    avoidWhen: ["企业后台", "表单转化页"],
    designSignals: ["强视觉主次", "案例标题短", "图文间距像杂志版式"],
    frontendNotes: ["CSS subgrid 或 masonry fallback", "图片固定 aspect-ratio", "懒加载保留尺寸"],
    tags: ["portfolio", "editorial", "grid", "case-study"],
    directionFit: ["experimental-premium"],
    recommendationAngle: "适合需要记忆点的案例展示，让作品本身成为页面主角。",
    qualityScore: 88,
  },
  {
    id: "m-font-pairing-system",
    patternId: "p8",
    title: "中英文双字体配对",
    category: "typography",
    sourceId: "mobbin",
    mediaKind: "static-image",
    motionSpec: "字体切换不动布局，通过固定 line-height 和 min-width 保持控件稳定。",
    useWhen: ["双语官网", "国际化 SaaS", "设计系统文档", "跨境产品"],
    avoidWhen: ["只面向单一中文内容", "性能预算极低的页面"],
    designSignals: ["中文稳", "英文有品牌性", "数字和按钮可读", "fallback 不破版"],
    frontendNotes: ["中文用 PingFang SC / Noto Sans SC", "英文用 Inter / Geist", "数字可用 tabular-nums"],
    tags: ["font", "i18n", "readability", "design-system"],
    directionFit: ["calm-professional", "experimental-premium"],
    recommendationAngle: "解决中文模式下仍有英文模板感的问题，先保证全局中文和控件文字稳定。",
    qualityScore: 94,
  },
  {
    id: "m-video-motion-reference",
    patternId: "p10",
    title: "动图/视频化动效参考",
    category: "motion",
    sourceId: "godly",
    mediaKind: "video",
    motionSpec: "推荐卡片展示 3-5 帧 motion strip，点击后给出 CSS/Framer Motion 参数。",
    useWhen: ["需要动效素材库", "AI 产品展示", "转场和生成态设计"],
    avoidWhen: ["无动效预算", "强可访问性限制且无法降级"],
    designSignals: ["帧序列可见", "动效目的明确", "有 reduced-motion 方案"],
    frontendNotes: ["先用 CSS keyframes 做 MVP", "复杂转场再接 Lottie/video", "所有动效可关闭"],
    tags: ["motion", "gif", "video", "framer"],
    directionFit: ["soft-intelligent", "experimental-premium"],
    recommendationAngle: "把抽象的动效变成可浏览、可筛选、可复用的素材。",
    qualityScore: 93,
  },
];

export function getMaterialSourceById(sourceId: string): MaterialSource | undefined {
  return MATERIAL_SOURCES.find((source) => source.id === sourceId);
}

export function getMaterialAssetsByPatternIds(patternIds: string[]): MaterialAsset[] {
  const idSet = new Set(patternIds);
  return MATERIAL_ASSETS.filter((asset) => idSet.has(asset.patternId));
}

export function getMaterialAssetsForDirection(directionId: string): MaterialAsset[] {
  return MATERIAL_ASSETS.filter((asset) => asset.directionFit.includes(directionId));
}

export function searchMaterialAssets(query: string, category: "all" | MaterialCategory = "all"): MaterialAsset[] {
  const normalizedQuery = query.trim().toLowerCase();
  const queryTerms = normalizedQuery
    ? normalizedQuery.split(/\s+/).filter(Boolean)
    : [];

  return MATERIAL_ASSETS
    .filter((asset) => category === "all" || asset.category === category)
    .map((asset) => {
      const searchable = [
        asset.title,
        asset.category,
        asset.mediaKind,
        asset.motionSpec,
        asset.recommendationAngle,
        ...asset.useWhen,
        ...asset.avoidWhen,
        ...asset.designSignals,
        ...asset.frontendNotes,
        ...asset.tags,
        ...asset.directionFit,
      ]
        .join(" ")
        .toLowerCase();

      const queryScore = queryTerms.reduce((score, term) => {
        if (searchable.includes(term)) return score + 12;
        return score;
      }, 0);

      const chineseSignals = [
        ["动效", "motion"],
        ["动画", "motion"],
        ["视频", "motion"],
        ["动图", "motion"],
        ["色彩", "color"],
        ["配色", "color"],
        ["颜色", "color"],
        ["UI", "ui"],
        ["界面", "ui"],
        ["组件", "ui"],
        ["布局", "layout"],
        ["排版", "layout"],
        ["网格", "layout"],
        ["作品集", "layout"],
        ["案例", "layout"],
        ["画廊", "layout"],
        ["字体", "typography"],
        ["字号", "typography"],
        ["中文", "typography"],
      ] as const;

      const semanticScore = chineseSignals.reduce((score, [word, targetCategory]) => {
        if (normalizedQuery.includes(word.toLowerCase()) && asset.category === targetCategory) {
          return score + 18;
        }
        return score;
      }, 0);

      return {
        asset,
        score: (asset.qualityScore || 80) + queryScore + semanticScore,
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.asset);
}

export function buildMaterialContextForAgent(): string {
  const playbookContext = MATERIAL_CATEGORY_PLAYBOOKS.map((playbook) => [
    `CATEGORY ${playbook.id}/${playbook.label}`,
    `role=${playbook.role}`,
    `cases=${playbook.cases.join("、")}`,
    `useWhen=${playbook.useWhen.join("、")}`,
    `avoid=${playbook.avoidWhen.join("、")}`,
    `frontendRules=${playbook.frontendRules.join("；")}`,
    `checklist=${playbook.evaluationChecklist.join("、")}`,
  ].join(" | ")).join("\n");

  const assetContext = MATERIAL_ASSETS.map((asset) => {
    const source = getMaterialSourceById(asset.sourceId);
    return [
      `${asset.patternId}/${asset.id}: ${asset.title}`,
      `category=${asset.category}`,
      `source=${source?.name || asset.sourceId}`,
      `media=${asset.mediaKind}`,
      `useWhen=${asset.useWhen.join("、")}`,
      `avoid=${asset.avoidWhen.join("、")}`,
      `signals=${asset.designSignals.join("、")}`,
      `motion=${asset.motionSpec}`,
      `frontend=${asset.frontendNotes.join("；")}`,
      `implementation=${asset.implementationRules?.join("；") || asset.frontendNotes.join("；")}`,
      `pitfalls=${asset.pitfalls?.join("、") || asset.avoidWhen.join("、")}`,
      `fit=${asset.directionFit.join(",")}`,
    ].join(" | ");
  }).join("\n");

  return `${playbookContext}\n\n${assetContext}`;
}

export function getMaterialCategoryPlaybook(category: MaterialCategory): MaterialCategoryPlaybook | undefined {
  return MATERIAL_CATEGORY_PLAYBOOKS.find((playbook) => playbook.id === category);
}

export function getMaterialAssetsByIds(ids: string[]): MaterialAsset[] {
  const idSet = new Set(ids);
  return MATERIAL_ASSETS.filter((asset) => idSet.has(asset.id));
}

export function summarizeMaterialLibraryForPrompt(): string {
  return MATERIAL_CATEGORY_PLAYBOOKS.map((playbook) => {
    const assets = MATERIAL_ASSETS
      .filter((asset) => asset.category === playbook.id)
      .slice(0, 6)
      .map((asset) => `${asset.id}:${asset.title}`)
      .join("、");
    return `${playbook.label}：${playbook.role}；代表素材=${assets}`;
  }).join("\n");
}
