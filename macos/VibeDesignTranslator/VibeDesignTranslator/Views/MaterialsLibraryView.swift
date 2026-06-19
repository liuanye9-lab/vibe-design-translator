import SwiftUI

struct MaterialsLibraryView: View {
    @EnvironmentObject private var model: AppViewModel
    @State private var animate = true

    let columns = [
        GridItem(.adaptive(minimum: 230), spacing: 16)
    ]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                HStack(alignment: .top) {
                    HeaderBlock(
                        title: "原生动效素材库",
                        subtitle: "这些不是网页截图，而是 SwiftUI 原生可组合的动效模式，可被方向 Agent 引用"
                    )
                    Spacer()
                    Toggle("动效", isOn: $animate)
                        .toggleStyle(.switch)
                        .frame(width: 92)
                }

                LazyVGrid(columns: columns, spacing: 16) {
                    ForEach(designPatterns) { pattern in
                        MaterialPatternCard(pattern: pattern, animate: animate, highlighted: model.selectedPatternIDs.contains(pattern.id))
                    }
                }
            }
            .padding(30)
        }
    }
}

struct MaterialPatternCard: View {
    let pattern: DesignPattern
    let animate: Bool
    let highlighted: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(pattern.name)
                    .font(.headline)
                Spacer()
                Text(pattern.category)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.primary.opacity(0.06), in: Capsule())
            }

            MotionPreview(patternID: pattern.id, animate: animate)
                .frame(height: 130)
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))

            TagRow(items: pattern.suitableFor)

            VStack(alignment: .leading, spacing: 4) {
                ForEach(pattern.traits, id: \.self) { trait in
                    Label(trait, systemImage: "circle.fill")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .padding(16)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay {
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .stroke(highlighted ? Color.blue : Color.clear, lineWidth: 2)
        }
    }
}

struct MotionPreview: View {
    let patternID: String
    let animate: Bool
    @State private var phase = false

    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 14)
                .fill(backgroundGradient)

            previewContent
                .padding(18)
        }
        .onAppear { updateAnimation() }
        .onChange(of: animate) { _, _ in updateAnimation() }
    }

    private var backgroundGradient: LinearGradient {
        switch patternID {
        case "p4":
            LinearGradient(colors: [.black.opacity(0.86), .blue.opacity(0.36)], startPoint: .topLeading, endPoint: .bottomTrailing)
        case "p5":
            LinearGradient(colors: [.mint.opacity(0.25), .yellow.opacity(0.22), .pink.opacity(0.20)], startPoint: .leading, endPoint: .trailing)
        case "p6":
            LinearGradient(colors: [.purple.opacity(0.18), .cyan.opacity(0.22)], startPoint: phase ? .topLeading : .bottomTrailing, endPoint: phase ? .bottomTrailing : .topLeading)
        default:
            LinearGradient(colors: [.white.opacity(0.75), .blue.opacity(0.10)], startPoint: .topLeading, endPoint: .bottomTrailing)
        }
    }

    @ViewBuilder
    private var previewContent: some View {
        switch patternID {
        case "p1":
            VStack(alignment: .leading, spacing: phase ? 20 : 12) {
                Capsule().fill(.primary.opacity(0.72)).frame(width: 82, height: 10)
                Capsule().fill(.primary.opacity(0.42)).frame(width: 142, height: 16)
                Capsule().fill(.blue).frame(width: 92, height: 28)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        case "p2":
            HStack(alignment: .top, spacing: 10) {
                RoundedRectangle(cornerRadius: 12).fill(.blue.opacity(0.32)).frame(width: phase ? 130 : 100, height: 86)
                VStack(spacing: 10) {
                    RoundedRectangle(cornerRadius: 12).fill(.purple.opacity(0.28)).frame(height: phase ? 42 : 58)
                    RoundedRectangle(cornerRadius: 12).fill(.green.opacity(0.24)).frame(height: phase ? 58 : 42)
                }
            }
        case "p9":
            ZStack {
                Circle().stroke(.blue.opacity(0.22), lineWidth: 1).frame(width: phase ? 92 : 58)
                RoundedRectangle(cornerRadius: 14).fill(.blue).frame(width: 92, height: 42).offset(x: phase ? 12 : -8, y: phase ? -8 : 8)
            }
        case "p10":
            VStack(alignment: .leading, spacing: 10) {
                ForEach(0..<4, id: \.self) { index in
                    Capsule()
                        .fill(index == 0 ? .blue.opacity(0.82) : .primary.opacity(0.18))
                        .frame(width: CGFloat(70 + index * 24), height: 12)
                        .offset(y: phase ? 0 : 18)
                        .opacity(phase ? 1 : 0.45)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        default:
            VStack(spacing: 10) {
                RoundedRectangle(cornerRadius: 12).fill(.white.opacity(0.78)).frame(height: phase ? 48 : 36)
                HStack {
                    RoundedRectangle(cornerRadius: 10).fill(.blue.opacity(0.45))
                    RoundedRectangle(cornerRadius: 10).fill(.purple.opacity(0.35))
                    RoundedRectangle(cornerRadius: 10).fill(.cyan.opacity(0.35))
                }
            }
        }
    }

    private func updateAnimation() {
        guard animate else {
            phase = false
            return
        }
        withAnimation(.easeInOut(duration: 1.8).repeatForever(autoreverses: true)) {
            phase = true
        }
    }
}
