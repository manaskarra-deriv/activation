# Partner Activation Academy

A gamified onboarding platform for new partners to fast-track their journey to Silver tier status through structured learning, interactive challenges, and rewards. Inspired by community-based education platforms like Skool.com.

## Features

- **Structured Learning Path**: 5 progressive modules with lessons and quizzes
- **Gamification**: XP points, badges, and progress tracking
- **Fast-track to Silver**: Clear criteria for tier advancement
- **Interactive Dashboard**: Visual progress tracking and analytics
- **Modern UI**: Responsive design with Chakra UI
- **Community Focus**: Built with community engagement in mind

## Tech Stack

- **Frontend**: React, Chakra UI, React Router, Axios
- **Backend**: FastAPI, Pydantic, SQLAlchemy (mock database for demo)

## Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

### Installation

1. Clone the repository
```
git clone <repository-url>
cd PartnerActivation
```

2. Install backend dependencies
```
cd backend
pip install -r requirements.txt
```

3. Install frontend dependencies
```
cd frontend
npm install
```

### Running the Application

1. Start the backend server
```
cd backend
python run.py
```

2. Start the frontend development server
```
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

4. Application automatically logs in with a demo account

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