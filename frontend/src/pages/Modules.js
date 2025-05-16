import React, { useState, useEffect } from 'react';
import {
  Container,
  SimpleGrid,
  Heading,
  Text,
  Stack,
  Box,
  Skeleton,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import config from '../config';

// Components
import ModuleCard from '../components/ModuleCard';

const Modules = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch modules data
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${config.apiUrl}/modules`);
        setModules(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching modules:', err);
        setError('Failed to load modules. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  // Helper to determine module status
  const getModuleStatus = (moduleId) => {
    // If no user, consider all modules locked except the first one
    if (!user) {
      return { isActive: moduleId === '1', isCompleted: false, isLocked: moduleId !== '1' };
    }
    
    const isCompleted = user.modules_completed?.includes(moduleId);
    const currentModuleId = user.current_module;
    
    // Current module is active
    if (moduleId === currentModuleId) {
      return { isActive: true, isCompleted, isLocked: false };
    }
    
    // All completed modules are unlocked
    if (isCompleted) {
      return { isActive: false, isCompleted: true, isLocked: false };
    }
    
    // Modules with id <= current are unlocked
    const isLocked = parseInt(moduleId) > parseInt(currentModuleId);
    return { isActive: false, isCompleted: false, isLocked };
  };

  return (
    <Container maxW="container.xl" py={5}>
      <Stack spacing={8}>
        <Box>
          <Heading mb={2}>Learning Modules</Heading>
          <Text color="gray.600">
            Complete each module to earn badges, XP, and fast-track to Silver partner status.
          </Text>
        </Box>

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Modules grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {isLoading ? (
            // Loading skeletons
            Array(5).fill(0).map((_, i) => (
              <Box key={i} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Stack spacing={4} p={6}>
                  <Skeleton height="20px" width="70%" />
                  <Skeleton height="14px" width="100%" />
                  <Skeleton height="14px" width="90%" />
                  <Skeleton height="14px" width="80%" />
                  <Skeleton height="30px" width="100%" />
                </Stack>
              </Box>
            ))
          ) : (
            // Actual modules
            modules.map((module) => {
              const { isActive, isCompleted, isLocked } = getModuleStatus(module.id);
              
              return (
                <ModuleCard
                  key={module.id}
                  module={module}
                  isActive={isActive}
                  isCompleted={isCompleted}
                  isLocked={isLocked}
                />
              );
            })
          )}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default Modules; 