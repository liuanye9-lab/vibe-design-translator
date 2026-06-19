import AppKit
import Combine
import Foundation
import UniformTypeIdentifiers

@MainActor
final class AppViewModel: ObservableObject {
    @Published var brief = DesignBrief()
    @Published var recommendations: [DirectionRecommendation] = []
    @Published var selectedDirectionID: DesignDirectionID = .softIntelligent
    @Published var selectedPatternIDs: [String] = ["p1", "p6", "p9", "p12"]
    @Published var isLoading = false
    @Published var isTestingConnection = false
    @Published var statusMessage = "准备根据想法生成设计方向"
    @Published var lastProvider = "未连接"
    @Published var errorMessage: String?
    @Published var settingsMessage: String?

    @Published var apiBase: String
    @Published var textModel: String
    @Published var imageModel: String
    @Published var videoModel: String
    @Published var apiKey: String

    init() {
        let settings = SettingsStore.load()
        apiBase = settings.apiBase
        textModel = settings.textModel
        imageModel = settings.imageModel
        videoModel = settings.videoModel
        apiKey = settings.apiKey

        if let session = SessionStore.load() {
            brief = session.brief
            recommendations = session.recommendations
            selectedDirectionID = session.selectedDirectionID
            selectedPatternIDs = session.selectedPatternIDs
            statusMessage = session.statusMessage
            lastProvider = session.lastProvider
        }
    }

    var selectedDirection: DesignDirectionID {
        selectedDirectionID
    }

    var selectedRecommendation: DirectionRecommendation? {
        recommendations.first { recommendation in
            recommendation.direction == selectedDirectionID
        }
    }

    var selectedBlueprint: FrontendBlueprint? {
        selectedRecommendation?.blueprint
    }

    var selectedDirectionTitle: String {
        selectedRecommendation?.direction?.title ?? selectedDirectionID.title
    }

    func recommendDirections() async {
        isLoading = true
        errorMessage = nil
        statusMessage = "正在调用 Agnes 分析 brief..."
        defer { isLoading = false }

        do {
            let service = AgnesDirectionService(apiBase: apiBase, apiKey: apiKey, model: textModel)
            let result = try await service.recommendDirections(for: brief)
            recommendations = result.sorted { $0.score > $1.score }
            if let top = recommendations.first, let direction = top.direction {
                selectedDirectionID = direction
                selectedPatternIDs = top.materialPatternIds
                statusMessage = "Agnes 已推荐 \(direction.title)，置信度 \(top.score)/100"
                lastProvider = "Agnes · \(textModel)"
                saveSession()
            } else {
                statusMessage = "Agnes 返回了结果，但没有可用方向"
                lastProvider = "Agnes · 格式异常"
                saveSession()
            }
        } catch {
            errorMessage = error.localizedDescription
            lastProvider = "本地预览"
            statusMessage = "未调用真实模型，当前显示本地预览"
            recommendations = localFallbackRecommendations()
            if let top = recommendations.first, let direction = top.direction {
                selectedDirectionID = direction
                selectedPatternIDs = top.materialPatternIds
            }
            saveSession()
        }
    }

    func select(_ recommendation: DirectionRecommendation) {
        if let direction = recommendation.direction {
            selectedDirectionID = direction
            selectedPatternIDs = recommendation.materialPatternIds
            saveSession()
        }
    }

    func saveSettings() {
        do {
            try SettingsStore.save(AppSettings(
                apiBase: apiBase,
                textModel: textModel,
                imageModel: imageModel,
                videoModel: videoModel,
                apiKey: apiKey
            ))
            settingsMessage = "设置已保存到本机，API Key 已进入 Keychain"
            errorMessage = nil
        } catch {
            settingsMessage = nil
            errorMessage = error.localizedDescription
        }
    }

    func testAgnesConnection() async {
        isTestingConnection = true
        settingsMessage = nil
        errorMessage = nil
        defer { isTestingConnection = false }

        do {
            let service = AgnesDirectionService(apiBase: apiBase, apiKey: apiKey, model: textModel)
            let response = try await service.testConnection()
            settingsMessage = "Agnes 连接正常：\(response)"
            lastProvider = "Agnes · \(textModel)"
        } catch {
            settingsMessage = nil
            errorMessage = error.localizedDescription
        }
    }

    func clearSession() {
        brief = DesignBrief()
        recommendations = []
        selectedDirectionID = .softIntelligent
        selectedPatternIDs = ["p1", "p6", "p9", "p12"]
        statusMessage = "准备根据想法生成设计方向"
        lastProvider = "未连接"
        errorMessage = nil
        settingsMessage = nil
        SessionStore.clear()
    }

    func copySelectedBlueprint() {
        guard let markdown = selectedBlueprint?.markdown(title: selectedDirectionTitle) else {
            statusMessage = "当前没有可复制的蓝图"
            return
        }
        NSPasteboard.general.clearContents()
        NSPasteboard.general.setString(markdown, forType: .string)
        statusMessage = "已复制当前前端执行蓝图"
    }

    func copySelectedPrompt() {
        guard let prompt = selectedBlueprint?.implementationPrompt else {
            statusMessage = "当前没有可复制的实现提示词"
            return
        }
        NSPasteboard.general.clearContents()
        NSPasteboard.general.setString(prompt, forType: .string)
        statusMessage = "已复制当前实现提示词"
    }

