import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var model: AppViewModel
    @State private var selectedSidebar: SidebarDestination = .recommend
    @State private var selectedTab: MaterialTab = .recommend
    @State private var selectedSource = "全部来源"
    @State private var selectedType = "全部类型"
    @State private var selectedRegion = "首屏/英雄区"
    @State private var selectedMood = "科技感"
    @State private var isGridMode = true
    @State private var inputText = "我正在做一个 AI 助手产品的官网，想要科技感、专业、同时要有亲和力，可以帮我推荐一些动效、配色和布局参考吗？希望首屏要有记忆点。"
    @State private var messages: [AgentMessage] = AgentMessage.seed

    var body: some View {
        VStack(spacing: 0) {
            TopChrome()
            Divider()

            HStack(spacing: 0) {
                IconSidebar(selected: $selectedSidebar)
                    .frame(width: 76)

                Divider()

                AgentConversationPane(
                    inputText: $inputText,
                    messages: $messages,
                    onSubmit: submitPrompt
                )
                .frame(width: 430)

                Divider()

                MaterialsWorkspacePane(
                    selectedTab: $selectedTab,
                    selectedSource: $selectedSource,
                    selectedType: $selectedType,
                    selectedRegion: $selectedRegion,
                    selectedMood: $selectedMood,
                    isGridMode: $isGridMode
                )
            }
        }
        .background(Color(nsColor: .controlBackgroundColor))
    }

    private func submitPrompt() {
        let trimmed = inputText.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }
        messages.append(.user(trimmed))
        messages.append(.agent("""
        好的，已理解你的需求：AI 助手官网、科技感、专业且亲和，首屏记忆点突出。为你推荐以下设计方向与素材参考，覆盖动效、配色、布局与实现要点。
        """))
        inputText = ""
    }
}

enum SidebarDestination: String, CaseIterable, Identifiable {
    case recommend = "推荐"
    case library = "素材库"
    case projects = "项目"
    case favorites = "收藏"
    case inspiration = "灵感"
    case settings = "设置"

    var id: String { rawValue }

    var symbol: String {
        switch self {
        case .recommend: "bubble.left.and.bubble.right.fill"
        case .library: "folder"
        case .projects: "rectangle.stack"
        case .favorites: "star"
        case .inspiration: "lightbulb"
        case .settings: "gearshape"
        }
    }
}

enum MaterialTab: String, CaseIterable, Identifiable {
    case recommend = "素材推荐"
    case motion = "动效"
    case color = "配色"
    case typography = "字体"
    case layout = "布局"

    var id: String { rawValue }
}

struct AgentMessage: Identifiable, Equatable {
    let id = UUID()
    let role: Role
    let text: String
    let time: String

    enum Role {
        case user
        case agent
    }

    static func user(_ text: String) -> AgentMessage {
        AgentMessage(role: .user, text: text, time: "10:21")
    }

    static func agent(_ text: String) -> AgentMessage {
        AgentMessage(role: .agent, text: text, time: "10:21")
    }

    static let seed: [AgentMessage] = [
        .user("我正在做一个 AI 助手产品的官网，想要科技感、专业、同时要有亲和力，可以帮我推荐一些动效、配色和布局参考吗？希望首屏要有记忆点。"),
        .agent("""
        好的，已理解你的需求：AI 助手官网、科技感、专业且亲和，首屏记忆点突出。为你推荐以下设计方向与素材参考，涵盖动效、配色、布局与实现要点。
        """)
    ]
}

struct MaterialCard: Identifiable {
    let id = UUID()
    let source: String
    let sourceBadge: String
    let title: String
    let tags: [String]
    let note: String
    let icon: String
    let accent: Color
    let preview: PreviewKind

    enum PreviewKind {
        case flow
        case phones
        case particles
        case hero
        case portfolio
        case palette
    }

