import Foundation

struct AppSession: Codable {
    var brief: DesignBrief
    var recommendations: [DirectionRecommendation]
    var selectedDirectionID: DesignDirectionID
    var selectedPatternIDs: [String]
    var statusMessage: String
    var lastProvider: String
}

struct SessionStore {
    private static let sessionKey = "vibe.session.current"

    static func load() -> AppSession? {
        guard let data = UserDefaults.standard.data(forKey: sessionKey) else {
            return nil
        }
        return try? JSONDecoder().decode(AppSession.self, from: data)
    }

    static func save(_ session: AppSession) {
        guard let data = try? JSONEncoder().encode(session) else {
            return
        }
        UserDefaults.standard.set(data, forKey: sessionKey)
    }

    static func clear() {
        UserDefaults.standard.removeObject(forKey: sessionKey)
    }
}
