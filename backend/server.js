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
const MPESA_ENV = (process.env.MPESA_ENV || "sandbox").toLowerCase();
const MPESA_BASE_URL = MPESA_ENV === "production" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke";
const MPESA_CONSUMER_KEY = (process.env.MPESA_CONSUMER_KEY || "").trim();
const MPESA_CONSUMER_SECRET = (process.env.MPESA_CONSUMER_SECRET || "").trim();
const MPESA_SHORTCODE = (process.env.MPESA_SHORTCODE || "").trim();
const MPESA_PASSKEY = (process.env.MPESA_PASSKEY || "").trim();
const MPESA_CALLBACK_URL = (process.env.MPESA_CALLBACK_URL || "").trim();
const MPESA_ACCOUNT_REFERENCE = process.env.MPESA_ACCOUNT_REFERENCE || "HostelBooking";
const MPESA_TRANSACTION_DESC = process.env.MPESA_TRANSACTION_DESC || "Hostel deposit payment";
const MPESA_TRANSACTION_TYPE = process.env.MPESA_TRANSACTION_TYPE || "CustomerPayBillOnline";
const SITE_TOPIC_KEYWORDS = [
  "hostel",
  "hostels",
  "booking",
  "book",
  "reserve",
  "university",
  "universities",
  "campus",
  "price",
  "budget",
  "cost",
  "availability",
  "available",
  "contact",
  "support",
  "help",
  "filter",
  "distance",
  "deposit",
  "check-in",
  "favorite",
  "favourite",
  "save",
  "site",
  "website",
  "page",
  "menu"
];
const SITE_TOPIC_REFUSAL = "I can only help with this hostel booking website, including hostels, prices, availability, booking, universities, and contact support.";

const groqApiKey = (process.env.GROQ_API_KEY || "").trim();
const pendingMpesaPayments = new Map();
const completedMpesaPayments = new Map();

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

function isSiteRelatedQuery(message) {
  const text = String(message || "").toLowerCase();

  return SITE_TOPIC_KEYWORDS.some((keyword) => text.includes(keyword));
}

function buildPrompt() {
  return [
    "You are a helpful assistant for a Kenyan student hostel booking website.",
    `Only answer questions about this website's hostels, prices, availability, booking flow, universities, and contact support. If the user asks about anything else, politely refuse and redirect them to website help.`,
    "Keep answers short, precise, and easy to understand.",
    "Target 1-3 short sentences and around 60 words or less whenever possible.",
    "Give the direct answer first, then one practical next step if needed.",
    "Avoid long numbered lists unless the user explicitly asks for detailed steps.",
    "If data is unknown, say so clearly and suggest contacting support from the website contact page.",
    "Do not invent exact availability or prices unless the user provides them in the chat context."
  ].join(" ");
}

function hasMpesaConfig() {
  return (
    MPESA_CONSUMER_KEY &&
    MPESA_CONSUMER_SECRET &&
    MPESA_SHORTCODE &&
    MPESA_PASSKEY &&
    MPESA_CALLBACK_URL
  );
}

function normalizeKenyanPhoneNumber(value) {
  const cleaned = String(value || "").trim().replace(/[\s-]/g, "").replace(/^\+/, "");

  if (/^254\d{9}$/.test(cleaned)) {
    return cleaned;
  }

  if (/^0\d{9}$/.test(cleaned)) {
    return `254${cleaned.slice(1)}`;
  }

  if (/^7\d{8}$/.test(cleaned)) {
    return `254${cleaned}`;
  }

  return "";
}

function formatMpesaTimestamp(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  );

  return `${values.year}${values.month}${values.day}${values.hour}${values.minute}${values.second}`;
}

function buildMpesaPassword(timestamp) {
  return Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString("base64");
}

async function getMpesaAccessToken() {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");
  const response = await fetch(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: {
      Authorization: `Basic ${auth}`
    }
  });

  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(`M-Pesa auth failed ${response.status}: ${bodyText}`);
  }

  const payload = await response.json();

  if (typeof payload.access_token !== "string" || !payload.access_token) {
    throw new Error("M-Pesa auth returned no access token.");
  }

  return payload.access_token;
}

function validateMpesaBookingPayload(body) {
  const fullName = typeof body?.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = normalizeKenyanPhoneNumber(body?.phone);
  const deposit = Number(body?.deposit);
  const university = typeof body?.university === "string" ? body.university.trim() : "";
  const hostel = typeof body?.hostel === "string" ? body.hostel.trim() : "";
  const checkInDate = typeof body?.checkInDate === "string" ? body.checkInDate.trim() : "";
  const duration = typeof body?.duration === "string" ? body.duration.trim() : "";
  const gender = typeof body?.gender === "string" ? body.gender.trim() : "";
  const notes = typeof body?.notes === "string" ? body.notes.trim() : "";

  if (!fullName || !email || !phone || !Number.isFinite(deposit) || deposit <= 0 || !university || !hostel || !checkInDate || !duration || !gender) {
    return {
      error: "All booking details are required, and the phone number must be a valid Kenyan number."
    };
  }

  return {
    value: {
      fullName,
      email,
      phone,
      deposit: Math.round(deposit),
      university,
      hostel,
      checkInDate,
      duration,
      gender,
      notes
    }
  };
}

