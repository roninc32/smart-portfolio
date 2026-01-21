# AI Twin Portfolio

A modern developer portfolio with an AI-powered chat assistant that acts as your digital twin.

Built with the **PERN Stack**: PostgreSQL, Express.js, React, Node.js + **Google Gemini API**.

## ✨ Features

- 🤖 **AI Chat Assistant** - Powered by Gemini, answers questions about your skills & experience
- 🌐 **Trilingual Support** - English, Tagalog, and Bisaya
- 🎨 **Dark-mode UI** - Modern glass-morphism design with Tailwind CSS
- 🔒 **Rate Limited** - Protected from API abuse (10 req/min)
- 💾 **Chat Logging** - Conversations stored in PostgreSQL for review
- 🧠 **Context Aware** - AI remembers conversation history (last 10 messages)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### 1. Clone & Install

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Database Setup

```bash
# Create database
psql -U postgres -c "CREATE DATABASE smart_portfolio;"

# Run schema
psql -U postgres -d smart_portfolio -f database/schema.sql
```

### 3. Environment Variables

```bash
cd server
cp .env.example .env
# Edit .env with your actual values
```

Required in `.env`:
- `GEMINI_API_KEY` - Your Google Gemini API key
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Backend port (default: 5000)
- `CLIENT_URL` - Frontend URL (default: http://localhost:5173)

### 4. Customize Your Persona

Edit `server/utils/persona.js` and replace `RESUME_DATA` with your actual resume/bio.

### 5. Run Development Servers

```bash
# Terminal 1: Backend
cd server
npm start

# Terminal 2: Frontend
cd client
npm run dev
```

Visit `http://localhost:5173` 🎉

## 📁 Project Structure

```
smart-portfolio/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # ChatComponent, ChatBubble, etc.
│   │   └── sections/       # Hero, About, Projects, Contact
│   └── ...
├── server/                 # Express Backend
│   ├── config/db.js        # PostgreSQL connection
│   ├── routes/chat.js      # Chat API with context awareness
│   └── utils/
│       ├── gemini.js       # Gemini API integration
│       └── persona.js      # ⭐ Your resume & AI personality
└── database/
    └── schema.sql          # PostgreSQL schema
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| AI | Google Gemini 1.5 Flash |

## 📝 License

MIT
