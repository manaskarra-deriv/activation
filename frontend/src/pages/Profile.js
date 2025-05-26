import React, { useState } from 'react';
import {
  Container,
  Heading,
  Text,
  Stack,
  Box,
  Flex,
  Avatar,
  Badge,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Icon,
  Progress,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { FiAward, FiEdit, FiSave, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.700');
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  
  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would save to the backend
    // For now, just show a success message
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
    setIsEditing(false);
  };
  
  // Calculate level progress
  const getLevelProgress = () => {
    if (!user) return { percent: 0, current: 0, next: 0 };
    
    const xp = user.xp;
    
    if (xp >= 5001) {
      return { percent: 100, current: xp, next: 'Max Level' };
    } 
    
    if (xp >= 3001) {
      return { percent: (xp - 3001) / (5001 - 3001) * 100, current: xp, next: 5001 };
    }
    
    if (xp >= 1501) {
      return { percent: (xp - 1501) / (3001 - 1501) * 100, current: xp, next: 3001 };
    }
    
    if (xp >= 501) {
      return { percent: (xp - 501) / (1501 - 501) * 100, current: xp, next: 1501 };
    }
    
    return { percent: (xp / 501) * 100, current: xp, next: 501 };
  };
  
  const levelProgress = getLevelProgress();
  
  return (
    <Container maxW="container.xl" py={5}>
      <Stack spacing={8}>
        <Box>
          <Heading mb={2}>Your Profile</Heading>
          <Text color="gray.600">
            View and manage your Partner Activation Academy profile.
          </Text>
        </Box>
        
        {/* Profile overview */}
        <Card bg={cardBg} boxShadow="md" borderRadius="lg">
          <CardBody>
            <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={6}>
              <Avatar 
                size="2xl" 
                name={user?.username || 'User'} 
                src={user?.avatar} 
                bg="brand.500"
              />
              
              <Box flex="1">
                <Heading size="lg">{user?.username || 'User'}</Heading>
                <Badge colorScheme="green" fontSize="md" my={2}>
                  {user?.level || 'Novice'}
                </Badge>
                
                <Text color="gray.600" mb={4}>
                  {user?.email || 'user@example.com'}
                </Text>
              </Box>
              
              {!isEditing && (
                <Button 
                  leftIcon={<FiEdit />} 
                  colorScheme="brand" 
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </Flex>
          </CardBody>
        </Card>
        
        {/* Edit profile form */}
        {isEditing && (
          <Card bg={cardBg} boxShadow="md" borderRadius="lg">
            <CardHeader>
              <Heading size="md">Edit Profile</Heading>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl id="username">
                    <FormLabel>Username</FormLabel>
                    <Input 
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </FormControl>
                  
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  
                  <Flex justify="flex-end" gap={4}>
                    <Button 
                      variant="ghost" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      colorScheme="brand"
                      leftIcon={<FiSave />}
                    >
                      Save Changes
                    </Button>
                  </Flex>
                </Stack>
              </form>
            </CardBody>
          </Card>
        )}
        
        {/* XP & Level */}
        <Card bg={cardBg} boxShadow="md" borderRadius="lg">
          <CardHeader>
            <Heading size="md">Experience & Level</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={6}>
              <Flex align="center" justify="space-between">
                <Stack>
                  <Text fontWeight="bold" fontSize="xl">
                    {user?.xp || 0} XP
                  </Text>
                  <Text color="gray.600">
                    {levelProgress.next === 'Max Level' 
                      ? 'You reached the maximum level!' 
                      : `${levelProgress.next - levelProgress.current} XP needed for next level`}
                  </Text>
                </Stack>
                
                <Badge 
                  p={2} 
                  borderRadius="md" 
                  colorScheme="brand"
                  fontSize="md"
                >
                  Level: {user?.level || 'Novice'}
                </Badge>
              </Flex>
              
              <Box>
                <Progress 
                  value={levelProgress.percent} 
                  size="md" 
                  colorScheme="brand" 
                  borderRadius="full"
                  hasStripe
                  mb={2}
                />
                <Flex justify="space-between">
                  <Text fontSize="sm">Current: {levelProgress.current} XP</Text>
                  <Text fontSize="sm">
                    Next: {levelProgress.next === 'Max Level' ? levelProgress.next : `${levelProgress.next} XP`}
                  </Text>
                </Flex>
              </Box>
              
              <Box bg="gray.50" p={4} borderRadius="md">
                <Text fontWeight="medium" mb={2}>Level Benefits</Text>
                <Stack spacing={2}>
                  <Flex align="center">
                    <Icon as={FiCheckCircle} color="green.500" mr={2} />
                    <Text fontSize="sm">Access to more learning materials</Text>
                  </Flex>
                  <Flex align="center">
                    <Icon as={FiCheckCircle} color="green.500" mr={2} />
                    <Text fontSize="sm">Higher placement on the leaderboard</Text>
                  </Flex>
                  <Flex align="center">
                    <Icon as={FiCheckCircle} color="green.500" mr={2} />
                    <Text fontSize="sm">Fast track to Silver tier at Expert level</Text>
                  </Flex>
                </Stack>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Container>
  );
};

export default Profile; 