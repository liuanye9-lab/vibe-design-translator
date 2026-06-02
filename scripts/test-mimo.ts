// ============================================================
// Test Mimo API Connection
// ============================================================
// Run: npx tsx scripts/test-mimo.ts

const MIMO_API_BASE = "https://token-plan-cn.xiaomimimo.com/v1";
const MIMO_API_KEY = "tp-ckrfbwn447mrqr9o6yg18ba8pygk81m2f1jo80jghexk1uhh";
const MIMO_MODEL = "mimo-v2.5-pro";

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
