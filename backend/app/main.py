from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime
import os
from dotenv import load_dotenv
import httpx

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Partner Activation Academy API")

# Get environment variables with defaults
ENVIRONMENT = os.environ.get("ENVIRONMENT", "development")
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")

# Configure CORS - Allow all origins for public access
if ENVIRONMENT == "production":
    # In production, allow all origins for public access
    allowed_origins = ["*"]
else:
    # In development, be more restrictive
    allowed_origins = [
        FRONTEND_URL,
        "https://activation-livid.vercel.app",
        "https://partneractivation.vercel.app",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,  # Set to False for production with wildcard origins
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Mock database (replace with actual database in production)
USERS = {}
MODULES = {
    "1": {
        "id": "1",
        "title": "Partner Fundamentals",
        "description": "Learn the basics of Deriv's product ecosystem and partner program",
        "xp_reward": 100,
        "badge": "Foundation Builder",
        "lessons": [
            {"id": "1.1", "title": "Welcome & Program Overview", "duration": "15 min"},
            {"id": "1.2", "title": "Understanding Deriv Products", "duration": "45 min"},
            {"id": "1.3", "title": "Commission Structures Deep Dive", "duration": "60 min"},
            {"id": "1.4", "title": "Compliance & Ethics Training", "duration": "45 min"},
            {"id": "1.5", "title": "Account Setup Workshop", "duration": "45 min"}
        ],
        "quizzes": [
            {"id": "q1.1", "title": "Product Knowledge Quiz", "questions": 20, "pass_rate": 80}
        ]
    },
    "2": {
        "id": "2",
        "title": "First Campaign Setup",
        "description": "Create your first marketing campaign and set up proper tracking",
        "xp_reward": 200,
        "badge": "Campaign Creator",
        "lessons": [
            {"id": "2.1", "title": "Finding Your Niche", "duration": "60 min"},
            {"id": "2.2", "title": "Traffic Source Selection", "duration": "90 min"},
            {"id": "2.3", "title": "Content Creation Masterclass", "duration": "90 min"},
            {"id": "2.4", "title": "Campaign Setup Practicum", "duration": "60 min"},
            {"id": "2.5", "title": "Analytics & Monitoring", "duration": "60 min"}
        ],
        "quizzes": [
            {"id": "q2.1", "title": "Traffic Strategy Quiz", "questions": 15, "pass_rate": 75}
        ]
    },
    "3": {
        "id": "3",
        "title": "Getting Your First Click",
        "description": "Launch campaigns and generate meaningful traffic",
        "xp_reward": 300,
        "badge": "Traffic Master",
        "lessons": [
            {"id": "3.1", "title": "Launch Execution", "duration": "45 min"},
            {"id": "3.2", "title": "Traffic Generation Tactics", "duration": "90 min"},
            {"id": "3.3", "title": "Quality vs Quantity", "duration": "60 min"},
            {"id": "3.4", "title": "Optimization Techniques", "duration": "45 min"},
            {"id": "3.5", "title": "Troubleshooting Lab", "duration": "60 min"}
        ],
        "quizzes": [
            {"id": "q3.1", "title": "Traffic Optimization Quiz", "questions": 20, "pass_rate": 70}
        ]
    },
    "4": {
        "id": "4",
        "title": "First Conversion",
        "description": "Convert traffic into registered clients and earn your first commission",
        "xp_reward": 500,
        "badge": "First Success",
        "lessons": [
            {"id": "4.1", "title": "Conversion Psychology", "duration": "60 min"},
            {"id": "4.2", "title": "Landing Page Optimization", "duration": "90 min"},
            {"id": "4.3", "title": "Follow-up Strategies", "duration": "60 min"},
            {"id": "4.4", "title": "Advanced Tracking", "duration": "60 min"},
            {"id": "4.5", "title": "Celebrating Success", "duration": "30 min"}
        ],
        "quizzes": [
            {"id": "q4.1", "title": "Conversion Mastery Quiz", "questions": 25, "pass_rate": 75}
        ]
    },
    "5": {
        "id": "5",
        "title": "Scaling Strategies",
        "description": "Develop multi-channel strategies and build systematic approaches",
        "xp_reward": 750,
        "badge": "Scale Master",
        "lessons": [
            {"id": "5.1", "title": "Multi-Channel Mastery", "duration": "90 min"},
            {"id": "5.2", "title": "Systems & Processes", "duration": "90 min"},
            {"id": "5.3", "title": "Team Building Basics", "duration": "60 min"},
            {"id": "5.4", "title": "Advanced Analytics", "duration": "90 min"},
            {"id": "5.5", "title": "Financial Management", "duration": "60 min"}
        ],
        "quizzes": [
            {"id": "q5.1", "title": "Growth Strategy Quiz", "questions": 30, "pass_rate": 80}
        ]
    }
}

LEADERBOARD = [
    {"user_id": "1", "username": "partner_pro", "xp": 2850, "level": "Expert", "badges": 12},
    {"user_id": "2", "username": "affiliate_master", "xp": 3200, "level": "Expert", "badges": 14},
    {"user_id": "3", "username": "traffic_guru", "xp": 1950, "level": "Practitioner", "badges": 8},
    {"user_id": "4", "username": "campaign_king", "xp": 4100, "level": "Master", "badges": 18},
    {"user_id": "5", "username": "conversion_queen", "xp": 2300, "level": "Practitioner", "badges": 10},
    {"user_id": "6", "username": "crypto_trader", "xp": 1800, "level": "Practitioner", "badges": 7},
    {"user_id": "7", "username": "forex_expert", "xp": 1650, "level": "Apprentice", "badges": 6},
    {"user_id": "8", "username": "stock_master", "xp": 1500, "level": "Apprentice", "badges": 5},
    {"user_id": "9", "username": "options_pro", "xp": 1350, "level": "Apprentice", "badges": 4},
    {"user_id": "10", "username": "bond_trader", "xp": 1200, "level": "Apprentice", "badges": 3}
]

# Models
class User(BaseModel):
    id: Optional[str] = None
    username: str
    email: str
    xp: int = 0
    level: str = "Novice"
    badges: List[str] = []
    modules_completed: List[str] = []
    current_module: str = "1"
    progress: dict = {}
    created_at: Optional[datetime] = None

class UserLogin(BaseModel):
    username: str
    password: str

class Module(BaseModel):
    id: str
    title: str
    description: str
    xp_reward: int
    badge: str
    lessons: List[dict]
    quizzes: List[dict]

class UserProgress(BaseModel):
    module_id: str
    lesson_id: Optional[str] = None
    quiz_id: Optional[str] = None
    completed: bool = False
    score: Optional[int] = None

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    max_tokens: Optional[int] = 200
    temperature: Optional[float] = 0.7

# Routes
@app.get("/")
def read_root():
    return {
        "message": "Welcome to Partner Activation Academy API",
        "status": "healthy",
        "environment": ENVIRONMENT,
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "modules": "/modules",
            "leaderboard": "/leaderboard",
            "ai_chat": "/ai/chat"
        }
    }

