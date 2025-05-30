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
            id: 'basic',
            title: 'Account Setup & Verification',
            description: 'Complete KYC and Set a Payment Method',
            xp_reward: 0,
            badge: 'Setup Complete',
            level_label: 'BASIC',
            modules: [
              {
                id: '1',
                title: 'Complete KYC',
                type: 'task',
                duration: '10 min',
                status: 'completed',
                xp_reward: 0,
                note: 'Mandatory, they don\'t grant tokens',
                subModules: [
                  { title: 'KYC essentials', type: 'lesson' }
                ]
              },
              {
                id: '2',
                title: 'Set a Payment Method',
                type: 'task',
                duration: '5 min',
                status: 'completed',
                xp_reward: 0,
                note: 'Mandatory, they don\'t grant tokens',
                subModules: [
                  { title: 'How to Change Payment Methods', type: 'lesson' },
                  { title: 'How to Withdraw', type: 'lesson' }
                ]
              }
            ],
            progress: 100,
            status: 'completed',
            unlocks: 'Access to Medium Level'
          },
          {
            id: 'medium',
            title: 'Client & Network Building',
            description: 'Bring your first clients and sub-affiliates',
            xp_reward: 1000,
            badge: 'Client Builder',
            level_label: 'MEDIUM',
            modules: [
              {
                id: '3',
                title: 'Bring 5 clients',
                type: 'task',
                duration: 'varies',
                status: 'in_progress',
                xp_reward: 500,
                specification: 'with real accounts',
                subModules: [
                  { title: 'Getting our first clients (The fishing formula)', type: 'lesson' },
                  { title: '07 How to track your clients', type: 'lesson' },
                  { title: 'MYDAS - Master Your Deriv Affiliate Success', type: 'lesson' }
                ]
              },
              {
                id: '4',
                title: 'First 5 sub-affiliates',
                type: 'task',
                duration: 'varies',
                status: 'locked',
                xp_reward: 500,
                subModules: [
                  { title: 'How Master Partner Programme Works', type: 'lesson' },
                  { title: 'How to become a Master Partner', type: 'lesson' },
                  { title: 'How to track Master Partner Earnings', type: 'lesson' }
                ]
              }
            ],
            progress: 50,
            status: 'in_progress',
            unlocks: 'Access to High Level'
          },
          {
            id: 'high',
            title: 'Revenue Generation',
            description: 'Earn your first commissions and trading volume',
            xp_reward: 2000,
            badge: 'Revenue Generator',
            level_label: 'HIGH',
            modules: [
              {
                id: '5',
                title: 'Earn your first 50 USD in commissions',
                type: 'task',
                duration: 'varies',
                status: 'locked',
                xp_reward: 1000,
                subModules: [
                  { title: 'Intro to Deriv Commissions', type: 'lesson' },
                  { title: 'How commissions are calculated', type: 'lesson' },
                  { title: 'Revenue Share', type: 'lesson' },
                  { title: 'TurnOver', type: 'lesson' },
                  { title: 'IB (CFD commissions)', type: 'lesson' },
                  { title: '04 How to track your commissions', type: 'lesson' }
                ]
              },
              {
                id: '6',
                title: 'Get the first 500 USD in trading volume',
                type: 'task',
                duration: 'varies',
                status: 'locked',
                xp_reward: 1000,
                subModules: [
                  { title: '03 Understanding your metrics', type: 'lesson' }
                ]
              }
            ],
            progress: 0,
            status: 'locked',
            unlocks: 'Access to PRO Level'
          },
          {
            id: 'pro',
            title: 'Advanced Partnership',
            description: 'Achieve significant commission and trading volume milestones',
            xp_reward: 5000,
            badge: 'PRO Partner',
            level_label: 'PRO',
            modules: [
              {
                id: '7',
                title: 'Earn your first 200 USD in commissions',
                type: 'task',
                duration: 'varies',
                status: 'locked',
                xp_reward: 2500,
                subModules: [
                  { title: 'Intro to Deriv Commissions', type: 'lesson' },
                  { title: 'How commissions are calculated', type: 'lesson' },
                  { title: 'Revenue Share', type: 'lesson' },
                  { title: 'TurnOver', type: 'lesson' },
                  { title: 'IB (CFD commissions)', type: 'lesson' },
                  { title: '04 How to track your commissions', type: 'lesson' }
                ]
              },
              {
                id: '8',
                title: 'Get the first 1,000 USD in trading volume',
                type: 'task',
                duration: 'varies',
                status: 'locked',
                xp_reward: 2500,
                subModules: [
                  { title: '03 Understanding your metrics', type: 'lesson' }
                ]
              }
            ],
            progress: 0,
            status: 'locked',
            unlocks: 'PRO Partner Status + Exclusive Benefits'
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
          <Heading mb={2}>Actions and Tokens</Heading>
          <Text color="gray.600">
            Complete these actions to earn tokens and advance through partner levels.
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
                    mr={4}
                    minW="140px"
                    textAlign="center"
                  >
                    Level: {level.level_label}
                  </Badge>
                  
                  <Box textAlign="left" flex="1">
                    <Heading size="md">{level.title}</Heading>
                    <Text color="gray.600" mt={1}>{level.description}</Text>
                  </Box>
                </Flex>
                
                <Stack direction="row" align="center" spacing={4} mr={4}>
                  <Flex align="center" minW="80px">
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
                  
                  <Badge colorScheme={getStatusColor(level.status)} minW="50px" textAlign="center">
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
                            
                            {module.specification && (
                              <Text fontSize="sm" color="gray.600" mt={1}>
                                Specification: {module.specification}
                              </Text>
                            )}
                            
                            {module.note && (
                              <Text fontSize="sm" color="orange.600" mt={1} fontStyle="italic">
                                {module.note}
                              </Text>
                            )}
                            
                            {/* Sub-modules list */}
                            {module.subModules && module.subModules.length > 0 && (
                              <Box mt={3} pl={4} borderLeft="2px" borderColor="gray.200">
                                <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                                  Lessons included:
                                </Text>
                                <List spacing={1}>
                                  {module.subModules.map((subModule, index) => (
                                    <ListItem key={index} fontSize="sm" color="gray.600">
                                      <ListIcon as={FiBook} color="gray.400" />
                                      {subModule.title}
                                    </ListItem>
                                  ))}
                                </List>
                              </Box>
                            )}
                            
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
                              
                              {module.xp_reward && (
                                <Flex align="center">
                                  <Icon as={FiAward} boxSize={3} mr={1} color="accent.500" />
                                  <Text fontSize="sm" fontWeight="medium" color="accent.500">
                                    {module.xp_reward} XP
                                  </Text>
                                </Flex>
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