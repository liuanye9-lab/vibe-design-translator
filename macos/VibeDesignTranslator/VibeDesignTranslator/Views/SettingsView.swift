import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var model: AppViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 22) {
            HeaderBlock(
                title: "模型设置",
                subtitle: "模型配置保存在本机，API Key 使用 macOS Keychain，当前仓库不会提交任何密钥"
            )

            VStack(alignment: .leading, spacing: 14) {
                Text("Agnes API")
                    .font(.headline)
                TextField("API Base", text: $model.apiBase)
                TextField("Text Model", text: $model.textModel)
                TextField("Image Model", text: $model.imageModel)
                TextField("Video Model", text: $model.videoModel)
                SecureField("AGNES_API_KEY", text: $model.apiKey)

                Button {
                    model.saveSettings()
                } label: {
                    Label("保存设置", systemImage: "checkmark.circle")
                }
                .buttonStyle(.borderedProminent)

                Button {
                    Task { await model.testAgnesConnection() }
                } label: {
                    if model.isTestingConnection {
                        ProgressView()
                            .scaleEffect(0.75)
                    } else {
                        Label("测试连接", systemImage: "network")
                    }
                }
                .buttonStyle(.bordered)
                .disabled(model.isTestingConnection)

                if let message = model.settingsMessage {
                    Text(message)
                        .font(.caption)
                        .foregroundStyle(.green)
                }

                Text("也可以在 Xcode Scheme 环境变量里设置 AGNES_API_KEY；环境变量会优先于 Keychain")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .textFieldStyle(.roundedBorder)
            .padding(20)
            .frame(maxWidth: 620, alignment: .leading)
            .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 18, style: .continuous))

            Spacer()
        }
        .padding(30)
    }
}
