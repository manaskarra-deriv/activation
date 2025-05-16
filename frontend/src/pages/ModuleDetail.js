import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  Badge,
  Icon,
  Button,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Progress,
  Divider,
  List,
  ListItem,
  ListIcon,
  Skeleton,
  useColorModeValue,
  Alert,
  AlertIcon,
  useToast
} from '@chakra-ui/react';
import { 
  FiAward, 
  FiChevronRight, 
  FiClock, 
  FiCheckCircle, 
  FiCircle, 
  FiFile, 
  FiArrowLeft 
} from 'react-icons/fi';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user, updateProgress } = useAuth();
  
  const [module, setModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Card styling
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Fetch module data
  useEffect(() => {
    const fetchModule = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8000/modules/${moduleId}`);
        setModule(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching module:', err);
        setError('Failed to load module. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchModule();
  }, [moduleId]);

  // Calculate progress for this module
  const moduleProgress = user?.progress?.[moduleId] || {};
  const totalLessons = module?.lessons?.length || 0;
  const totalQuizzes = module?.quizzes?.length || 0;
  
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
  
  // Check if lesson is completed
  const isLessonCompleted = (lessonId) => {
    return moduleProgress?.lessons?.[lessonId]?.completed || false;
  };
  
  // Check if quiz is completed
  const isQuizCompleted = (quizId) => {
    return moduleProgress?.quizzes?.[quizId]?.completed || false;
  };
  
  // Handle starting a lesson
  const handleStartLesson = (lessonId) => {
    navigate(`/modules/${moduleId}/lessons/${lessonId}`);
  };
  
  // Handle starting a quiz
  const handleStartQuiz = (quizId) => {
    navigate(`/modules/${moduleId}/quizzes/${quizId}`);
  };
  
  // Mark module as complete (demo functionality)
  const handleCompleteModule = async () => {
    // In a real app, this would verify all lessons and quizzes are actually completed
    
    // Mark all lessons as complete
    for (const lesson of module.lessons) {
      await updateProgress({
        module_id: moduleId,
        lesson_id: lesson.id,
        completed: true
      });
    }
    
    // Mark all quizzes as complete
    for (const quiz of module.quizzes) {
      await updateProgress({
        module_id: moduleId,
        quiz_id: quiz.id,
        completed: true,
        score: 85 // Mock score
      });
    }
    
    toast({
      title: 'Module completed!',
      description: `You've earned ${module.xp_reward} XP and the "${module.badge}" badge!`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={5}>
        <Stack spacing={6}>
          <Skeleton height="40px" width="50%" />
          <Skeleton height="20px" width="70%" />
          <Skeleton height="200px" />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Skeleton height="300px" />
            <Skeleton height="300px" />
          </SimpleGrid>
        </Stack>
      </Container>
    );
  }

  if (error || !module) {
    return (
      <Container maxW="container.xl" py={5}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error || 'Module not found'}
        </Alert>
        <Button 
          leftIcon={<FiArrowLeft />} 
          mt={4} 
          onClick={() => navigate('/modules')}
        >
          Back to Modules
        </Button>
      </Container>
    );
  }

  const isModuleCompleted = user?.modules_completed?.includes(moduleId);

  return (
    <Container maxW="container.xl" py={5}>
      <Stack spacing={8}>
        {/* Back button */}
        <Button 
          leftIcon={<FiArrowLeft />} 
          variant="ghost" 
          alignSelf="flex-start"
          onClick={() => navigate('/modules')}
        >
          Back to Modules
        </Button>
        
        {/* Module header */}
        <Box>
          <Flex align="center" mb={2}>
            <Heading mr={3}>Module {moduleId}: {module.title}</Heading>
            {isModuleCompleted && (
              <Badge colorScheme="green" p={1} fontSize="md">
                <Flex align="center">
                  <Icon as={FiCheckCircle} mr={1} />
                  Completed
                </Flex>
              </Badge>
            )}
          </Flex>
          <Text color="gray.600">{module.description}</Text>
        </Box>
        
        {/* Module progress */}
        <Card bg={cardBg} boxShadow="md" borderRadius="lg">
          <CardBody>
            <Stack spacing={4}>
              <Flex justify="space-between" align="center">
                <Text fontWeight="medium">Your Progress</Text>
                <Text fontWeight="bold">{progressPercent.toFixed(0)}% Complete</Text>
              </Flex>
              
              <Progress 
                value={progressPercent} 
                size="md" 
                colorScheme={isModuleCompleted ? 'green' : 'brand'} 
                borderRadius="full"
                hasStripe
              />
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <Flex align="center">
                  <Icon as={FiCheckCircle} color="green.500" mr={2} />
                  <Text>{completedLessons}/{totalLessons} Lessons</Text>
                </Flex>
                
                <Flex align="center">
                  <Icon as={FiFile} color="blue.500" mr={2} />
                  <Text>{completedQuizzes}/{totalQuizzes} Quizzes</Text>
                </Flex>
                
                <Flex align="center">
                  <Icon as={FiAward} color="accent.500" mr={2} />
                  <Text>Reward: {module.xp_reward} XP</Text>
                </Flex>
              </SimpleGrid>
            </Stack>
          </CardBody>
        </Card>
        
        {/* Module content */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {/* Lessons */}
          <Card bg={cardBg} boxShadow="md" borderRadius="lg">
            <CardHeader>
              <Heading size="md">Lessons</Heading>
            </CardHeader>
            <CardBody>
              <List spacing={3}>
                {module.lessons.map((lesson, index) => (
                  <ListItem key={lesson.id}>
                    <Flex 
                      p={3} 
                      border="1px" 
                      borderColor={borderColor} 
                      borderRadius="md"
                      bg={isLessonCompleted(lesson.id) ? 'green.50' : 'white'}
                      _hover={{ 
                        bg: isLessonCompleted(lesson.id) ? 'green.100' : 'gray.50',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleStartLesson(lesson.id)}
                    >
                      <ListIcon 
                        as={isLessonCompleted(lesson.id) ? FiCheckCircle : FiCircle} 
                        color={isLessonCompleted(lesson.id) ? 'green.500' : 'gray.400'} 
                        mt={1}
                      />
                      
                      <Box flex="1">
                        <Text fontWeight="medium">
                          {index + 1}. {lesson.title}
                        </Text>
                        
                        <Flex mt={1} align="center" color="gray.500">
                          <Icon as={FiClock} boxSize={3} mr={1} />
                          <Text fontSize="sm">{lesson.duration}</Text>
                        </Flex>
                      </Box>
                      
                      <Button 
                        rightIcon={<FiChevronRight />}
                        size="sm"
                        colorScheme={isLessonCompleted(lesson.id) ? 'green' : 'brand'}
                        variant={isLessonCompleted(lesson.id) ? 'outline' : 'solid'}
                      >
                        {isLessonCompleted(lesson.id) ? 'Review' : 'Start'}
                      </Button>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>
          
          {/* Quizzes and rewards */}
          <Stack spacing={6}>
            {/* Quizzes */}
            <Card bg={cardBg} boxShadow="md" borderRadius="lg">
              <CardHeader>
                <Heading size="md">Quizzes</Heading>
              </CardHeader>
              <CardBody>
                <List spacing={3}>
                  {module.quizzes.map((quiz, index) => (
                    <ListItem key={quiz.id}>
                      <Flex 
                        p={3} 
                        border="1px" 
                        borderColor={borderColor} 
                        borderRadius="md"
                        bg={isQuizCompleted(quiz.id) ? 'green.50' : 'white'}
                        _hover={{ 
                          bg: isQuizCompleted(quiz.id) ? 'green.100' : 'gray.50',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleStartQuiz(quiz.id)}
                      >
                        <ListIcon 
                          as={isQuizCompleted(quiz.id) ? FiCheckCircle : FiCircle} 
                          color={isQuizCompleted(quiz.id) ? 'green.500' : 'gray.400'} 
                          mt={1}
                        />
                        
                        <Box flex="1">
                          <Text fontWeight="medium">
                            {quiz.title}
                          </Text>
                          
                          <Flex mt={1} align="center" color="gray.500">
                            <Text fontSize="sm">
                              {quiz.questions} questions • {quiz.pass_rate}% to pass
                            </Text>
                          </Flex>
                        </Box>
                        
                        <Button 
                          rightIcon={<FiChevronRight />}
                          size="sm"
                          colorScheme={isQuizCompleted(quiz.id) ? 'green' : 'brand'}
                          variant={isQuizCompleted(quiz.id) ? 'outline' : 'solid'}
                        >
                          {isQuizCompleted(quiz.id) ? 'Review' : 'Start'}
                        </Button>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              </CardBody>
            </Card>
            
            {/* Rewards */}
            <Card bg={cardBg} boxShadow="md" borderRadius="lg">
              <CardHeader>
                <Heading size="md">Rewards</Heading>
              </CardHeader>
              <CardBody>
                <Stack spacing={4}>
                  <Flex align="center">
                    <Icon as={FiAward} boxSize={6} color="accent.500" mr={3} />
                    <Box>
                      <Text fontWeight="bold">{module.badge} Badge</Text>
                      <Text fontSize="sm" color="gray.600">
                        Complete this module to earn this badge
                      </Text>
                    </Box>
                  </Flex>
                  
                  <Divider />
                  
                  <Flex align="center">
                    <Icon as={FiAward} boxSize={6} color="blue.500" mr={3} />
                    <Box>
                      <Text fontWeight="bold">{module.xp_reward} XP</Text>
                      <Text fontSize="sm" color="gray.600">
                        Earn experience points to level up
                      </Text>
                    </Box>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
            
            {/* Demo button - Skip and mark complete for demo purposes */}
            <Button 
              colorScheme={isModuleCompleted ? 'green' : 'brand'}
              size="lg"
              onClick={handleCompleteModule}
              leftIcon={isModuleCompleted ? <FiCheckCircle /> : <FiAward />}
              isDisabled={isModuleCompleted}
            >
              {isModuleCompleted ? 'Module Completed' : 'Demo: Mark Module as Complete'}
            </Button>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default ModuleDetail; 