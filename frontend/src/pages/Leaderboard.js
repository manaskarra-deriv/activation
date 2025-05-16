import React, { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Text,
  Stack,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Badge,
  Icon,
  Avatar,
  Select,
  Card,
  CardHeader,
  CardBody,
  useColorModeValue,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { FiAward, FiTrendingUp } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import config from '../config';

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  
  // Card styling
  const cardBg = useColorModeValue('white', 'gray.700');
  
  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${config.apiUrl}/leaderboard`);
        setLeaderboard(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, []);
  
  // Get filtered leaderboard data
  const getFilteredLeaderboard = () => {
    if (filter === 'all') return leaderboard;
    return leaderboard.filter(item => item.level === filter);
  };
  
  // Get user rank
  const getUserRank = () => {
    if (!user) return null;
    const index = leaderboard.findIndex(item => item.user_id === user.id);
    return index !== -1 ? index + 1 : null;
  };
  
  const userRank = getUserRank();
  
  return (
    <Container maxW="container.xl" py={5}>
      <Stack spacing={8}>
        <Box>
          <Heading mb={2}>Partner Leaderboard</Heading>
          <Text color="gray.600">
            See how you stack up against other partners in the academy.
          </Text>
        </Box>
        
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        {/* User stats */}
        {user && (
          <Card bg={cardBg} boxShadow="md" borderRadius="lg">
            <CardBody>
              <Stack spacing={4}>
                <Heading size="md">Your Ranking</Heading>
                <Flex 
                  align="center" 
                  justify="space-between"
                  bg="brand.50"
                  p={4}
                  borderRadius="md"
                >
                  <Flex align="center">
                    <Avatar size="md" name={user.username} mr={4} />
                    <Box>
                      <Text fontWeight="bold">{user.username}</Text>
                      <Badge colorScheme="green">{user.level}</Badge>
                    </Box>
                  </Flex>
                  
                  <Flex align="center">
                    <Box textAlign="center" mr={8}>
                      <Text fontSize="sm" color="gray.500">XP</Text>
                      <Text fontWeight="bold">{user.xp}</Text>
                    </Box>
                    
                    <Box textAlign="center">
                      <Text fontSize="sm" color="gray.500">Rank</Text>
                      <Text fontWeight="bold">
                        #{userRank || '-'}
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </Stack>
            </CardBody>
          </Card>
        )}
        
        {/* Leaderboard table */}
        <Card bg={cardBg} boxShadow="md" borderRadius="lg">
          <CardHeader pb={0}>
            <Flex justify="space-between" align="center">
              <Heading size="md">Top Performers</Heading>
              
              <Select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
                maxW="200px"
              >
                <option value="all">All Levels</option>
                <option value="Novice">Novice</option>
                <option value="Apprentice">Apprentice</option>
                <option value="Practitioner">Practitioner</option>
                <option value="Expert">Expert</option>
                <option value="Master">Master</option>
              </Select>
            </Flex>
          </CardHeader>
          <CardBody>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Rank</Th>
                    <Th>Partner</Th>
                    <Th>Level</Th>
                    <Th isNumeric>XP</Th>
                    <Th isNumeric>Badges</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {getFilteredLeaderboard().map((item, index) => (
                    <Tr key={item.user_id} bg={userRank === index + 1 ? 'brand.50' : undefined}>
                      <Td>
                        <Flex align="center">
                          {index < 3 ? (
                            <Icon 
                              as={FiAward} 
                              color={index === 0 ? 'yellow.500' : index === 1 ? 'gray.400' : 'orange.500'} 
                              mr={2} 
                            />
                          ) : null}
                          #{index + 1}
                        </Flex>
                      </Td>
                      <Td>
                        <Flex align="center">
                          <Avatar size="sm" name={item.username} mr={2} />
                          <Text fontWeight={userRank === index + 1 ? 'bold' : 'normal'}>
                            {item.username}
                          </Text>
                        </Flex>
                      </Td>
                      <Td>
                        <Badge colorScheme={
                          item.level === 'Master' ? 'purple' :
                          item.level === 'Expert' ? 'blue' :
                          item.level === 'Practitioner' ? 'green' :
                          item.level === 'Apprentice' ? 'orange' : 'gray'
                        }>
                          {item.level}
                        </Badge>
                      </Td>
                      <Td isNumeric>{item.xp}</Td>
                      <Td isNumeric>{item.badges}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </CardBody>
        </Card>
      </Stack>
    </Container>
  );
};

export default Leaderboard; 