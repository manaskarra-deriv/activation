import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Flex,
  Icon,
  Badge,
  Card,
  CardBody,
  SimpleGrid,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  FormControl,
  FormLabel,
  Avatar,
  Skeleton,
  useColorModeValue
} from '@chakra-ui/react';
import { 
  FiAward, 
  FiTrendingUp, 
  FiBarChart2, 
  FiStar,
  FiUsers,
  FiGlobe,
  FiCalendar,
  FiCheck,
  FiLock
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Gamification = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [xpHistory, setXpHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Tab index
  const [tabIndex, setTabIndex] = useState(0);
  
  // Filters
  const [leaderboardFilter, setLeaderboardFilter] = useState('all');
  
  // Colors
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Mock data for demo
        // XP history (for chart)
        const mockXpHistory = [
          { date: 'Jan 1', xp: 0 },
          { date: 'Jan 5', xp: 100 },
          { date: 'Jan 12', xp: 250 },
          { date: 'Jan 18', xp: 350 },
          { date: 'Jan 25', xp: 350 },
          { date: 'Feb 2', xp: 450 },
          { date: 'Feb 10', xp: 600 },
          { date: 'Feb 15', xp: 600 },
          { date: 'Feb 20', xp: 750 },
        ];
        
        // Leaderboard
        const mockLeaderboard = [
          { rank: 1, username: 'TopPartner123', xp: 1250, region: 'Asia', join_date: 'Dec 2022', profile_img: null },
          { rank: 2, username: 'TradingPro', xp: 1120, region: 'Europe', join_date: 'Nov 2022', profile_img: null },
          { rank: 3, username: 'FinanceGuru', xp: 980, region: 'Africa', join_date: 'Jan 2023', profile_img: null },
          { rank: 4, username: 'InvestorElite', xp: 920, region: 'Americas', join_date: 'Dec 2022', profile_img: null },
          { rank: 5, username: 'MarketMaster', xp: 870, region: 'Asia', join_date: 'Feb 2023', profile_img: null },
          { rank: 6, username: 'TradingExpert', xp: 820, region: 'Europe', join_date: 'Jan 2023', profile_img: null },
          { rank: 7, username: 'CryptoKing', xp: 780, region: 'Americas', join_date: 'Nov 2022', profile_img: null },
          { rank: 8, username: 'ForexChamp', xp: 750, region: 'Africa', join_date: 'Dec 2022', profile_img: null },
          { rank: 9, username: user?.username || 'CurrentUser', xp: 750, region: 'Asia', join_date: 'Jan 2023', profile_img: null, is_current_user: true },
          { rank: 10, username: 'OptionsPro', xp: 720, region: 'Europe', join_date: 'Feb 2023', profile_img: null },
        ];
        
        setLeaderboard(mockLeaderboard);
        setXpHistory(mockXpHistory);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  // Filter leaderboard data
  const getFilteredLeaderboard = () => {
    if (leaderboardFilter === 'all') return leaderboard;
    
    return leaderboard.filter(item => {
      switch (leaderboardFilter) {
        case 'asia':
          return item.region === 'Asia';
        case 'europe':
          return item.region === 'Europe';
        case 'americas':
          return item.region === 'Americas';
        case 'africa':
          return item.region === 'Africa';
        case 'recent':
          return item.join_date === 'Jan 2023' || item.join_date === 'Feb 2023';
        default:
          return true;
      }
    });
  };
  
  if (isLoading) {
    return (
      <Container maxW="container.xl" py={5}>
        <Stack spacing={6}>
          <Skeleton height="40px" width="50%" />
          <Skeleton height="20px" width="70%" />
          <Skeleton height="400px" />
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={5}>
      <Stack spacing={6}>
        {/* Header */}
        <Box>
          <Heading mb={2}>XP Progress & Leaderboard</Heading>
          <Text color="gray.600">
            Track your XP progress and compete on the leaderboard
          </Text>
        </Box>
        
        {/* Tabs */}
        <Tabs 
          colorScheme="brand" 
          variant="enclosed" 
          onChange={(index) => setTabIndex(index)}
          index={tabIndex}
        >
          <TabList>
            <Tab><Icon as={FiTrendingUp} mr={2} /> XP Progress</Tab>
            <Tab><Icon as={FiBarChart2} mr={2} /> Leaderboard</Tab>
          </TabList>
          
          <TabPanels>
            {/* XP Progress */}
            <TabPanel>
              <Stack spacing={6}>
                {/* XP Summary */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  <Card boxShadow="md" bg={cardBg} borderRadius="lg">
                    <CardBody>
                      <Stack>
                        <Text fontWeight="medium" color="gray.600">Total XP</Text>
                        <Heading size="xl">{xpHistory[xpHistory.length - 1]?.xp || 0}</Heading>
                        <Flex align="center" color="green.500">
                          <Icon as={FiTrendingUp} mr={1} />
                          <Text>
                            +{xpHistory[xpHistory.length - 1]?.xp - xpHistory[xpHistory.length - 3]?.xp || 0} in last 30 days
                          </Text>
                        </Flex>
                      </Stack>
                    </CardBody>
                  </Card>
                  
                  <Card boxShadow="md" bg={cardBg} borderRadius="lg">
                    <CardBody>
                      <Stack>
                        <Text fontWeight="medium" color="gray.600">Rank</Text>
                        <Heading size="xl">#{leaderboard.find(item => item.is_current_user)?.rank || '-'}</Heading>
                        <Text color="gray.500">
                          Top {Math.round((leaderboard.find(item => item.is_current_user)?.rank / leaderboard.length) * 100) || 0}% of all partners
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                  
                  <Card boxShadow="md" bg={cardBg} borderRadius="lg">
                    <CardBody>
                      <Stack>
                        <Text fontWeight="medium" color="gray.600">Next Milestone</Text>
                        <Heading size="md">Silver Tier Badge</Heading>
                        <Progress 
                          value={70} 
                          size="sm" 
                          colorScheme="brand"
                          borderRadius="full"
                          mt={2}
                        />
                        <Text color="gray.500">
                          {750}/1000 XP required
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
                
                {/* XP Chart */}
                <Card boxShadow="md" bg={cardBg} borderRadius="lg">
                  <CardBody>
                    <Stack spacing={4}>
                      <Heading size="md">XP Growth Over Time</Heading>
                      
                      <Box h="300px">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={xpHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line 
                              type="monotone" 
                              dataKey="xp" 
                              stroke="#553C9A" 
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              </Stack>
            </TabPanel>
            
            {/* Leaderboard */}
            <TabPanel>
              <Stack spacing={6}>
                {/* Filters */}
                <Card boxShadow="md" bg={cardBg} borderRadius="lg">
                  <CardBody>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                      <FormControl>
                        <FormLabel>Filter by Region</FormLabel>
                        <Select 
                          value={leaderboardFilter}
                          onChange={(e) => setLeaderboardFilter(e.target.value)}
                        >
                          <option value="all">All Regions</option>
                          <option value="asia">Asia</option>
                          <option value="europe">Europe</option>
                          <option value="americas">Americas</option>
                          <option value="africa">Africa</option>
                        </Select>
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Filter by Join Date</FormLabel>
                        <Select>
                          <option value="all">All Time</option>
                          <option value="recent">Recently Joined</option>
                          <option value="month">This Month</option>
                        </Select>
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Filter by Level</FormLabel>
                        <Select>
                          <option value="all">All Levels</option>
                          <option value="level0">Level 0</option>
                          <option value="level1">Level 1</option>
                          <option value="level2">Level 2</option>
                          <option value="level3">Level 3</option>
                          <option value="level4">Level 4</option>
                        </Select>
                      </FormControl>
                    </Stack>
                  </CardBody>
                </Card>
                
                {/* Leaderboard Table */}
                <Card boxShadow="md" bg={cardBg} borderRadius="lg">
                  <CardBody>
                    <Stack spacing={4}>
                      <Heading size="md">Top Partners</Heading>
                      
                      <Box overflowX="auto">
                        <Table variant="simple">
                          <Thead>
                            <Tr>
                              <Th>Rank</Th>
                              <Th>Partner</Th>
                              <Th>XP</Th>
                              <Th>Region</Th>
                              <Th>Joined</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {getFilteredLeaderboard().map((item) => (
                              <Tr 
                                key={item.rank}
                                bg={item.is_current_user ? 'accent.50' : undefined}
                                fontWeight={item.is_current_user ? 'bold' : 'normal'}
                              >
                                <Td>
                                  {item.rank <= 3 ? (
                                    <Badge
                                      colorScheme={
                                        item.rank === 1 ? 'yellow' : 
                                        item.rank === 2 ? 'gray' : 'orange'
                                      }
                                      borderRadius="full"
                                      p={1}
                                    >
                                      #{item.rank}
                                    </Badge>
                                  ) : (
                                    `#${item.rank}`
                                  )}
                                </Td>
                                <Td>
                                  <Flex align="center">
                                    <Avatar 
                                      size="sm" 
                                      mr={2} 
                                      name={item.username} 
                                      src={item.profile_img} 
                                    />
                                    <Text>{item.username}</Text>
                                    {item.is_current_user && (
                                      <Badge ml={2} colorScheme="accent">You</Badge>
                                    )}
                                  </Flex>
                                </Td>
                                <Td>{item.xp} XP</Td>
                                <Td>
                                  <Flex align="center">
                                    <Icon as={FiGlobe} mr={1} />
                                    {item.region}
                                  </Flex>
                                </Td>
                                <Td>
                                  <Flex align="center">
                                    <Icon as={FiCalendar} mr={1} />
                                    {item.join_date}
                                  </Flex>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
                
                {/* Rewards Teaser */}
                <Card boxShadow="md" bg={cardBg} borderRadius="lg">
                  <CardBody>
                    <Stack>
                      <Heading size="md">Leaderboard Rewards</Heading>
                      
                      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={2}>
                        <Flex 
                          direction="column" 
                          borderWidth="1px" 
                          borderColor="yellow.200" 
                          bg="yellow.50" 
                          p={4} 
                          borderRadius="md"
                          align="center"
                          textAlign="center"
                        >
                          <Badge colorScheme="yellow" fontSize="lg" mb={2}>#1</Badge>
                          <Text fontWeight="bold">Top Partner</Text>
                          <Text>1000 USD bonus + VIP Support</Text>
                        </Flex>
                        
                        <Flex 
                          direction="column" 
                          borderWidth="1px" 
                          borderColor="gray.200" 
                          bg="gray.50" 
                          p={4} 
                          borderRadius="md"
                          align="center"
                          textAlign="center"
                        >
                          <Badge colorScheme="gray" fontSize="lg" mb={2}>#2</Badge>
                          <Text fontWeight="bold">Runner Up</Text>
                          <Text>500 USD bonus + VIP Support</Text>
                        </Flex>
                        
                        <Flex 
                          direction="column" 
                          borderWidth="1px" 
                          borderColor="orange.200" 
                          bg="orange.50" 
                          p={4} 
                          borderRadius="md"
                          align="center"
                          textAlign="center"
                        >
                          <Badge colorScheme="orange" fontSize="lg" mb={2}>#3</Badge>
                          <Text fontWeight="bold">Third Place</Text>
                          <Text>250 USD bonus + VIP Support</Text>
                        </Flex>
                      </SimpleGrid>
                    </Stack>
                  </CardBody>
                </Card>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default Gamification; 