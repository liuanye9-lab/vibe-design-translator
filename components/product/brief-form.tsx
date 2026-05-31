// ============================================================
// Vibe Design Translator - Brief Form Component
// ============================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DesignBrief, UserMode, VisualIntensity, ContentDensity, ToolType } from "@/lib/types";
import { useDesignStore } from "@/store/use-design-store";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { TagGroup, TagPill } from "@/components/ui/tag-pill";
import { SectionLabel } from "@/components/ui/section-heading";
import { PRODUCT_CATEGORIES, DESIRED_FEELING_OPTIONS, AVOIDED_FEELING_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, RotateCcw } from "lucide-react";

interface BriefFormProps {
  mode: UserMode;
}

export function BriefForm({ mode }: BriefFormProps) {
  const router = useRouter();
  const { updateBrief, setMode, addHistory } = useDesignStore();

  // Form state
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [targetUsers, setTargetUsers] = useState("");
  const [pageGoal, setPageGoal] = useState("");
  const [desiredFeeling, setDesiredFeeling] = useState<string[]>([]);
  const [avoidedFeeling, setAvoidedFeeling] = useState<string[]>([]);
  const [mainCTA, setMainCTA] = useState("");
  const [visualIntensity, setVisualIntensity] = useState<VisualIntensity>("balanced");
  const [contentDensity, setContentDensity] = useState<ContentDensity>("standard");
  const [outputTool, setOutputTool] = useState<ToolType>("claude-code");

  // Light mode (no-idea) just needs product name
  const isLightMode = mode === "no-idea";

  const handleToggleFeeling = (feeling: string, currentList: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentList.includes(feeling)) {
      setter(currentList.filter((f) => f !== feeling));
    } else {
      setter([...currentList, feeling]);
    }
  };

  const handleSubmit = () => {
    const brief: DesignBrief = {
      productName: productName || "My Product",
      productCategory: productCategory || PRODUCT_CATEGORIES[0],
      targetUsers: targetUsers || "General users",
      pageGoal: pageGoal || "Create awareness and drive conversions",
      desiredFeeling: desiredFeeling.length > 0 ? desiredFeeling : ["Professional", "Trustworthy"],
      avoidedFeeling: avoidedFeeling.length > 0 ? avoidedFeeling : ["Generic AI", "Template-like"],
      mainCTA: mainCTA || "Get Started",
      visualIntensity,
      contentDensity,
      outputTool,
    };

    setMode(mode);
    updateBrief(brief);
    addHistory({ type: "brief_created", data: brief });

    router.push("/directions");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <GlassCard className="p-8">
        <div className="space-y-8">
          {/* Product Name */}
          <div>
            <SectionLabel>Product Name</SectionLabel>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter your product or project name"
              className="input"
            />
          </div>

          {/* Product Category */}
          <div>
            <SectionLabel>Product Category</SectionLabel>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="select"
            >
              <option value="">Select a category</option>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Target Users */}
          <div>
            <SectionLabel>Target Users</SectionLabel>
            <input
              type="text"
              value={targetUsers}
              onChange={(e) => setTargetUsers(e.target.value)}
              placeholder="e.g., Developers, Marketing teams, Small businesses"
              className="input"
            />
          </div>

          {/* Page Goal (full mode only) */}
          {!isLightMode && (
            <div>
              <SectionLabel>Page Goal</SectionLabel>
              <textarea
                value={pageGoal}
                onChange={(e) => setPageGoal(e.target.value)}
                placeholder="What should this page accomplish? What is the primary call-to-action?"
                className="textarea"
              />
            </div>
          )}

          {/* Desired Feeling */}
          <div>
            <SectionLabel>Desired Feeling</SectionLabel>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Select the emotions your page should evoke
            </p>
            <TagGroup>
              {DESIRED_FEELING_OPTIONS.map((feeling) => (
                <TagPill
                  key={feeling}
                  active={desiredFeeling.includes(feeling)}
                  onClick={() => handleToggleFeeling(feeling, desiredFeeling, setDesiredFeeling)}
                >
                  {feeling}
                </TagPill>
              ))}
            </TagGroup>
          </div>

          {/* Avoided Feeling */}
          {!isLightMode && (
            <div>
              <SectionLabel>What to Avoid</SectionLabel>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                Select feelings or styles you want to avoid
              </p>
              <TagGroup>
                {AVOIDED_FEELING_OPTIONS.map((feeling) => (
                  <TagPill
                    key={feeling}
                    active={avoidedFeeling.includes(feeling)}
                    onClick={() => handleToggleFeeling(feeling, avoidedFeeling, setAvoidedFeeling)}
                  >
                    {feeling}
                  </TagPill>
                ))}
              </TagGroup>
            </div>
          )}

          {/* Main CTA */}
          {!isLightMode && (
            <div>
              <SectionLabel>Primary Call-to-Action</SectionLabel>
              <input
                type="text"
                value={mainCTA}
                onChange={(e) => setMainCTA(e.target.value)}
                placeholder="e.g., Get Started Free, Book a Demo, Try Now"
                className="input"
              />
            </div>
          )}

          {/* Visual Intensity */}
          <div>
            <SectionLabel>Visual Intensity</SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              {(["minimal", "balanced", "expressive"] as VisualIntensity[]).map((intensity) => (
                <button
                  key={intensity}
                  onClick={() => setVisualIntensity(intensity)}
                  className={cn(
                    "p-4 rounded-2xl text-center transition-all duration-200",
                    visualIntensity === intensity
                      ? "bg-[var(--color-accent-ios-blue)] text-white"
                      : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-strong)]"
                  )}
                >
                  <span className="block font-medium capitalize">{intensity}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Density */}
          <div>
            <SectionLabel>Content Density</SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              {(["light", "standard", "dense"] as ContentDensity[]).map((density) => (
                <button
                  key={density}
                  onClick={() => setContentDensity(density)}
                  className={cn(
                    "p-4 rounded-2xl text-center transition-all duration-200",
                    contentDensity === density
                      ? "bg-[var(--color-accent-ios-blue)] text-white"
                      : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-strong)]"
                  )}
                >
                  <span className="block font-medium capitalize">{density}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Output Tool */}
          <div>
            <SectionLabel>Output Tool</SectionLabel>
            <select
              value={outputTool}
              onChange={(e) => setOutputTool(e.target.value as ToolType)}
              className="select"
            >
              <option value="codex">Codex</option>
              <option value="claude-code">Claude Code</option>
              <option value="gemini">Gemini</option>
              <option value="workbuddy">WorkBuddy</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <LiquidButton
              onClick={handleSubmit}
              className="w-full"
              size="lg"
            >
              <span>Generate Design Directions</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </LiquidButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}