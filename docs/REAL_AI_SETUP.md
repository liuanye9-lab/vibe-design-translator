# Real AI Setup Guide

本指南帮助你配置 Vibe Design Translator 使用真实 AI Provider（如 Gemini、OpenAI、Claude）。

---

## 快速开始

### 1. 复制环境变量

```bash
cp .env.example .env.local
```

### 2. 编辑 `.env.local`

```bash
# AI Provider 切换：mock | openai | claude | gemini | mimo
AI_PROVIDER=gemini

# 启用真实 AI
ENABLE_REAL_AI=true

# 启用视觉诊断（可选，需要 Provider 支持）
ENABLE_VISION_DIAGNOSIS=true

# Gemini API Key（推荐，成本低）
GEMINI_API_KEY=your_api_key_here

# 或者使用其他 Provider
# OPENAI_API_KEY=your_openai_key
# ANTHROPIC_API_KEY=your_claude_key
```

### 3. 启动开发服务器

```bash
npm run dev
```

---

## 支持的 AI Provider

### Gemini（推荐）

**优势**：
- 成本低（Gemini 1.5 Flash）
- 支持视觉诊断
- 响应速度快

**配置**：
```bash
AI_PROVIDER=gemini
ENABLE_REAL_AI=true
ENABLE_VISION_DIAGNOSIS=true
GEMINI_API_KEY=your_api_key_here
GEMINI_VISION_MODEL=gemini-1.5-flash
GEMINI_TEXT_MODEL=gemini-1.5-flash
```

**获取 API Key**：
1. 访问 [Google AI Studio](https://aistudio.google.com/apikey)
2. 创建 API Key
3. 复制到 `.env.local`

**成本估算**：
- 输入：$0.075 / 1M tokens
- 输出：$0.30 / 1M tokens
- 图片：约 $0.01 / 张

### OpenAI

**优势**：
- GPT-4o 视觉能力强
- 生态成熟

**配置**：
```bash
AI_PROVIDER=openai
ENABLE_REAL_AI=true
ENABLE_VISION_DIAGNOSIS=true
OPENAI_API_KEY=your_openai_key
OPENAI_VISION_MODEL=gpt-4o-mini
OPENAI_TEXT_MODEL=gpt-4o-mini
```

**获取 API Key**：
1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 创建 API Key
3. 复制到 `.env.local`

**成本估算**：
- GPT-4o-mini：$0.15 / 1M input tokens, $0.60 / 1M output tokens
- 图片：约 $0.002 / 张

### Claude

**优势**：
- 文本分析能力强
- 安全性高

**配置**：
```bash
AI_PROVIDER=claude
ENABLE_REAL_AI=true
ANTHROPIC_API_KEY=your_claude_key
CLAUDE_TEXT_MODEL=claude-3-5-sonnet-latest
```

**注意**：Claude 不支持视觉诊断，只能用于文本生成。

**获取 API Key**：
1. 访问 [Anthropic Console](https://console.anthropic.com/account/keys)
2. 创建 API Key
3. 复制到 `.env.local`

**成本估算**：
- Claude 3.5 Sonnet：$3 / 1M input tokens, $15 / 1M output tokens

### Mimo

**优势**：
- 国内访问快
- 中文支持好

**配置**：
```bash
AI_PROVIDER=mimo
ENABLE_REAL_AI=true
ENABLE_VISION_DIAGNOSIS=true
MIMO_API_KEY=your_mimo_key
MIMO_API_BASE=https://token-plan-cn.xiaomimimo.com/v1
MIMO_MODEL=mimo-v2.5-pro
```

**获取 API Key**：
1. 访问 [Mimo Platform](https://token-plan-cn.xiaomimimo.com)
2. 注册并获取 API Key
3. 复制到 `.env.local`

---

## 测试配置

### 1. 检查 Provider 状态

访问 `/settings` 页面，查看当前配置的 Provider。

### 2. 测试诊断功能

1. 访问 `/diagnosis`
2. 上传一张页面截图
3. 填写页面类型和痛点
4. 点击"开始诊断"
5. 观察是否使用真实 AI（查看 API Metadata）

### 3. 验证 Fallback

1. 故意设置错误的 API Key
2. 运行诊断
3. 应该看到 "Fallback to Mock" 提示
4. 报告仍然生成（使用 Mock Provider）

---

## 安全注意事项

### API Key 安全

- ✅ API Key 只在服务端使用（`app/api/` 路由）
- ✅ 不会暴露到客户端（不使用 `NEXT_PUBLIC_*`）
- ✅ 不会提交到 Git（`.gitignore` 包含 `.env.local`）
- ❌ 不要在客户端代码中使用 API Key
- ❌ 不要将 API Key 提交到版本控制

### 环境变量说明

| 变量 | 类型 | 说明 |
|------|------|------|
| `AI_PROVIDER` | 服务端 | 选择 Provider（mock/openai/claude/gemini/mimo） |
| `ENABLE_REAL_AI` | 服务端 | 启用真实 AI（true/false） |
| `ENABLE_VISION_DIAGNOSIS` | 服务端 | 启用视觉诊断（true/false） |
| `GEMINI_API_KEY` | 服务端 | Gemini API Key |
| `OPENAI_API_KEY` | 服务端 | OpenAI API Key |
| `ANTHROPIC_API_KEY` | 服务端 | Claude API Key |
| `MIMO_API_KEY` | 服务端 | Mimo API Key |

---

## 成本控制

### 建议

1. **开发阶段**：使用 Mock Provider（零成本）
2. **测试阶段**：使用 Gemini 1.5 Flash（成本最低）
3. **生产阶段**：根据需求选择 Provider

### 成本估算

每次诊断调用约消耗：
- 输入 tokens：2000-3000
- 输出 tokens：500-1000
- 图片：1 张

使用 Gemini 1.5 Flash：
- 每次诊断约 $0.01-0.02
- 100 次诊断约 $1-2

---

## 故障排除

### 问题：API Key 无效

**症状**：`Gemini API error (401): API key not valid`

**解决**：
1. 检查 API Key 是否正确复制
2. 确认 API Key 是否激活
3. 检查 API Key 权限

### 问题：视觉诊断失败

**症状**：`Gemini vision diagnosis requires a screenshot`

**解决**：
1. 确保上传了截图
2. 检查截图大小（不超过 4MB）
3. 确认 `ENABLE_VISION_DIAGNOSIS=true`

### 问题：自动 Fallback 到 Mock

**症状**：`Fallback to Mock` 提示

**原因**：
1. API Key 无效
2. API 调用失败
3. 网络问题

**解决**：
1. 检查 API Key
2. 查看控制台错误信息
3. 确认网络连接

---

## 下一步

配置完成后，你可以：

1. **测试诊断功能**：上传截图，查看真实 AI 诊断结果
2. **测试执行包生成**：填写 Brief，生成设计执行包
3. **测试重构 Prompt**：基于诊断结果生成工具专用 Prompt
4. **查看 Agent 工作流**：观察 Agent 执行过程

---

## 相关文档

- [Agent Workflow 文档](./AGENT_WORKFLOW.md)
- [README](../README.md)
- [TODO](../TODO.md)

---

**Last Updated**: 2026-06-03