import { DiagnosisRunInput, EvaluationArtifact, PackRunInput, WorkflowRunArtifact, WorkflowRunRecord } from "./types";

const STORAGE_KEY = "vibe_translator_agent_runs";

function nowIso(): string {
  return new Date().toISOString();
}

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readRuns(): WorkflowRunRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRuns(runs: WorkflowRunRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(runs.slice(0, 100)));
}

function diagnosisEvaluation(score: number, findingCount: number): EvaluationArtifact {
  return {
    overallScore: score,
    passed: score >= 70,
    notes: [
      score >= 70 ? "Design baseline is acceptable." : "Design needs visible refactoring before handoff.",
      `${findingCount} diagnosis findings captured as evidence.`,
    ],
  };
}

function packEvaluation(criteriaCount: number): EvaluationArtifact {
  return {
    overallScore: criteriaCount >= 5 ? 82 : 68,
    passed: criteriaCount >= 5,
    notes: [
      `${criteriaCount} acceptance criteria included.`,
      "Execution pack is ready for tool-specific prompt handoff.",
    ],
  };
}

function artifact(input: Omit<WorkflowRunArtifact, "id" | "createdAt">): WorkflowRunArtifact {
  return {
    ...input,
    id: generateId("artifact"),
    createdAt: nowIso(),
  };
}

export const artifactStorage = {
  listRuns(): WorkflowRunRecord[] {
    return readRuns().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  },

  getRun(id: string): WorkflowRunRecord | null {
    return readRuns().find((run) => run.id === id) ?? null;
  },

  saveRun(run: WorkflowRunRecord): void {
    const runs = readRuns();
    const next = [run, ...runs.filter((item) => item.id !== run.id)];
    writeRuns(next);
  },

  clearRuns(): void {
    writeRuns([]);
  },

  createRunFromDiagnosis(input: DiagnosisRunInput): WorkflowRunRecord {
    const timestamp = nowIso();
    const runId = generateId("run");
    const evaluation = diagnosisEvaluation(input.report.overallScore, input.report.findings.length);
    const artifacts: WorkflowRunArtifact[] = [
      artifact({
        runId,
        agentStepId: "diagnosis.report",
        type: "diagnosis",
        title: "Diagnosis report",
        content: JSON.stringify(input.report),
        providerUsed: input.providerUsed,
        locale: input.locale,
      }),
      artifact({
        runId,
        agentStepId: "diagnosis.evaluation",
        type: "evaluation",
        title: "Diagnosis evaluation",
        content: JSON.stringify(evaluation),
        providerUsed: input.providerUsed,
        locale: input.locale,
        evaluation,
      }),
    ];

    if (input.screenshotAsset?.dataUrl) {
      artifacts.push(artifact({
        runId,
        agentStepId: "diagnosis.screenshot",
        type: "screenshot",
        title: input.screenshotAsset.name,
        url: input.screenshotAsset.dataUrl,
        providerUsed: input.providerUsed,
        locale: input.locale,
      }));
    }

    return {
      id: runId,
      title: `${input.form.pageType} diagnosis`,
      taskMeta: {
        pageType: input.form.pageType,
        providerUsed: input.providerUsed,
        locale: input.locale,
        targetTool: input.targetTool,
      },
      artifacts,
      evaluation,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  },

  createRunFromPack(input: PackRunInput): WorkflowRunRecord {
    const timestamp = nowIso();
    const runId = generateId("run");
    const evaluation = packEvaluation(input.pack.acceptanceCriteria.length);

    return {
      id: runId,
      title: `${input.brief.productName} execution pack`,
      taskMeta: {
        productName: input.brief.productName,
        providerUsed: input.providerUsed,
        locale: input.locale,
        targetTool: input.targetTool,
      },
      artifacts: [
        artifact({
          runId,
          agentStepId: "pack.execution",
          type: "pack",
          title: `${input.directionName} execution pack`,
          content: JSON.stringify(input.pack),
          providerUsed: input.providerUsed,
          locale: input.locale,
        }),
        artifact({
          runId,
          agentStepId: "pack.prompt",
          type: "prompt",
          title: `${input.targetTool} prompt`,
          content: input.pack.prompts[input.targetTool],
          providerUsed: input.providerUsed,
          locale: input.locale,
        }),
        artifact({
          runId,
          agentStepId: "pack.evaluation",
          type: "evaluation",
          title: "Pack evaluation",
          content: JSON.stringify(evaluation),
          providerUsed: input.providerUsed,
          locale: input.locale,
          evaluation,
        }),
      ],
      evaluation,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  },
};
