# 🚀 Smart Task Summarizer - Deployment Guide

## Quick Deployment Steps

### 1. Deploy Backend to Railway

**Go to [Railway.app](https://railway.app)**

1. Sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect the server folder
5. Set these environment variables in Railway dashboard:
   - `OPENROUTER_API_KEY=your_actual_api_key_here` (optional, works without it)
   - `FRONTEND_URL=https://your-vercel-app.vercel.app` (will update after frontend deployment)

**Your backend will be deployed at: `https://your-app-name.railway.app`**

### 2. Deploy Frontend to Vercel

**Go to [Vercel.com](https://vercel.com)**

1. Sign up with GitHub
2. Click "New Project" → Import from GitHub
3. Select your repository
4. Set build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variable:
   - `VITE_API_URL=https://your-railway-app.railway.app`

**Your frontend will be deployed at: `https://your-app-name.vercel.app`**

### 3. Update Backend CORS

After getting your Vercel URL, go back to Railway and update the `FRONTEND_URL` environment variable with your actual Vercel URL.

## Alternative: One-Click Deploy

### Deploy to Railway (Backend)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/smart-task-summarizer-backend)

### Deploy to Vercel (Frontend)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/smart-task-summarizer&project-name=smart-task-summarizer&repository-name=smart-task-summarizer)

## Manual Steps if Needed

1. Create GitHub repository
2. Push your code
3. Connect Railway and Vercel to your repo
4. Configure environment variables
5. Your app is live!

## Environment Variables Summary

**Backend (Railway):**
- `OPENROUTER_API_KEY` (optional)
- `FRONTEND_URL`

**Frontend (Vercel):**
- `VITE_API_URL`

## Your URLs After Deployment
- **Backend API**: https://your-project.railway.app
- **Frontend**: https://your-project.vercel.app

---

**🎉 Your Smart Task Summarizer will be publicly accessible once deployed!**