async function initiateMpesaStkPush(booking) {
  if (!hasMpesaConfig()) {
    throw new Error("M-Pesa is not configured. Add the Daraja environment variables first.");
  }

  const accessToken = await getMpesaAccessToken();
  const timestamp = formatMpesaTimestamp();
  const password = buildMpesaPassword(timestamp);
  const amount = Math.max(1, Math.round(booking.deposit));

  const response = await fetch(`${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: MPESA_TRANSACTION_TYPE,
      Amount: amount,
      PartyA: booking.phone,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: booking.phone,
      CallBackURL: MPESA_CALLBACK_URL,
      AccountReference: MPESA_ACCOUNT_REFERENCE,
      TransactionDesc: MPESA_TRANSACTION_DESC
    })
  });

  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(`M-Pesa STK push failed ${response.status}: ${bodyText}`);
  }

  const payload = await response.json();

  if (payload.ResponseCode && payload.ResponseCode !== "0") {
    throw new Error(payload.ResponseDescription || "M-Pesa rejected the payment request.");
  }

  if (!payload.CheckoutRequestID) {
    throw new Error("M-Pesa response did not include a checkout request ID.");
  }

  pendingMpesaPayments.set(payload.CheckoutRequestID, {
    booking,
    checkoutRequestId: payload.CheckoutRequestID,
    merchantRequestId: payload.MerchantRequestID || null,
    response: payload,
    requestedAt: new Date().toISOString(),
    status: "pending"
  });

  return payload;
}

function summarizeCallbackMetadata(items) {
  if (!Array.isArray(items)) {
    return {};
  }

  return items.reduce((summary, item) => {
    if (item && item.Name) {
      summary[item.Name] = item.Value;
    }

    return summary;
  }, {});
}

function getDemoReply(userMessage) {
  const text = userMessage.toLowerCase();

  if (!isSiteRelatedQuery(text)) {
    return SITE_TOPIC_REFUSAL;
  }

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

  if (!isSiteRelatedQuery(userMessage)) {
    res.json({
      reply: SITE_TOPIC_REFUSAL,
      mode: "site-only"
    });
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

app.post("/api/mpesa/stkpush", async (req, res) => {
  const validation = validateMpesaBookingPayload(req.body);

  if (validation.error) {
    res.status(400).json({ error: validation.error });
    return;
  }

  try {
    const payment = await initiateMpesaStkPush(validation.value);

    res.json({
      success: true,
      mode: MPESA_ENV,
      message: "M-Pesa prompt sent. Check your phone and approve the payment.",
      checkoutRequestId: payment.CheckoutRequestID,
      merchantRequestId: payment.MerchantRequestID || null,
      customerMessage: payment.CustomerMessage || null,
      requestId: payment.CheckoutRequestID,
      booking: validation.value
    });
  } catch (error) {
    console.error("M-Pesa request failed", error);
    res.status(502).json({
      error: error instanceof Error ? error.message : "Unable to start the M-Pesa payment."
    });
  }
});

app.post("/api/mpesa/callback", (req, res) => {
  const callback = req.body?.Body?.stkCallback;

  if (!callback || !callback.CheckoutRequestID) {
    res.status(400).json({ error: "Invalid M-Pesa callback payload." });
    return;
  }

  const checkoutRequestId = callback.CheckoutRequestID;
  const metadata = summarizeCallbackMetadata(callback.CallbackMetadata?.Item);
  const pendingRecord = pendingMpesaPayments.get(checkoutRequestId);
  const finalRecord = {
    checkoutRequestId,
    merchantRequestId: callback.MerchantRequestID || pendingRecord?.merchantRequestId || null,
    resultCode: callback.ResultCode,
    resultDesc: callback.ResultDesc || "",
    status: callback.ResultCode === 0 ? "success" : "failed",
    receiptNumber: metadata.MpesaReceiptNumber || null,
    amount: typeof metadata.Amount !== "undefined" ? metadata.Amount : pendingRecord?.booking?.deposit || null,
    phoneNumber: metadata.PhoneNumber || pendingRecord?.booking?.phone || null,
    transactionDate: metadata.TransactionDate || null,
    booking: pendingRecord?.booking || null,
    callbackReceivedAt: new Date().toISOString()
  };

  completedMpesaPayments.set(checkoutRequestId, finalRecord);
  pendingMpesaPayments.delete(checkoutRequestId);

  console.log("M-Pesa callback received", finalRecord);
  res.json({ ResultCode: 0, ResultDesc: "Accepted" });
});

app.get("/api/mpesa/status/:checkoutRequestId", (req, res) => {
  const checkoutRequestId = req.params.checkoutRequestId;

  if (!checkoutRequestId) {
    res.status(400).json({ error: "Checkout request ID is required." });
    return;
  }

  if (completedMpesaPayments.has(checkoutRequestId)) {
    res.json(completedMpesaPayments.get(checkoutRequestId));
    return;
  }

  if (pendingMpesaPayments.has(checkoutRequestId)) {
    res.json(pendingMpesaPayments.get(checkoutRequestId));
    return;
  }

  res.status(404).json({ error: "No payment record found for that checkout request ID." });
});

app.listen(PORT, () => {
  console.log(`Hostel app running on http://localhost:${PORT}`);
});
