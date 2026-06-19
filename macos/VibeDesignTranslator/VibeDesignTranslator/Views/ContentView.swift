import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var model: AppViewModel
    @State private var selectedSection: AppSection = .brief

    var body: some View {
        NavigationSplitView {
            SidebarView(selectedSection: $selectedSection)
        } detail: {
            ZStack {
                LinearGradient(
                    colors: [Color(nsColor: .windowBackgroundColor), Color.blue.opacity(0.05), Color.purple.opacity(0.04)],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
                .ignoresSafeArea()

                switch selectedSection {
                case .brief:
                    BriefComposerView()
                case .materials:
                    MaterialsLibraryView()
                case .settings:
                    SettingsView()
                }
            }
        }
    }
}

enum AppSection: String, CaseIterable, Identifiable {
    case brief
    case materials
    case settings

    var id: String { rawValue }

    var title: String {
        switch self {
        case .brief:
            return "方向 Agent"
        case .materials:
            return "素材库"
        case .settings:
            return "设置"
        }
    }

    var systemImage: String {
        switch self {
        case .brief:
            return "sparkles"
        case .materials:
            return "square.grid.2x2"
        case .settings:
            return "gearshape"
        }
    }
}

struct SidebarView: View {
    @Binding var selectedSection: AppSection

    var body: some View {
        List(AppSection.allCases, selection: $selectedSection) { section in
            Label(section.title, systemImage: section.systemImage)
                .tag(section)
        }
        .navigationTitle("Vibe Translator")
        .frame(minWidth: 210)
    }
}

struct BriefComposerView: View {
    @EnvironmentObject private var model: AppViewModel

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                HeaderBlock(
                    title: "把想法转成前端设计方向",
                    subtitle: "输入产品想法后，原生 Mac App 会调用 Agnes 生成方向推荐、判断信号、素材模式和前端执行蓝图"
                )

                HStack(alignment: .top, spacing: 18) {
                    BriefFormCard()
                        .frame(minWidth: 380, idealWidth: 440, maxWidth: 520)

                    VStack(spacing: 18) {
                        AgentStatusCard()
                        DirectionRecommendationsView()
                        SelectedBlueprintView()
                    }
                    .frame(maxWidth: .infinity)
                }
            }
            .padding(30)
        }
    }
}

struct HeaderBlock: View {
    let title: String
    let subtitle: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.system(size: 34, weight: .semibold, design: .rounded))
            Text(subtitle)
                .font(.title3)
                .foregroundStyle(.secondary)
                .fixedSize(horizontal: false, vertical: true)
        }
    }
}

struct BriefFormCard: View {
    @EnvironmentObject private var model: AppViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("产品想法")
                .font(.headline)

            TextField("产品名称", text: $model.brief.productName)
            TextField("产品类别", text: $model.brief.productCategory)
            TextField("目标用户", text: $model.brief.targetUsers)
            TextField("页面目标", text: $model.brief.pageGoal, axis: .vertical)
                .lineLimit(2...4)
            TextField("第一印象", text: $model.brief.firstImpression)
            TextField("业务优先级", text: $model.brief.businessPriority)
            TextField("主 CTA", text: $model.brief.mainCTA)

            Button {
                Task { await model.recommendDirections() }
            } label: {
                HStack {
                    if model.isLoading {
                        ProgressView()
                            .scaleEffect(0.75)
                    } else {
                        Image(systemName: "wand.and.stars")
                    }
                    Text(model.isLoading ? "分析中..." : "生成设计蓝图")
                }
                .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.large)
            .disabled(model.isLoading)
        }
        .textFieldStyle(.roundedBorder)
        .padding(20)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
    }
}

struct AgentStatusCard: View {
    @EnvironmentObject private var model: AppViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                Label("智能方向 Agent", systemImage: "sparkle.magnifyingglass")
                    .font(.headline)
                Spacer()
                Text(model.lastProvider)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 5)
                    .background(Color.primary.opacity(0.06), in: Capsule())
            }

            Text(model.statusMessage)
                .font(.body)
                .foregroundStyle(.secondary)

            if let error = model.errorMessage {
                Text(error)
                    .font(.caption)
                    .foregroundStyle(.orange)
                    .padding(10)
                    .background(Color.orange.opacity(0.10), in: RoundedRectangle(cornerRadius: 10))
            }
        }
        .padding(18)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
    }
}

struct DirectionRecommendationsView: View {
    @EnvironmentObject private var model: AppViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("推荐方向")
                .font(.headline)

            if model.recommendations.isEmpty {
                EmptyRecommendationView()
            } else {
                ForEach(model.recommendations) { recommendation in
                    RecommendationCard(recommendation: recommendation)
                        .onTapGesture {
                            model.select(recommendation)
                        }
                }
            }
        }
    }
}

struct EmptyRecommendationView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("等待分析")
                .font(.headline)
            Text("填写左侧想法并调用 Agnes 后，这里会显示方向、分数、理由和素材建议")
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(18)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
    }
}

struct RecommendationCard: View {
    @EnvironmentObject private var model: AppViewModel
    let recommendation: DirectionRecommendation

