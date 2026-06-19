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
    let blueprint: FrontendBlueprint?

    var direction: DesignDirectionID? {
        DesignDirectionID(rawValue: directionId)
    }
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

extension Array where Element == DesignPattern {
    func names(for ids: [String]) -> [String] {
        ids.compactMap { id in first(where: { $0.id == id })?.name }
    }
}