    static let samples: [MaterialCard] = [
        .init(
            source: "Pageflows",
            sourceBadge: "流程参考",
            title: "AI 助手官网首屏流程拆解",
            tags: ["首屏布局", "流程拆解", "信息层级"],
            note: "参考要点：通过清晰的信息层级，引导用户在 8 秒内理解产品价值与核心功能。",
            icon: "link.circle.fill",
            accent: .blue,
            preview: .flow
        ),
        .init(
            source: "Mobbin",
            sourceBadge: "真实产品",
            title: "AI 类应用首屏设计参考",
            tags: ["移动端", "卡片布局", "信任建立"],
            note: "参考要点：利用卡片 + 数据可视化，快速建立产品专业感与可信度。",
            icon: "m.square.fill",
            accent: .black,
            preview: .phones
        ),
        .init(
            source: "Godly",
            sourceBadge: "网页灵感",
            title: "科技感动画与视觉氛围",
            tags: ["粒子动效", "渐变背景", "沉浸体验"],
            note: "参考要点：粒子流动 + 渐变背景，营造未来感与沉浸式体验，同时保持文字清晰可读。",
            icon: "g.circle.fill",
            accent: .indigo,
            preview: .particles
        ),
        .init(
            source: "v0 Templates",
            sourceBadge: "可执行模板",
            title: "Hero 区组件模板",
            tags: ["React 组件", "可复用", "现代风格"],
            note: "参考要点：可直接复用的 Hero 组件结构，支持快速落地与二次开发。",
            icon: "v.square.fill",
            accent: .black,
            preview: .hero
        ),
        .init(
            source: "Awwwards",
            sourceBadge: "精选案例",
            title: "获奖网站视觉表现",
            tags: ["视觉叙事", "高级质感", "动效细节"],
            note: "参考要点：高级的视觉叙事与动效细节，提升品牌调性与记忆点。",
            icon: "w.square.fill",
            accent: .black,
            preview: .portfolio
        ),
        .init(
            source: "Huemint",
            sourceBadge: "配色工具",
            title: "科技感配色方案",
            tags: ["品牌配色", "对比度", "可访问性"],
            note: "参考要点：基于色彩科学的配色方案，确保可读性与品牌一致性。",
            icon: "circle.grid.2x2.fill",
            accent: .pink,
            preview: .palette
        )
    ]
}

struct TopChrome: View {
    var body: some View {
        HStack(spacing: 18) {
            HStack(spacing: 10) {
                RoundedRectangle(cornerRadius: 8, style: .continuous)
                    .fill(.black)
                    .frame(width: 28, height: 28)
                    .overlay {
                        Text("V")
                            .font(.system(size: 16, weight: .heavy, design: .rounded))
                            .foregroundStyle(.white)
                    }

                Text("Vibe Design Translator")
                    .font(.system(size: 18, weight: .semibold))

                Text("AI 设计素材推荐专家")
                    .font(.system(size: 12, weight: .medium))
                    .foregroundStyle(.secondary)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 5)
                    .background(Color(nsColor: .controlColor).opacity(0.55), in: Capsule())
            }

            Spacer()

            TopChromeButton(title: "素材库", symbol: "photo.on.rectangle")
            TopChromeButton(title: "历史记录", symbol: "clock")
            TopChromeButton(title: "收藏", symbol: "star")

            HStack(spacing: 8) {
                Image(systemName: "sparkle")
                    .foregroundStyle(.green)
                Text("智能推荐模式")
                Circle()
                    .fill(.green)
                    .frame(width: 7, height: 7)
            }
            .font(.system(size: 13, weight: .semibold))
            .padding(.horizontal, 14)
            .padding(.vertical, 9)
            .background(.white, in: Capsule())
            .overlay(Capsule().stroke(Color.black.opacity(0.08)))

            Image(systemName: "bell")
                .font(.system(size: 16, weight: .medium))
                .foregroundStyle(.secondary)
                .frame(width: 34, height: 34)
                .background(.white, in: Circle())

            Circle()
                .fill(LinearGradient(colors: [.blue.opacity(0.25), .cyan.opacity(0.65)], startPoint: .topLeading, endPoint: .bottomTrailing))
                .frame(width: 36, height: 36)
                .overlay {
                    Image(systemName: "person.fill")
                        .foregroundStyle(.white)
                }
        }
        .padding(.horizontal, 24)
        .frame(height: 58)
        .background(.white.opacity(0.96))
    }
}

struct TopChromeButton: View {
    let title: String
    let symbol: String

    var body: some View {
        Button { } label: {
            Label(title, systemImage: symbol)
                .font(.system(size: 13, weight: .semibold))
        }
        .buttonStyle(.plain)
        .foregroundStyle(.primary.opacity(0.78))
    }
}

struct IconSidebar: View {
    @Binding var selected: SidebarDestination

