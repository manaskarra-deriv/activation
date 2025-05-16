import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Badge,
  Icon,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Tag,
  List,
  ListItem,
  ListIcon,
  Divider,
  Progress,
  useColorModeValue,
  Skeleton
} from '@chakra-ui/react';
import { 
  FiLock, 
  FiCheck, 
  FiCheckCircle, 
  FiCircle, 
  FiClock, 
  FiAward, 
  FiChevronRight,
  FiFilm,
  FiBook,
  FiClipboard
} from 'react-icons/fi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Curriculum = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [levels, setLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Color schemes
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Mock data for levels
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch this from an API
        // For now using mock data
        const mockLevels = [
          {
            id: '0',
            title: 'Orientation & Setup',
            description: 'Get familiar with Partner Hub, affiliate dashboard, and tools',
            xp_reward: 100,
            badge: 'Orientation Complete',
            modules: [
              {
                id: '1',
                title: 'Partner Hub Walkthrough',
                type: 'video',
                duration: '5 min',
                status: 'completed'
              },
              {
                id: '2',
                title: 'Complete Your Profile',
                type: 'task',
                duration: '10 min',
                status: 'completed'
              },
              {
                id: '3',
                title: 'Join Partner Telegram Group',
                type: 'task',
                duration: '2 min',
                status: 'completed'
              },
              {
                id: '4',
                title: 'Introduction to Deriv Ecosystem',
                type: 'video',
                duration: '8 min',
                status: 'completed'
              },
              {
                id: '5',
                title: 'Orientation Quiz',
                type: 'quiz',
                questions: 5,
                pass_rate: 80,
                status: 'completed'
              }
            ],
            progress: 100,
            status: 'completed',
            unlocks: 'Access to Level 1'
          },
          {
            id: '1',
            title: 'Know the Products',
            description: 'Learn about CFDs, Options, Multipliers, and Synthetic indices',
            xp_reward: 150,
            badge: 'Product Expert',
            modules: [
              {
                id: '6',
                title: 'CFDs vs Options vs Multipliers',
                type: 'interactive',
                duration: '15 min',
                status: 'completed'
              },
              {
                id: '7',
                title: 'Synthetic Indices Explained',
                type: 'video',
                duration: '10 min',
                status: 'in_progress'
              },
              {
                id: '8',
                title: 'Popular Markets Overview',
                type: 'interactive',
                duration: '12 min',
                status: 'locked'
              },
              {
                id: '9',
                title: 'Product Matching Exercise',
                type: 'task',
                duration: '8 min',
                status: 'locked'
              },
              {
                id: '10',
                title: 'Products Quiz',
                type: 'quiz',
                questions: 10,
                pass_rate: 70,
                status: 'locked'
              }
            ],
            progress: 40,
            status: 'in_progress',
            unlocks: 'Certificate + Access to Level 2'
          },
          {
            id: '2',
            title: 'Promo Tools Mastery',
            description: 'Learn how to use Smartlinks, banners, and tracking referrals',
            xp_reward: 200,
            badge: 'Promo Tools Master',
            modules: [
              {
                id: '11',
                title: 'Smartlink Walkthrough',
                type: 'interactive',
                duration: '10 min',
                status: 'locked'
              },
              {
                id: '12',
                title: 'Banner Placements',
                type: 'video',
                duration: '8 min',
                status: 'locked'
              },
              {
                id: '13',
                title: 'Tracking Referrals Demo',
                type: 'interactive',
                duration: '15 min',
                status: 'locked'
              },
              {
                id: '14',
                title: 'Create Your First Smartlink',
                type: 'task',
                duration: '10 min',
                status: 'locked'
              },
              {
                id: '15',
                title: 'Promo Tools Quiz',
                type: 'quiz',
                questions: 8,
                pass_rate: 75,
                status: 'locked'
              }
            ],
            progress: 0,
            status: 'locked',
            unlocks: 'Access to downloadable "Affiliate Success Toolkit"'
          },
          {
            id: '3',
            title: 'First Clicks Challenge',
            description: 'Learn how to launch campaigns and get your first clicks',
            xp_reward: 300,
            badge: 'Click Master',
            modules: [
              {
                id: '16',
                title: 'Campaign Launch Guide',
                type: 'video',
                duration: '12 min',
                status: 'locked'
              },
              {
                id: '17',
                title: 'Funnel Optimization Basics',
                type: 'interactive',
                duration: '15 min',
                status: 'locked'
              },
              {
                id: '18',
                title: '10 Tracked Clicks Challenge',
                type: 'task',
                duration: 'varies',
                status: 'locked'
              },
              {
                id: '19',
                title: 'Landing Experience Quiz',
                type: 'quiz',
                questions: 7,
                pass_rate: 70,
                status: 'locked'
              }
            ],
            progress: 0,
            status: 'locked',
            unlocks: 'Leaderboard slot'
          },
          {
            id: '4',
            title: 'First Referral Mastery',
            description: 'Learn best practices for conversions and compliance',
            xp_reward: 400,
            badge: 'Referral Master',
            modules: [
              {
                id: '20',
                title: 'Conversion Best Practices',
                type: 'video',
                duration: '15 min',
                status: 'locked'
              },
              {
                id: '21',
                title: 'Compliance Reminders',
                type: 'interactive',
                duration: '10 min',
                status: 'locked'
              },
              {
                id: '22',
                title: 'First Referral Challenge',
                type: 'task',
                duration: 'varies',
                status: 'locked'
              },
              {
                id: '23',
                title: 'Conversion Optimization Quiz',
                type: 'quiz',
                questions: 10,
                pass_rate: 80,
                status: 'locked'
              }
            ],
            progress: 0,
            status: 'locked',
            unlocks: 'Shortcut to Silver tier + VIP badge'
          }
        ];
        
        setLevels(mockLevels);
      } catch (error) {
        console.error('Error fetching levels:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLevels();
  }, []);
  
  // Get module icon based on type
  const getModuleIcon = (type) => {
    switch (type) {
      case 'video':
        return FiFilm;
      case 'interactive':
        return FiBook;
      case 'task':
        return FiClipboard;
      case 'quiz':
        return FiCheck;
      default:
        return FiCircle;
    }
  };
  
  // Get module status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return FiCheckCircle;
      case 'in_progress':
        return FiCircle;
      case 'locked':
        return FiLock;
      default:
        return FiCircle;
    }
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in_progress':
        return 'blue';
      case 'locked':
        return 'gray';
      default:
        return 'gray';
    }
  };
  
  if (isLoading) {
    return (
      <Container maxW="container.xl" py={5}>
        <Stack spacing={6}>
          <Skeleton height="40px" width="50%" />
          <Skeleton height="20px" width="70%" />
          <Skeleton height="400px" />
          <Skeleton height="400px" />
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={5}>
      <Stack spacing={8}>
        {/* Header */}
        <Box>
          <Heading mb={2}>Level-Up Curriculum</Heading>
          <Text color="gray.600">
            Master the partner journey through these five levels to fast-track to Silver tier.
          </Text>
        </Box>
        
        {/* Filter options would go here in a real implementation */}
        
        {/* Levels accordion */}
        <Accordion allowToggle defaultIndex={[0, 1]}>
          {levels.map((level) => (
            <AccordionItem 
              key={level.id}
              borderWidth="1px" 
              borderRadius="lg" 
              mb={4}
              borderColor={borderColor}
              bg={cardBg}
              opacity={level.status === 'locked' ? 0.7 : 1}
            >
              <AccordionButton py={4}>
                <Flex flex="1" align="center">
                  <Badge 
                    px={3} 
                    py={1} 
                    borderRadius="full" 
                    colorScheme={getStatusColor(level.status)}
                    mr={3}
                  >
                    Level {level.id}
                  </Badge>
                  
                  <Box textAlign="left">
                    <Heading size="md">{level.title}</Heading>
                    <Text color="gray.600" mt={1}>{level.description}</Text>
                  </Box>
                </Flex>
                
                <Stack direction="row" align="center" spacing={4} mr={4}>
                  <Flex align="center">
                    <Icon as={FiAward} color="accent.500" mr={1} />
                    <Text>{level.xp_reward} XP</Text>
                  </Flex>
                  
                  <Progress 
                    value={level.progress} 
                    size="sm" 
                    width="100px" 
                    borderRadius="full"
                    colorScheme={getStatusColor(level.status)}
                  />
                  
                  <Badge colorScheme={getStatusColor(level.status)}>
                    {level.progress}%
                  </Badge>
                </Stack>
                
                <AccordionIcon />
              </AccordionButton>
              
              <AccordionPanel pb={4}>
                <Stack spacing={4}>
                  {/* Module list */}
                  <List spacing={3}>
                    {level.modules.map((module) => (
                      <ListItem key={module.id}>
                        <Flex 
                          p={3} 
                          border="1px" 
                          borderColor={borderColor} 
                          borderRadius="md"
                          bg={module.status === 'completed' ? 'green.50' : 'white'}
                          _hover={{ 
                            bg: module.status === 'locked' ? 'white' : 
                                module.status === 'completed' ? 'green.100' : 'gray.50',
                            cursor: module.status === 'locked' ? 'not-allowed' : 'pointer'
                          }}
                          opacity={module.status === 'locked' ? 0.6 : 1}
                        >
                          <ListIcon 
                            as={getStatusIcon(module.status)} 
                            color={`${getStatusColor(module.status)}.500`}
                            mt={1}
                          />
                          
                          <Box flex="1">
                            <Text fontWeight="medium">
                              {module.title}
                            </Text>
                            
                            <Flex mt={1} align="center" color="gray.500" gap={3}>
                              <Flex align="center">
                                <Icon as={getModuleIcon(module.type)} boxSize={3} mr={1} />
                                <Text fontSize="sm" textTransform="capitalize">{module.type}</Text>
                              </Flex>
                              
                              {module.duration && (
                                <Flex align="center">
                                  <Icon as={FiClock} boxSize={3} mr={1} />
                                  <Text fontSize="sm">{module.duration}</Text>
                                </Flex>
                              )}
                              
                              {module.questions && (
                                <Text fontSize="sm">{module.questions} questions</Text>
                              )}
                            </Flex>
                          </Box>
                          
                          <Button 
                            rightIcon={<FiChevronRight />}
                            size="sm"
                            colorScheme={getStatusColor(module.status)}
                            variant={module.status === 'completed' ? 'outline' : 'solid'}
                            isDisabled={module.status === 'locked'}
                          >
                            {module.status === 'completed' ? 'Review' : 
                             module.status === 'in_progress' ? 'Continue' : 'Start'}
                          </Button>
                        </Flex>
                      </ListItem>
                    ))}
                  </List>
                  
                  {/* Level rewards */}
                  <Card variant="outline" borderRadius="md" mt={2}>
                    <CardBody>
                      <Stack spacing={3}>
                        <Heading size="sm">Level Rewards</Heading>
                        
                        <Flex align="center" gap={6}>
                          <Flex align="center">
                            <Icon as={FiAward} color="yellow.500" mr={2} />
                            <Text>{level.badge} Badge</Text>
                          </Flex>
                          
                          <Flex align="center">
                            <Icon as={FiAward} color="blue.500" mr={2} />
                            <Text>{level.xp_reward} XP</Text>
                          </Flex>
                        </Flex>
                        
                        <Divider />
                        
                        <Flex align="center">
                          <Icon as={FiCheck} color="green.500" mr={2} />
                          <Text>Unlocks: {level.unlocks}</Text>
                        </Flex>
                      </Stack>
                    </CardBody>
                  </Card>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Container>
  );
};

export default Curriculum; 