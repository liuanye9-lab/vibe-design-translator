import { NextResponse } from "next/server";
import { getDesignAIProvider, getProviderStatus } from "@/lib/connectors/provider-registry";
import { mockDesignAI } from "@/lib/connectors/mock-provider";
import { toProviderError } from "@/lib/connectors/provider-utils";
import { getDirectionById } from "@/lib/design-directions";
import { DesignBrief } from "@/lib/types";
import { normalizeLocale } from "@/lib/i18n";
import { estimateUsage, getProviderUsage } from "@/lib/llm/provider-runtime";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const brief = body.brief as DesignBrief | undefined;
    const directionId = body.directionId as string | undefined;
    const locale = normalizeLocale(body.locale);

    if (!brief || !directionId) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "brief and directionId are required" } },
        { status: 400 }
      );
    }

    const direction = getDirectionById(directionId);
    if (!direction) {
      return NextResponse.json(
        { error: { code: "DIRECTION_NOT_FOUND", message: "Unknown directionId" } },
        { status: 404 }
      );
    }

    const provider = getDesignAIProvider();
    const providerStatus = getProviderStatus();
    let providerUsed = providerStatus.providerUsed;
    let fallbackProvider = providerStatus.fallbackProvider;
    let providerError = undefined;
    let pack;

    try {
      pack = await provider.generateExecutionPack(brief, direction, locale);
    } catch (error) {
      providerError = toProviderError(error, providerStatus.providerUsed);

      if (providerStatus.providerUsed === "mock") {
        throw error;
      }

      pack = await mockDesignAI.generateExecutionPack(brief, direction, locale);
      providerUsed = "mock";
      fallbackProvider = "mock";
    }

    const usage = getProviderUsage(providerUsed) ?? estimateUsage({ brief, directionId, locale }, pack);

    return NextResponse.json({
      data: pack,
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
          code: "EXECUTION_PACK_FAILED",
          message: error instanceof Error ? error.message : "Failed to generate execution pack",
        },
      },
      { status: 500 }
    );
  }
}
