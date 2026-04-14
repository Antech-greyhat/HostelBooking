# Hostel Booking Platform

![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%2B%20CSS%20%2B%20JS-0d5cab)
![AI Provider](https://img.shields.io/badge/AI-Groq-10a37f)

A modern student-hostel discovery and booking web app for Kenyan campuses, with a Groq-powered chat assistant for booking guidance, pricing help, and quick support direction.

## Table of Contents

| Section | What You Will Find |
| --- | --- |
| [Overview](#overview) | Purpose, scope, and high-level app setup |
| [Key Features](#key-features) | Core capabilities of the platform |
| [Architecture](#architecture) | Frontend-backend-Groq flow diagram |
| [Project Structure](#project-structure) | Folder layout and file responsibilities |
| [Quick Start](#quick-start) | Installation and local run steps |
| [Environment Variables](#environment-variables) | Configurable runtime settings |
| [Chat API](#chat-api) | Endpoint contract with payload examples |
| [Pages](#pages) | Main web pages and their paths |
| [Troubleshooting](#troubleshooting) | Common issues and practical fixes |
| [Security Notes](#security-notes) | Key-handling and deployment safety guidance |

## Overview

This project is split into:

- Frontend static app (HTML, CSS, vanilla JS) served by Express.
- Backend API for chatbot replies at `/api/chat`.
- Backend API for M-Pesa STK Push initiation and callback handling.
- Groq LLM integration with concise response controls and fallback mode.

## Key Features

- University-based hostel browsing and filtering.
- Hostel booking workflow with M-Pesa STK Push initiation and pending payment storage.
- Contact and FAQ sections for student support.
- AI assistant widget with:
  - animated reply reveal,
  - animated thinking state,
  - enforced minimum thinking delay,
  - concise, easy-to-read replies.
- Demo-safe fallback when API key is missing.

## Architecture

```mermaid
flowchart LR
  A[Browser UI] --> B[Express Server]
  B --> C["/api/chat route"]
  C --> D[Prompt + History Normalizer]
  D --> E[Groq Chat Completions API]
  E --> C
  C --> A
  B --> F[Static Files: pages, styles, scripts]
```

## Project Structure

```text
Hostel/
├─ backend/
│  ├─ server.js          # Express server + Groq chat API
│  ├─ routes/            # Reserved for API modularization
│  └─ services/          # Reserved for service-layer logic
├─ pages/
│  ├─ index.html
│  ├─ hostels.html
│  ├─ booking.html
│  ├─ contact.html
│  └─ universities.html
├─ scripts/
│  └─ script.js          # Frontend behavior + chatbot UI logic
├─ styles/
│  └─ style.css
├─ .env                  # Local secrets (not committed)
├─ .gitignore
├─ package.json
└─ README.md
```

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env`

Create a `.env` file in the project root with:

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
RESPONSE_MAX_TOKENS=120
PORT=3000

MPESA_ENV=sandbox
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=your_paybill_or_till_number
MPESA_PASSKEY=your_daraja_passkey
MPESA_CALLBACK_URL=https://your-public-domain.example.com/api/mpesa/callback
MPESA_ACCOUNT_REFERENCE=HostelBooking
MPESA_TRANSACTION_DESC=Hostel deposit payment
MPESA_TRANSACTION_TYPE=CustomerPayBillOnline
```

### 3. Run the app

```bash
npm start
```

Then open:

- `http://localhost:3000/pages/index.html`

## Environment Variables

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `GROQ_API_KEY` | Yes (for live AI) | - | Auth token for Groq API |
| `GROQ_MODEL` | No | `llama-3.1-8b-instant` | Model used for chat generation |
| `RESPONSE_MAX_TOKENS` | No | `120` | Upper token cap for concise responses |
| `PORT` | No | `3000` | Server port |
| `MPESA_ENV` | No | `sandbox` | Daraja environment to use: `sandbox` or `production` |
| `MPESA_CONSUMER_KEY` | Yes for live payments | - | Daraja app consumer key |
| `MPESA_CONSUMER_SECRET` | Yes for live payments | - | Daraja app consumer secret |
| `MPESA_SHORTCODE` | Yes for live payments | - | Paybill or till number used for STK Push |
| `MPESA_PASSKEY` | Yes for live payments | - | Daraja passkey for the shortcode |
| `MPESA_CALLBACK_URL` | Yes for live payments | - | Publicly reachable callback endpoint for payment confirmation |
| `MPESA_ACCOUNT_REFERENCE` | No | `HostelBooking` | Reference shown in the STK request |
| `MPESA_TRANSACTION_DESC` | No | `Hostel deposit payment` | Payment description shown on the prompt |
| `MPESA_TRANSACTION_TYPE` | No | `CustomerPayBillOnline` | Daraja transaction type |

## Chat API

### Endpoint

- `POST /api/chat`

### Request body

```json
{
  "message": "How do I book near Kisii University?",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi, how can I help?" }
  ]
}
```

### Response shape

```json
{
  "reply": "Open Hostels, filter by university and budget, then submit Booking.",
  "mode": "groq"
}
```

Possible `mode` values:

- `groq` (live AI)
- `demo` (no key configured)
- `fallback` (provider temporarily unavailable)

## M-Pesa API

### Endpoint

- `POST /api/mpesa/stkpush`

### Request body

```json
{
  "fullName": "Amina Otieno",
  "email": "amina@example.com",
  "phone": "0712345678",
  "deposit": 3000,
  "university": "Rongo University",
  "hostel": "Rongo Hostel 01",
  "checkInDate": "2026-05-01",
  "duration": "3 months",
  "gender": "Female",
  "notes": "Ground-floor room preferred"
}
```

### Response shape

```json
{
  "success": true,
  "message": "M-Pesa prompt sent. Check your phone and approve the payment.",
  "checkoutRequestId": "ws_CO_1234567890",
  "merchantRequestId": "12345-67890-1",
  "booking": {
    "fullName": "Amina Otieno"
  }
}
```

### Callback endpoint

- `POST /api/mpesa/callback`

Safaricom must be able to reach the callback URL you set in `.env`. For local development, use a tunnel such as ngrok or Cloudflare Tunnel and point `MPESA_CALLBACK_URL` to the public HTTPS URL.

## Pages

- Home: [pages/index.html](pages/index.html)
- Universities: [pages/universities.html](pages/universities.html)
- Hostels: [pages/hostels.html](pages/hostels.html)
- Booking: [pages/booking.html](pages/booking.html)
- Contact: [pages/contact.html](pages/contact.html)

## Troubleshooting

### Port 3000 already in use

If startup fails with `EADDRINUSE`, stop the process using port 3000, then restart:

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen | Select-Object -ExpandProperty OwningProcess
Stop-Process -Id <PID> -Force
npm start
```

### Chatbot returns demo mode

- Ensure `GROQ_API_KEY` is set in `.env`.
- Restart the server after any `.env` change.

### M-Pesa request fails immediately

- Confirm `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, `MPESA_SHORTCODE`, `MPESA_PASSKEY`, and `MPESA_CALLBACK_URL` are set.
- Use a publicly reachable HTTPS callback URL.
- Check that the shortcode and passkey belong to the same Daraja app.

### Styles or scripts not loading

This project uses root-based asset paths (`/styles/...`, `/scripts/...`), so run through Express and not direct file open.

## Security Notes

- Never commit `.env`.
- Rotate keys if exposed in chat logs or screenshots.
- Keep provider keys server-side only; do not place them in frontend JS.

---

### Maintainer Notes

Current backend is centralized in [backend/server.js](backend/server.js). The [backend/routes](backend/routes) and [backend/services](backend/services) folders are already created and ready for modular expansion.
