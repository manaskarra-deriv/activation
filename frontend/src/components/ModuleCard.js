import React from 'react';
import {
  Box,
  Badge,
  Heading,
  Text,
  Flex,
  Stack,
  Progress,
  Icon,
  useColorModeValue,
  Button
} from '@chakra-ui/react';
import { FiAward, FiClock, FiLock, FiCheck, FiChevronRight } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ModuleCard = ({ module, isActive = false, isCompleted = false, isLocked = false }) => {
  const { user } = useAuth();
  
  // Card styling
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const activeBg = useColorModeValue('brand.50', 'brand.900');
  
  // Calculate progress in this module
  const moduleProgress = user?.progress?.[module.id] || {};
  const totalLessons = module.lessons.length;
  const totalQuizzes = module.quizzes.length;
  
  // Count completed lessons
  const completedLessons = Object.values(moduleProgress?.lessons || {})
    .filter(lesson => lesson.completed).length;
  
  // Count completed quizzes
  const completedQuizzes = Object.values(moduleProgress?.quizzes || {})
    .filter(quiz => quiz.completed).length;
  
  // Calculate total progress percentage
  const totalItems = totalLessons + totalQuizzes;
  const completedItems = completedLessons + completedQuizzes;
  const progressPercent = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={isActive ? activeBg : bgColor}
      borderColor={isActive ? 'brand.400' : borderColor}
      position="relative"
      transition="all 0.2s"
      _hover={{ transform: isLocked ? 'none' : 'translateY(-5px)', shadow: isLocked ? 'none' : 'md' }}
      opacity={isLocked ? 0.7 : 1}
    >
      {/* Locked overlay */}
      {isLocked && (
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.200"
          zIndex="1"
          justify="center"
          align="center"
          borderRadius="lg"
        >
          <Icon as={FiLock} boxSize={8} color="gray.500" />
        </Flex>
      )}
      
      {/* Status badge */}
      {(isCompleted || isActive) && (
        <Badge
          position="absolute"
          top={2}
          right={2}
          colorScheme={isCompleted ? 'green' : 'blue'}
          variant="solid"
          zIndex="2"
        >
          {isCompleted ? 'Completed' : 'In Progress'}
        </Badge>
      )}
      
      <Box p={6} zIndex="0">
        <Stack spacing={4}>
          <Heading as="h3" size="md">
            {module.title}
          </Heading>
          
          <Text color="gray.600">{module.description}</Text>
          
          <Stack direction="row" align="center" justify="space-between">
            <Flex align="center">
              <Icon as={FiAward} color="accent.500" mr={2} />
              <Text fontSize="sm" fontWeight="medium">
                {module.xp_reward} XP
              </Text>
            </Flex>
            
            <Flex align="center">
              <Icon as={FiClock} color="gray.500" mr={2} />
              <Text fontSize="sm" color="gray.500">
                ~{module.lessons.reduce((acc, lesson) => {
                  const time = parseInt(lesson.duration.split(' ')[0]);
                  return acc + (isNaN(time) ? 0 : time);
                }, 0)} min
              </Text>
            </Flex>
          </Stack>
          
          {!isLocked && (
            <>
              <Box>
                <Flex justify="space-between" mb={1}>
                  <Text fontSize="xs" fontWeight="medium">Progress</Text>
                  <Text fontSize="xs">{progressPercent.toFixed(0)}%</Text>
                </Flex>
                <Progress 
                  value={progressPercent} 
                  size="sm" 
                  colorScheme={isCompleted ? 'green' : 'brand'} 
                  borderRadius="full" 
                />
              </Box>
              
              <Stack>
                <Text fontSize="sm" fontWeight="medium">
                  You'll earn:
                </Text>
                <Flex align="center">
                  <Icon as={FiAward} color="accent.500" mr={2} />
                  <Text fontSize="sm">"{module.badge}" Badge</Text>
                </Flex>
              </Stack>
              
              <Button
                as={RouterLink}
                to={`/modules/${module.id}`}
                rightIcon={isCompleted ? <FiCheck /> : <FiChevronRight />}
                colorScheme={isCompleted ? 'green' : 'brand'}
                variant={isCompleted ? 'outline' : 'solid'}
                size="md"
                width="full"
              >
                {isCompleted 
                  ? 'Review Module' 
                  : progressPercent > 0 
                    ? 'Continue Module' 
                    : 'Start Module'
                }
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default ModuleCard; 