    var body: some View {
        VStack(spacing: 14) {
            ForEach(SidebarDestination.allCases) { item in
                Button {
                    selected = item
                } label: {
                    VStack(spacing: 6) {
                        Image(systemName: item.symbol)
                            .font(.system(size: 20, weight: .semibold))
                        Text(item.rawValue)
                            .font(.system(size: 12, weight: .semibold))
                    }
                    .frame(width: 52, height: 62)
                    .foregroundStyle(selected == item ? .blue : .secondary)
                    .background(selected == item ? Color.blue.opacity(0.12) : Color.clear, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                }
                .buttonStyle(.plain)
            }

            Spacer()

            Button { } label: {
                Image(systemName: "chevron.left.2")
                    .font(.system(size: 13, weight: .semibold))
                    .frame(width: 32, height: 32)
                    .background(.white, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.black.opacity(0.08)))
            }
            .buttonStyle(.plain)
            .foregroundStyle(.secondary)
        }
        .padding(.vertical, 16)
        .background(.white.opacity(0.94))
    }
}

struct AgentConversationPane: View {
    @Binding var inputText: String
    @Binding var messages: [AgentMessage]
    let onSubmit: () -> Void

    private let suggestionCards: [(String, String, String, Color)] = [
        ("动效设计", "需要微交互和动效建议", "sparkles", .blue),
        ("视觉色彩搭配", "科技感配色方案推荐", "paintpalette", .blue),
        ("UI 设计", "界面组件与风格参考", "rectangle.3.group", .orange),
        ("布局排版", "信息层级与版式建议", "square.grid.2x2", .green),
        ("字体选择", "中英文字体搭配建议", "textformat", .pink)
    ]

    var body: some View {
        VStack(spacing: 0) {
            HStack(alignment: .top, spacing: 12) {
                AppMark(size: 44)
                VStack(alignment: .leading, spacing: 5) {
                    HStack(spacing: 8) {
                        Text("AI 设计推荐 Agent")
                            .font(.system(size: 18, weight: .bold))
                        Text("在线")
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundStyle(.green)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 3)
                            .background(Color.green.opacity(0.12), in: Capsule())
                    }
                    Text("基于你的需求，筛选最合适的前端设计素材与实现方向")
                        .font(.system(size: 13))
                        .foregroundStyle(.secondary)
                }
                Spacer()
            }
            .padding(.horizontal, 22)
            .padding(.top, 20)
            .padding(.bottom, 14)

            ScrollView {
                VStack(spacing: 18) {
                    ForEach(messages) { message in
                        ChatBubble(message: message)
                    }

                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("你也可以试试这些需求")
                                .font(.system(size: 13, weight: .semibold))
                            Spacer()
                            Label("换一批", systemImage: "arrow.clockwise")
                                .font(.system(size: 12, weight: .medium))
                                .foregroundStyle(.secondary)
                        }

                        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                            ForEach(suggestionCards, id: \.0) { item in
                                SuggestionCard(title: item.0, subtitle: item.1, symbol: item.2, color: item.3) {
                                    inputText = "我需要\(item.0)方面的推荐，目标是做一个 AI 助手官网，要科技感、专业、有亲和力。"
                                }
                            }
                        }
                    }
                    .padding(.top, 12)
                }
                .padding(.horizontal, 22)
                .padding(.bottom, 16)
            }

            ComposerBox(inputText: $inputText, onSubmit: onSubmit)
                .padding(.horizontal, 18)
                .padding(.bottom, 12)

            Text("由 Agnes AI 提供技术支持 · 内容生成可能存在误差，请结合实际需求判断")
                .font(.system(size: 10))
                .foregroundStyle(.secondary)
                .padding(.bottom, 10)
        }
        .background(.white.opacity(0.98))
    }
}

struct AppMark: View {
    let size: CGFloat

    var body: some View {
        RoundedRectangle(cornerRadius: size * 0.22, style: .continuous)
            .fill(.black)
            .frame(width: size, height: size)
            .overlay {
                Text("V")
                    .font(.system(size: size * 0.46, weight: .heavy, design: .rounded))
                    .foregroundStyle(.white)
            }
    }
}

struct HeaderBlock: View {
    let title: String
    let subtitle: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.system(size: 32, weight: .semibold, design: .rounded))
            Text(subtitle)
                .font(.system(size: 15))
                .foregroundStyle(.secondary)
                .fixedSize(horizontal: false, vertical: true)
        }
    }
}

