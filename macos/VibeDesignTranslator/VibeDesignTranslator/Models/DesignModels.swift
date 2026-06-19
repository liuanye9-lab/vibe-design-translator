import Foundation
import SwiftUI

enum DesignDirectionID: String, CaseIterable, Identifiable, Codable {
    case calmProfessional = "calm-professional"
    case softIntelligent = "soft-intelligent"
    case experimentalPremium = "experimental-premium"

    var id: String { rawValue }

    var title: String {
        switch self {
        case .calmProfessional:
            return "冷静专业型"
        case .softIntelligent:
            return "柔和智能型"
        case .experimentalPremium:
            return "实验高级型"
        }
    }

    var summary: String {
        switch self {
        case .calmProfessional:
            return "稳定、可信、有权威感。适合企业软件、金融服务、B2B SaaS 和专业咨询"
        case .softIntelligent:
            return "平易近人且前沿。适合 AI 产品、开发者工具、效率应用和现代科技公司"
        case .experimentalPremium:
            return "大胆、独特、记忆点强。适合创意机构、奢侈品牌、时尚和创新产品"
        }
    }

    var accent: Color {
        switch self {
        case .calmProfessional: .blue
        case .softIntelligent: .purple
        case .experimentalPremium: .pink
        }
    }
}

struct DesignBrief: Codable, Equatable {
    var productName = "AI 设计助手"
    var productCategory = "SaaS 平台"
    var targetUsers = "前端工程师和产品经理"
    var pageGoal = "根据想法精准给出前端设计方向"
    var firstImpression = "智能但专业"
    var businessPriority = "提高转化和信任"
    var visualIntensity = "balanced"
    var contentDensity = "standard"
    var mainCTA = "生成方向"
}

struct DirectionRecommendation: Identifiable, Codable, Equatable {
    var id: String { directionId }
    let directionId: String
    let score: Int
    let reason: String
    let confidence: String
    let keySignals: [String]
    let materialPatternIds: [String]
    var materialEvidence: [String]? = nil
    var motionDirection: [String]? = nil
    var frontendBlueprint: [String]? = nil
    var questionsToResolve: [String]? = nil
    let blueprint: FrontendBlueprint?

    var direction: DesignDirectionID? {
        DesignDirectionID(rawValue: directionId)
    }

    var evidenceItems: [String] { materialEvidence ?? [] }
    var motionItems: [String] { motionDirection ?? [] }
    var frontendItems: [String] { frontendBlueprint ?? [] }
    var questionItems: [String] { questionsToResolve ?? [] }
}

struct FrontendBlueprint: Codable, Equatable {
    let positioning: String
    let layoutStrategy: String
    let visualSystem: String
    let motionSystem: String
    let componentSystem: String
    let pageSections: [BlueprintSection]
    let colorTokens: [String]
    let typographyRules: [String]
    let implementationPrompt: String
}

struct BlueprintSection: Identifiable, Codable, Equatable {
    var id: String { name }
    let name: String
    let goal: String
    let layout: String
    let interaction: String
}

extension FrontendBlueprint {
    func markdown(title: String) -> String {
        var lines: [String] = [
            "# \(title) 前端执行蓝图",
            "",
            "## 设计定位",
            positioning,
            "",
            "## 布局策略",
            layoutStrategy,
            "",
            "## 视觉系统",
            visualSystem,
            "",
            "## 动效系统",
            motionSystem,
            "",
            "## 组件系统",
            componentSystem,
            "",
            "## 页面结构"
        ]

        if pageSections.isEmpty {
            lines.append("- 未提供")
        } else {
            for section in pageSections {
                lines.append("- \(section.name)：\(section.goal)")
                lines.append("  - 布局：\(section.layout)")
                lines.append("  - 交互：\(section.interaction)")
            }
        }

        lines.append("")
        lines.append("## 颜色 Token")
        lines.append(contentsOf: colorTokens.map { "- \($0)" })
        lines.append("")
        lines.append("## 排版规则")
        lines.append(contentsOf: typographyRules.map { "- \($0)" })
        lines.append("")
        lines.append("## 实现提示词")
        lines.append(implementationPrompt)

        return lines.joined(separator: "\n")
    }
}

struct DesignPattern: Identifiable, Equatable {
    let id: String
    let name: String
    let category: String
    let suitableFor: [String]
    let traits: [String]
}

enum MaterialMediaKind: String, CaseIterable, Identifiable {
    case all = "全部媒介"
    case cssMotion = "CSS 动效"
    case animatedGIF = "动图思路"
    case video = "视频/录屏"
    case staticImage = "静态图片"
    case referenceLink = "参考链接"

    var id: String { rawValue }
}

struct MaterialAsset: Identifiable, Equatable {
    let id: String
    let patternId: String
    let title: String
    let source: String
    let sourceSignal: String
    let mediaKind: MaterialMediaKind
    let motionSpec: String
    let useWhen: [String]
    let designSignals: [String]
    let frontendNotes: [String]
}

