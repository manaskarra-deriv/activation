# Partner Activation Academy

A gamified onboarding platform for new partners to fast-track their journey through structured learning, interactive challenges, and rewards. Features an AI-powered assistant for real-time support.

## Features

- **Structured Learning Path**: 4 progressive levels (BASIC, MEDIUM, HIGH, PRO) with actions and rewards
- **Token System**: Earn tokens by completing actions, redeem for rewards ($30-$100 tiers)
- **AI Assistant**: GPT-4 powered chat assistant with offline fallback capabilities
- **Interactive Dashboard**: Visual progress tracking and token milestones
- **Modern UI**: Responsive design with Chakra UI
- **Leaderboard**: Compete with other partners and track rankings
- **Rewards System**: Redeem tokens for gift cards, subscriptions, and coaching

## Tech Stack

- **Frontend**: React, Chakra UI, React Router, Recharts
- **Backend**: FastAPI, Pydantic, httpx (for AI integration)
- **AI**: OpenAI GPT-4 integration with smart fallbacks
- **Deployment**: Vercel (frontend) + Render (backend)

## Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

### Local Development

1. Clone the repository
```bash
git clone <repository-url>
cd PartnerActivation
```

2. Install backend dependencies
```bash
cd backend
pip install -r requirements.txt
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

4. Set up environment variables (see DEPLOYMENT.md for details)

5. Start the backend server
```bash
cd backend
python run.py
```

6. Start the frontend development server
```bash
cd frontend
npm start
```

7. Open your browser and navigate to `http://localhost:3000`

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for Render (backend) and Vercel (frontend).

### Quick Deployment Summary

**Backend (Render):**
- Set environment variables: `ENVIRONMENT`, `OPENAI_API_KEY`, `FRONTEND_URL`
- Deploy from GitHub with automatic builds

**Frontend (Vercel):**
- Set `REACT_APP_BACKEND_URL` to your Render backend URL
- Deploy from GitHub with automatic builds

## AI Assistant Features

- **Smart Responses**: Context-aware answers about Partner Academy topics
- **Offline Mode**: Fallback responses when AI service is unavailable
- **Connection Status**: Visual indicator of AI service connectivity
- **Error Handling**: Graceful degradation with helpful error messages
- **Knowledge Base**: Built-in responses for common questions about tokens, levels, and rewards

## Project Structure

```
PartnerActivation/
├── backend/               # FastAPI backend
│   ├── app/               # Application code
│   │   ├── main.py        # FastAPI app and routes
│   │   └── __init__.py    # Package marker
│   ├── requirements.txt   # Python dependencies
│   └── run.py             # Server start script
│
└── frontend/              # React frontend
    ├── public/            # Static files
    ├── src/               # Source code
    │   ├── components/    # Reusable UI components
    │   ├── context/       # React context providers
    │   ├── pages/         # Page components
    │   ├── App.js         # Main app component
    │   └── index.js       # Entry point
    └── package.json       # Node.js dependencies
```

## Demo Functionality

This is a wireframe version with mock data:

- Backend uses in-memory data structures instead of a database
- Authentication is simulated with auto-login
- Progress saving is handled within the session only

## Skool-like Platform Inspiration

This project draws inspiration from community-based learning platforms like Skool.com, with a focus on:

- Community spaces with forum-style interaction
- Structured courses with progression systems
- Gamification through points, badges, and levels
- Easy-to-navigate UI with intuitive design

## Future Development

- Integration with real partner database
- Admin dashboard for content management
- Cohort-based learning groups
- Analytics dashboard for partner success team
- Mobile app version 