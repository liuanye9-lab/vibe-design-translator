# Agent Workflow Layer

> Phase 5: Agent Workflow Foundation

## 为什么需要 Agent Workflow

Vibe Design Translator 的核心价值是把模糊的审美需求翻译成可执行的前端 Prompt。这个过程涉及多个步骤：

1. 理解用户的设计 Brief
2. 推荐视觉方向
3. 生成 Design Execution Pack
4. 编译工具专用 Prompt
5. 诊断现有页面
6. 生成重构 Prompt

在 Phase 4 之前，这些步骤是分散的——用户需要手动在不同页面之间跳转。Agent Workflow Layer 的目标是：

- **可视化执行过程**：用户能看到每一步的状态和进度
- **自动化步骤串联**：减少手动操作，提高效率
- **可审计的执行历史**：每一步都有完整的事件日志
- **失败恢复能力**：支持重试失败的步骤

## 核心概念

### AgentRun

一个完整的 Agent 工作流执行实例。

```typescript
interface AgentRun {
  id: string;
  projectId?: string | null;
  type: AgentRunType;  // design_translation | page_diagnosis | refactor_prompt | project_export
  title: string;
  status: AgentRunStatus;  // idle | running | waiting_for_user | succeeded | failed | cancelled
  progress: number;  // 0-100
  steps: AgentStep[];
  events: AgentEvent[];
  result?: unknown;
  error?: string;
  createdAt: string;
  updatedAt: string;
}
```

### AgentStep

工作流中的一个原子步骤。

```typescript
interface AgentStep {
  id: string;
  name: string;
  description: string;
  skillId?: string;  // 关联的 Skill ID
  status: AgentStepStatus;  // pending | running | succeeded | failed | skipped
  progress: number;  // 0-100
  inputSummary?: string;
  outputSummary?: string;
  error?: string;
  requiresApproval?: boolean;
  approved?: boolean;
}
```

### AgentSkill

可组合的能力模块，是工作流的构建块。

```typescript
interface AgentSkill<Input, Output> {
  id: string;
  name: string;
  description: string;
  run(input: Input, context: AgentContext): Promise<Output>;
}
```

### AgentEvent

不可变的事件记录，用于完整的审计追踪。

```typescript
interface AgentEvent {
  id: string;
  type: AgentEventType;
  message: string;
  stepId?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}
```

## 三个标准工作流

### 1. Design Translation Workflow

把用户的 Design Brief 翻译成可执行的设计方案。

**步骤：**
1. 理解设计 Brief → `brief-interpreter`
2. 推荐视觉方向 → `direction-planner`
3. 选择视觉方向 → 需要用户确认
4. 生成 Execution Pack → `execution-pack-generator`
5. 编译工具专用 Prompt → `prompt-compiler`
6. 保存到项目

### 2. Page Diagnosis Workflow

诊断现有页面的 AI 味问题。

**步骤：**
1. 读取诊断输入
2. 视觉诊断 → `vision-diagnosis`
3. 分析诊断结果
4. 生成重构 Prompt → `refactor-prompt-generator`
5. 保存诊断报告

### 3. Refactor Prompt Workflow

基于诊断结果生成重构 Prompt。

**步骤：**
1. 读取诊断报告
2. 选择目标工具
3. 生成重构 Prompt → `refactor-prompt-generator`
4. 保存 Prompt

## Skill Registry 设计

所有 Skill 都注册在统一的 Registry 中：

```typescript
class SkillRegistry {
  private skills = new Map<string, AnyAgentSkill>();

  register(skill: AnyAgentSkill): void;
  get(id: string): AnyAgentSkill | undefined;
  has(id: string): boolean;
  getAll(): AnyAgentSkill[];
}

export const skillRegistry = new SkillRegistry();
```

### 已注册的 Skills

| Skill ID | 名称 | 输入 | 输出 |
|----------|------|------|------|
| `brief-interpreter` | 理解设计 Brief | DesignBrief | BriefInterpretation |
| `direction-planner` | 推荐视觉方向 | DesignBrief | DirectionRecommendation[] |
| `execution-pack-generator` | 生成 Execution Pack | PackGeneratorInput | DesignExecutionPack |
| `prompt-compiler` | 编译工具专用 Prompt | PromptCompilerInput | string |
| `vision-diagnosis` | 视觉诊断 | DiagnosisInput | DiagnosisReport |
| `refactor-prompt-generator` | 生成重构 Prompt | RefactorPromptInput | string |
| `project-exporter` | 导出项目 | ProjectExporterInput | ProjectExporterOutput |

## Workflow Orchestrator 设计

Orchestrator 负责执行工作流：

```typescript
// 创建并执行设计翻译工作流
const run = await runDesignTranslationWorkflow(brief, context, callbacks);

// 创建并执行诊断工作流
const run = await runDiagnosisWorkflow(input, tool, context, callbacks);

// 创建并执行重构工作流
const run = await runRefactorWorkflow(report, tool, context, callbacks);

// 取消工作流
cancelAgentRun(run, callbacks);

// 重试失败步骤
retryFailedStep(run, stepId, input, context, callbacks);
```

### 回调机制

Orchestrator 通过回调与 UI 层通信：

```typescript
interface OrchestratorCallbacks {
  onRunUpdate: (run: AgentRun) => void;
  onEvent: (runId: string, event: AgentEvent) => void;
  onStepUpdate: (runId: string, step: AgentStep) => void;
}
```

## 安全边界

### 当前限制（Phase 5）

- 所有工作流在客户端/local 状态中运行
- 不需要后台队列
- 不需要数据库持久化
- 使用 localStorage 持久化 Agent Runs

### 人工确认门控

某些步骤需要用户确认：

```typescript
interface AgentStep {
  requiresApproval?: boolean;
  approved?: boolean;
}
```

当 `requiresApproval: true` 时，工作流会暂停并等待用户确认。

## 后续扩展

### Phase 6+ 计划

- **MCP Tool Adapter**：接入外部工具
- **Real Background Job Queue**：后台任务队列
- **Persistent DB-backed Workflow**：数据库持久化
- **Multi-agent Role Separation**：多角色 Agent
- **Human Approval Policy**：更细粒度的审批策略
- **Workflow Replay / Diff**：工作流重放和对比
- **Agent Evaluation Metrics**：Agent 评估指标

## 设计原则参考

### OpenClaw 可借鉴

- **Gateway 思路**：统一控制任务、工具和事件
- **Skills 思路**：把能力拆成可组合模块
- **Workspace 思路**：每个项目有自己的上下文
- **Security 思路**：高风险操作需要确认

### Claude Code 可借鉴

- **Plan → Execute → Verify**：计划-执行-验证模式
- **Tool call trace**：工具调用追踪
- **Append-only session/event log**：只追加的会话/事件日志
- **Human approval gate**：人工确认门控
- **Retry failed step**：重试失败步骤
- **Progress visibility**：进度可见性

### Hermes 类 Agent 可借鉴

- **强执行任务链**：严格的步骤执行
- **输出过程透明**：执行过程完全可见
- **每一步都可审计**：完整的审计追踪
- **失败后能继续**：失败恢复能力
