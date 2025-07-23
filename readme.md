# 📄 AI Resume Analyzer

An AI-powered resume analyzer web app that helps users get actionable feedback and suggestions on their resumes using conversational chat. Built using a fullstack MERN-based architecture.

## 🛠 Tech Stack

- **Frontend**: Next.js (TypeScript, Tailwind CSS, Framer Motion)
- **Backend**: Node.js + Express (TypeScript)
- **AI Integration**: Gemini API (Google Generative AI)
- **PDF Parsing**: `pdf-parse` for resume extraction
- **Caching**: Redis (for production-ready caching)
- **Deployment**: Railway (client + server hosted in one repo)

---

## ✨ Features

- Upload PDF Resume
- Parse and analyze resume contents using AI
- Chat interface to get tailored suggestions and improvements
- Smooth UI/UX with animations and transitions
- Error handling, loading indicators, and toast feedback

---

## 🚀 Getting Started

1. Clone the repo:

```
git clone https://github.com/your-username/resume-analyzer.git
```

2. Install dependecies

```
cd resume-analyzer
cd client && npm install
cd ../server && npm install
```

3. Run Locally (Don't forget ENVs):

In one terminal

```
cd server && npm run dev
```

In another terminal

```
cd client && npm run dev
```
## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