    var isSelected: Bool {
        recommendation.direction == model.selectedDirectionID
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(recommendation.direction?.title ?? recommendation.directionId)
                        .font(.title3.bold())
                    Text(recommendation.direction?.summary ?? "")
                        .foregroundStyle(.secondary)
                }
                Spacer()
                ScoreBadge(score: recommendation.score)
            }

            Text(recommendation.reason)
                .font(.body)
                .foregroundStyle(.secondary)
                .fixedSize(horizontal: false, vertical: true)

            if !recommendation.keySignals.isEmpty {
                TagRow(items: recommendation.keySignals)
            }

            if let blueprint = recommendation.blueprint {
                Text(blueprint.positioning)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .padding(10)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(Color.primary.opacity(0.05), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
            }

            let materialNames = designPatterns.names(for: recommendation.materialPatternIds)
            if !materialNames.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("建议素材")
                        .font(.caption.weight(.medium))
                        .foregroundStyle(.secondary)
                    TagRow(items: materialNames)
                }
            }
        }
        .padding(18)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay {
            RoundedRectangle(cornerRadius: 18, style: .continuous)
                .stroke(isSelected ? (recommendation.direction?.accent ?? .blue) : Color.clear, lineWidth: 2)
        }
    }
}

struct SelectedBlueprintView: View {
    @EnvironmentObject private var model: AppViewModel

    var body: some View {
        if let recommendation = model.selectedRecommendation, let blueprint = recommendation.blueprint {
            BlueprintPlanView(
                title: recommendation.direction?.title ?? recommendation.directionId,
                accent: recommendation.direction?.accent ?? .blue,
                blueprint: blueprint
            )
        }
    }
}

struct BlueprintPlanView: View {
    let title: String
    let accent: Color
    let blueprint: FrontendBlueprint

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack {
                Label("前端执行蓝图", systemImage: "rectangle.3.group")
                    .font(.headline)
                Spacer()
                Text(title)
                    .font(.caption.weight(.medium))
                    .foregroundStyle(accent)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 5)
                    .background(accent.opacity(0.10), in: Capsule())
            }

            BlueprintTextBlock(title: "设计定位", text: blueprint.positioning)
            BlueprintTextBlock(title: "布局策略", text: blueprint.layoutStrategy)

            HStack(alignment: .top, spacing: 12) {
                BlueprintTextBlock(title: "视觉系统", text: blueprint.visualSystem)
                BlueprintTextBlock(title: "动效系统", text: blueprint.motionSystem)
                BlueprintTextBlock(title: "组件系统", text: blueprint.componentSystem)
            }

            if !blueprint.pageSections.isEmpty {
                VStack(alignment: .leading, spacing: 10) {
                    Text("页面结构")
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(.secondary)

                    ForEach(blueprint.pageSections) { section in
                        BlueprintSectionRow(section: section)
                    }
                }
            }

            if !blueprint.colorTokens.isEmpty {
                BlueprintTokenGroup(title: "颜色 Token", items: blueprint.colorTokens)
            }

            if !blueprint.typographyRules.isEmpty {
                BlueprintTokenGroup(title: "排版规则", items: blueprint.typographyRules)
            }

            BlueprintPromptBlock(prompt: blueprint.implementationPrompt)
        }
        .padding(18)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
    }
}

struct BlueprintTextBlock: View {
    let title: String
    let text: String

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title)
                .font(.caption.weight(.semibold))
                .foregroundStyle(.secondary)
            Text(text)
                .font(.callout)
                .fixedSize(horizontal: false, vertical: true)
        }
        .frame(maxWidth: .infinity, alignment: .topLeading)
        .padding(12)
        .background(Color.primary.opacity(0.05), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
    }
}

struct BlueprintSectionRow: View {
    let section: BlueprintSection

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(section.name)
                .font(.callout.weight(.semibold))
            Text(section.goal)
                .font(.caption)
                .foregroundStyle(.secondary)
            HStack(alignment: .top, spacing: 10) {
                Label(section.layout, systemImage: "rectangle.split.2x1")
                Label(section.interaction, systemImage: "sparkles")
            }
            .font(.caption)
            .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(Color.primary.opacity(0.04), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
    }
}

struct BlueprintTokenGroup: View {
    let title: String
    let items: [String]

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.caption.weight(.semibold))
                .foregroundStyle(.secondary)
            TagRow(items: items)
        }
    }
}

struct BlueprintPromptBlock: View {
    let prompt: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("实现提示词")
                .font(.caption.weight(.semibold))
                .foregroundStyle(.secondary)
            Text(prompt)
                .font(.system(.caption, design: .monospaced))
                .textSelection(.enabled)
                .fixedSize(horizontal: false, vertical: true)
                .padding(12)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color.black.opacity(0.05), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
        }
    }
}

struct ScoreBadge: View {
    let score: Int

    var body: some View {
        Text("\(score)/100")
            .font(.caption.weight(.semibold))
            .foregroundStyle(.white)
            .padding(.horizontal, 10)
            .padding(.vertical, 6)
            .background(score >= 85 ? Color.green : score >= 65 ? Color.blue : Color.gray, in: Capsule())
    }
}

struct TagRow: View {
    let items: [String]

    var body: some View {
        FlowLayout(spacing: 6) {
            ForEach(items, id: \.self) { item in
                Text(item)
                    .font(.caption)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.primary.opacity(0.06), in: Capsule())
            }
        }
    }
}
