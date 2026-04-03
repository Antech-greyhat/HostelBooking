require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ROOT_DIR = path.join(__dirname, "..");
const PUBLIC_DIR = ROOT_DIR;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const RESPONSE_MAX_TOKENS = Number(process.env.RESPONSE_MAX_TOKENS) || 120;
const MAX_HISTORY_MESSAGES = 10;

const groqApiKey = (process.env.GROQ_API_KEY || "").trim();

app.use(express.json({ limit: "1mb" }));
app.use(express.static(PUBLIC_DIR));

app.get("/", (_req, res) => {
  res.redirect("/pages/index.html");
});

function normalizeHistory(rawHistory) {
  if (!Array.isArray(rawHistory)) {
    return [];
  }

  return rawHistory
    .filter(
      (entry) =>
        entry &&
        (entry.role === "user" || entry.role === "assistant") &&
        typeof entry.content === "string" &&
        entry.content.trim().length > 0
    )
    .slice(-MAX_HISTORY_MESSAGES * 2)
    .map((entry) => ({ role: entry.role, content: entry.content.trim() }));
}

function buildPrompt() {
  return [
    "You are a helpful assistant for a Kenyan student hostel booking website.",
    "Give concise, practical answers about hostels, prices, booking flow, deposits, and contact support.",
    "Keep answers short, precise, and easy to understand.",
    "Target 1-3 short sentences and around 60 words or less whenever possible.",
    "Give the direct answer first, then one practical next step if needed.",
    "Avoid long numbered lists unless the user explicitly asks for detailed steps.",
    "If data is unknown, say so clearly and suggest contacting support from the website contact page.",
    "Do not invent exact availability or prices unless the user provides them in the chat context."
  ].join(" ");
}

function getDemoReply(userMessage) {
  const text = userMessage.toLowerCase();

  if (text.includes("price") || text.includes("budget") || text.includes("cost") || text.includes("kes")) {
    return "Most listings on this site are in the KES 5,600 to KES 9,800 range per month. Use the Hostels page filters to set your max budget and sort by lowest price.";
  }

  if (text.includes("book") || text.includes("booking") || text.includes("reserve")) {
    return "To book: open Hostels, choose an available listing, click Book Hostel, then complete the Booking form with your details, deposit, and check-in date.";
  }

  if (text.includes("contact") || text.includes("support") || text.includes("help") || text.includes("phone") || text.includes("email")) {
    return "You can reach support from the Contact page via email at antechittech@gmail.com or phone +254 714452396.";
  }

  if (text.includes("university") || text.includes("campus")) {
    return "Use the Universities page to select your institution, then jump directly to hostels near that campus.";
  }

  return "I can help with hostel prices, booking steps, and contact info. If you want AI-powered answers, set GROQ_API_KEY in .env and restart the server.";
}

function makeReplyConcise(rawReply) {
  const compact = String(rawReply || "")
    .replace(/\s+/g, " ")
    .replace(/\s*([,.!?;:])\s*/g, "$1 ")
    .trim();

  if (!compact) {
    return "I can help with booking, pricing, and support details. Please ask a specific question.";
  }

  if (compact.length <= 220) {
    return compact;
  }

  const sentences = compact.match(/[^.!?]+[.!?]?/g) || [compact];
  const shortText = sentences.slice(0, 2).join(" ").trim();

  if (shortText.length <= 220) {
    return shortText;
  }

  return `${shortText.slice(0, 217).trimEnd()}...`;
}

async function getGroqReply(userMessage, history) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groqApiKey}`
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: RESPONSE_MAX_TOKENS,
      temperature: 0.5,
      messages: [
        { role: "system", content: buildPrompt() },
        ...history,
        { role: "user", content: userMessage }
      ]
    })
  });

  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(`Groq API error ${response.status}: ${bodyText}`);
  }

  const payload = await response.json();
  const reply = payload?.choices?.[0]?.message?.content;

  if (typeof reply !== "string" || !reply.trim()) {
    throw new Error("Groq API returned an empty response.");
  }

  return makeReplyConcise(reply);
}

app.post("/api/chat", async (req, res) => {
  const userMessage = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  const history = normalizeHistory(req.body?.history);

  if (!userMessage) {
    res.status(400).json({ error: "A non-empty message is required." });
    return;
  }

  if (!groqApiKey) {
    res.json({
      reply: getDemoReply(userMessage),
      mode: "demo"
    });
    return;
  }

  try {
    const reply = await getGroqReply(userMessage, history);
    res.json({ reply, mode: "groq" });
  } catch (error) {
    console.error("Chat request failed", error);
    res.json({
      reply: "The AI service is temporarily unavailable. You can still browse hostels, filter by budget, and submit your booking form as normal.",
      mode: "fallback"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Hostel app running on http://localhost:${PORT}`);
});
