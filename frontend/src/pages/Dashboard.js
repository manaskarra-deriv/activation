import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Badge,
  Flex,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  Card,
  CardHeader,
  CardBody,
  Button,
  useColorModeValue,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  Image
} from '@chakra-ui/react';
import { FiAward, FiTrendingUp, FiCheckCircle, FiChevronRight, FiBook, FiBarChart, FiStar, FiLayers } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import config from '../config';

// Components
import XPProgressBar from '../components/XPProgressBar';

const Dashboard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Welcome modal control
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardRes = await axios.get(`${config.apiUrl}/leaderboard`);
        setLeaderboard(leaderboardRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    // Check if user is new or returning
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
      onOpen();
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, [onOpen]);

  // Get next activity text
  const getNextActivityText = () => {
    return 'Continue your Level-Up Journey to earn more tokens and unlock new opportunities!';
  };

  // Card background colors
  const cardBg = useColorModeValue('white', 'gray.700');

  // Modal for new partners
  const WelcomeModal = () => (
    <Modal 
      isOpen={isOpen && showWelcomeModal} 
      onClose={onClose} 
      size="xl"
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay 
        bg="blackAlpha.300"
        backdropFilter="blur(10px)"
      />
      <ModalContent borderRadius="lg">
        <ModalHeader 
          bg="brand.500" 
          color="white" 
          borderTopRadius="lg"
          py={6}
        >
          <Flex align="center">
            <Icon as={FiAward} mr={2} boxSize={6} />
            <Text>Welcome to Deriv Partners Level-Up Programme</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton color="white" />
        
        <ModalBody pt={6} pb={4}>
          <Stack spacing={6}>
            <Box>
              <Heading size="md" mb={2}>Welcome to Your Partnership Journey</Heading>
              <Text>
                Welcome to our gamified partner onboarding experience. The Level-Up programme helps you master everything you need to become a successful partner.
              </Text>
            </Box>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Card variant="outline">
                <CardBody>
                  <Stack spacing={4}>
                    <Flex align="center">
                      <Icon as={FiStar} color="yellow.400" boxSize={5} mr={2} />
                      <Text fontWeight="bold">Earn XP & Level Up</Text>
                    </Flex>
                    <Text fontSize="sm">
                      Progress through levels by earning tokens. Reach milestones at various token levels to unlock new opportunities and rewards.
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
              
              <Card variant="outline">
                <CardBody>
                  <Stack spacing={4}>
                    <Flex align="center">
                      <Icon as={FiTrendingUp} color="green.500" boxSize={5} mr={2} />
                      <Text fontWeight="bold">Complete Actions & Earn Rewards</Text>
                    </Flex>
                    <Text fontSize="sm">
                      Complete actions to earn tokens and unlock exclusive rewards including gift cards, subscriptions, and coaching sessions.
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            </SimpleGrid>
            
            <Box>
              <Heading size="md" mb={3}>Your Level-Up Journey</Heading>
              <List spacing={3}>
                <ListItem>
                  <Flex align="center">
                    <Badge colorScheme="gray" px={2} mr={2} minW="140px">BASIC</Badge>
                    <Text fontWeight="medium">Complete KYC & Set Payment Method</Text>
                  </Flex>
                  <Text fontSize="sm" color="red.600" ml="152px" mt={1} fontStyle="italic">
                    Mandatory, they don't grant tokens
                  </Text>
                </ListItem>
                <ListItem>
                  <Flex align="center">
                    <Badge colorScheme="yellow" px={2} mr={2} minW="140px">MEDIUM</Badge>
                    <Text fontWeight="medium">Bring 5 clients & 5 sub-affiliates</Text>
                  </Flex>
                  <Text fontSize="sm" color="red.600" ml="152px" mt={1} fontWeight="medium">
                    500 Tokens each action
                  </Text>
                </ListItem>
                <ListItem>
                  <Flex align="center">
                    <Badge colorScheme="orange" px={2} mr={2} minW="140px">HIGH</Badge>
                    <Text fontWeight="medium">Earn $50 commissions & $500 trading volume</Text>
                  </Flex>
                  <Text fontSize="sm" color="red.600" ml="152px" mt={1} fontWeight="medium">
                    1000 tokens each action
                  </Text>
                </ListItem>
                <ListItem>
                  <Flex align="center">
                    <Badge colorScheme="purple" px={2} mr={2} minW="140px">PRO</Badge>
                    <Text fontWeight="medium">Earn $200 commissions & $1000 trading volume</Text>
                  </Flex>
                  <Text fontSize="sm" color="red.600" ml="152px" mt={1} fontWeight="medium">
                    2,500 each action
                  </Text>
                </ListItem>
              </List>
            </Box>
          </Stack>
        </ModalBody>
        
        <ModalFooter>
          <Button 
            colorScheme="brand" 
            mr={3} 
            size="lg" 
            rightIcon={<FiLayers />}
            as={RouterLink}
            to="/curriculum"
            onClick={onClose}
          >
            Start Level-Up Journey
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Container maxW="container.xl" py={5}>
      {/* Welcome Modal */}
      <WelcomeModal />
      
      <Stack spacing={8}>
        {/* Welcome section */}
        <Box>
          <Heading mb={2}>Welcome back, {user?.username || 'Partner'}!</Heading>
          <Text color="gray.600">
            Continue your journey to becoming a successful partner.
          </Text>
        </Box>

        {/* Token Progress */}
        <Card bg={cardBg} boxShadow="md" borderRadius="lg">
          <CardHeader>
            <Heading size="md">Your Token Progress</Heading>
          </CardHeader>
          <CardBody>
            <XPProgressBar currentXP={user?.xp || 1250} showLabels={true} />
          </CardBody>
        </Card>

        {/* Stats row */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          <Card bg={cardBg} boxShadow="md" borderRadius="lg">
            <CardBody>
              <Stat>
                <StatLabel display="flex" alignItems="center">
                  <Icon as={FiAward} mr={2} color="accent.500" />
                  Total Tokens Earned
                </StatLabel>
                <StatNumber fontSize="3xl">{user?.xp || 1250}</StatNumber>
                <StatHelpText>Tokens from completed actions</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} boxShadow="md" borderRadius="lg">
            <CardBody>
              <Stat>
                <StatLabel display="flex" alignItems="center">
                  <Icon as={FiCheckCircle} mr={2} color="green.500" />
                  Actions Completed
                </StatLabel>
                <StatNumber fontSize="3xl">{user?.actions_completed?.length || 2}</StatNumber>
                <StatHelpText>Keep completing actions to earn more tokens</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} boxShadow="md" borderRadius="lg">
            <CardBody>
              <Stat>
                <StatLabel display="flex" alignItems="center">
                  <Icon as={FiTrendingUp} mr={2} color="blue.500" />
                  Leaderboard Rank
                </StatLabel>
                <StatNumber fontSize="3xl">#
                  {leaderboard.findIndex(item => item.user_id === user?.id) + 1 || '-'}
                </StatNumber>
                <StatHelpText>Among all partners</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Continue earning tokens section */}
        <Card bg={cardBg} boxShadow="md" borderRadius="lg">
          <CardHeader>
            <Heading size="md">Continue Earning Tokens</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              <Text>{getNextActivityText()}</Text>
              
              <Button
                as={RouterLink}
                to="/curriculum"
                colorScheme="brand"
                size="lg"
              >
                Continue Level-Up Journey
              </Button>
            </Stack>
          </CardBody>
        </Card>

        {/* Quick links section */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          <Card bg={cardBg} boxShadow="md" borderRadius="lg">
            <CardHeader pb={0}>
              <Heading size="md">Quick Actions</Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing={3}>
                <Button 
                  as={RouterLink} 
                  to="/curriculum" 
                  leftIcon={<FiLayers />} 
                  colorScheme="brand" 
                  variant="outline"
                  justifyContent="flex-start"
                >
                  Level-Up Curriculum
                </Button>
                
                <Button 
                  as={RouterLink} 
                  to="/gamification" 
                  leftIcon={<FiTrendingUp />} 
                  colorScheme="brand" 
                  variant="outline"
                  justifyContent="flex-start"
                >
                  Token Progress
                </Button>
                
                <Button 
                  as={RouterLink} 
                  to="/rewards" 
                  leftIcon={<FiAward />} 
                  colorScheme="brand" 
                  variant="outline"
                  justifyContent="flex-start"
                >
                  Rewards
                </Button>
                
                <Button 
                  as={RouterLink} 
                  to="/leaderboard" 
                  leftIcon={<FiBarChart />} 
                  colorScheme="brand" 
                  variant="outline"
                  justifyContent="flex-start"
                >
                  Check Leaderboard
                </Button>
              </Stack>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} boxShadow="md" borderRadius="lg">
            <CardHeader pb={0}>
              <Heading size="md">Top Performers</Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing={2} divider={<Divider />}>
                {leaderboard
                  .sort((a, b) => b.xp - a.xp) // Sort by XP descending
                  .slice(0, 3)
                  .map((item, index) => (
                  <Flex key={item.user_id || index} justify="space-between" align="center">
                    <Flex align="center">
                      <Badge
                        colorScheme={index === 0 ? 'yellow' : index === 1 ? 'gray' : 'orange'}
                        borderRadius="full"
                        px={2}
                        mr={2}
                      >
                        #{index + 1}
                      </Badge>
                      <Text fontWeight="medium">{item.username}</Text>
                    </Flex>
                    <Text color="gray.500">{item.xp} Tokens</Text>
                  </Flex>
                ))}
              </Stack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default Dashboard; 