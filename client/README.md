# 🚀 HyperAI — AI-Powered Productivity Suite

**HyperAI** is a modern, full-featured AI-powered SaaS web application built with **React + Vite**. It leverages state-of-the-art AI capabilities to assist users with content creation, image editing, and more.

## ✨ Features

- 📝 **Write Article** — Generate high-quality articles with AI assistance.
- 🧠 **Blog Title Generator** — Craft engaging blog titles instantly.
- 🖼️ **Image Generator** — Create stunning visuals from text prompts.
- 🎨 **Remove Background** — Cleanly remove image backgrounds.
- ✂️ **Remove Object** — Erase unwanted objects from images.
- 📄 **Review Resume** — AI-powered resume feedback and suggestions.
- 🌐 **Community** — Like and share AI creations with others.

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **State Management & API**: TanStack Query
- **Routing**: React Router DOM v7
- **Authentication**: Clerk
- **Styling**: TailwindCSS 4
- **UI Icons**: Lucide React
- **Drag & Drop**: React Dropzone
- **Notifications**: React Hot Toast
- **Markdown Support**: React Markdown

## ⚙️ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint the codebase
npm run lint
```

## 📁 Folder Structure

```
client/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── utils/
│   └── App.jsx
└── tailwind.config.js
```

## 📦 Dependencies

See `package.json` for full dependency list.

## 🧪 Development Notes

- Uses `@vitejs/plugin-react-swc` for blazing-fast HMR.
- Includes ESLint configuration with React hooks and TanStack plugin support.
- Uses `serverless` architecture for deploying Express backend on Vercel.

## 🚀 Deployment

Frontend is deployable via **Vercel** or **Netlify**.

---

Made with 💡 by [TheAtulGupta](https://github.com/theatulgupta)
