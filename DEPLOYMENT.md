# Railway Deployment Guide

## Quick Deployment Steps

### 1. Prepare Your Repository
If you haven't already, create a GitHub repository:
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

### 2. Deploy to Railway

1. **Sign up**: Go to [railway.app](https://railway.app) and sign up with GitHub
2. **New Project**: Click "New Project" → "Deploy from GitHub repo"
3. **Select Repository**: Choose your portfolio repository
4. **Configure**: Railway will auto-detect Python and use the configuration files

### 3. Add Database (PostgreSQL)
1. In your Railway dashboard, click "Add Service" → "Database" → "PostgreSQL"
2. Railway automatically creates `DATABASE_URL` environment variable

### 4. Set Environment Variables
In Railway dashboard, go to your service → Variables tab and add:
```
MAIL_USERNAME=your-gmail@gmail.com
MAIL_PASSWORD=yinq lrop czod jzhp
SESSION_SECRET=your-secret-key-here
```

### 5. Deploy
Railway automatically deploys when you push to GitHub. Your app will be available at:
`https://your-app-name.up.railway.app`

## Environment Variables Needed
- `DATABASE_URL` (automatically set by Railway PostgreSQL)
- `MAIL_USERNAME` (your Gmail address)
- `MAIL_PASSWORD` (your Gmail app password)
- `SESSION_SECRET` (generate a secure random string)

## Files Created for Deployment
- `Procfile` - Tells Railway how to start your app
- `railway.json` - Railway-specific configuration
- `runtime.txt` - Specifies Python version

## Custom Domain (Optional)
1. In Railway dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## Troubleshooting
- Check Railway logs in dashboard for any errors
- Ensure all environment variables are set correctly
- Database migrations run automatically on first deploy