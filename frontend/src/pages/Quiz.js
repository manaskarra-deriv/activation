import React, { useState } from 'react';
import {
  Container,
  Heading,
  Text,
  Stack,
  Box,
  Radio,
  RadioGroup,
  Button,
  Card,
  CardBody,
  Progress,
  Flex,
  Alert,
  AlertIcon,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Quiz = () => {
  const { moduleId, quizId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { updateProgress } = useAuth();
  const cardBg = useColorModeValue('white', 'gray.700');
  
  // Mock quiz questions
  const mockQuestions = [
    {
      id: 1,
      question: "What is the main benefit of the Partner Activation Academy?",
      options: [
        "Free products",
        "Fast-track to Silver tier status",
        "Direct cash rewards",
        "Automatic client acquisition"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "How many modules are in the Partner Activation Academy?",
      options: [
        "3 modules",
        "4 modules",
        "5 modules",
        "6 modules"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "What is the primary gamification element in the platform?",
      options: [
        "Leaderboards only",
        "Badges only",
        "XP points only",
        "All of the above"
      ],
      correctAnswer: 3
    }
  ];
  
  // State for tracking answers and current question
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  // Handle answer selection
  const handleAnswerSelect = (value) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: parseInt(value)
    });
  };
  
  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctAnswers = mockQuestions.filter(
        (q, index) => selectedAnswers[index] === q.correctAnswer
      ).length;
      
      const finalScore = Math.round((correctAnswers / mockQuestions.length) * 100);
      setScore(finalScore);
      setQuizCompleted(true);
      
      // Update progress
      updateProgress({
        module_id: moduleId,
        quiz_id: quizId,
        completed: true,
        score: finalScore
      });
    }
  };
  
  // Handle going back to module
  const handleBackToModule = () => {
    navigate(`/modules/${moduleId}`);
  };
  
  // Current question data
  const question = mockQuestions[currentQuestion];
  
  return (
    <Container maxW="container.xl" py={5}>
      <Stack spacing={6}>
        {/* Back button */}
        <Button 
          leftIcon={<FiArrowLeft />} 
          variant="ghost" 
          alignSelf="flex-start"
          onClick={handleBackToModule}
        >
          Back to Module
        </Button>
        
        {/* Quiz content */}
        <Card bg={cardBg} boxShadow="md" borderRadius="lg">
          <CardBody>
            <Stack spacing={6}>
              <Heading size="lg">
                {quizCompleted ? "Quiz Completed" : "Module Quiz"}
              </Heading>
              
              {!quizCompleted ? (
                <>
                  {/* Progress bar */}
                  <Box>
                    <Text mb={2}>Question {currentQuestion + 1} of {mockQuestions.length}</Text>
                    <Progress 
                      value={(currentQuestion + 1) / mockQuestions.length * 100} 
                      size="sm" 
                      colorScheme="brand" 
                      borderRadius="full" 
                    />
                  </Box>
                  
                  {/* Question */}
                  <Box p={6} bg="gray.50" borderRadius="md">
                    <Text fontWeight="bold" fontSize="xl" mb={4}>
                      {question.question}
                    </Text>
                    
                    <RadioGroup 
                      onChange={handleAnswerSelect} 
                      value={selectedAnswers[currentQuestion]}
                    >
                      <Stack spacing={3}>
                        {question.options.map((option, index) => (
                          <Radio key={index} value={index} colorScheme="brand">
                            {option}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Box>
                  
                  {/* Navigation */}
                  <Flex justify="flex-end">
                    <Button 
                      colorScheme="brand" 
                      size="lg"
                      onClick={handleNextQuestion}
                      isDisabled={selectedAnswers[currentQuestion] === undefined}
                    >
                      {currentQuestion < mockQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                  </Flex>
                </>
              ) : (
                <>
                  {/* Results */}
                  <Alert 
                    status={score >= 70 ? "success" : "warning"}
                    borderRadius="md"
                  >
                    <AlertIcon />
                    {score >= 70 
                      ? "Congratulations! You've passed the quiz." 
                      : "You didn't pass the required threshold. You can try again later."}
                  </Alert>
                  
                  <Box p={6} bg="gray.50" borderRadius="md" textAlign="center">
                    <Heading size="md" mb={4}>Your Score</Heading>
                    <Text fontSize="4xl" fontWeight="bold" color={score >= 70 ? "green.500" : "orange.500"}>
                      {score}%
                    </Text>
                    <Text mt={2}>
                      You answered {mockQuestions.filter(
                        (q, index) => selectedAnswers[index] === q.correctAnswer
                      ).length} out of {mockQuestions.length} questions correctly.
                    </Text>
                  </Box>
                  
                  <Flex justify="flex-end">
                    <Button 
                      colorScheme="brand" 
                      size="lg"
                      leftIcon={<FiCheckCircle />}
                      onClick={handleBackToModule}
                    >
                      Return to Module
                    </Button>
                  </Flex>
                </>
              )}
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Container>
  );
};

export default Quiz; 