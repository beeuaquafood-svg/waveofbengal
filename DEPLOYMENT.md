# Wave of Bengal - Deployment Guide

## Frontend Deployment (Netlify)

### Prerequisites
- Netlify account (https://netlify.com)
- GitHub repository connected to Netlify

### Steps to Deploy Frontend

1. **Connect your repository to Netlify:**
   ```bash
   # Using Netlify CLI
   netlify init
   ```

2. **Netlify will automatically detect:**
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`
   - Node version: 20

3. **Set environment variables in Netlify:**
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBDA_vUtChxsnldQPhwq3INgxrtZOb7xWI
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=wave-of-bengal.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=wave-of-bengal
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=wave-of-bengal.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=884086888589
   NEXT_PUBLIC_FIREBASE_APP_ID=1:884086888589:web:3b72e60cfe305d2c11aac4
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

4. **Deploy:**
   - Push to your GitHub repository
   - Netlify automatically builds and deploys

---

## Backend Deployment Options

### Option 1: Railway.app (Recommended for Python/FastAPI)
1. Create Railway account: https://railway.app
2. Connect GitHub repository
3. Select Python environment
4. Deploy from `/backend` directory
5. Set environment variables (Firebase credentials, GROQ API key, Gmail)

**Railway.toml:**
```toml
[build]
builder = "dockerfile"

[deploy]
startCommand = "uvicorn main:app --host 0.0.0.0 --port $PORT"
```

### Option 2: Render.com
1. Create Render account: https://render.com
2. New Web Service → Connect GitHub
3. Set runtime: Python 3.12
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Option 3: Heroku (with alternatives)
1. Use Heroku alternatives like Fly.io or Railway
2. Create Procfile (included in project)
3. Deploy via git push

---

## Environment Variables Setup

### Frontend (.env.local)
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=wave-of-bengal
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Backend (.env)
```
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
GROQ_API_KEY=your-groq-api-key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=wave-of-bengal
```

---

## Testing Deployment

1. **Frontend:**
   ```bash
   npm run build
   npm run start
   ```

2. **Backend:**
   ```bash
   uvicorn main:app --reload
   ```

3. **Health checks:**
   - Frontend: `https://your-netlify-site.netlify.app`
   - Backend API: `https://your-backend-url.com/api/health`

---

## CI/CD Pipeline

The project uses:
- GitHub for version control
- Netlify for frontend auto-deployment
- Railway/Render for backend auto-deployment

All pushes to `master` branch automatically trigger deployments!