struct ChatBubble: View {
    let message: AgentMessage

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            if message.role == .user {
                Spacer(minLength: 44)
                VStack(alignment: .trailing, spacing: 6) {
                    Text(message.time)
                        .font(.system(size: 11))
                        .foregroundStyle(.secondary)
                    Text(message.text)
                        .font(.system(size: 14))
                        .lineSpacing(5)
                        .foregroundStyle(.primary.opacity(0.82))
                        .padding(14)
                        .background(Color.blue.opacity(0.08), in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.blue.opacity(0.22)))
                }
            } else {
                AppMark(size: 30)
                VStack(alignment: .leading, spacing: 8) {
                    HStack {
                        Text("Vibe Agent")
                            .font(.system(size: 12, weight: .semibold))
                        Text(message.time)
                            .font(.system(size: 11))
                            .foregroundStyle(.secondary)
                    }

                    VStack(alignment: .leading, spacing: 12) {
                        Text(message.text)
                            .font(.system(size: 14))
                            .lineSpacing(5)

                        VStack(alignment: .leading, spacing: 11) {
                            Text("设计方向总结")
                                .font(.system(size: 13, weight: .semibold))
                            SummaryLine("动态粒子与流线：营造 AI 感与未来感")
                            SummaryLine("柔和渐变配色：科技感 + 亲和感，降低冷感")
                            SummaryLine("卡片式信息层级：提升专业感与可读性")
                            SummaryLine("微交互反馈：增强产品可信度与趣味性")
                        }
                        .padding(14)
                        .background(.white, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.black.opacity(0.08)))
                    }
                    .padding(14)
                    .background(.white, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.black.opacity(0.08)))
                }
                Spacer(minLength: 8)
            }
        }
    }
}

struct SummaryLine: View {
    let text: String

    init(_ text: String) {
        self.text = text
    }

    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: "checkmark.circle.fill")
                .foregroundStyle(.green)
            Text(text)
                .font(.system(size: 13))
        }
    }
}

struct SuggestionCard: View {
    let title: String
    let subtitle: String
    let symbol: String
    let color: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 10) {
                Image(systemName: symbol)
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundStyle(color)
                    .frame(width: 34, height: 34)
                    .background(color.opacity(0.12), in: RoundedRectangle(cornerRadius: 10, style: .continuous))
                VStack(alignment: .leading, spacing: 3) {
                    Text(title)
                        .font(.system(size: 13, weight: .semibold))
                    Text(subtitle)
                        .font(.system(size: 11))
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }
                Spacer()
            }
            .padding(10)
            .background(.white, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.black.opacity(0.08)))
        }
        .buttonStyle(.plain)
    }
}

struct ComposerBox: View {
    @Binding var inputText: String
    let onSubmit: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            TextEditor(text: $inputText)
                .font(.system(size: 13))
                .scrollContentBackground(.hidden)
                .frame(height: 72)
                .overlay(alignment: .topLeading) {
                    if inputText.isEmpty {
                        Text("描述你的设计需求，Agent 会为你推荐最佳素材...")
                            .foregroundStyle(.secondary)
                            .font(.system(size: 13))
                            .padding(.top, 8)
                            .padding(.leading, 6)
                    }
                }

            HStack {
                Text("\(inputText.count)/1000")
                    .font(.system(size: 11))
                    .foregroundStyle(.secondary)
                Spacer()
                IconComposerButton(symbol: "paperclip")
                IconComposerButton(symbol: "photo")
                IconComposerButton(symbol: "sparkles")
                Button(action: onSubmit) {
                    Image(systemName: "paperplane.fill")
                        .font(.system(size: 16, weight: .semibold))
                        .frame(width: 38, height: 34)
                        .background(.blue, in: RoundedRectangle(cornerRadius: 8, style: .continuous))
                        .foregroundStyle(.white)
                }
                .buttonStyle(.plain)
            }
        }
        .padding(12)
        .background(.white, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.black.opacity(0.10)))
    }
}

struct IconComposerButton: View {
    let symbol: String

    var body: some View {
        Button { } label: {
            Image(systemName: symbol)
                .font(.system(size: 14, weight: .semibold))
                .frame(width: 30, height: 30)
                .background(Color(nsColor: .controlColor).opacity(0.45), in: RoundedRectangle(cornerRadius: 8, style: .continuous))
        }
        .buttonStyle(.plain)
        .foregroundStyle(.secondary)
    }
}

struct MaterialsWorkspacePane: View {
    @Binding var selectedTab: MaterialTab
    @Binding var selectedSource: String
    @Binding var selectedType: String
    @Binding var selectedRegion: String
    @Binding var selectedMood: String
    @Binding var isGridMode: Bool

