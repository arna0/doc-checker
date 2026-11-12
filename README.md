# ⚖️ LexGuard AI

**Upload a contract, see the risks before you sign.**

Most people sign rental, job or service contracts without a lawyer and miss one-sided clauses: hidden penalties, automatic renewals, unlimited liability. LexGuard reads the contract, highlights risky clauses, explains each one in plain language, and helps you generate a fairer agreement.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-API-8E75B2?logo=googlegemini&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

## Features

| Tab | What it does |
|---|---|
| 🔍 **Contract Audit** | Finds risky and one-sided clauses, rates each by severity, and opens a detailed card: why it's risky and what to ask for instead |
| 🧩 **AI Doc Builder** | A 4-step wizard: choose a document type, set the parameters, and get a balanced agreement generated for you |
| 🗂️ **Audit History** | Archive of past checks with a timeline, exportable as an audit protocol |
| 📄 **Templates** | Ready-made starting points for common agreements |

Also: an animated landing page with a "risk anatomy" showcase, and subtle sound effects in the interface.

## Run it

Requirements: Node.js 18+.

```bash
npm install
cp .env.example .env.local   # set GEMINI_API_KEY
npm run dev                  # http://localhost:3000
```

Production build: `npm run build` (output in `dist/`).

## Disclaimer

LexGuard helps you notice problems and ask better questions. It is not legal advice.

---

<details>
<summary>🇷🇺 На русском</summary>

**LexGuard AI** — веб-приложение для анализа юридических рисков в договорах, выявления скрытых кабальных условий и генерации сбалансированных соглашений.

Запуск: установите Node.js 18+, затем `npm install`, укажите `GEMINI_API_KEY` в `.env.local` и выполните `npm run dev`. Приложение откроется на http://localhost:3000.

</details>

## Author

Made by [Arnur](https://github.com/arna0).
