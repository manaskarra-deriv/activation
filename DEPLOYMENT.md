# Deployment Guide for Partner Activation Academy

## Backend Deployment (Render)

### 1. Environment Variables
Set these environment variables in your Render dashboard:

```
ENVIRONMENT=production
FRONTEND_URL=https://partneractivation.vercel.app
OPENAI_API_KEY=your_openai_api_key_here
API_BASE_URL=https://litellm.deriv.ai/v1
OPENAI_MODEL_NAME=gpt-4.1-mini
```

### 2. Render Configuration
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Python Version**: 3.9+

### 3. Backend URL
Update your backend URL in the frontend configuration:
- Replace `https://partner-activation-backend.onrender.com` with your actual Render app URL

## Frontend Deployment (Vercel)

### 1. Environment Variables
Set in Vercel dashboard or vercel.json:

```
REACT_APP_BACKEND_URL=https://partner-activation-backend.onrender.com
```

### 2. Update vercel.json
Make sure your `frontend/vercel.json` has the correct backend URL:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "build": {
    "env": {
      "REACT_APP_BACKEND_URL": "https://partner-activation-backend.onrender.com"
    }
  },
  "env": {
    "REACT_APP_BACKEND_URL": "https://partner-activation-backend.onrender.com"
  }
}
```

## AI Assistant Features

### Fallback System
The AI Assistant now includes:
- **Smart Fallbacks**: When the backend is unavailable, it provides helpful responses based on common questions
- **Better Error Handling**: Clear error messages for different failure scenarios
- **Offline Capability**: Basic functionality even when AI service is down

### Testing
1. **Health Check**: Visit `https://your-backend-url.onrender.com/health`
2. **API Status**: Visit `https://your-backend-url.onrender.com/`
3. **AI Chat**: Test the chat functionality in the deployed frontend

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for your frontend domain
   - Check that environment variables are set correctly

2. **AI Service Unavailable**
   - The app will still work with fallback responses
   - Check if OPENAI_API_KEY is configured in Render

3. **Connection Refused**
   - Verify the backend URL in frontend environment variables
   - Ensure the Render app is running and accessible

### Debug Steps
1. Check browser console for error messages
2. Verify backend health endpoint
3. Test API endpoints directly
4. Check Render logs for backend errors

## Environment Variables Summary

### Backend (Render)
- `ENVIRONMENT=production`
- `FRONTEND_URL=https://your-frontend-domain.vercel.app`
- `OPENAI_API_KEY=your_key`
- `API_BASE_URL=https://litellm.deriv.ai/v1`
- `OPENAI_MODEL_NAME=gpt-4.1-mini`

### Frontend (Vercel)
- `REACT_APP_BACKEND_URL=https://partner-activation-backend.onrender.com` 