    private let columns = [
        GridItem(.adaptive(minimum: 260), spacing: 14)
    ]

    var body: some View {
        VStack(spacing: 0) {
            MaterialTabs(selectedTab: $selectedTab)
            Divider()

            ScrollView {
                VStack(spacing: 14) {
                    FilterToolbar(
                        selectedSource: $selectedSource,
                        selectedType: $selectedType,
                        selectedRegion: $selectedRegion,
                        selectedMood: $selectedMood,
                        isGridMode: $isGridMode
                    )

                    if isGridMode {
                        LazyVGrid(columns: columns, spacing: 14) {
                            ForEach(MaterialCard.samples) { card in
                                SourceMaterialCard(card: card)
                            }
                        }
                    } else {
                        VStack(spacing: 10) {
                            ForEach(MaterialCard.samples) { card in
                                SourceMaterialListRow(card: card)
                            }
                        }
                    }

                    BlueprintTable()
                }
                .padding(18)
            }
            .background(Color(nsColor: .textBackgroundColor).opacity(0.78))
        }
    }
}

struct MaterialTabs: View {
    @Binding var selectedTab: MaterialTab

    var body: some View {
        HStack(spacing: 30) {
            ForEach(MaterialTab.allCases) { tab in
                Button {
                    selectedTab = tab
                } label: {
                    VStack(spacing: 12) {
                        Text(tab.rawValue)
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundStyle(selectedTab == tab ? .blue : .secondary)
                        Rectangle()
                            .fill(selectedTab == tab ? Color.blue : Color.clear)
                            .frame(width: 64, height: 3)
                    }
                }
                .buttonStyle(.plain)
            }
            Spacer()
        }
        .padding(.horizontal, 22)
        .frame(height: 58)
        .background(.white.opacity(0.96))
    }
}

struct FilterToolbar: View {
    @Binding var selectedSource: String
    @Binding var selectedType: String
    @Binding var selectedRegion: String
    @Binding var selectedMood: String
    @Binding var isGridMode: Bool

    var body: some View {
        HStack(spacing: 10) {
            FilterPicker(selection: $selectedSource, options: ["全部来源", "Pageflows", "Mobbin", "Godly", "v0", "Awwwards", "Huemint"])
            FilterPicker(selection: $selectedType, options: ["全部类型", "流程参考", "网页灵感", "配色工具", "可执行模板"])
            FilterPicker(selection: $selectedRegion, options: ["首屏/英雄区", "移动端", "Dashboard", "作品集"])
            FilterPicker(selection: $selectedMood, options: ["科技感", "专业感", "亲和力", "高级感"])

            Button { } label: {
                Label("更多筛选", systemImage: "line.3.horizontal.decrease.circle")
                    .font(.system(size: 13, weight: .semibold))
                    .padding(.horizontal, 10)
                    .frame(height: 34)
                    .background(.white, in: RoundedRectangle(cornerRadius: 7, style: .continuous))
                    .overlay(RoundedRectangle(cornerRadius: 7).stroke(Color.black.opacity(0.10)))
            }
            .buttonStyle(.plain)

            Spacer()

            HStack(spacing: 0) {
                ToggleModeButton(title: "网格", symbol: "square.grid.2x2", active: isGridMode) {
                    isGridMode = true
                }
                ToggleModeButton(title: "列表", symbol: "list.bullet", active: !isGridMode) {
                    isGridMode = false
                }
            }
            .padding(2)
            .background(Color(nsColor: .controlColor).opacity(0.45), in: RoundedRectangle(cornerRadius: 8, style: .continuous))
        }
    }
}

struct FilterPicker: View {
    @Binding var selection: String
    let options: [String]

    var body: some View {
        Menu {
            ForEach(options, id: \.self) { option in
                Button(option) {
                    selection = option
                }
            }
        } label: {
            HStack(spacing: 10) {
                Text(selection)
                    .font(.system(size: 13, weight: .medium))
                Spacer()
                Image(systemName: "chevron.down")
                    .font(.system(size: 10, weight: .semibold))
                    .foregroundStyle(.secondary)
            }
            .padding(.horizontal, 12)
            .frame(width: 132, height: 34)
            .background(.white, in: RoundedRectangle(cornerRadius: 7, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 7).stroke(Color.black.opacity(0.10)))
        }
        .buttonStyle(.plain)
    }
}

