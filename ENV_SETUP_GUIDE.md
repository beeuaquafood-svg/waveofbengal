# Environment Configuration Guide

## Quick Setup

### Development
1. **Backend**: Copy `backend/.env.example` to `backend/.env` and fill values
2. **Frontend**: Copy `frontend/.env.example` to `frontend/.env.local` and fill values

### Production
Set environment variables in your deployment platform (Vercel, Railway, Render)

---

## Frontend Variables (NEXT_PUBLIC_* are exposed to browser)

### Firebase Authentication (REQUIRED)
See `frontend/.env.example` for all Firebase keys

**Get from**: Firebase Console → Project Settings → Your apps → Config

### Backend API URL (REQUIRED)
```
# Development (local)
NEXT_PUBLIC_API_URL=http://localhost:8000

# Production (deployed)
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

### AI Service - Groq (REQUIRED)
See `frontend/.env.example`

**Get from**: https://console.groq.com/keys

### Email Service - Gmail (REQUIRED)
See `frontend/.env.example`

**Note**: Use [Gmail App Password](https://myaccount.google.com/apppasswords), NOT your regular password

---

## Backend Variables

See `backend/.env.example` for detailed configuration

Key variables:
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project
- `GMAIL_USER` and `GMAIL_PASS` - Email service
- `GROQ_API_KEY` - AI service
- `API_HOST` and `API_PORT` - Server configuration

---

## Deployment Environment Variables

### Vercel (Frontend)
Set in: Vercel Dashboard → Project Settings → Environment Variables

Copy all `NEXT_PUBLIC_*` variables from `frontend/.env.example`

### Railway (Backend)
Set in: Railway Dashboard → Project → Variables

Copy all variables from `backend/.env.example`

---

## Security Best Practices

❌ **DO NOT:**
- Commit `.env` files to git (they're in `.gitignore`)
- Share environment variables in chat/email
- Use real passwords for Gmail (use App Passwords)
- Expose Firebase Admin SDK credentials

✅ **DO:**
- Use environment-specific files (`.env.local` for dev)
- Set vars in platforms for prod (Vercel, Railway)
- Rotate API keys regularly
- Use strong, unique passwords
- Review Firebase security rules

---

## Troubleshooting

### "Firebase is not initialized"
- Check `NEXT_PUBLIC_FIREBASE_API_KEY` is set in `.env.local`
- Verify Firebase project ID matches Firebase console

### "GROQ API Error"
- Verify `GROQ_API_KEY` is correct
- Check API key in Groq console not expired

### "Email failed to send"
- Verify `GMAIL_USER` and `GMAIL_PASS` are correct
- Ensure Gmail App Password is used
- Enable "Less secure app access" if needed

### "Backend API connection failed"
- Check `NEXT_PUBLIC_API_URL` points to running backend
- Verify CORS configuration allows frontend domain

---

## Next Steps

1. ✅ Copy `.env.example` files to `.env` / `.env.local`
2. ✅ Fill in all REQUIRED variables
3. ✅ Test locally (npm run dev + python main.py)
4. ✅ Deploy frontend to Vercel
5. ✅ Deploy backend to Railway
6. ✅ Update production URLs in deployment platforms
