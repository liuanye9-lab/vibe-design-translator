import { NextResponse } from "next/server";
import { getProviderStatus, getVisionDiagnosisProvider } from "@/lib/connectors/provider-registry";
import { mockVisionDiagnosis } from "@/lib/connectors/mock-provider";
import { toProviderError } from "@/lib/connectors/provider-utils";
import { normalizeLocale } from "@/lib/i18n";
import { estimateUsage, getProviderUsage } from "@/lib/llm/provider-runtime";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const locale = normalizeLocale(body.locale);

    if (!body.pageType || !body.primaryPainPoint) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "pageType and primaryPainPoint are required" } },
        { status: 400 }
      );
    }

    const provider = getVisionDiagnosisProvider();
    const providerStatus = getProviderStatus();
    const diagnosisInput = {
      pageType: body.pageType,
      pageDescription: body.pageDescription || "",
      primaryPainPoint: body.primaryPainPoint,
      screenshotAsset: body.screenshotAsset || null,
      locale,
    };

    let providerUsed = providerStatus.providerUsed;
    let fallbackProvider = providerStatus.fallbackProvider;
    let providerError = undefined;
    let report;

    try {
      report = await provider.diagnose(diagnosisInput);
    } catch (error) {
      providerError = toProviderError(error, providerStatus.providerUsed);

      if (providerStatus.providerUsed === "mock") {
        throw error;
      }

      report = await mockVisionDiagnosis.diagnose(diagnosisInput);
      providerUsed = "mock";
      fallbackProvider = "mock";
    }

    const usage = getProviderUsage(providerUsed) ?? estimateUsage(diagnosisInput, report);

    return NextResponse.json({
      data: report,
      meta: {
        locale,
        configuredProvider: providerStatus.configuredProvider,
        providerUsed,
        fallbackProvider,
        usage,
        error: providerError,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: "DIAGNOSIS_FAILED",
          message: error instanceof Error ? error.message : "Failed to diagnose screenshot",
        },
      },
      { status: 500 }
    );
  }
}
