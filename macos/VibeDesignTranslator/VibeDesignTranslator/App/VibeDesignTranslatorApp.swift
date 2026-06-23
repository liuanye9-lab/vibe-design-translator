import SwiftUI

@main
struct VibeDesignTranslatorApp: App {
    @StateObject private var appModel = AppViewModel()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appModel)
                .preferredColorScheme(.light)
                .frame(minWidth: 1220, minHeight: 820)
        }
        .windowStyle(.hiddenTitleBar)
        .defaultSize(width: 1360, height: 900)
        .commands {
            CommandGroup(replacing: .newItem) { }
            CommandMenu("设计") {
                Button("生成设计蓝图") {
                    Task { await appModel.recommendDirections() }
                }
                .keyboardShortcut("r", modifiers: [.command])
                .disabled(appModel.isLoading)

                Divider()

                Button("复制当前蓝图") {
                    appModel.copySelectedBlueprint()
                }
                .keyboardShortcut("c", modifiers: [.command, .shift])
                .disabled(appModel.selectedBlueprint == nil)

                Button("复制实现提示词") {
                    appModel.copySelectedPrompt()
                }
                .keyboardShortcut("c", modifiers: [.command, .option])
                .disabled(appModel.selectedBlueprint == nil)

                Button("导出当前蓝图...") {
                    appModel.exportSelectedBlueprint()
                }
                .keyboardShortcut("e", modifiers: [.command])
                .disabled(appModel.selectedBlueprint == nil)

                Divider()

                Button("清除历史") {
                    appModel.clearSession()
                }
                .keyboardShortcut(.delete, modifiers: [.command, .shift])
                .disabled(appModel.recommendations.isEmpty)
            }
        }

        Settings {
            SettingsView()
                .environmentObject(appModel)
                .frame(width: 680, height: 420)
        }
    }
}
