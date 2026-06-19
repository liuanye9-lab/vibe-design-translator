import SwiftUI

struct MaterialsLibraryView: View {
    @EnvironmentObject private var model: AppViewModel
    @State private var animate = true
    @State private var selectedCategory = "全部"
    @State private var selectedMediaKind: MaterialMediaKind = .all

    private let categories = ["全部", "布局", "色彩", "排版", "交互"]

    let columns = [
        GridItem(.adaptive(minimum: 230), spacing: 16)
    ]

    private var filteredPatterns: [DesignPattern] {
        let categoryFiltered: [DesignPattern]
        if selectedCategory == "全部" {
            categoryFiltered = designPatterns
        } else {
            categoryFiltered = designPatterns.filter { pattern in
                pattern.category == selectedCategory
            }
        }

        if selectedMediaKind == .all {
            return categoryFiltered
        }

        return categoryFiltered.filter { pattern in
            materialAsset(for: pattern.id)?.mediaKind == selectedMediaKind
        }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                HStack(alignment: .top) {
                    HeaderBlock(
                        title: "原生动效素材库",
                        subtitle: "这些不是网页截图，而是 SwiftUI 原生可组合的动效模式，可被方向 Agent 引用"
                    )
                    Spacer()
                    VStack(alignment: .trailing, spacing: 10) {
                        Picker("分类", selection: $selectedCategory) {
                            ForEach(categories, id: \.self) { category in
                                Text(category).tag(category)
                            }
                        }
                        .pickerStyle(.segmented)
                        .frame(width: 280)

                        Toggle("动效", isOn: $animate)
                            .toggleStyle(.switch)
                            .frame(width: 92)

                        Picker("媒介", selection: $selectedMediaKind) {
                            ForEach(MaterialMediaKind.allCases) { mediaKind in
                                Text(mediaKind.rawValue).tag(mediaKind)
                            }
                        }
                        .pickerStyle(.menu)
                        .frame(width: 160)
                    }
                }

                LazyVGrid(columns: columns, spacing: 16) {
                    ForEach(filteredPatterns) { pattern in
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

    private var material: MaterialAsset? {
        materialAsset(for: pattern.id)
    }

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

            if let material {
                VStack(alignment: .leading, spacing: 8) {
                    HStack(alignment: .top) {
                        VStack(alignment: .leading, spacing: 3) {
                            Text(material.title)
                                .font(.callout.weight(.semibold))
                            Text("\(material.source) · \(material.sourceSignal)")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                        Spacer()
                        Text(material.mediaKind.rawValue)
                            .font(.caption2.weight(.semibold))
                            .foregroundStyle(.blue)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.blue.opacity(0.10), in: Capsule())
                    }

                    Text(material.motionSpec)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .padding(10)
                .background(Color.primary.opacity(0.045), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
            }

            MotionPreview(patternID: pattern.id, animate: animate)
                .frame(height: 130)
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))

            TagRow(items: pattern.suitableFor)

            if let material {
                VStack(alignment: .leading, spacing: 7) {
                    Text("前端注记")
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(.secondary)
                    TagRow(items: material.frontendNotes)
                }
            }

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
        case "p3":
            ZStack {
                RoundedRectangle(cornerRadius: 14).fill(.white.opacity(0.55)).frame(width: 136, height: 78).offset(x: phase ? 18 : 8, y: phase ? -18 : -8)
                RoundedRectangle(cornerRadius: 14).fill(.purple.opacity(0.28)).frame(width: 136, height: 78).offset(x: phase ? 6 : 0, y: phase ? -6 : 0)
                RoundedRectangle(cornerRadius: 14).fill(.blue.opacity(0.46)).frame(width: 136, height: 78).offset(x: phase ? -10 : -4, y: phase ? 10 : 4)
            }
        case "p4":
            VStack(alignment: .leading, spacing: 10) {
                ForEach(0..<4, id: \.self) { index in
                    Capsule()
                        .fill(index == 1 ? .blue.opacity(0.92) : .white.opacity(0.34))
                        .frame(width: CGFloat(76 + index * 18), height: index == 1 ? 14 : 10)
                        .offset(x: phase && index == 1 ? 18 : 0)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        case "p5":
            HStack(spacing: 0) {
                RoundedRectangle(cornerRadius: 12).fill(.mint.opacity(0.42)).frame(width: phase ? 112 : 72)
                RoundedRectangle(cornerRadius: 12).fill(.yellow.opacity(0.42)).frame(width: phase ? 72 : 112)
                RoundedRectangle(cornerRadius: 12).fill(.pink.opacity(0.36)).frame(width: 72)
            }
        case "p6":
            ZStack {
                Circle().fill(.purple.opacity(0.22)).frame(width: phase ? 116 : 82).offset(x: phase ? -22 : 18)
                Circle().fill(.cyan.opacity(0.26)).frame(width: phase ? 78 : 118).offset(x: phase ? 24 : -18)
                Capsule().fill(.white.opacity(0.66)).frame(width: 142, height: 30)
            }
        case "p7":
            VStack(alignment: .leading, spacing: 8) {
                Text("Aa")
                    .font(.system(size: phase ? 48 : 38, weight: .bold, design: .rounded))
                Capsule().fill(.primary.opacity(0.30)).frame(width: 130, height: 10)
                Capsule().fill(.primary.opacity(0.18)).frame(width: 96, height: 10)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        case "p8":
            VStack(alignment: .leading, spacing: 8) {
                Text("品牌 / Brand")
                    .font(.system(size: 22, weight: .semibold, design: .serif))
                Text("多语言层级")
                    .font(.system(size: 18, weight: phase ? .bold : .regular, design: .rounded))
                Capsule().fill(.purple.opacity(0.56)).frame(width: phase ? 148 : 104, height: 12)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
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
        case "p11":
            HStack(spacing: 10) {
                ForEach(0..<3, id: \.self) { index in
                    RoundedRectangle(cornerRadius: 14)
                        .fill(index == 1 ? .blue.opacity(0.52) : .white.opacity(0.55))
                        .frame(width: index == 1 ? 92 : 52, height: 82)
                        .offset(x: phase ? -18 : 18)
                        .opacity(index == 2 && phase ? 0.50 : 1)
                }
            }
        case "p12":
            VStack(alignment: .leading, spacing: 12) {
                ForEach(0..<3, id: \.self) { index in
                    HStack(spacing: 10) {
                        Circle()
                            .fill(index == 0 || phase ? .green : .gray.opacity(0.24))
                            .frame(width: 18, height: 18)
                        Capsule()
                            .fill(index == 0 || phase ? .green.opacity(0.22) : .gray.opacity(0.14))
                            .frame(width: CGFloat(120 - index * 18), height: 12)
                    }
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
