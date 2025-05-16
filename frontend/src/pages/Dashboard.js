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

// Components
import ModuleCard from '../components/ModuleCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Welcome modal control
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Fetch modules and leaderboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modulesRes, leaderboardRes] = await Promise.all([
          axios.get('http://localhost:8000/modules'),
          axios.get('http://localhost:8000/leaderboard')
        ]);

        setModules(modulesRes.data);
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

  // Calculate progress
  const totalModules = modules.length;
  const completedModules = user?.modules_completed?.length || 0;
  const progressPercent = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  // Get current module
  const currentModuleId = user?.current_module || '1';
  const currentModule = modules.find(m => m.id === currentModuleId);

  // Get next lesson/quiz
  const getNextActivityText = () => {
    if (!currentModule) return 'Start your journey';
    
    const moduleProgress = user?.progress?.[currentModuleId] || {};
    
    // Check for incomplete lessons
    for (const lesson of currentModule.lessons) {
      const lessonCompleted = moduleProgress?.lessons?.[lesson.id]?.completed;
      if (!lessonCompleted) {
        return `Continue with "${lesson.title}"`;
      }
    }
    
    // Check for incomplete quizzes
    for (const quiz of currentModule.quizzes) {
      const quizCompleted = moduleProgress?.quizzes?.[quiz.id]?.completed;
      if (!quizCompleted) {
        return `Take the "${quiz.title}"`;
      }
    }
    
    // If all completed in current module, suggest moving to next
    const nextModuleId = String(Number(currentModuleId) + 1);
    const nextModule = modules.find(m => m.id === nextModuleId);
    
    return nextModule 
      ? `Start next module: "${nextModule.title}"`
      : 'All modules completed!';
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
              <Heading size="md" mb={2}>Fast-Track Your Partnership Journey</Heading>
              <Text>
                Welcome to our gamified partner onboarding experience. The Level-Up programme helps you master everything you need to become a successful partner and fast-track to Silver tier.
              </Text>
            </Box>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Card variant="outline">
                <CardBody>
                  <Stack spacing={4}>
                    <Flex align="center">
                      <Icon as={FiStar} color="yellow.400" boxSize={5} mr={2} />
                      <Text fontWeight="bold">Silver Tier Shortcut</Text>
                    </Flex>
                    <Text fontSize="sm">
                      Complete all 5 levels to bypass the regular requirements and instantly qualify for Silver tier benefits.
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
              
              <Card variant="outline">
                <CardBody>
                  <Stack spacing={4}>
                    <Flex align="center">
                      <Icon as={FiTrendingUp} color="green.500" boxSize={5} mr={2} />
                      <Text fontWeight="bold">Earn XP & Badges</Text>
                    </Flex>
                    <Text fontSize="sm">
                      Every task, quiz, and milestone earns you experience points and unlocks exclusive badges to showcase your expertise.
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
                    <Badge colorScheme="purple" px={2} mr={2}>Level 0</Badge>
                    <Text fontWeight="medium">Orientation & Setup</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center">
                    <Badge colorScheme="blue" px={2} mr={2}>Level 1</Badge>
                    <Text fontWeight="medium">Know the Products</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center">
                    <Badge colorScheme="teal" px={2} mr={2}>Level 2</Badge>
                    <Text fontWeight="medium">Promo Tools Mastery</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center">
                    <Badge colorScheme="green" px={2} mr={2}>Level 3</Badge>
                    <Text fontWeight="medium">First Clicks Challenge</Text>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center">
                    <Badge colorScheme="orange" px={2} mr={2}>Level 4</Badge>
                    <Text fontWeight="medium">First Referral Mastery</Text>
                  </Flex>
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

        {/* Progress overview */}
        <Card bg={cardBg} boxShadow="md" borderRadius="lg">
          <CardHeader pb={0}>
            <Heading size="md">Your Academy Progress</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              <Flex align="center" justify="space-between">
                <Text>
                  {completedModules} of {totalModules} modules completed
                </Text>
                <Badge colorScheme="green" p={1} borderRadius="md">
                  {user?.level || 'Novice'}
                </Badge>
              </Flex>
              
              <Progress 
                value={progressPercent} 
                size="md" 
                colorScheme="brand" 
                borderRadius="full"
                hasStripe
              />
              
              <Flex wrap="wrap" gap={3}>
                {user?.badges?.map((badge, i) => (
                  <Badge 
                    key={i} 
                    colorScheme="accent" 
                    p={2} 
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                  >
                    <Icon as={FiAward} mr={1} />
                    {badge}
                  </Badge>
                ))}
                {(!user?.badges || user.badges.length === 0) && (
                  <Text fontSize="sm" color="gray.500">
                    Complete modules to earn badges
                  </Text>
                )}
              </Flex>
            </Stack>
          </CardBody>
        </Card>

        {/* Stats row */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          <Card bg={cardBg} boxShadow="md" borderRadius="lg">
            <CardBody>
              <Stat>
                <StatLabel display="flex" alignItems="center">
                  <Icon as={FiAward} mr={2} color="accent.500" />
                  Total XP Earned
                </StatLabel>
                <StatNumber fontSize="3xl">{user?.xp || 0}</StatNumber>
                <StatHelpText>Points from completed modules</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} boxShadow="md" borderRadius="lg">
            <CardBody>
              <Stat>
                <StatLabel display="flex" alignItems="center">
                  <Icon as={FiCheckCircle} mr={2} color="green.500" />
                  Modules Completed
                </StatLabel>
                <StatNumber fontSize="3xl">{completedModules}</StatNumber>
                <StatHelpText>Out of {totalModules} total modules</StatHelpText>
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

        {/* Fast-Track to Silver */}
        <Card bg={cardBg} boxShadow="md" borderRadius="lg">
          <CardHeader>
            <Heading size="md">Fast-Track to Silver Tier</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              <Text>
                Complete all 5 levels of the Level-Up programme to instantly qualify for Silver tier benefits.
              </Text>

              <Progress 
                value={40} 
                size="md" 
                colorScheme="yellow" 
                borderRadius="full"
                hasStripe
              />
              
              <Flex justify="space-between" color="gray.600">
                <Text>Level 2/5 completed</Text>
                <Text>3 more to go</Text>
              </Flex>
              
              <Button
                as={RouterLink}
                to="/curriculum"
                rightIcon={<FiChevronRight />}
                colorScheme="yellow"
                variant="outline"
                size="md"
              >
                View Level-Up Journey
              </Button>
            </Stack>
          </CardBody>
        </Card>

        {/* Continue learning section */}
        <Card bg={cardBg} boxShadow="md" borderRadius="lg">
          <CardHeader>
            <Heading size="md">Continue Learning</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              <Text>{getNextActivityText()}</Text>
              
              {currentModule && (
                <Button
                  as={RouterLink}
                  to={`/modules/${currentModuleId}`}
                  rightIcon={<FiChevronRight />}
                  colorScheme="brand"
                  size="lg"
                >
                  Continue Module {currentModuleId}
                </Button>
              )}
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
                  to="/modules" 
                  leftIcon={<FiBook />} 
                  colorScheme="brand" 
                  variant="outline"
                  justifyContent="flex-start"
                >
                  View All Modules
                </Button>
                
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
                  leftIcon={<FiAward />} 
                  colorScheme="brand" 
                  variant="outline"
                  justifyContent="flex-start"
                >
                  Rewards & XP
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
                {leaderboard.slice(0, 3).map((item, index) => (
                  <Flex key={index} justify="space-between" align="center">
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
                    <Text color="gray.500">{item.xp} XP</Text>
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