    func exportSelectedBlueprint() {
        guard let blueprint = selectedBlueprint else {
            statusMessage = "当前没有可导出的蓝图"
            return
        }

        let panel = NSSavePanel()
        panel.title = "导出前端执行蓝图"
        panel.nameFieldStringValue = defaultExportFilename()
        panel.canCreateDirectories = true
        panel.allowedContentTypes = [UTType(filenameExtension: "md") ?? .plainText]

        guard panel.runModal() == .OK, let url = panel.url else {
            return
        }

        do {
            try blueprint.markdown(title: selectedDirectionTitle).write(to: url, atomically: true, encoding: .utf8)
            statusMessage = "已导出：\(url.lastPathComponent)"
        } catch {
            errorMessage = error.localizedDescription
            statusMessage = "蓝图导出失败"
        }
    }

    private func saveSession() {
        SessionStore.save(AppSession(
            brief: brief,
            recommendations: recommendations,
            selectedDirectionID: selectedDirectionID,
            selectedPatternIDs: selectedPatternIDs,
            statusMessage: statusMessage,
            lastProvider: lastProvider
        ))
    }

    private func defaultExportFilename() -> String {
        let invalidCharacters = CharacterSet(charactersIn: "/\\?%*|\"<>:")
        let filename = selectedDirectionTitle
            .components(separatedBy: invalidCharacters)
            .joined(separator: "-")
            .trimmingCharacters(in: .whitespacesAndNewlines)

        if filename.isEmpty {
            return "frontend-blueprint.md"
        }
        return "\(filename)-frontend-blueprint.md"
    }

    private func localFallbackRecommendations() -> [DirectionRecommendation] {
        [
            .init(
                directionId: DesignDirectionID.softIntelligent.rawValue,
                score: 78,
                reason: "本地预览：AI / 开发者工具通常需要兼顾智能感、可信度和易理解",
                confidence: "medium",
                keySignals: [brief.productCategory, brief.firstImpression, brief.targetUsers],
                materialPatternIds: ["p1", "p6", "p9", "p12"],
                blueprint: .init(
                    positioning: "用柔和智能感降低 AI 产品的理解成本，同时保留专业可信的执行感",
                    layoutStrategy: "首屏聚焦一个明确结果承诺，下方用卡片堆叠展示工作流、案例和能力边界",
                    visualSystem: "浅色背景、低饱和渐变、蓝紫强调色和半透明分层，避免过度科技感",
                    motionSystem: "使用渐变缓慢流动、CTA 磁吸、结果卡片微反馈，动效只服务状态确认",
                    componentSystem: "需要 Brief 输入区、方向推荐卡、素材模式卡、结果蓝图面板和设置面板",
                    pageSections: [
                        .init(name: "Hero", goal: "让用户立刻理解产品能把想法变成设计方向", layout: "左侧输入承诺，右侧展示生成结果摘要", interaction: "CTA 悬停磁吸，背景渐变轻微流动"),
                        .init(name: "方向结果", goal: "解释推荐方向和判断依据", layout: "三列方向卡加右侧详情", interaction: "点击方向后高亮相关素材"),
                        .init(name: "素材库", goal: "把抽象建议落到可复用模式", layout: "可筛选动效卡片网格", interaction: "动效开关控制所有预览")
                    ],
                    colorTokens: ["#0F172A 主文字", "#2563EB 主行动", "#A78BFA 智能强调", "#F8FAFC 页面背景"],
                    typographyRules: ["Hero 40-56px 半粗，短句优先", "正文 16-18px，行高 1.6", "标签 12-13px，用于信号和素材"],
                    implementationPrompt: "创建一个中文 AI 设计方向工具界面：左侧输入产品想法，右侧输出方向推荐、素材模式和执行蓝图；使用柔和蓝紫渐变、半透明面板、磁吸 CTA 和结果卡片微反馈。"
                )
            ),
            .init(
                directionId: DesignDirectionID.calmProfessional.rawValue,
                score: 64,
                reason: "本地预览：如果优先建立信任和企业级稳定感，可使用冷静专业型",
                confidence: "medium",
                keySignals: [brief.businessPriority],
                materialPatternIds: ["p1", "p4", "p7"],
                blueprint: .init(
                    positioning: "用稳定、清晰、低噪音的信息架构建立企业级信任",
                    layoutStrategy: "采用窄内容宽度、明确分区和强标题层级，让用户快速扫描价值与证据",
                    visualSystem: "深蓝灰文字、克制蓝色强调、大面积留白和清晰边界",
                    motionSystem: "只在操作确认、图表进入和 CTA 状态上使用短动效",
                    componentSystem: "需要价值声明、功能证据、案例指标、FAQ 和主行动按钮",
                    pageSections: [
                        .init(name: "Hero", goal: "建立可信和专业第一印象", layout: "左标题右指标或产品截图", interaction: "CTA 使用短促状态反馈"),
                        .init(name: "证据区", goal: "证明产品适合严肃业务场景", layout: "指标卡、客户证据和能力列表", interaction: "滚动进入时轻微淡入")
                    ],
                    colorTokens: ["#111827 主文字", "#1D4ED8 主行动", "#E5E7EB 分割线", "#FFFFFF 面板"],
                    typographyRules: ["标题 36-48px，重量 650", "正文 16px，避免长段落", "数字指标使用等宽或半粗"],
                    implementationPrompt: "创建一个企业级中文 SaaS 落地页：首屏强调可信承诺和业务结果，下方展示证据、功能和 CTA；使用冷静蓝灰配色、大留白、强层级标题和克制微动效。"
                )
            )
        ]
    }
}
