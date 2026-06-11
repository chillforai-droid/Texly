<div align="center">
<img width="1200" height="475" alt="Texly Online Banner" src="https://www.texlyonline.in/og-image.png" />
</div>

# 🖼️ Texly Online

**Multi-Tool AI Image Processing Platform**

Built with React + TypeScript + Vite | Deployed on Vercel

🌐 Website: https://www.texlyonline.in

---

## ✨ Features / Tools

- 🎭 **Face Swap** – AI face swapping
- 🎨 **Image Generator** – Text-to-image generation (Gemini powered)
- 📈 **Image Upscale** – AI image upscaling
- ✨ **Image Enhancer** – AI photo enhancement
- 🔄 **Image Format Converter** – Convert between image formats
- 🪄 **Background Remover** – Dual mode: Fast Mode (remove.bg API) + HD Mode (Hugging Face Gradio - Mahendra0160/RemoveBg)
- 🤖 **Robots.txt Tester**
- 📝 Blog system (Supabase powered)
- 🛠️ DevStudio AI assistant (Groq + Gemini powered)

---

## 🧰 Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend:** Express (server.ts)
- **Database/Blog:** Supabase
- **AI Services:** Google Gemini (@google/genai), Groq, Hugging Face Gradio Client
- **Other:** JSZip, jsPDF, docx, Sharp, Multer

---

## 🚀 Run Locally

Prerequisites: Node.js (v20+ recommended)

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in your keys:
   ```
   cp .env.example .env.local
   ```

3. Run the app in development mode:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   npm start
   ```

---

## 🔑 Environment Variables

Set these in `.env.local` (and also in Vercel Project Settings → Environment Variables):

| Variable | Description |
|---|---|
| VITE_SUPABASE_URL / SUPABASE_URL | Supabase project URL (Blog) |
| VITE_SUPABASE_ANON_KEY / SUPABASE_ANON_KEY | Supabase anon key |
| BASE_URL | Production base URL (e.g. https://www.texlyonline.in) |
| VITE_REMOVE_BG_API_KEY | remove.bg API key (Background Remover - Fast Mode) |
| VITE_GEMINI_API_KEY | Google Gemini API key (AI Assistant / Image Generator) |
| VITE_GROQ_API_KEY | Groq API key (DevStudio AI - free fallback) |
| SEO_GITHUB_REPO / SEO_GITHUB_TOKEN | GitHub repo + token for sitemap automation |

> ⚠️ Note: Vercel पर Vite-based variables दोनों names के साथ set करें (VITE_ prefix के साथ और बिना भी), जहाँ ज़रूरत हो।

---

## 📦 Deployment

This project is configured for deployment on **Vercel**. Push to your connected Git repository and Vercel will auto-build and deploy.

---

## 📄 License

Private project — All rights reserved.
