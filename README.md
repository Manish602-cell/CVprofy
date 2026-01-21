# AI Resume & Cover Letter Builder

A production-ready AI-powered Resume and Cover Letter builder.

## Features
- **AI Generation**: Uses OpenAI to generate ATS-friendly content.
- **PDF & DOCX Export**: Professional formats for download.
- **Monetization**: Freemium model with value-added paid features.
- **Responsive UI**: Modern, clean interface.

## Quick Start

### Prerequisites
- **Node.js**: [Download & Install](https://nodejs.org/) (Required)
- **OpenAI API Key**: You need a key to generate real content.

### Installation
1. Open a terminal in this directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Edit `.env` and add your `OPENAI_API_KEY`.

### Running the App
1. Start the server:
   ```bash
   npm start
   ```
2. Open your browser to:
   [http://localhost:3000](http://localhost:3000)

## Project Structure
- `server.js`: Backend entry point.
- `routes/`: API endpoints.
- `utils/`: Helper functions for AI and File generation.
- `public/`: Static frontend assets.
- `views/`: HTML pages.
- `db/`: SQLite database.

## Troubleshooting
- **'npm' is not recognized**: Ensure Node.js is installed and added to your system PATH. Restart your terminal after installation.
