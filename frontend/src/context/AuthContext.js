import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

// Create context
const AuthContext = createContext();

// API URL
const API_URL = config.apiUrl;

// Mock user data (used for demo)
const MOCK_USER = {
  id: "mock-user-1",
  username: "demo_partner",
  email: "demo@example.com",
  xp: 1250,
  level: "Apprentice",
  badges: ["Foundation Builder", "Campaign Creator"],
  modules_completed: ["1", "2"],
  current_module: "3",
  progress: {
    "1": {
      lessons: {
        "1.1": { completed: true },
        "1.2": { completed: true },
        "1.3": { completed: true },
        "1.4": { completed: true },
        "1.5": { completed: true }
      },
      quizzes: {
        "q1.1": { completed: true, score: 90 }
      }
    },
    "2": {
      lessons: {
        "2.1": { completed: true },
        "2.2": { completed: true },
        "2.3": { completed: true },
        "2.4": { completed: true },
        "2.5": { completed: true }
      },
      quizzes: {
        "q2.1": { completed: true, score: 85 }
      }
    },
    "3": {
      lessons: {
        "3.1": { completed: false },
        "3.2": { completed: false },
        "3.3": { completed: false },
        "3.4": { completed: false },
        "3.5": { completed: false }
      },
      quizzes: {
        "q3.1": { completed: false }
      }
    }
  },
  created_at: new Date().toISOString()
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(MOCK_USER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update user progress locally
  const updateProgress = async (progressData) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      // Update mock user locally
      const updatedUser = { ...user };
      
      const { module_id, lesson_id, quiz_id, completed, score } = progressData;
      
      if (!updatedUser.progress[module_id]) {
        updatedUser.progress[module_id] = {};
      }
      
      if (lesson_id) {
        if (!updatedUser.progress[module_id].lessons) {
          updatedUser.progress[module_id].lessons = {};
        }
        updatedUser.progress[module_id].lessons[lesson_id] = {
          completed
        };
      }
      
      if (quiz_id) {
        if (!updatedUser.progress[module_id].quizzes) {
          updatedUser.progress[module_id].quizzes = {};
        }
        updatedUser.progress[module_id].quizzes[quiz_id] = {
          completed,
          score
        };
      }
      
      // Check if module is completed
      const moduleLessons = [
        { id: `${module_id}.1` }, 
        { id: `${module_id}.2` }, 
        { id: `${module_id}.3` }, 
        { id: `${module_id}.4` }, 
        { id: `${module_id}.5` }
      ];
      
      const moduleQuizzes = [
        { id: `q${module_id}.1` }
      ];
      
      const allLessonsCompleted = moduleLessons.every(
        lesson => updatedUser.progress[module_id]?.lessons?.[lesson.id]?.completed
      );
      
      const allQuizzesCompleted = moduleQuizzes.every(
        quiz => updatedUser.progress[module_id]?.quizzes?.[quiz.id]?.completed
      );
      
      if (allLessonsCompleted && allQuizzesCompleted) {
        if (!updatedUser.modules_completed.includes(module_id)) {
          updatedUser.modules_completed.push(module_id);
          updatedUser.xp += 100 * parseInt(module_id);
          
          // Update level based on XP
          if (updatedUser.xp >= 5001) {
            updatedUser.level = "Master";
          } else if (updatedUser.xp >= 3001) {
            updatedUser.level = "Expert";
          } else if (updatedUser.xp >= 1501) {
            updatedUser.level = "Practitioner";
          } else if (updatedUser.xp >= 501) {
            updatedUser.level = "Apprentice";
          } else {
            updatedUser.level = "Novice";
          }
          
          // Set next module as current
          const nextModuleId = (parseInt(module_id) + 1).toString();
          if (nextModuleId <= "5") {
            updatedUser.current_module = nextModuleId;
          }
        }
      }
      
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (err) {
      console.error('Failed to update progress:', err);
      return { success: false, error: err.message };
    }
  };

  // Return the context value
  const value = {
    user,
    loading,
    error,
    updateProgress
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 