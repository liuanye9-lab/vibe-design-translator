// ============================================================
// Test Mimo API for Design Generation
// ============================================================
// Run: MIMO_API_KEY=your_key npx tsx scripts/test-mimo-design.ts

const MIMO_API_BASE = process.env.MIMO_API_BASE || "https://token-plan-cn.xiaomimimo.com/v1";
const MIMO_API_KEY = process.env.MIMO_API_KEY || "";
const MIMO_MODEL = process.env.MIMO_MODEL || "mimo-v2.5-pro";

if (!MIMO_API_KEY) {
  console.error("❌ MIMO_API_KEY environment variable is required");
  console.error("Usage: MIMO_API_KEY=your_key npx tsx scripts/test-mimo-design.ts");
  process.exit(1);
}

async function chatCompletion(
  messages: Array<{ role: string; content: string }>,
  options?: { temperature?: number; max_tokens?: number }
): Promise<string> {
  const response = await fetch(`${MIMO_API_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MIMO_API_KEY}`,
    },
    body: JSON.stringify({
      model: MIMO_MODEL,
      messages,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.max_tokens ?? 4096,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Mimo API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

async function testDirectionRecommendation() {
  console.log("🎯 Testing Design Direction Recommendation...");
  console.log("---");

  const systemPrompt = `You are a design direction recommendation engine.
Based on the user's design brief, recommend the best design direction(s).
Return a JSON array of objects with "id" and "score" (0-100) fields.

Available directions:
- "calm-professional": Enterprise, SaaS, Finance
- "soft-intelligent": Tech, Healthcare, Education
- "experimental-premium": Creative, Fashion, Luxury

Return ONLY valid JSON array, no markdown.`;

  const userPrompt = `Product: AI Code Assistant
Category: SaaS Platform
Target Users: Developers and engineering teams
Page Goal: Convert visitors to trial users
First Impression: professional
Business Priority: trust
Audience: developers`;

  const content = await chatCompletion(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    { temperature: 0.3 }
  );

  console.log("📝 Raw Response:");
  console.log(content);
  console.log("---");

  try {
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      console.log("✅ Parsed Recommendations:");
      parsed.forEach((rec: { id: string; score: number }) => {
        console.log(`  - ${rec.id}: ${rec.score}%`);
      });
    }
  } catch (e) {
    console.error("❌ Failed to parse response");
  }
}

async function testDiagnosis() {
  console.log("\n🔍 Testing Page Diagnosis...");
  console.log("---");

  const systemPrompt = `You are a UI/UX design diagnosis expert.
Analyze the page and provide a detailed diagnosis report.

Return a JSON object with:
- overallScore: number (0-100)
- scores: {
    aiTemplateFeeling: number (0-100),
    visualHierarchy: number (0-100),
    colorControl: number (0-100),
    typographySystem: number (0-100),
    spacingSystem: number (0-100),
    interactionRestraint: number (0-100),
    conversionClarity: number (0-100)
  }
- findings: string[] (issues found)
- fixes: string[] (suggested fixes)

Return ONLY valid JSON, no markdown.`;

  const userPrompt = `Page Type: landing
Pain Points: The page looks like a generic AI-generated template, lacks brand personality`;

  const content = await chatCompletion(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    { temperature: 0.3 }
  );

  console.log("📝 Raw Response:");
  console.log(content);
  console.log("---");

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      console.log("✅ Parsed Diagnosis:");
      console.log(`  Overall Score: ${parsed.overallScore}/100`);
      console.log(`  AI Template Feeling: ${parsed.scores?.aiTemplateFeeling}/100`);
      console.log(`  Findings: ${parsed.findings?.length || 0} issues`);
      console.log(`  Fixes: ${parsed.fixes?.length || 0} suggestions`);
    }
  } catch (e) {
    console.error("❌ Failed to parse response");
  }
}

async function main() {
  console.log("🚀 Mimo API Design Generation Test");
  console.log("==================================\n");

  await testDirectionRecommendation();
  await testDiagnosis();

  console.log("\n✨ Test completed!");
}

main().catch(console.error);
