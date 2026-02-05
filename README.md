# CVprofy

An AI-powered platform for building resumes, cover letters, and short-form video content.

## 🚀 Getting Started

### Prerequisites
- **Node.js**: [Download & Install](https://nodejs.org/) (LTS version recommended)
- **OpenAI API Key**: Required for AI content generation
- npm or yarn

### Installation
1. Open a terminal in this directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Edit `.env` and add your `OPENAI_API_KEY`

### Running the App
1. Start the server:
   ```bash
   npm start
   ```
2. For development (frontend):
   ```bash
   npm run dev
   ```
3. Open your browser to:
   - Backend: [http://localhost:3000](http://localhost:3000)
   - Frontend: [http://localhost:5173](http://localhost:5173) (usually)

# AI Resume & Cover Letter Builder

A production-ready AI-powered Resume and Cover Letter builder.

## Features
- **AI Generation**: Uses OpenAI to generate ATS-friendly content
- **PDF & DOCX Export**: Professional formats for download
- **Monetization**: Freemium model with value-added paid features
- **Responsive UI**: Modern, clean interface

## 🛠️ Features Implemented

- **Landing Page**: Complete with Hero, Features, How It Works, and Pricing sections
- **Authentication**: Professionally designed Login/Signup page
- **Dashboard**: Responsive sidebar layout with overview stats
- **Core Tools**:
  - **Video Upload**: Drag & drop interface
  - **Auto Captions**: Configuration and preview mockups
  - **Hashtag Generator**: Niche-based generation UI
  - **Thumbnail Creator**: Style selection and preview grid
  - **Project Management**: List of active and past projects

## 🎨 Technology Stack

- **Backend**: Node.js, Express.js, SQLite
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **AI**: OpenAI API

## Project Structure
- `server.js`: Backend entry point
- `routes/`: API endpoints
- `utils/`: Helper functions for AI and file generation
- `public/`: Static frontend assets
- `views/`: HTML pages
- `db/`: SQLite database
- `src/`: React frontend source code
- `ai-resume-builder/`: Legacy resume builder (separate app)

## Note on Backend
This combines both frontend and backend implementations. AI features (captions, hashtags, thumbnails) are currently mocked in the frontend to demonstrate UX, while the backend provides real AI-powered resume generation.

## Troubleshooting
- **'npm' is not recognized**: Ensure Node.js is installed and added to your system PATH. Restart your terminal after installation.
