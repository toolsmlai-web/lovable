# Lovavle - AI Web Application Builder

> **Lovavle** is an AI-powered web application builder that turns your ideas into production-ready React applications. Built with React, Vite, Tailwind CSS, and TypeScript. Supports both **English** and **Bangla (বাংলা)**.

![Lovavle](https://img.shields.io/badge/Lovavle-AI%20Builder-purple)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-yellow)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## Features

- **AI-Powered Code Generation** - Describe your app in natural language
- **Live Preview** - Real-time preview as you build
- **Full Code Editor** - Monaco-based editor with syntax highlighting
- **Bangla + English** - Full bilingual support
- **Team Collaboration** - Shared projects for your dev team
- **One-Click Deploy** - Deploy to Cloudflare, Vercel, or Netlify
- **Dark/Light Theme** - Customizable appearance
- **Responsive Design** - Works on all devices

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| State | Zustand |
| Animation | Framer Motion |
| Icons | Lucide React |
| Backend | Supabase (optional) |
| Deploy | Cloudflare Pages |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/lovavle.git
cd lovavle

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare
npm run deploy
```

## Project Structure

```
lovavle/
├── src/
│   ├── components/
│   │   ├── layout/          # Navigation, Footer, Layout
│   │   ├── ui/              # Reusable UI components
│   │   ├── chat/            # Chat interface
│   │   ├── editor/          # Code editor
│   │   └── preview/         # Preview panel
│   ├── pages/
│   │   ├── HomePage.tsx     # Landing page
│   │   ├── EditorPage.tsx   # Main builder
│   │   ├── ProjectsPage.tsx # Project management
│   │   ├── SettingsPage.tsx # User settings
│   │   └── NotFoundPage.tsx # 404 page
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   ├── store.ts         # Zustand state management
│   │   ├── utils.ts         # Utility functions
│   │   └── supabase.ts      # Supabase client
│   ├── i18n/
│   │   ├── en.ts            # English translations
│   │   ├── bn.ts            # Bangla translations
│   │   └── index.ts         # i18n utilities
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles + design system
├── public/                  # Static assets
├── dist/                    # Build output
├── .github/workflows/       # CI/CD
├── wrangler.toml            # Cloudflare config
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript config
└── package.json             # Dependencies
```

## Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## Deployment

### Cloudflare Pages (Recommended)

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Deploy:
   ```bash
   npm run build
   wrangler pages deploy dist
   ```

### GitHub Actions (Auto Deploy)

Set these secrets in your GitHub repository:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Push to `main` branch to auto-deploy.

## Bilingual Support

Toggle between **English** and **Bangla (বাংলা)** from the navigation bar. All UI text, labels, and content switch instantly.

## License

MIT License - For personal and team development use only. Not for commercial resale.

---

Made with ❤️ in Bangladesh
