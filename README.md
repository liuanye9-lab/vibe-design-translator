# Vibe Design Translator

> **AI 时代的「设计翻译官」** —— 把你说不出口的审美，翻译成 AI 听得懂的指令

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwindcss)
![Zustand](https://img.shields.io/badge/State-Zustand-2D3748?style=flat-square)
![AI Ready](https://img.shields.io/badge/AI-Provider%20Ready-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Phase%205%20Agent%20Workflow-brightgreen?style=flat-square)

---

## 一句话说清楚

**Vibe Design Translator** 是一个「设计翻译官」，帮你把「我想要高级一点」这种模糊感觉，翻译成 AI 能执行的前端设计指令。

```mermaid
graph LR
    A["🗣️ 你说：<br/>我想要高级一点"] --> B["🔄 翻译官"]
    B --> C["📋 AI 拿到：<br/>色彩系统 + 字体层级 + 间距规则<br/>+ 动效约束 + 验收标准"]
    
    style A fill:#f0f4ff,stroke:#6366f1
    style B fill:#fef3c7,stroke:#f59e0b
    style C fill:#ecfdf5,stroke:#10b981
```

---

## 为什么需要这个「翻译官」？

### 一个真实场景

你用 AI Coding 工具（Claude Code / Cursor / Codex）生成了一个页面。

功能都对，但你总觉得：

> 「为什么看起来这么 AI？」

```mermaid
graph TD
    A["😰 你的感受"] --> B["页面能用，但看起来很廉价"]
    B --> C["像模板批量生产的"]
    B --> D["没有品牌感"]
    B --> E["色彩/间距/字体都很普通"]
    
    C --> F["🤔 根本原因"]
    D --> F
    E --> F
    F --> G["你不会告诉 AI<br/>什么是「高级感」"]
    
    style A fill:#fef2f2,stroke:#ef4444
    style F fill:#fef3c7,stroke:#f59e0b
    style G fill:#dbeafe,stroke:#3b82f6
```

### 问题的本质

AI Coding 工具像一个**执行力超强的施工队**。

但你只说了一句：「帮我盖一栋高级一点的房子」

```mermaid
graph LR
    A["🏠 你说"] --> B["盖一栋高级的房子"]
    
    C["🏗️ 施工队理解"] --> D["盖了一栋<br/>通用样板房"]
    
    E["✅ 翻译官帮忙"] --> F["北欧极简风<br/>2层 + 落地窗<br/>橡木地板<br/>暖白色调<br/>..."]
    
    B -.->|"沟通断层"| D
    B -->|"翻译"| F
    
    style A fill:#f0f4ff,stroke:#6366f1
    style D fill:#fef2f2,stroke:#ef4444
    style F fill:#ecfdf5,stroke:#10b981
```

**Vibe Design Translator** 就是那个帮你把「高级感」翻译成具体参数的「设计顾问」。

---

## 它不是什么 vs 它是什么

```mermaid
graph TB
    subgraph "❌ 它不是"
        A1["UI 素材库<br/>（收藏好看的图）"]
        A2["设计系统<br/>（给设计师用的）"]
        A3["代码生成器<br/>（直接出页面）"]
    end
    
    subgraph "✅ 它是"
        B1["设计翻译官<br/>（把模糊需求变清晰）"]
        B2["AI 指令编译器<br/>（把审美变代码指令）"]
        B3["页面诊断医生<br/>（告诉你哪里有问题）"]
    end
    
    A1 -.->|"区别"| B1
    A2 -.->|"区别"| B2
    A3 -.->|"区别"| B3
    
    style A1 fill:#fef2f2,stroke:#ef4444
    style A2 fill:#fef2f2,stroke:#ef4444
    style A3 fill:#fef2f2,stroke:#ef4444
    style B1 fill:#ecfdf5,stroke:#10b981
    style B2 fill:#ecfdf5,stroke:#10b981
    style B3 fill:#ecfdf5,stroke:#10b981
```

---

## 三个核心场景

### 场景 1：设计翻译（生图前）

> 「我知道自己想要高级一点，但我不知道怎么描述」

```mermaid
graph LR
    A["📝 你填写<br/>设计问卷"] --> B["🎯 系统推荐<br/>3种视觉方向"]
    B --> C["📦 生成完整<br/>设计执行包"]
    C --> D["🔧 编译成<br/>工具专用 Prompt"]
    D --> E["🚀 喂给 AI<br/>生成页面"]
    
    style A fill:#f0f4ff,stroke:#6366f1
    style B fill:#fef3c7,stroke:#f59e0b
    style C fill:#ecfdf5,stroke:#10b981
    style D fill:#dbeafe,stroke:#3b82f6
    style E fill:#f3e8ff,stroke:#8b5cf6
```

**类比**：你去找设计师聊需求，设计师帮你把「高级感」拆解成具体的色彩、字体、间距、动效规则，然后写成施工图交给施工队。

---

### 场景 2：页面诊断（生图后）

> 「这个页面功能是对的，但为什么看起来这么 AI？」

```mermaid
graph LR
    A["📸 上传页面<br/>截图/描述问题"] --> B["🔍 AI 诊断<br/>7个维度"]
    B --> C["📊 生成<br/>诊断报告"]
    C --> D["💊 开出<br/>修复处方"]
    D --> E["📝 生成<br/>重构 Prompt"]
    
    style A fill:#f0f4ff,stroke:#6366f1
    style B fill:#fef3c7,stroke:#f59e0b
    style C fill:#ecfdf5,stroke:#10b981
    style D fill:#dbeafe,stroke:#3b82f6
    style E fill:#f3e8ff,stroke:#8b5cf6
```

**类比**：你拍了张照片给医生看，医生说「你这个页面有 AI 味」，然后给你开了一张「修复处方」。

---

### 场景 3：Agent 工作流（全自动）

> 「让 AI 自己跑完整个设计流程」

```mermaid
graph TD
    A["🚀 启动 Agent 工作流"] --> B["📋 Step 1: 理解 Brief"]
    B --> C["🎯 Step 2: 推荐方向"]
    C --> D["✅ Step 3: 用户确认"]
    D --> E["📦 Step 4: 生成执行包"]
    E --> F["🔧 Step 5: 编译 Prompt"]
    F --> G["✅ 完成！"]
    
    style A fill:#f0f4ff,stroke:#6366f1
    style G fill:#ecfdf5,stroke:#10b981
```

**类比**：你找了一个「设计项目经理」，他帮你协调整个流程，你只需要在关键节点确认一下。

---

## 核心能力一览

```mermaid
mindmap
  root((Vibe Design<br/>Translator))
    设计翻译
      设计问卷
      方向推荐
      执行包生成
      Prompt 编译
    页面诊断
      AI 味检测
      7维度评分
      问题发现
      修复建议
    Agent 工作流
      自动执行
      进度可视
      失败重试
      人工确认
    工具支持
      Codex
      Claude Code
      Gemini
      WorkBuddy
```

---

## 用户是谁？

```mermaid
graph TD
    subgraph "🎯 核心用户"
        A1["AI Coding 用户<br/>会用 AI 写代码，但审美弱"]
        A2["独立开发者<br/>没有设计师，要做产品官网"]
        A3["AI 产品新人<br/>作品集页面像模板"]
        A4["创业者/Founder<br/>MVP 页面影响信任"]
        A5["产品经理<br/>不会写前端设计 Prompt"]
    end
    
    A1 --> B["共同痛点"]
    A2 --> B
    A3 --> B
    A4 --> B
    A5 --> B
    B --> C["我知道自己想要高级一点<br/>但我不知道怎么描述"]
    
    style B fill:#fef3c7,stroke:#f59e0b
    style C fill:#dbeafe,stroke:#3b82f6
```

---

## 产品流程全景

```mermaid
graph LR
    subgraph "设计前"
        A1["模糊想法"] --> A2["设计反问"]
        A2 --> A3["方向推荐"]
    end
    
    subgraph "设计中"
        A3 --> B1["执行包生成"]
        B1 --> B2["Prompt 编译"]
    end
    
    subgraph "设计后"
        B2 --> C1["AI 生成页面"]
        C1 --> C2["页面诊断"]
        C2 --> C3["修复 Prompt"]
    end
    
    C3 -->|"迭代"| C1
    
    style A1 fill:#f0f4ff,stroke:#6366f1
    style B1 fill:#fef3c7,stroke:#f59e0b
    style C2 fill:#ecfdf5,stroke:#10b981
```

---

## 系统架构

```mermaid
graph TB
    subgraph "用户层"
        A1["首页<br/>三入口选择"]
        A2["Brief<br/>设计问卷"]
        A3["Diagnosis<br/>页面诊断"]
        A4["Agent Runs<br/>工作流历史"]
    end
    
    subgraph "业务层"
        B1["Design Translation<br/>设计翻译"]
        B2["Page Diagnosis<br/>页面诊断"]
        B3["Agent Workflow<br/>工作流引擎"]
    end
    
    subgraph "能力层"
        C1["Skill Registry<br/>技能注册中心"]
        C2["Provider Registry<br/>AI 供应商中心"]
        C3["Prompt Compiler<br/>Prompt 编译器"]
    end
    
    subgraph "AI 层"
        D1["Mimo<br/>小米 AI"]
        D2["OpenAI<br/>GPT-4o"]
        D3["Claude<br/>Anthropic"]
        D4["Gemini<br/>Google"]
    end
    
    A1 --> B1
    A2 --> B1
    A3 --> B2
    A4 --> B3
    
    B1 --> C1
    B2 --> C2
    B3 --> C1
    
    C1 --> D1
    C2 --> D2
    C2 --> D3
    C2 --> D4
    
    style A1 fill:#f0f4ff,stroke:#6366f1
    style A2 fill:#f0f4ff,stroke:#6366f1
    style A3 fill:#f0f4ff,stroke:#6366f1
    style A4 fill:#f0f4ff,stroke:#6366f1
```

---

## 技术栈

```mermaid
graph LR
    subgraph "前端框架"
        A1["Next.js 14<br/>App Router"]
        A2["React 18"]
        A3["TypeScript<br/>Strict Mode"]
    end
    
    subgraph "样式方案"
        B1["Tailwind CSS"]
        B2["Liquid Glass<br/>设计语言"]
    end
    
    subgraph "状态管理"
        C1["Zustand"]
        C2["localStorage"]
    end
    
    subgraph "AI 集成"
        D1["Provider<br/>Abstraction"]
        D2["Mimo API"]
        D3["OpenAI API"]
    end
    
    A1 --> A2
    A2 --> A3
    B1 --> B2
    C1 --> C2
    D1 --> D2
    D1 --> D3
```

---

## 三种视觉方向

```mermaid
graph TD
    subgraph "Calm Professional"
        A1["冷静、可信、专业"]
        A2["适合：B2B、企业 AI、数据工具"]
    end
    
    subgraph "Soft Intelligent"
        B1["温和、聪明、亲和"]
        B2["适合：教育 AI、效率工具、轻量 SaaS"]
    end
    
    subgraph "Experimental Premium"
        C1["高端、前沿、探索"]
        C2["适合：AI Agent、开发者工具、前沿产品"]
    end
    
    style A1 fill:#dbeafe,stroke:#3b82f6
    style B1 fill:#dcfce7,stroke:#22c55e
    style C1 fill:#fef3c7,stroke:#f59e0b
```

---

## 诊断维度

```mermaid
graph TD
    A["页面诊断"] --> B["AI 模板感"]
    A --> C["视觉层级"]
    A --> D["色彩控制"]
    A --> E["字体系统"]
    A --> F["间距系统"]
    A --> G["动效克制"]
    A --> H["转化清晰度"]
    
    B --> I["0-100 评分"]
    C --> I
    D --> I
    E --> I
    F --> I
    G --> I
    H --> I
    
    I --> J["诊断报告"]
    J --> K["修复建议"]
    K --> L["重构 Prompt"]
    
    style A fill:#f0f4ff,stroke:#6366f1
    style J fill:#ecfdf5,stroke:#10b981
    style L fill:#fef3c7,stroke:#f59e0b
```

---

## 如何使用

### 1. 克隆项目

```bash
git clone https://github.com/liuanye9-lab/vibe-design-translator.git
cd vibe-design-translator
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置 AI（可选）

```bash
cp .env.example .env.local
# 编辑 .env.local，填入你的 API Key
```

### 4. 启动开发

```bash
npm run dev
```

### 5. 打开浏览器

访问 http://localhost:3000

---

## 项目结构

```
vibe-design-translator/
├── app/                    # 页面路由
│   ├── page.tsx           # 首页（三入口选择）
│   ├── brief/             # 设计问卷
│   ├── directions/        # 方向推荐
│   ├── pack/              # 执行包生成
│   ├── compiler/          # Prompt 编译器
│   ├── diagnosis/         # 页面诊断
│   ├── agent-runs/        # Agent 工作流历史
│   └── workspace/         # 项目工作区
│
├── components/            # 组件库
│   ├── layout/            # 布局组件
│   ├── ui/                # UI 组件
│   ├── product/           # 业务组件
│   └── agent/             # Agent 工作流组件
│
├── lib/                   # 核心逻辑
│   ├── agent/             # Agent 工作流
│   │   ├── types.ts       # 类型定义
│   │   ├── orchestrator.ts # 工作流引擎
│   │   ├── skill-registry.ts # 技能注册中心
│   │   └── skills/        # 7个技能模块
│   ├── connectors/        # AI 供应商
│   └── diagnosis.ts       # 诊断逻辑
│
└── docs/                  # 文档
    └── AGENT_WORKFLOW.md  # Agent 工作流文档
```

---

## 当前进度

```mermaid
pie title 项目完成度
    "已完成" : 94
    "进行中" : 4
    "待开发" : 2
```

### Phase 5 Agent Workflow Foundation ✅

- ✅ Agent 类型系统
- ✅ 7 个 Agent Skills
- ✅ Skill Registry
- ✅ Workflow Orchestrator
- ✅ Agent UI 组件
- ✅ Agent Runs 页面
- ✅ Brief/Diagnosis 集成
- ✅ Mimo API 集成

---

## 路线图

```mermaid
graph LR
    A["Phase 1<br/>工程 MVP"] --> B["Phase 2<br/>设计决策"]
    B --> C["Phase 3<br/>AI 诊断"]
    C --> D["Phase 4<br/>真实 AI"]
    D --> E["Phase 5<br/>Agent 工作流"]
    E --> F["Phase 6<br/>云同步"]
    F --> G["Phase 7<br/>商业化"]
    G --> H["Phase 8<br/>API/MCP"]
    
    style E fill:#ecfdf5,stroke:#10b981
    style F fill:#fef3c7,stroke:#f59e0b
```

---

## 面试怎么说这个项目？

### 一句话版本

> 「我做了一个 AI 时代的『设计翻译官』，帮用户把模糊的审美需求翻译成 AI 能执行的前端指令。」

### 三句话版本

> 「现在很多人用 AI 写代码，但页面总是很像模板。我做的工具帮用户把『高级感』这种模糊需求翻译成具体的色彩、字体、间距规则，然后编译成不同 AI 工具的专用 Prompt。还加了诊断功能，能告诉用户页面哪里有问题、怎么修。」

### 亮点展开

1. **产品能力**：发现真实痛点（AI 生成页面同质化）
2. **AI 产品思维**：不是简单调用模型，而是设计了完整的翻译-诊断闭环
3. **工程能力**：Next.js + TypeScript + Zustand + Provider 抽象层
4. **设计能力**：把审美判断拆成可执行的结构化系统
5. **Agent 架构**：实现了可视化的工作流引擎

---

## 商业模式

```mermaid
graph TD
    subgraph "免费版"
        A1["基础方向生成"]
        A2["基础 Prompt 编译"]
        A3["少量诊断次数"]
    end
    
    subgraph "Pro 版 $9/月"
        B1["真实 AI 诊断"]
        B2["无限 Prompt 导出"]
        B3["云端项目保存"]
    end
    
    subgraph "Team 版 $29/月"
        C1["团队空间"]
        C2["品牌规则记忆"]
        C3["API/MCP 集成"]
    end
    
    A1 --> B1
    A2 --> B2
    A3 --> B3
    B1 --> C1
    B2 --> C2
    B3 --> C3
    
    style A1 fill:#dbeafe,stroke:#3b82f6
    style B1 fill:#fef3c7,stroke:#f59e0b
    style C1 fill:#ecfdf5,stroke:#10b981
```

---

## 合规说明

- ✅ 不保存第三方截图
- ✅ 不复制品牌 UI
- ✅ 使用原创抽象设计模式
- ✅ 不做侵权爬虫

---

## License

MIT License

---

## 当前版本

**Phase 5 Agent Workflow Foundation**

> 从「设计决策工具」升级为「Agent 化设计决策工作流系统」

---

<div align="center">

**[文档](./docs/AGENT_WORKFLOW.md)** · **[GitHub](https://github.com/liuanye9-lab/vibe-design-translator)** · **Issues**

</div>
