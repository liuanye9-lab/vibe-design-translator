// ============================================================
// Test Mimo API Connection
// ============================================================
// Run: MIMO_API_KEY=your_key npx tsx scripts/test-mimo.ts

const MIMO_API_BASE = process.env.MIMO_API_BASE || "https://token-plan-cn.xiaomimimo.com/v1";
const MIMO_API_KEY = process.env.MIMO_API_KEY || "";
const MIMO_MODEL = process.env.MIMO_MODEL || "mimo-v2.5-pro";

if (!MIMO_API_KEY) {
  console.error("❌ MIMO_API_KEY environment variable is required");
  console.error("Usage: MIMO_API_KEY=your_key npx tsx scripts/test-mimo.ts");
  process.exit(1);
}

async function testMimoAPI() {
  console.log("🧪 Testing Mimo API Connection...");
  console.log(`📍 API Base: ${MIMO_API_BASE}`);
  console.log(`🤖 Model: ${MIMO_MODEL}`);
  console.log("---");

  try {
    const response = await fetch(`${MIMO_API_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MIMO_API_KEY}`,
      },
      body: JSON.stringify({
        model: MIMO_MODEL,
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. Respond briefly.",
          },
          {
            role: "user",
            content: "Say 'Hello from Mimo!' in one sentence.",
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    console.log(`📊 Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const error = await response.text();
      console.error("❌ Error:", error);
      return;
    }

    const data = await response.json();
    console.log("✅ Success!");
    console.log("📝 Response:", data.choices?.[0]?.message?.content);
    console.log("📈 Usage:", data.usage);
  } catch (error) {
    console.error("❌ Connection failed:", error);
  }
}

testMimoAPI();
