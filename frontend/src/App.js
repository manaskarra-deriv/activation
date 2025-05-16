import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Spinner, Center, useBreakpointValue } from '@chakra-ui/react';
import './styles/responsive.css'; // Import the responsive CSS

// Pages
import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import ModuleDetail from './pages/ModuleDetail';
import LessonDetail from './pages/LessonDetail';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Curriculum from './pages/Curriculum';
import Gamification from './pages/Gamification';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center h="100vh" p={4}>
          <Box>
            <h2>Something went wrong.</h2>
            <button onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </Box>
        </Center>
      );
    }

    return this.props.children;
  }
}

// Main app wrapper
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

// App content with auth context
function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  
  // Determine sidebar state based on screen size
  const defaultSidebarState = useBreakpointValue({ base: false, md: true });
  React.useEffect(() => {
    setSidebarOpen(defaultSidebarState);
  }, [defaultSidebarState]);

  // Show loading spinner while data is loading
  if (loading) {
    return (
      <Center h="100vh">
        <Spinner 
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
      </Center>
    );
  }
  
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <Box 
        ml={{ base: 0, md: 60 }} 
        transition="margin-left 0.3s" 
        flex="1"
      >
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <Box 
          as="main" 
          p={{ base: 2, md: 4 }} 
          mt={16}
          maxW="100%"
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/modules/:moduleId" element={<ModuleDetail />} />
            <Route path="/modules/:moduleId/lessons/:lessonId" element={<LessonDetail />} />
            <Route path="/modules/:moduleId/quizzes/:quizId" element={<Quiz />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App; 