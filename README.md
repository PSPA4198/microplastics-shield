# Microplastics Shield 🌊

An AI-powered microplastics assessment platform designed to help users analyze microplastics-related information through intelligent insights and downloadable PDF reports.

## ✨ Features

- AI-powered analysis using Google's Gemini API
- Microplastics assessment and scoring
- Interactive React-based frontend
- FastAPI backend for API services
- Downloadable PDF reports

## 🛠️ Tech Stack

**Frontend:** React, Vite, JavaScript  
**Backend:** Python, FastAPI  
**AI Integration:** Google Gemini API  
**Database:** PostgreSQL  
**Reports:** PDF generation

## 📁 Project Structure

- `Micro_frontend/` — React frontend
- `Micro_backend/` — FastAPI backend

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/PSPA4198/microplastics-shield.git
cd microplastics-shield
```

### 2. Backend setup

Create and activate a Python virtual environment, then install the backend dependencies:

```bash
cd Micro_backend
python -m venv venv
```

On Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create a `.env` file using the project's `.env.example` as a template. Add your own database connection string and Gemini API key.

**Never commit `.env` or real API keys to GitHub.**

Run the backend from the `Micro_backend` directory:

```bash
python -m uvicorn app.main:app --reload
```

### 3. Frontend setup

Open a separate terminal:

```bash
cd Micro_frontend
npm install
npm run dev
```

Follow the local URL displayed by Vite to open the frontend.

## 🔐 Environment Variables

Configure the variables listed in `.env.example` with your own local values. Do not publish credentials, database passwords, or API keys.

## 🚧 Project Status

The project is available in source-code form. A publicly hosted deployment is not currently documented here.

## 👩‍💻 Author

**Parinika Tripathi**

GitHub: [PSPA4198](https://github.com/PSPA4198)