struct ToggleModeButton: View {
    let title: String
    let symbol: String
    let active: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Label(title, systemImage: symbol)
                .font(.system(size: 13, weight: .semibold))
                .foregroundStyle(active ? .blue : .secondary)
                .padding(.horizontal, 12)
                .frame(height: 32)
                .background(active ? .white : .clear, in: RoundedRectangle(cornerRadius: 7, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 7).stroke(active ? Color.blue : Color.clear, lineWidth: 1.2))
        }
        .buttonStyle(.plain)
    }
}

struct SourceMaterialCard: View {
    let card: MaterialCard

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .center, spacing: 9) {
                Image(systemName: card.icon)
                    .font(.system(size: 20, weight: .semibold))
                    .foregroundStyle(.white)
                    .frame(width: 30, height: 30)
                    .background(card.accent, in: RoundedRectangle(cornerRadius: 8, style: .continuous))

                Text(card.source)
                    .font(.system(size: 13, weight: .semibold))

                Text(card.sourceBadge)
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundStyle(.secondary)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color(nsColor: .controlColor).opacity(0.55), in: Capsule())

                Spacer()

                Image(systemName: "bookmark")
                    .font(.system(size: 16, weight: .medium))
                    .foregroundStyle(.secondary)
            }

            Text(card.title)
                .font(.system(size: 16, weight: .bold))
                .lineLimit(2)

            TagCloud(tags: card.tags)

            MaterialPreview(kind: card.preview)
                .frame(height: 132)
                .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))

            Text(card.note)
                .font(.system(size: 12))
                .foregroundStyle(.secondary)
                .lineSpacing(3)
                .lineLimit(3)
        }
        .padding(14)
        .background(.white, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.black.opacity(0.08)))
    }
}

struct SourceMaterialListRow: View {
    let card: MaterialCard

    var body: some View {
        HStack(spacing: 14) {
            MaterialPreview(kind: card.preview)
                .frame(width: 180, height: 92)
                .clipShape(RoundedRectangle(cornerRadius: 8))
            VStack(alignment: .leading, spacing: 7) {
                Text("\(card.source) · \(card.sourceBadge)")
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundStyle(.secondary)
                Text(card.title)
                    .font(.system(size: 16, weight: .bold))
                Text(card.note)
                    .font(.system(size: 12))
                    .foregroundStyle(.secondary)
                    .lineLimit(2)
                TagCloud(tags: card.tags)
            }
            Spacer()
            Image(systemName: "bookmark")
                .foregroundStyle(.secondary)
        }
        .padding(14)
        .background(.white, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.black.opacity(0.08)))
    }
}

struct TagCloud: View {
    let tags: [String]

    var body: some View {
        HStack(spacing: 6) {
            ForEach(tags, id: \.self) { tag in
                Text(tag)
                    .font(.system(size: 11, weight: .medium))
                    .foregroundStyle(.secondary)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color(nsColor: .controlColor).opacity(0.52), in: RoundedRectangle(cornerRadius: 6, style: .continuous))
            }
        }
    }
}

struct TagRow: View {
    let items: [String]

    var body: some View {
        FlowLayout(spacing: 6) {
            ForEach(items.prefix(4), id: \.self) { item in
                Text(item)
                    .font(.caption2.weight(.medium))
                    .foregroundStyle(.secondary)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.primary.opacity(0.06), in: Capsule())
            }
        }
    }
}

struct MaterialPreview: View {
    let kind: MaterialCard.PreviewKind

    var body: some View {
        ZStack {
            switch kind {
            case .flow:
                FlowPreview()
            case .phones:
                PhonesPreview()
            case .particles:
                ParticlePreview()
            case .hero:
                HeroTemplatePreview()
            case .portfolio:
                PortfolioPreview()
            case .palette:
                PalettePreview()
            }
        }
        .background(Color.blue.opacity(0.04))
    }
}

struct FlowPreview: View {
    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 8)
                .fill(LinearGradient(colors: [Color.blue.opacity(0.04), Color.blue.opacity(0.14)], startPoint: .topLeading, endPoint: .bottomTrailing))
            HStack(spacing: 15) {
                ForEach(0..<4, id: \.self) { index in
                    VStack(spacing: 7) {
                        RoundedRectangle(cornerRadius: 6)
                            .fill(index == 1 ? Color.blue : Color.white)
                            .frame(width: 36, height: 54)
                            .overlay(RoundedRectangle(cornerRadius: 6).stroke(Color.blue.opacity(0.22)))
                        Capsule()
                            .fill(Color.blue.opacity(0.18))
                            .frame(width: 48, height: 6)
                    }
                    if index < 3 {
                        Image(systemName: "arrow.right")
                            .foregroundStyle(.blue.opacity(0.6))
                    }
                }
            }
        }
    }
}

