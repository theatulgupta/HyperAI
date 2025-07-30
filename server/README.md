# 🚀 HyperAI Backend

Welcome to the backend of **HyperAI** — a powerful AI SaaS platform designed to help users generate content, manipulate images, and enhance productivity using cutting-edge AI capabilities.

---

## 🧠 Features

This backend is built with **Node.js + Express** and integrates multiple services:

- ✍️ AI Article & Blog Title Generation (OpenAI)
- 🖼️ Image Generation with Prompt
- 🧼 Background & Object Removal (Cloudinary)
- 📄 Resume Review System (PDF Parsing)
- ❤️ Like & Publish Mechanism (Clerk Auth + PostgreSQL)
- 🌐 RESTful APIs for frontend consumption

---

## ⚙️ Tech Stack

| Tech           | Description                         |
| -------------- | ----------------------------------- |
| **Express.js** | Fast, minimalist backend framework  |
| **Clerk**      | User Authentication & Authorization |
| **PostgreSQL** | Serverless database (via NeonDB)    |
| **OpenAI**     | Generative AI (text, images)        |
| **Cloudinary** | Image hosting and transformation    |
| **Multer**     | File uploads                        |
| **pdf-parse**  | PDF text extraction                 |
| **Vercel**     | Serverless deployment               |

---

## 📁 Folder Structure

```
server/
├── configs/
├── controllers/
├── daos/
├── middlewares/
├── routes/
├── services/
├── utils/
├── server.js
└── .env
```

---

## 🛠️ Development

### 🧩 Prerequisites

- Node.js v18+
- Vercel CLI (for deployment)
- NeonDB account
- Cloudinary account
- Clerk project

### 🚀 Start the Dev Server

```bash
npm install
npm run dev
```

---

## 🌍 API Endpoints

| Method | Endpoint                            | Description                 |
| ------ | ----------------------------------- | --------------------------- |
| `POST` | `/api/ai/generate-article`          | Generate AI-written article |
| `POST` | `/api/ai/remove-image-object`       | Remove object from image    |
| `POST` | `/api/user/toggle-like-creation`    | Like/Unlike a user creation |
| `GET`  | `/api/user/get-user-creations`      | Fetch all creations by user |
| `GET`  | `/api/user/get-published-creations` | Fetch published creations   |

---

## 🌐 Deployment (Vercel)

Use Vercel’s serverless function support:

1. Move `server.js` logic to `api/index.js`
2. Set up a `vercel.json` config
3. Deploy the `api` folder via GitHub integration or CLI

---

## 👨‍💻 Author

Made with ❤️ by [Atul Kumar Gupta](https://github.com/theatulgupta)

---

## 📜 License

Licensed under [ISC](LICENSE)