let designPatterns: [DesignPattern] = [
    .init(id: "p1", name: "有意留白", category: "布局", suitableFor: ["高端产品页", "SaaS 落地页"], traits: ["每屏一个视觉焦点", "负空间参与叙事"]),
    .init(id: "p2", name: "非对称网格", category: "布局", suitableFor: ["作品集", "编辑型内容"], traits: ["错位对齐", "动态视觉层级"]),
    .init(id: "p3", name: "卡片堆叠", category: "布局", suitableFor: ["功能展示", "多步骤流程"], traits: ["层叠深度", "悬停揭示"]),
    .init(id: "p4", name: "双色层级", category: "色彩", suitableFor: ["开发者工具", "深色模式"], traits: ["用明度表达深度", "强调色克制"]),
    .init(id: "p5", name: "色块章节", category: "色彩", suitableFor: ["落地页叙事", "服务说明"], traits: ["章节化背景", "滚动节奏"]),
    .init(id: "p6", name: "柔和渐变蒙层", category: "色彩", suitableFor: ["首屏 Hero", "图片背景"], traits: ["提升可读性", "柔和过渡"]),
    .init(id: "p7", name: "字号对比", category: "排版", suitableFor: ["Hero 标题", "价格展示"], traits: ["强层级", "一眼可读"]),
    .init(id: "p8", name: "混合字体系", category: "排版", suitableFor: ["双语网站", "国际品牌"], traits: ["角色分工", "排版个性"]),
    .init(id: "p9", name: "磁吸交互", category: "交互", suitableFor: ["CTA", "导航元素"], traits: ["接近反馈", "弹性物理感"]),
    .init(id: "p10", name: "滚动揭示编排", category: "交互", suitableFor: ["叙事页面", "产品展示"], traits: ["错峰揭示", "滚动节奏"]),
    .init(id: "p11", name: "手势导航", category: "交互", suitableFor: ["移动优先", "画廊"], traits: ["滑动导航", "动量反馈"]),
    .init(id: "p12", name: "微反馈循环", category: "交互", suitableFor: ["按钮操作", "表单提交"], traits: ["即时反馈", "状态确认"])
]

