import Foundation

@MainActor
final class AppViewModel: ObservableObject {
    @Published var brief = DesignBrief()
    @Published var recommendations: [DirectionRecommendation] = []
    @Published var selectedDirectionID: DesignDirectionID = .softIntelligent
    @Published var selectedPatternIDs: [String] = ["p1", "p6", "p9", "p12"]
    @Published var isLoading = false
    @Published var statusMessage = "准备根据想法生成设计方向"
    @Published var lastProvider = "未连接"
    @Published var errorMessage: String?

    @Published var apiBase = "https://apihub.agnes-ai.com/v1"
    @Published var textModel = "Agnes-2.0-Flash"
    @Published var apiKey = ProcessInfo.processInfo.environment["AGNES_API_KEY"] ?? ""

    var selectedDirection: DesignDirectionID {
        selectedDirectionID
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
            } else {
                statusMessage = "Agnes 返回了结果，但没有可用方向"
                lastProvider = "Agnes · 格式异常"
            }
        } catch {
            errorMessage = error.localizedDescription
            lastProvider = "本地预览"
            statusMessage = "未调用真实模型，当前显示本地预览"
            recommendations = localFallbackRecommendations()
        }
    }

    func select(_ recommendation: DirectionRecommendation) {
        if let direction = recommendation.direction {
            selectedDirectionID = direction
            selectedPatternIDs = recommendation.materialPatternIds
        }
    }

    private func localFallbackRecommendations() -> [DirectionRecommendation] {
        [
            .init(
                directionId: DesignDirectionID.softIntelligent.rawValue,
                score: 78,
                reason: "本地预览：AI / 开发者工具通常需要兼顾智能感、可信度和易理解",
                confidence: "medium",
                keySignals: [brief.productCategory, brief.firstImpression, brief.targetUsers],
                materialPatternIds: ["p1", "p6", "p9", "p12"]
            ),
            .init(
                directionId: DesignDirectionID.calmProfessional.rawValue,
                score: 64,
                reason: "本地预览：如果优先建立信任和企业级稳定感，可使用冷静专业型",
                confidence: "medium",
                keySignals: [brief.businessPriority],
                materialPatternIds: ["p1", "p4", "p7"]
            )
        ]
    }
}