struct PhonesPreview: View {
    var body: some View {
        HStack(spacing: 8) {
            ForEach(0..<4, id: \.self) { index in
                RoundedRectangle(cornerRadius: 12)
                    .fill(index.isMultiple(of: 2) ? Color.black : Color.white)
                    .frame(width: 54)
                    .overlay {
                        VStack(spacing: 5) {
                            Capsule().fill(index.isMultiple(of: 2) ? .white.opacity(0.24) : .blue.opacity(0.25)).frame(height: 8)
                            RoundedRectangle(cornerRadius: 5).fill(.blue.opacity(0.55)).frame(height: 36)
                            Capsule().fill(index.isMultiple(of: 2) ? .white.opacity(0.22) : .black.opacity(0.12)).frame(height: 7)
                            Capsule().fill(index.isMultiple(of: 2) ? .white.opacity(0.16) : .black.opacity(0.08)).frame(height: 7)
                        }
                        .padding(8)
                    }
                    .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.black.opacity(0.10)))
            }
        }
        .padding(14)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.black.opacity(0.05))
    }
}

struct ParticlePreview: View {
    var body: some View {
        ZStack {
            LinearGradient(colors: [.black, .indigo.opacity(0.85)], startPoint: .topLeading, endPoint: .bottomTrailing)
            ForEach(0..<38, id: \.self) { index in
                Circle()
                    .fill(index.isMultiple(of: 3) ? Color.blue.opacity(0.65) : Color.purple.opacity(0.55))
                    .frame(width: CGFloat(3 + (index % 4)), height: CGFloat(3 + (index % 4)))
                    .position(x: CGFloat(18 + (index * 29) % 260), y: CGFloat(18 + (index * 17) % 104))
            }
            Circle()
                .stroke(.white.opacity(0.86), lineWidth: 1.4)
                .frame(width: 42, height: 42)
                .overlay(Image(systemName: "play.fill").foregroundStyle(.white))
        }
    }
}

struct HeroTemplatePreview: View {
    var body: some View {
        ZStack {
            LinearGradient(colors: [.black, .blue.opacity(0.65)], startPoint: .topLeading, endPoint: .bottomTrailing)
            HStack {
                VStack(alignment: .leading, spacing: 8) {
                    Capsule().fill(.white.opacity(0.82)).frame(width: 114, height: 10)
                    Capsule().fill(.white.opacity(0.38)).frame(width: 86, height: 7)
                    RoundedRectangle(cornerRadius: 6).fill(.blue).frame(width: 64, height: 22)
                }
                Spacer()
                ZStack {
                    RoundedRectangle(cornerRadius: 10).fill(.black.opacity(0.42)).frame(width: 116, height: 72).offset(x: -14, y: 9)
                    RoundedRectangle(cornerRadius: 10).fill(.white.opacity(0.16)).frame(width: 116, height: 72).offset(x: 12, y: -8)
                }
            }
            .padding(18)
        }
    }
}

struct PortfolioPreview: View {
    var body: some View {
        HStack(spacing: 0) {
            Rectangle().fill(.white)
                .overlay(alignment: .topLeading) {
                    VStack(alignment: .leading, spacing: 5) {
                        Text("Human")
                        Text("Unlimited")
                    }
                    .font(.system(size: 11, weight: .bold))
                    .padding(12)
                }
            Rectangle().fill(LinearGradient(colors: [.black, .gray], startPoint: .top, endPoint: .bottom))
                .overlay(Image(systemName: "figure.run").font(.system(size: 30)).foregroundStyle(.white.opacity(0.72)))
            Rectangle().fill(Color(nsColor: .controlColor))
                .overlay(alignment: .topLeading) {
                    Text("BUILDING\nDIGITAL\nPRODUCTS")
                        .font(.system(size: 10, weight: .bold))
                        .padding(12)
                }
        }
    }
}

struct PalettePreview: View {
    private let colors: [Color] = [.blue, .purple, .cyan, .green, .orange, .gray.opacity(0.28)]

