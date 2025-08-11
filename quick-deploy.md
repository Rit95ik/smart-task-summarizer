# 🚀 Quick Deploy Your Smart Task Summarizer

## Option 1: Manual GitHub Upload (Easiest)

1. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Repository name: `smart-task-summarizer`
   - Set to Public
   - Click "Create repository"

2. **Upload Files**:
   - Click "uploading an existing file"
   - Drag and drop your entire project folder
   - Commit the files

3. **Deploy Backend** (Railway):
   - Go to https://railway.app
   - Sign up with GitHub
   - "New Project" → "Deploy from GitHub repo"
   - Select `smart-task-summarizer`
   - Railway will auto-detect the server
   - Set environment variable: `OPENROUTER_API_KEY` (optional)

4. **Deploy Frontend** (Vercel):
   - Go to https://vercel.com
   - Sign up with GitHub  
   - "New Project" → Import from GitHub
   - Select `smart-task-summarizer`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - Set environment variable: `VITE_API_URL=https://your-railway-url.railway.app`

## Option 2: Use Git Commands

If you have Git set up properly, run these commands:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/smart-task-summarizer.git
git branch -M main
git push -u origin main
```

## Your App URLs After Deployment

- **Frontend**: https://your-app-name.vercel.app
- **Backend API**: https://your-app-name.railway.app

## 🎉 That's it! Your app will be live and publicly accessible!

---

**Need help?** The DEPLOYMENT_GUIDE.md file has detailed instructions.