let materialAssets: [MaterialAsset] = [
    .init(
        id: "m-space-scroll",
        patternId: "p1",
        title: "留白驱动的滚动呼吸感",
        source: "Awwwards",
        sourceSignal: "高级视觉完成度",
        mediaKind: .cssMotion,
        motionSpec: "大块留白配合 280ms fade-up，滚动进入时只移动 24-40px，不做夸张缩放。",
        useWhen: ["高客单价产品", "作品集", "需要建立信任的 SaaS 首屏"],
        designSignals: ["单视口单焦点", "大标题低噪音", "区块之间形成停顿"],
        frontendNotes: ["IntersectionObserver", "section padding 72-120px", "优先控制 max-width"]
    ),
    .init(
        id: "m-asymmetric-rail",
        patternId: "p2",
        title: "非对称素材轨道",
        source: "Godly",
        sourceSignal: "新鲜网页灵感",
        mediaKind: .animatedGIF,
        motionSpec: "左右错位的图片或组件轨道缓慢漂移，hover 时局部暂停并显示说明。",
        useWhen: ["创意机构", "AI 产品展示", "作品集案例墙"],
        designSignals: ["错位网格", "图片尺寸有主次", "滚动时保持版式张力"],
        frontendNotes: ["grid-template-areas", "aspect-ratio 固定容器", "hover pause animation"]
    ),
    .init(
        id: "m-card-stack-demo",
        patternId: "p3",
        title: "可展开的卡片堆叠演示",
        source: "v0 Templates",
        sourceSignal: "可执行组件结构",
        mediaKind: .cssMotion,
        motionSpec: "卡片 hover 上浮 6px，选中后展开为详情，后台卡片保持 8-12px 可见边缘。",
        useWhen: ["功能对比", "多方案选择", "案例摘要"],
        designSignals: ["层叠关系", "前后景深", "点击后状态明确"],
        frontendNotes: ["layout animation", "aria-expanded", "移动端改为纵向 accordion"]
    ),
    .init(
        id: "m-duotone-console",
        patternId: "p4",
        title: "双色层级控制台",
        source: "Mobbin",
        sourceSignal: "真实 App 截图库",
        mediaKind: .video,
        motionSpec: "层级变化只改变明度，选中/聚焦用单一强调色，数据刷新时做轻微 shimmer。",
        useWhen: ["开发者工具", "AI 工作台", "数据面板"],
        designSignals: ["层级靠明度", "强调色克制", "状态反馈一致"],
        frontendNotes: ["elevation token", "focus-visible 明确", "loading skeleton 不改变布局"]
    ),
    .init(
        id: "m-color-chapters",
        patternId: "p5",
        title: "色块章节叙事",
        source: "Huemint",
        sourceSignal: "品牌配色关系",
        mediaKind: .staticImage,
        motionSpec: "章节切换时背景色通过 420ms 低对比渐变过渡，吸顶导航同步切换当前章节标记。",
        useWhen: ["品牌故事", "功能分层叙事", "服务介绍页"],
        designSignals: ["章节色彩有秩序", "相邻颜色不过度跳变", "文字对比稳定"],
        frontendNotes: ["section color tokens", "sticky progress nav", "contrast token 检查"]
    ),
    .init(
        id: "m-muted-gradient-media",
        patternId: "p6",
        title: "柔和渐变媒体层",
        source: "Godly",
        sourceSignal: "新鲜网页灵感",
        mediaKind: .animatedGIF,
        motionSpec: "渐变背景以 8-12s 慢速移动，前景内容不跟随漂移，避免廉价炫光。",
        useWhen: ["AI 产品首屏", "视觉化能力解释", "图片上叠文字"],
        designSignals: ["低透明度渐变", "文字可读", "不抢主体"],
        frontendNotes: ["background-size 160%", "prefers-reduced-motion", "叠层透明度 10-24%"]
    ),
    .init(
        id: "m-type-scale",
        patternId: "p7",
        title: "字号对比节奏",
        source: "Awwwards",
        sourceSignal: "高级视觉完成度",
        mediaKind: .staticImage,
        motionSpec: "大标题入场只做 opacity 和 16px 位移，避免文字缩放造成 AI 模板味。",
        useWhen: ["强主张首屏", "价格锚点", "关键卖点"],
        designSignals: ["标题和正文差距明确", "字重层级清楚", "周围有留白"],
        frontendNotes: ["clamp 控制标题", "按钮文字单独定义 size", "避免负字距"]
    ),
    .init(
        id: "m-bilingual-type",
        patternId: "p8",
        title: "中英混排层级",
        source: "Mobbin",
        sourceSignal: "真实 App 截图库",
        mediaKind: .referenceLink,
        motionSpec: "语言切换时保持布局尺寸稳定，只做 160ms opacity 过渡。",
        useWhen: ["国际品牌", "双语产品", "面向海外用户的中文团队"],
        designSignals: ["中英文角色分工", "行高匹配", "切换不跳版"],
        frontendNotes: ["locale copy 长度预算", "font fallback 明确", "按钮宽度使用 min-width"]
    ),
    .init(
        id: "m-magnetic-cta",
        patternId: "p9",
        title: "磁吸 CTA 微交互",
        source: "Pageflows",
        sourceSignal: "流程拆解",
        mediaKind: .cssMotion,
        motionSpec: "桌面端鼠标接近时最大位移 8px，离开用 spring 回弹；触屏只保留 press feedback。",
        useWhen: ["主 CTA", "导航高亮", "可探索的案例入口"],
        designSignals: ["可点击感增强", "反馈不打扰阅读", "移动端降级"],
        frontendNotes: ["pointer fine 才启用", "transform 不影响布局", "focus state 不依赖 hover"]
    ),
    .init(
        id: "m-scroll-reveal-system",
        patternId: "p10",
        title: "滚动揭示编排系统",
        source: "Pageflows",
        sourceSignal: "流程拆解",
        mediaKind: .animatedGIF,
        motionSpec: "同组元素错峰 80-140ms，图片先出现，文字随后进入，CTA 最后确认。",
        useWhen: ["长落地页", "产品说明", "案例故事"],
        designSignals: ["先视觉后文字", "错峰节奏", "减少动画偏好可关闭"],
        frontendNotes: ["data-reveal delay token", "server render 初始可读", "mobile 降低位移距离"]
    ),
    .init(
        id: "m-gesture-gallery",
        patternId: "p11",
        title: "手势素材画廊",
        source: "Mobbin",
        sourceSignal: "真实 App 截图库",
        mediaKind: .video,
        motionSpec: "横向滑动带惯性，卡片吸附到中心，边缘保留下一张预览。",
        useWhen: ["移动优先展示", "作品集图库", "案例轮播"],
        designSignals: ["滑动反馈清晰", "边界有阻尼", "有可发现的控制"],
        frontendNotes: ["scroll-snap", "touch-action pan-y", "键盘左右键支持"]
    ),
    .init(
        id: "m-feedback-loop",
        patternId: "p12",
        title: "异步反馈闭环",
        source: "Pageflows",
        sourceSignal: "流程拆解",
        mediaKind: .cssMotion,
        motionSpec: "点击后 100ms 内进入 loading，成功用 600ms check reveal，失败保留恢复入口。",
        useWhen: ["AI 生成", "上传分析", "表单提交", "保存设置"],
        designSignals: ["即时响应", "进度可见", "错误可恢复"],
        frontendNotes: ["idle/loading/success/error 四态", "disable double submit", "错误文案绑定 next action"]
    )
]

func materialAsset(for patternId: String) -> MaterialAsset? {
    materialAssets.first { $0.patternId == patternId }
}

func materialAssets(for patternIds: [String]) -> [MaterialAsset] {
    let idSet = Set(patternIds)
    return materialAssets.filter { idSet.contains($0.patternId) }
}

extension Array where Element == DesignPattern {
    func names(for ids: [String]) -> [String] {
        ids.compactMap { id in first(where: { $0.id == id })?.name }
    }
}
