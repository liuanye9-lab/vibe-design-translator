import Foundation

enum AgnesDirectionError: LocalizedError {
    case missingAPIKey
    case invalidAPIBase
    case emptyResponse
    case invalidResponse
    case requestFailed(String)

    var errorDescription: String? {
        switch self {
        case .missingAPIKey:
            return "请先在设置里填写 Agnes API Key，或通过环境变量 AGNES_API_KEY 提供"
        case .invalidAPIBase:
            return "Agnes API Base 不是有效 URL"
        case .emptyResponse:
            return "模型没有返回内容"
        case .invalidResponse:
            return "模型返回格式无法解析"
        case .requestFailed(let message):
            return message
        }
    }
}

struct AgnesDirectionService {
    var apiBase: String
    var apiKey: String
    var model: String

    func testConnection() async throws -> String {
        let request = try makeChatRequest(
            messages: [
                .init(role: "system", content: "你是 API 连通性测试助手。只返回一句中文短句。"),
                .init(role: "user", content: "请回复：连接正常")
            ],
            temperature: 0,
            maxTokens: 32
        )

        let data = try await send(request)
        let decoded = try JSONDecoder().decode(ChatResponse.self, from: data)
        guard let content = decoded.choices.first?.message.content.trimmingCharacters(in: .whitespacesAndNewlines),
              !content.isEmpty else {
            throw AgnesDirectionError.emptyResponse
        }
        return content
    }

    func recommendDirections(for brief: DesignBrief) async throws -> [DirectionRecommendation] {
        let request = try makeChatRequest(
            messages: [
                .init(role: "system", content: systemPrompt),
                .init(role: "user", content: userPrompt(for: brief))
            ],
            temperature: 0.25,
            maxTokens: 3200
        )

        let data = try await send(request)
        let decoded = try JSONDecoder().decode(ChatResponse.self, from: data)
        guard let content = decoded.choices.first?.message.content, !content.isEmpty else {
            throw AgnesDirectionError.emptyResponse
        }

        return try parseRecommendations(from: content)
    }

    private func makeChatRequest(messages: [ChatMessage], temperature: Double, maxTokens: Int) throws -> URLRequest {
        let key = apiKey.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !key.isEmpty else { throw AgnesDirectionError.missingAPIKey }

        let cleanBase = apiBase
            .trimmingCharacters(in: .whitespacesAndNewlines)
            .trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        guard let url = URL(string: cleanBase + "/chat/completions") else {
            throw AgnesDirectionError.invalidAPIBase
        }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.timeoutInterval = 30
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer \(key)", forHTTPHeaderField: "Authorization")
        request.httpBody = try JSONEncoder().encode(ChatRequest(
            model: model,
            messages: messages,
            temperature: temperature,
            max_tokens: maxTokens
        ))
        return request
    }

    private func send(_ request: URLRequest) async throws -> Data {
        let (data, response) = try await URLSession.shared.data(for: request)
        if let http = response as? HTTPURLResponse, !(200..<300).contains(http.statusCode) {
            let body = String(data: data, encoding: .utf8) ?? "Unknown error"
            throw AgnesDirectionError.requestFailed("Agnes API \(http.statusCode): \(body)")
        }
        return data
    }

    private var systemPrompt: String {
        """
        你是资深前端设计方向 Agent，不是聊天助手。你的任务是把模糊产品想法转成可执行的前端设计方向。
        只允许从三个方向中选择：
        - calm-professional
        - soft-intelligent
        - experimental-premium

        可引用素材模式：p1 有意留白, p2 非对称网格, p3 卡片堆叠, p4 双色层级, p5 色块章节, p6 柔和渐变蒙层, p7 字号对比, p8 混合字体系, p9 磁吸交互, p10 滚动揭示编排, p11 手势导航, p12 微反馈循环

        输出必须精准、可落地，避免泛泛而谈。每个推荐都必须包含：
        - 为什么这个方向适合这个产品
        - 应该采用哪些素材库模式
        - 前端页面应该如何组织结构、视觉、动效和组件
        - 可以直接交给前端或设计 Agent 继续生成页面的 implementationPrompt

        返回严格 JSON，不要 markdown。可以返回数组，也可以返回 {"recommendations": [...]}。
        Schema:
        [{
          "directionId": "soft-intelligent",
          "score": 92,
          "reason": "具体理由",
          "confidence": "high",
          "keySignals": ["从用户 brief 提取的判断信号"],
          "materialPatternIds": ["p1","p6","p9"],
          "blueprint": {
            "positioning": "一句话定义设计定位",
            "layoutStrategy": "页面整体布局策略",
            "visualSystem": "色彩、材质、层级和图像策略",
            "motionSystem": "动效节奏、触发方式和克制边界",
            "componentSystem": "需要的核心组件和状态",
            "pageSections": [
              {"name":"Hero","goal":"这一屏解决什么问题","layout":"布局描述","interaction":"交互或动效"}
            ],
            "colorTokens": ["#0F172A 主文字", "#3B82F6 主行动"],
            "typographyRules": ["Hero 40-56px 半粗", "正文 16-18px"],
            "implementationPrompt": "给前端生成器的中文实现提示词"
          }
        }]
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

        if let data = extractJSONPayloadString(from: cleaned).data(using: .utf8),
           let parsed = try? JSONDecoder().decode([DirectionRecommendation].self, from: data) {
            return parsed
        }

        if let data = extractJSONPayloadString(from: cleaned).data(using: .utf8),
           let payload = try? JSONDecoder().decode(DirectionRecommendationPayload.self, from: data) {
            return payload.recommendations
        }

        throw AgnesDirectionError.invalidResponse
    }

    private func extractJSONPayloadString(from text: String) -> String {
        let arrayStart = text.firstIndex(of: "[")
        let objectStart = text.firstIndex(of: "{")

        guard let start = earliestIndex(arrayStart, objectStart) else { return text }
        let sliced = String(text[start...])
        let closingCharacter: Character = sliced.first == "{" ? "}" : "]"

        if let end = sliced.lastIndex(of: closingCharacter) {
            return String(sliced[...end])
        }
        return sliced + String(closingCharacter)
    }

    private func earliestIndex(_ lhs: String.Index?, _ rhs: String.Index?) -> String.Index? {
        switch (lhs, rhs) {
        case (.some(let left), .some(let right)):
            return left < right ? left : right
        case (.some(let left), .none):
            return left
        case (.none, .some(let right)):
            return right
        case (.none, .none):
            return nil
        }
    }
}

private struct DirectionRecommendationPayload: Decodable {
    let recommendations: [DirectionRecommendation]
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