@app.get("/health")
def health_check():
    """Health check endpoint for monitoring"""
    api_key_configured = bool(os.getenv("OPENAI_API_KEY"))
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "environment": ENVIRONMENT,
        "ai_service_configured": api_key_configured,
        "cors_origins": "all" if ENVIRONMENT == "production" else "restricted"
    }

@app.get("/modules", response_model=List[Module])
def get_modules():
    return list(MODULES.values())

@app.get("/modules/{module_id}", response_model=Module)
def get_module(module_id: str):
    if module_id not in MODULES:
        raise HTTPException(status_code=404, detail="Module not found")
    return MODULES[module_id]

@app.get("/leaderboard")
def get_leaderboard():
    # Sort leaderboard by XP in descending order
    sorted_leaderboard = sorted(LEADERBOARD, key=lambda x: x["xp"], reverse=True)
    return sorted_leaderboard

@app.post("/users")
def create_user(user: User):
    user_id = str(uuid.uuid4())
    user.id = user_id
    user.created_at = datetime.now()
    USERS[user_id] = user.dict()
    return user

@app.get("/users/{user_id}")
def get_user(user_id: str):
    if user_id not in USERS:
        raise HTTPException(status_code=404, detail="User not found")
    return USERS[user_id]

@app.post("/login")
def login(user_login: UserLogin):
    # Mock login (replace with actual authentication in production)
    return {
        "access_token": "mock_token",
        "token_type": "bearer",
        "user_id": "1",
        "username": user_login.username
    }