    var body: some View {
        HStack(spacing: 12) {
            ForEach(Array(colors.enumerated()), id: \.offset) { _, color in
                RoundedRectangle(cornerRadius: 8)
                    .fill(LinearGradient(colors: [color, color.opacity(0.58)], startPoint: .top, endPoint: .bottom))
                    .frame(width: 36)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(.white)
    }
}

struct BlueprintTable: View {
    private let rows: [(String, Color, String, String, Int, String, String)] = [
        ("1", .blue, "Hero 区粒子动效 + 渐变背景", "快速建立科技感与产品差异化，增强冲击力与记忆点。", 4, "提升品牌记忆度", "+35%"),
        ("2", .green, "科技蓝柔和配色方案", "平衡科技感与亲和力，降低用户心理距离，提升信任感。", 3, "提升用户信任度", "+28%"),
        ("3", .orange, "卡片式信息层级布局", "清晰的信息层级，帮助用户快速理解产品价值与功能。", 3, "提升信息理解速率", "+40%")
    ]

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                Text("执行蓝图（Blueprint）")
                    .font(.system(size: 16, weight: .bold))
                Image(systemName: "info.circle")
                    .foregroundStyle(.secondary)
                Spacer()
            }

            VStack(spacing: 0) {
                HStack {
                    TableHeader("优先级", width: 74)
                    TableHeader("推荐内容", width: 270)
                    TableHeader("推荐理由", width: 330)
                    TableHeader("实现难度", width: 150)
                    TableHeader("预期效果", width: 160)
                    Spacer()
                }
                .padding(.horizontal, 14)
                .padding(.bottom, 8)

                ForEach(rows, id: \.0) { row in
                    HStack(spacing: 0) {
                        Text(row.0)
                            .font(.system(size: 13, weight: .bold))
                            .foregroundStyle(.white)
                            .frame(width: 30, height: 26)
                            .background(row.1, in: RoundedRectangle(cornerRadius: 7, style: .continuous))
                            .frame(width: 74, alignment: .leading)

                        HStack(spacing: 8) {
                            Image(systemName: row.0 == "1" ? "sparkles" : row.0 == "2" ? "paintpalette" : "rectangle.3.group")
                                .foregroundStyle(row.1)
                            Text(row.2)
                                .font(.system(size: 12, weight: .semibold))
                        }
                        .frame(width: 270, alignment: .leading)

                        Text(row.3)
                            .font(.system(size: 12))
                            .foregroundStyle(.secondary)
                            .frame(width: 330, alignment: .leading)

                        DifficultyDots(count: row.4, color: row.1)
                            .frame(width: 150, alignment: .leading)

                        VStack(alignment: .leading, spacing: 2) {
                            Text(row.5)
                                .font(.system(size: 12, weight: .semibold))
                            Text(row.6)
                                .font(.system(size: 12, weight: .bold))
                                .foregroundStyle(.green)
                        }
                        .frame(width: 160, alignment: .leading)
                        Spacer()
                    }
                    .padding(.horizontal, 14)
                    .padding(.vertical, 8)

                    if row.0 != rows.last?.0 {
                        Divider()
                    }
                }
            }

            HStack {
                Button { } label: {
                    Label("查看完整执行方案", systemImage: "arrow.right")
                        .labelStyle(.titleAndIcon)
                }
                .buttonStyle(.plain)
                .foregroundStyle(.blue)
                .font(.system(size: 13, weight: .semibold))

                Spacer()

                Button { } label: {
                    Label("导出方案", systemImage: "square.and.arrow.down")
                        .font(.system(size: 13, weight: .semibold))
                        .padding(.horizontal, 12)
                        .frame(height: 30)
                        .background(.white, in: RoundedRectangle(cornerRadius: 7, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 7).stroke(Color.black.opacity(0.10)))
                }
                .buttonStyle(.plain)
            }
            .padding(.horizontal, 14)
            .padding(.top, 2)
        }
        .padding(14)
        .background(.white, in: RoundedRectangle(cornerRadius: 10, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.black.opacity(0.08)))
    }
}

struct TableHeader: View {
    let text: String
    let width: CGFloat

    init(_ text: String, width: CGFloat) {
        self.text = text
        self.width = width
    }

    var body: some View {
        Text(text)
            .font(.system(size: 11, weight: .semibold))
            .foregroundStyle(.secondary)
            .frame(width: width, alignment: .leading)
    }
}

struct DifficultyDots: View {
    let count: Int
    let color: Color

    var body: some View {
        HStack(spacing: 5) {
            ForEach(0..<5, id: \.self) { index in
                Circle()
                    .fill(index < count ? color : Color(nsColor: .controlColor))
                    .frame(width: 8, height: 8)
            }
        }
    }
}
