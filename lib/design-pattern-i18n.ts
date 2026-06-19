import type { Locale } from "@/lib/i18n/types";
import type { DesignPattern } from "@/lib/types";

type LocalizedPatternText = Pick<
  DesignPattern,
  | "name"
  | "suitableFor"
  | "visualTraits"
  | "layoutAdvice"
  | "interactionAdvice"
  | "promptFragment"
  | "avoid"
  | "legalNote"
>;

const zhPatternText: Record<string, LocalizedPatternText> = {
  p1: {
    name: "有意留白",
    suitableFor: ["高端产品页", "SaaS 落地页", "作品集网站", "极简品牌"],
    visualTraits: ["区块之间使用充足间距", "每个视口只保留一个视觉焦点", "文字周围有呼吸感", "把负空间当成主动设计元素"],
    layoutAdvice: ["使用 48-96px 的明确网格间距", "内容最大宽度控制在 1200px", "用非对称排布制造张力", "让内容决定空间，而不是用元素填满空间"],
    interactionAdvice: ["悬停状态保持克制", "避免破坏呼吸感的弹窗", "滚动动画维持空间节奏", "过渡应像空间展开，而不是突然跳变"],
    promptFragment: "将有意留白作为主要设计元素。区块 padding 至少 64px，内容最大宽度 1200px，正文行高保持 1.6-1.8。通过空间节奏建立视觉韵律，而不是依赖装饰元素。",
    avoid: ["为了填满视口而塞内容", "所有区块使用完全一致的 padding", "与留白竞争注意力的装饰元素", "让页面显得局促的弹窗或模态框"],
    legalNote: "该模式描述的是抽象留白原则和原创实现指导，不引用或复制任何特定品牌、网站或第三方设计。",
  },
  p2: {
    name: "非对称网格",
    suitableFor: ["创意机构网站", "作品集展示", "编辑型内容", "杂志式版面"],
    visualTraits: ["非等宽列布局", "错位对齐制造兴趣点", "内容突破预期边界", "动态视觉层级"],
    layoutAdvice: ["使用 CSS Grid 和命名区域", "显式设置网格轨道", "用 transform 或负边距制造错位", "允许部分内容穿出容器边界"],
    interactionAdvice: ["视差应增强非对称感", "悬停揭示要保持网格张力", "避免交互时把所有元素拉回居中", "过渡要像区块位移"],
    promptFragment: "使用 CSS Grid 创建非对称网格布局，列比例可采用 2:3 或 1:4。关键元素进行错位排布以制造视觉张力，同时保持可读性。整体应显得动态但有意图。",
    avoid: ["完全居中且对称的版面", "全页面等宽列", "把所有内容强行塞进相同盒子", "对称化的悬停状态"],
    legalNote: "该模式描述抽象非对称网格原则，实现指导为原创，不引用特定网站、出版物或设计系统。",
  },
  p3: {
    name: "卡片堆叠",
    suitableFor: ["功能展示", "价格对比", "用户评价区", "多步骤流程"],
    visualTraits: ["卡片轻微重叠", "通过阴影制造层次", "悬停时带轻微 3D 透视", "堆叠交互中揭示内容"],
    layoutAdvice: ["使用 transform 建立层次", "为前置卡片设置更高层级", "使用克制阴影增强深度", "同一堆叠中的卡片尺寸保持一致"],
    interactionAdvice: ["悬停时卡片平滑浮到前方", "点击可展开为完整视图", "拖拽可用物理感重排", "滚动时按顺序揭示卡片"],
    promptFragment: "创建卡片堆叠效果，卡片之间重叠 8-16px 并配合层次阴影。悬停时卡片抬升并移动到前层，使用 300ms 平滑过渡。",
    avoid: ["没有深度的平铺卡片", "缺少缓动的突兀过渡", "同一堆叠中卡片尺寸不一致", "让堆叠显得拥挤或杂乱"],
    legalNote: "该模式描述抽象卡片堆叠技术，不引用特定 UI 库、组件或第三方设计，实现为原创 CSS/React 指导。",
  },
  p4: {
    name: "双色层级",
    suitableFor: ["深色模式界面", "高端科技产品", "数据可视化", "开发者工具"],
    visualTraits: ["两色体系表达层级", "用明度而非色相表达深度", "细微渐变暗示空间", "交互元素保持高对比"],
    layoutAdvice: ["用明度变化定义 5-7 个层级", "只用一个强调色承载交互状态", "渐变背景克制使用", "保持足够文字对比度"],
    interactionAdvice: ["悬停时提高层级明度", "激活状态使用强调色", "禁用状态降到最低层级", "焦点环使用强调色"],
    promptFragment: "使用双色层级系统，只通过明度变化表达 elevation，不频繁改变色相。强调色只用于按钮、链接和焦点状态，背景渐变要细微。",
    avoid: ["多个强调色造成视觉噪音", "层级变化同时改变色相", "深色背景上堆叠刺眼亮色", "完全没有深度线索的统一背景"],
    legalNote: "该模式描述抽象双色层级原则，不引用具体品牌色、设计系统或商标配色，实现指导为原创。",
  },
  p5: {
    name: "色块章节",
    suitableFor: ["落地页叙事", "产品功能亮点", "服务说明", "关于页/故事页"],
    visualTraits: ["每个区块拥有独立背景色", "色彩形成视觉章节", "色块之间有过渡区域", "文字对比随背景调整"],
    layoutAdvice: ["每个 section 使用全宽背景色", "全页最多定义 3-5 个颜色", "确保每个色块内文字对比足够", "在区块交界处使用细微渐变"],
    interactionAdvice: ["滚动应像穿过不同章节", "吸顶元素需适配当前色块", "进度指示可跟随区块色彩", "避免区块之间颜色跳变太突兀"],
    promptFragment: "创建色块章节式页面，每个 section 使用不同背景色，全页最多 5 个主背景色。在色块之间加入柔和渐变过渡，并保证文字对比度。",
    avoid: ["使用过多背景色", "色块内文字对比不足", "区块交界过硬且无过渡", "相邻颜色互相冲突"],
    legalNote: "该模式描述抽象色块设计技术，不引用具体网站区块、品牌色或营销设计，实现指导为原创。",
  },
  p6: {
    name: "柔和渐变蒙层",
    suitableFor: ["首屏 Hero", "文字覆盖背景", "图片处理", "氛围型页面区块"],
    visualTraits: ["低透明度柔和渐变", "细腻色彩过渡", "提升覆盖文字可读性", "避免生硬色阶和断层"],
    layoutAdvice: ["使用低透明度线性或径向渐变", "把渐变作为已有背景的蒙层", "渐变方向顺应内容动线", "测试所有覆盖文字的可读性"],
    interactionAdvice: ["悬停时渐变不要剧烈变化", "前景内容始终保持清晰", "避免渐变抢走主体注意力", "视差移动幅度保持克制"],
    promptFragment: "为 Hero 或图片背景添加柔和渐变蒙层，透明度控制在 10-30%。使用与品牌相协调的多段渐变，并确保覆盖文字达到可读对比度。",
    avoid: ["高透明度渐变遮挡内容", "容易产生色带的生硬渐变", "与内容色彩冲突的渐变", "交互时大幅变化的渐变"],
    legalNote: "该模式描述抽象渐变蒙层技术，不引用具体渐变预设、配色工具或第三方实现。",
  },
  p7: {
    name: "字号对比",
    suitableFor: ["Hero 标题", "功能区块", "价格展示", "关键信息层级"],
    visualTraits: ["超大标题与正文形成强对比", "字重形成层级差异", "文字周围留有战略性空白", "一眼可读的视觉层级"],
    layoutAdvice: ["层级之间保持明显字号比例", "Hero 使用展示字号", "正文控制在舒适阅读范围", "行高保持松弛可读"],
    interactionAdvice: ["大标题悬停只做轻微缩放", "避免文字缩放造成布局破裂", "焦点状态清晰但不刺眼", "文字选中色匹配品牌强调色"],
    promptFragment: "建立强字号层级：标题使用 48-96px 的 display 字重，正文使用 16-18px 常规字重。层级之间至少保持 3:1 的尺寸比例。",
    avoid: ["所有文字尺寸接近导致无层级", "正文过大抢走标题注意力", "行高过紧导致拥挤", "全页面字重完全一致"],
    legalNote: "该模式描述抽象排版比例原则，不复制具体字体组合或排版系统，可使用系统字体或指定替代字体。",
  },
  p8: {
    name: "混合字体系",
    suitableFor: ["双语网站", "国际品牌", "创意作品集", "编辑型版面"],
    visualTraits: ["两种明确不同的字体体系", "不同字体服务不同内容角色", "不用边框也能区分层级", "通过颜色和字重统一整体"],
    layoutAdvice: ["展示标题可用衬线，正文使用无衬线", "标题和正文分工清晰", "匹配 x-height 保持视觉和谐", "最多使用两套字体"],
    interactionAdvice: ["悬停效果在不同文字体系上保持一致", "避免在同一句话中混用不同字体", "字体加载不能造成布局跳动", "焦点状态在两套字体中都可用"],
    promptFragment: "使用混合字体系：展示标题使用衬线或更具性格的 display 字体，正文使用 Inter 或系统无衬线。注意 x-height 近似，确保两套字体协调。",
    avoid: ["超过两套字体互相冲突", "同一元素内混用字体体系", "x-height 差异过大导致错位", "两套字体字重完全一致导致层级模糊"],
    legalNote: "该模式描述抽象混合排版原则，不复制具体字体授权、字厂设计或商标字体，可用开源字体作为替代。",
  },
  p9: {
    name: "磁吸交互",
    suitableFor: ["CTA 和按钮", "导航元素", "功能亮点", "游戏化体验"],
    visualTraits: ["元素轻微朝光标移动", "设置明确磁吸半径", "接近时带弹性物理感", "通过接近反馈增强可点击感"],
    layoutAdvice: ["为每个元素定义磁吸半径", "用 transform 移动，不改 position", "最大位移保持克制", "确保磁吸元素不会相互重叠"],
    interactionAdvice: ["移动要有机，不要机械", "使用弹性缓动", "触屏设备禁用磁吸", "离开后用同样物理感回到原点"],
    promptFragment: "实现磁吸按钮交互：当光标进入 80px 半径时，元素轻微朝光标方向移动，最大位移 10px。触屏设备禁用磁吸，改用轻微 scale 反馈。",
    avoid: ["线性机械移动", "元素直接跳到光标位置", "多个磁吸元素互相覆盖", "移动端磁吸造成混乱"],
    legalNote: "该模式描述抽象磁吸交互原则，不复制任何具体库、组件或第三方实现，代码指导为原创。",
  },
  p10: {
    name: "滚动揭示编排",
    suitableFor: ["叙事页面", "产品展示", "关于页区块", "引导流程"],
    visualTraits: ["元素随滚动进入视野时揭示", "错峰时间形成节奏", "淡入加上移更显克制", "由 Intersection Observer 触发"],
    layoutAdvice: ["可见阈值设为 20%", "同级元素设置错峰时间", "揭示距离控制在 30-50px", "构建滚动触发区块"],
    interactionAdvice: ["揭示使用淡入加位移，不用廉价缩放", "每个元素持续时间保持中等", "使用 ease-out 自然减速", "支持减少动画偏好"],
    promptFragment: "使用 Intersection Observer 实现滚动揭示编排。同级元素错峰 150ms，动画为 fadeInUp：透明度 0 到 1，translateY 40px 到 0，并尊重 reduced-motion 偏好。",
    avoid: ["无动画的突然出现", "廉价感强的缩放动画", "所有元素同时出现", "忽略用户的减少动画偏好"],
    legalNote: "该模式描述抽象滚动动画原则，不复制具体动画库、滚动库或第三方代码，使用原生 Intersection Observer 实现。",
  },
  p11: {
    name: "手势导航",
    suitableFor: ["移动优先体验", "作品集网站", "图片画廊", "叙事型界面"],
    visualTraits: ["滑动手势进行导航", "下拉刷新式交互", "带动量的滚动", "手势识别时有视觉反馈"],
    layoutAdvice: ["设置清晰滑动阈值", "明确手势方向", "用减速曲线制造动量", "提供可发现的手势提示"],
    interactionAdvice: ["滑动反馈延迟低", "边界处有橡皮筋效果", "吸附点使用弹性物理感", "同时支持触摸和触控板手势"],
    promptFragment: "实现横向滑动导航，滑动阈值 80px。加入动量滚动和减速曲线，吸附到 slide 时使用弹性过渡，并支持触摸滑动和触控板滚动。",
    avoid: ["手势过程中没有视觉反馈", "吸附点生硬或卡顿", "手势与页面滚动冲突", "忽略滑动方向约束"],
    legalNote: "该模式描述抽象手势导航原则，不引用具体手势库、移动框架或第三方实现，代码指导为原创。",
  },
  p12: {
    name: "微反馈循环",
    suitableFor: ["表单提交", "按钮操作", "开关切换", "所有改变状态的交互"],
    visualTraits: ["交互后立即给出视觉反馈", "细微动画确认动作", "异步操作带进度提示", "错误状态提供清晰恢复路径"],
    layoutAdvice: ["反馈延迟低于 100ms", "微动画控制在 50-200ms", "设计清晰的成功/错误/加载状态", "反馈可见但不抢戏"],
    interactionAdvice: ["点击后立即有视觉响应", "加载状态显示进度或骨架屏", "成功状态明确确认结果", "错误状态要提供恢复建议"],
    promptFragment: "为所有交互元素建立微反馈循环。点击时有轻微按压反馈；异步操作立即显示 loading；成功时短暂绿色确认；错误时给出边框、震动和恢复建议。",
    avoid: ["加载时没有任何反馈", "简单操作使用过长动画", "错误提示过快消失", "相似交互的反馈方式不一致"],
    legalNote: "该模式描述抽象微交互原则，不引用具体动画库、UI kit 或组件库，实现指导为原创 CSS/React。",
  },
};

