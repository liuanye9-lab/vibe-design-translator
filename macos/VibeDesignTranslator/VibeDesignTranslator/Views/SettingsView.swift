import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var model: AppViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 22) {
            HeaderBlock(
                title: "模型设置",
                subtitle: "API Key 只保存在本机运行态，当前仓库不会提交任何密钥"
            )

            VStack(alignment: .leading, spacing: 14) {
                Text("Agnes API")
                    .font(.headline)
                TextField("API Base", text: $model.apiBase)
                TextField("Text Model", text: $model.textModel)
                TextField("Image Model", text: $model.imageModel)
                TextField("Video Model", text: $model.videoModel)
                SecureField("AGNES_API_KEY", text: $model.apiKey)
                Text("也可以在 Xcode Scheme 环境变量里设置 AGNES_API_KEY")
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
