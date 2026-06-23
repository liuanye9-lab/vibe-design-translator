import Foundation
import Security

struct AppSettings {
    var apiBase: String
    var textModel: String
    var imageModel: String
    var videoModel: String
    var apiKey: String
}

enum SettingsStoreError: LocalizedError {
    case keychainSaveFailed(OSStatus)
    case keychainReadFailed(OSStatus)

    var errorDescription: String? {
        switch self {
        case .keychainSaveFailed(let status):
            return "API Key 保存到 Keychain 失败：\(status)"
        case .keychainReadFailed(let status):
            return "API Key 从 Keychain 读取失败：\(status)"
        }
    }
}

struct SettingsStore {
    private static let service = "com.lay.vibedesigntranslator.agnes"
    private static let account = "agnes-api-key"

    private enum DefaultsKey {
        static let apiBase = "agnes.apiBase"
        static let textModel = "agnes.textModel"
        static let imageModel = "agnes.imageModel"
        static let videoModel = "agnes.videoModel"
    }

    static func load() -> AppSettings {
        let defaults = UserDefaults.standard
        let environmentKey = ProcessInfo.processInfo.environment["AGNES_API_KEY"]

        return AppSettings(
            apiBase: defaults.string(forKey: DefaultsKey.apiBase) ?? "https://apihub.agnes-ai.com/v1",
            textModel: defaults.string(forKey: DefaultsKey.textModel) ?? "Agnes-2.0-Flash",
            imageModel: defaults.string(forKey: DefaultsKey.imageModel) ?? "Agnes-Image-2.0-Flash",
            videoModel: defaults.string(forKey: DefaultsKey.videoModel) ?? "Agnes-Video-V2.0",
            apiKey: environmentKey ?? (try? loadAPIKey()) ?? ""
        )
    }

    static func save(_ settings: AppSettings) throws {
        let defaults = UserDefaults.standard
        defaults.set(settings.apiBase, forKey: DefaultsKey.apiBase)
        defaults.set(settings.textModel, forKey: DefaultsKey.textModel)
        defaults.set(settings.imageModel, forKey: DefaultsKey.imageModel)
        defaults.set(settings.videoModel, forKey: DefaultsKey.videoModel)
        try saveAPIKey(settings.apiKey)
    }

    private static func baseKeychainQuery() -> [String: Any] {
        [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account
        ]
    }

    private static func loadAPIKey() throws -> String? {
        var query = baseKeychainQuery()
        query[kSecReturnData as String] = true
        query[kSecMatchLimit as String] = kSecMatchLimitOne
        query[kSecUseAuthenticationUI as String] = kSecUseAuthenticationUIFail

        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        if status == errSecItemNotFound || status == errSecInteractionNotAllowed {
            return nil
        }
        guard status == errSecSuccess else {
            throw SettingsStoreError.keychainReadFailed(status)
        }
        guard let data = result as? Data else {
            return nil
        }
        return String(data: data, encoding: .utf8)
    }

    private static func saveAPIKey(_ apiKey: String) throws {
        let cleanKey = apiKey.trimmingCharacters(in: .whitespacesAndNewlines)
        let baseQuery = baseKeychainQuery()
        SecItemDelete(baseQuery as CFDictionary)

        guard !cleanKey.isEmpty else {
            return
        }

        var query = baseQuery
        query[kSecValueData as String] = Data(cleanKey.utf8)
        query[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly

        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else {
            throw SettingsStoreError.keychainSaveFailed(status)
        }
    }
}