const categoryLabels: Record<Locale, Record<string, string>> = {
  zh: {
    All: "全部",
    Layout: "布局",
    Color: "色彩",
    Typography: "排版",
    Interaction: "交互",
  },
  en: {
    All: "All",
    Layout: "Layout",
    Color: "Color",
    Typography: "Typography",
    Interaction: "Interaction",
  },
};

export function getPatternCategoryLabel(category: string, locale: Locale): string {
  return categoryLabels[locale]?.[category] ?? category;
}

export function localizePattern(pattern: DesignPattern, locale: Locale): DesignPattern {
  if (locale !== "zh") return pattern;
  const localized = zhPatternText[pattern.id];
  return localized ? { ...pattern, ...localized } : pattern;
}

export function localizePatterns(patterns: DesignPattern[], locale: Locale): DesignPattern[] {
  return patterns.map((pattern) => localizePattern(pattern, locale));
}

export function getPatternDisplayNameById(patternId: string, locale: Locale): string {
  const localized = locale === "zh" ? zhPatternText[patternId] : undefined;
  return localized?.name || patternId.toUpperCase();
}

export function getPatternLabels(locale: Locale) {
  return locale === "zh"
    ? {
        bestFor: "适合场景",
        suitableFor: "适合场景",
        visualTraits: "视觉特征",
        layoutAdvice: "布局建议",
        interactionAdvice: "交互建议",
        promptFragment: "提示词片段",
        preview: "模式预览",
        motionPreview: "动效预览",
        staticPreview: "静态预览",
        copy: "复制",
        avoid: "避坑提醒",
      }
    : {
        bestFor: "Best for",
        suitableFor: "Suitable for",
        visualTraits: "Visual Traits",
        layoutAdvice: "Layout Advice",
        interactionAdvice: "Interaction Advice",
        promptFragment: "Prompt Fragment",
        preview: "Pattern Preview",
        motionPreview: "Motion Preview",
        staticPreview: "Static Preview",
        copy: "Copy",
        avoid: "What to Avoid",
      };
}