@app.post("/progress")
def update_progress(progress: UserProgress, user_id: str):
    if user_id not in USERS:
        raise HTTPException(status_code=404, detail="User not found")
    
    user = USERS[user_id]
    if progress.module_id not in user["progress"]:
        user["progress"][progress.module_id] = {}
    
    if progress.lesson_id:
        if "lessons" not in user["progress"][progress.module_id]:
            user["progress"][progress.module_id]["lessons"] = {}
        user["progress"][progress.module_id]["lessons"][progress.lesson_id] = {
            "completed": progress.completed
        }
    
    if progress.quiz_id:
        if "quizzes" not in user["progress"][progress.module_id]:
            user["progress"][progress.module_id]["quizzes"] = {}
        user["progress"][progress.module_id]["quizzes"][progress.quiz_id] = {
            "completed": progress.completed,
            "score": progress.score
        }
    
    # Check if module is completed
    module = MODULES[progress.module_id]
    all_lessons_completed = all(
        user["progress"][progress.module_id].get("lessons", {}).get(lesson["id"], {}).get("completed", False)
        for lesson in module["lessons"]
    )
    all_quizzes_completed = all(
        user["progress"][progress.module_id].get("quizzes", {}).get(quiz["id"], {}).get("completed", False)
        for quiz in module["quizzes"]
    )
    
    if all_lessons_completed and all_quizzes_completed:
        if progress.module_id not in user["modules_completed"]:
            user["modules_completed"].append(progress.module_id)
            user["xp"] += module["xp_reward"]
            if module["badge"] not in user["badges"]:
                user["badges"].append(module["badge"])
            
            # Update user level based on XP
            if user["xp"] >= 5001:
                user["level"] = "Master"
            elif user["xp"] >= 3001:
                user["level"] = "Expert"
            elif user["xp"] >= 1501:
                user["level"] = "Practitioner"
            elif user["xp"] >= 501:
                user["level"] = "Apprentice"
            else:
                user["level"] = "Novice"
            
            # Set next module as current
            next_module_id = str(int(progress.module_id) + 1)
            if next_module_id in MODULES:
                user["current_module"] = next_module_id
    
    return {"success": True, "user": user}

@app.post("/ai/chat")
async def ai_chat(chat_request: ChatRequest):
    try:
        # Get API credentials from environment variables
        api_key = os.getenv("OPENAI_API_KEY")
        api_base_url = os.getenv("API_BASE_URL", "https://litellm.deriv.ai/v1")
        model_name = os.getenv("OPENAI_MODEL_NAME", "gpt-4.1-mini")
        
        # If no API key is configured, return a helpful fallback response
        if not api_key:
            return {
                "message": "I'm currently unable to access the AI service. However, I can still help you with Partner Academy questions! Please check the FAQs section or contact your partner manager for immediate assistance.",
                "usage": {"fallback": True}
            }
        
        # Prepare the request payload
        payload = {
            "model": model_name,
            "messages": [{"role": msg.role, "content": msg.content} for msg in chat_request.messages],
            "max_tokens": chat_request.max_tokens,
            "temperature": chat_request.temperature,
            "stream": False
        }
        
        # Make the API call with timeout
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{api_base_url}/chat/completions",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}"
                },
                json=payload
            )
            
            if response.status_code != 200:
                # Log the error for debugging
                print(f"OpenAI API error: {response.status_code} - {response.text}")
                
                # Return a helpful fallback response
                return {
                    "message": "I'm experiencing some technical difficulties right now. For immediate help with Partner Academy questions, please check the FAQs section or contact your partner manager.",
                    "usage": {"fallback": True, "error": f"API returned {response.status_code}"}
                }
            
            result = response.json()
            
            if "choices" not in result or not result["choices"]:
                return {
                    "message": "I'm having trouble processing your request right now. Please try asking your question again, or contact your partner manager for immediate assistance.",
                    "usage": {"fallback": True, "error": "Invalid API response"}
                }
            
            return {
                "message": result["choices"][0]["message"]["content"],
                "usage": result.get("usage", {})
            }
            
    except httpx.TimeoutException:
        print("AI API request timed out")
        return {
            "message": "The AI service is taking longer than usual to respond. For immediate assistance with Partner Academy questions, please check the FAQs section or contact your partner manager.",
            "usage": {"fallback": True, "error": "timeout"}
        }
    except httpx.RequestError as e:
        print(f"Request error: {str(e)}")
        return {
            "message": "I'm currently unable to connect to the AI service. However, I can still help! Please check the FAQs section for common questions or contact your partner manager for immediate assistance.",
            "usage": {"fallback": True, "error": "connection_error"}
        }
    except Exception as e:
        print(f"Unexpected error in AI chat: {str(e)}")
        return {
            "message": "I encountered an unexpected error. For reliable assistance with Partner Academy questions, please check the FAQs section or contact your partner manager.",
            "usage": {"fallback": True, "error": "unexpected_error"}
        }

# Run with: uvicorn app.main:app --reload 