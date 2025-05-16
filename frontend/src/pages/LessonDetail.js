import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  Stack,
  Flex,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LessonDetail = () => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { updateProgress } = useAuth();
  const cardBg = useColorModeValue('white', 'gray.700');
  
  // Mock lesson content
  const lessonContent = {
    title: "Lesson Content",
    description: "This is a placeholder for the lesson content. In a real application, this would contain actual lesson materials including text, images, videos, etc.",
    content: [
      "Welcome to this lesson! This is a placeholder component.",
      "The actual lesson would contain comprehensive educational content.",
      "You would be able to navigate through the materials and track your progress."
    ]
  };
  
  // Handle marking the lesson as complete
  const handleCompleteLesson = async () => {
    try {
      await updateProgress({
        module_id: moduleId,
        lesson_id: lessonId,
        completed: true
      });
      
      // Navigate back to module detail
      navigate(`/modules/${moduleId}`);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };
  
  return (
    <Container maxW="container.xl" py={5}>
      <Stack spacing={6}>
        {/* Back button */}
        <Button 
          leftIcon={<FiArrowLeft />} 
          variant="ghost" 
          alignSelf="flex-start"
          onClick={() => navigate(`/modules/${moduleId}`)}
        >
          Back to Module
        </Button>
        
        {/* Lesson content */}
        <Card bg={cardBg} boxShadow="md" borderRadius="lg">
          <CardBody>
            <Stack spacing={6}>
              <Heading size="lg">
                {lessonContent.title}
              </Heading>
              
              <Text color="gray.600">
                {lessonContent.description}
              </Text>
              
              <Box p={5} bg="gray.50" borderRadius="md">
                {lessonContent.content.map((paragraph, index) => (
                  <Text key={index} mb={4}>
                    {paragraph}
                  </Text>
                ))}
              </Box>
              
              <Flex justify="flex-end">
                <Button 
                  colorScheme="brand" 
                  size="lg"
                  onClick={handleCompleteLesson}
                >
                  Mark as Complete
                </Button>
              </Flex>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Container>
  );
};

export default LessonDetail; 