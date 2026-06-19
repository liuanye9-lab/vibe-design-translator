import Foundation

enum AgnesDirectionError: LocalizedError {
    case missingAPIKey
    case emptyResponse
    case invalidResponse
    case requestFailed(String)

    var errorDescription: String? {
        switch self {
        case .missingAPIKey:
            "请先在设置里填写 Agnes API Key，或通过环境变量 AGNES_API_KEY 提供"
        case .emptyResponse:
            "模型没有返回内容"
        case .invalidResponse:
            "模型返回格式无法解析"
        case .requestFailed(let message):
            message
        }
    }
}

struct AgnesDirectionService {
    var apiBase: String
    var apiKey: String
    var model: String

    func recommendDirections(for brief: DesignBrief) async throws -> [DirectionRecommendation] {
        let key = apiKey.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !key.isEmpty else { throw AgnesDirectionError.missingAPIKey }

        let url = URL(string: apiBase.trimmingCharacters(in: .whitespacesAndNewlines) + "/chat/completions")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer \(key)", forHTTPHeaderField: "Authorization")
        request.httpBody = try JSONEncoder().encode(ChatRequest(
            model: model,
            messages: [
                .init(role: "system", content: systemPrompt),
                .init(role: "user", content: userPrompt(for: brief))
            ],
            temperature: 0.25,
            max_tokens: 1800
        ))

        let (data, response) = try await URLSession.shared.data(for: request)
        if let http = response as? HTTPURLResponse, !(200..<300).contains(http.statusCode) {
            let body = String(data: data, encoding: .utf8) ?? "Unknown error"
            throw AgnesDirectionError.requestFailed("Agnes API \(http.statusCode): \(body)")
        }

        let decoded = try JSONDecoder().decode(ChatResponse.self, from: data)
        guard let content = decoded.choices.first?.message.content, !content.isEmpty else {
            throw AgnesDirectionError.emptyResponse
        }

        return try parseRecommendations(from: content)
    }

    private var systemPrompt: String {
        """
        你是资深前端设计方向 Agent。根据用户想法，推荐最适合的前端设计方向。
        只允许从三个方向中选择：
        - calm-professional
        - soft-intelligent
        - experimental-premium

        可引用素材模式：p1 有意留白, p2 非对称网格, p3 卡片堆叠, p4 双色层级, p5 色块章节, p6 柔和渐变蒙层, p7 字号对比, p8 混合字体系, p9 磁吸交互, p10 滚动揭示编排, p11 手势导航, p12 微反馈循环

        返回严格 JSON 数组，不要 markdown：
        [{"directionId":"soft-intelligent","score":92,"reason":"具体理由","confidence":"high","keySignals":["信号"],"materialPatternIds":["p1","p6"]}]
        """
    }

    private func userPrompt(for brief: DesignBrief) -> String {
        """
        产品：\(brief.productName)
        类别：\(brief.productCategory)
        目标用户：\(brief.targetUsers)
        页面目标：\(brief.pageGoal)
        第一印象：\(brief.firstImpression)
        业务优先级：\(brief.businessPriority)
        视觉强度：\(brief.visualIntensity)
        内容密度：\(brief.contentDensity)
        主 CTA：\(brief.mainCTA)
        """
    }

    private func parseRecommendations(from content: String) throws -> [DirectionRecommendation] {
        let cleaned = content
            .replacingOccurrences(of: "```json", with: "")
            .replacingOccurrences(of: "```", with: "")
            .trimmingCharacters(in: .whitespacesAndNewlines)

        if let data = extractJSONArrayString(from: cleaned).data(using: .utf8),
           let parsed = try? JSONDecoder().decode([DirectionRecommendation].self, from: data) {
            return parsed
        }

        throw AgnesDirectionError.invalidResponse
    }

    private func extractJSONArrayString(from text: String) -> String {
        guard let start = text.firstIndex(of: "[") else { return text }
        let sliced = String(text[start...])
        if let end = sliced.lastIndex(of: "]") {
            return String(sliced[...end])
        }
        return sliced + "]"
    }
}

private struct ChatRequest: Encodable {
    let model: String
    let messages: [ChatMessage]
    let temperature: Double
    let max_tokens: Int
}

private struct ChatMessage: Codable {
    let role: String
    let content: String
}

private struct ChatResponse: Decodable {
    let choices: [Choice]

    struct Choice: Decodable {
        let message: ChatMessage
    }
}
