import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Progress,
  Text,
  Flex,
  HStack,
  VStack,
  Stack,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Tooltip,
  Icon
} from '@chakra-ui/react';
import {
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiAlertTriangle,
  FiSearch,
  FiDownload,
  FiFilter,
  FiEye,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiBarChart2
} from 'react-icons/fi';

// Mock data for demonstration
const mockPartners = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    xp: 1250,
    level: 'Medium',
    joinDate: '2024-01-15',
    lastActive: '2024-01-20',
    completedActions: 3,
    totalActions: 8,
    currentStage: 'Bring 5 clients',
    status: 'Active',
    kycStatus: 'Completed',
    paymentSetup: 'Completed',
    clientsReferred: 3,
    subAffiliates: 2,
    commissions: 25.50,
    tradingVolume: 150.00
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    xp: 2100,
    level: 'High',
    joinDate: '2024-01-10',
    lastActive: '2024-01-19',
    completedActions: 5,
    totalActions: 8,
    currentStage: 'Earn $200 commissions',
    status: 'Active',
    kycStatus: 'Completed',
    paymentSetup: 'Completed',
    clientsReferred: 8,
    subAffiliates: 5,
    commissions: 125.75,
    tradingVolume: 850.00
  },
  {
    id: 3,
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    xp: 500,
    level: 'Medium',
    joinDate: '2024-01-18',
    lastActive: '2024-01-18',
    completedActions: 2,
    totalActions: 8,
    currentStage: 'KYC Verification',
    status: 'Stuck',
    kycStatus: 'Pending',
    paymentSetup: 'Not Started',
    clientsReferred: 0,
    subAffiliates: 0,
    commissions: 0,
    tradingVolume: 0
  },
  {
    id: 4,
    name: 'Emma Wilson',
    email: 'emma.w@email.com',
    xp: 3000,
    level: 'PRO',
    joinDate: '2023-12-01',
    lastActive: '2024-01-20',
    completedActions: 8,
    totalActions: 8,
    currentStage: 'Completed',
    status: 'Completed',
    kycStatus: 'Completed',
    paymentSetup: 'Completed',
    clientsReferred: 12,
    subAffiliates: 8,
    commissions: 450.25,
    tradingVolume: 2500.00
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.b@email.com',
    xp: 0,
    level: 'Mandatory',
    joinDate: '2024-01-19',
    lastActive: '2024-01-19',
    completedActions: 0,
    totalActions: 8,
    currentStage: 'Getting Started',
    status: 'New',
    kycStatus: 'Not Started',
    paymentSetup: 'Not Started',
    clientsReferred: 0,
    subAffiliates: 0,
    commissions: 0,
    tradingVolume: 0
  }
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Calculate statistics
  const totalPartners = mockPartners.length;
  const activePartners = mockPartners.filter(p => p.status === 'Active').length;
  const stuckPartners = mockPartners.filter(p => p.status === 'Stuck').length;
  const completedPartners = mockPartners.filter(p => p.status === 'Completed').length;
  const avgXP = Math.round(mockPartners.reduce((sum, p) => sum + p.xp, 0) / totalPartners);
  const totalCommissions = mockPartners.reduce((sum, p) => sum + p.commissions, 0);

  // Filter partners
  const filteredPartners = mockPartners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || partner.status.toLowerCase() === statusFilter;
    const matchesLevel = levelFilter === 'all' || partner.level.toLowerCase() === levelFilter;
    
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Stuck': return 'red';
      case 'Completed': return 'blue';
      case 'New': return 'gray';
      default: return 'gray';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Mandatory': return 'gray';
      case 'Medium': return 'yellow';
      case 'High': return 'orange';
      case 'PRO': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <Container maxW="container.xl" py={5}>
      <Stack spacing={8}>
        {/* Header */}
        <Box>
          <Heading mb={2}>Admin Dashboard</Heading>
          <Text color="gray.600">Monitor partner progress and performance</Text>
        </Box>

        {/* Action Buttons */}
        <Flex justify="flex-end" wrap="wrap" gap={2}>
          <Button leftIcon={<FiDownload />} colorScheme="blue" variant="outline" size="sm">
            Export Data
          </Button>
          <Button leftIcon={<FiFilter />} colorScheme="orange" size="sm">
            Advanced Filters
          </Button>
        </Flex>

        {/* Statistics Cards */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
          <Card bg={cardBg} borderColor={borderColor} position="relative">
            <CardBody>
              <Stat>
                <StatLabel>Total Partners</StatLabel>
                <StatNumber>{totalPartners}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  12% from last month
                </StatHelpText>
              </Stat>
              <Icon as={FiUsers} boxSize={8} color="blue.500" position="absolute" top={4} right={4} />
            </CardBody>
          </Card>

          <Card bg={cardBg} borderColor={borderColor} position="relative">
            <CardBody>
              <Stat>
                <StatLabel>Active Partners</StatLabel>
                <StatNumber>{activePartners}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  8% from last week
                </StatHelpText>
              </Stat>
              <Icon as={FiTrendingUp} boxSize={8} color="green.500" position="absolute" top={4} right={4} />
            </CardBody>
          </Card>

          <Card bg={cardBg} borderColor={borderColor} position="relative">
            <CardBody>
              <Stat>
                <StatLabel>Partners Stuck</StatLabel>
                <StatNumber>{stuckPartners}</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  Need attention
                </StatHelpText>
              </Stat>
              <Icon as={FiAlertTriangle} boxSize={8} color="red.500" position="absolute" top={4} right={4} />
            </CardBody>
          </Card>

          <Card bg={cardBg} borderColor={borderColor} position="relative">
            <CardBody>
              <Stat>
                <StatLabel>Avg XP</StatLabel>
                <StatNumber>{avgXP}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  15% improvement
                </StatHelpText>
              </Stat>
              <Icon as={FiAward} boxSize={8} color="purple.500" position="absolute" top={4} right={4} />
            </CardBody>
          </Card>
        </Grid>

        {/* Main Content Tabs */}
        <Tabs variant="enclosed" colorScheme="orange">
          <TabList overflowX="auto" overflowY="hidden">
            <Tab whiteSpace="nowrap">Partner Overview</Tab>
            <Tab whiteSpace="nowrap">Progress Analytics</Tab>
            <Tab whiteSpace="nowrap">Stuck Partners</Tab>
            <Tab whiteSpace="nowrap">Performance Metrics</Tab>
          </TabList>

          <TabPanels>
            {/* Partner Overview Tab */}
            <TabPanel p={0} pt={6}>
              <Card bg={cardBg} borderColor={borderColor}>
                <CardHeader>
                  <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                    <Heading size="md">Partner Overview</Heading>
                    <HStack spacing={2} wrap="wrap">
                      <InputGroup maxW="250px" minW="200px">
                        <InputLeftElement pointerEvents="none">
                          <FiSearch color="gray.300" />
                        </InputLeftElement>
                        <Input
                          placeholder="Search partners..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          size="sm"
                        />
                      </InputGroup>
                      <Select maxW="120px" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} size="sm">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="stuck">Stuck</option>
                        <option value="completed">Completed</option>
                        <option value="new">New</option>
                      </Select>
                      <Select maxW="120px" value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} size="sm">
                        <option value="all">All Levels</option>
                        <option value="mandatory">Mandatory</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="pro">PRO</option>
                      </Select>
                    </HStack>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Box overflowX="auto">
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th minW="200px">Partner</Th>
                          <Th minW="80px">Level</Th>
                          <Th minW="80px">XP</Th>
                          <Th minW="120px">Progress</Th>
                          <Th minW="150px">Current Stage</Th>
                          <Th minW="80px">Status</Th>
                          <Th minW="100px">Last Active</Th>
                          <Th minW="80px">Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {filteredPartners.map((partner) => (
                          <Tr key={partner.id}>
                            <Td minW="200px">
                              <HStack spacing={2}>
                                <Avatar size="sm" name={partner.name} />
                                <VStack align="start" spacing={0} minW="0" flex="1">
                                  <Text fontWeight="medium" fontSize="sm" noOfLines={1}>
                                    {partner.name}
                                  </Text>
                                  <Text fontSize="xs" color="gray.500" noOfLines={1}>
                                    {partner.email}
                                  </Text>
                                </VStack>
                              </HStack>
                            </Td>
                            <Td minW="80px">
                              <Badge colorScheme={getLevelColor(partner.level)} size="sm">
                                {partner.level}
                              </Badge>
                            </Td>
                            <Td minW="80px">
                              <Text fontWeight="medium" fontSize="sm">
                                {partner.xp}
                              </Text>
                            </Td>
                            <Td minW="120px">
                              <VStack align="start" spacing={1}>
                                <Progress
                                  value={(partner.completedActions / partner.totalActions) * 100}
                                  size="sm"
                                  colorScheme="orange"
                                  w="100px"
                                />
                                <Text fontSize="xs" color="gray.500">
                                  {partner.completedActions}/{partner.totalActions}
                                </Text>
                              </VStack>
                            </Td>
                            <Td minW="150px">
                              <Text fontSize="sm" noOfLines={2} maxW="150px">
                                {partner.currentStage}
                              </Text>
                            </Td>
                            <Td minW="80px">
                              <Badge colorScheme={getStatusColor(partner.status)} size="sm">
                                {partner.status}
                              </Badge>
                            </Td>
                            <Td minW="100px">
                              <Text fontSize="xs" color="gray.500">
                                {new Date(partner.lastActive).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </Text>
                            </Td>
                            <Td minW="80px">
                              <Tooltip label="View Details">
                                <Button size="sm" variant="ghost" colorScheme="blue">
                                  <FiEye />
                                </Button>
                              </Tooltip>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Progress Analytics Tab */}
            <TabPanel p={0} pt={6}>
              <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
                <Card bg={cardBg} borderColor={borderColor}>
                  <CardHeader>
                    <Heading size="md">Completion Rates by Level</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4}>
                      <Flex w="full" justify="space-between" align="center">
                        <Text>Mandatory Level</Text>
                        <HStack>
                          <Progress value={80} size="lg" colorScheme="gray" w="200px" />
                          <Text fontSize="sm" fontWeight="medium">80%</Text>
                        </HStack>
                      </Flex>
                      <Flex w="full" justify="space-between" align="center">
                        <Text>Medium Level</Text>
                        <HStack>
                          <Progress value={60} size="lg" colorScheme="yellow" w="200px" />
                          <Text fontSize="sm" fontWeight="medium">60%</Text>
                        </HStack>
                      </Flex>
                      <Flex w="full" justify="space-between" align="center">
                        <Text>High Level</Text>
                        <HStack>
                          <Progress value={40} size="lg" colorScheme="orange" w="200px" />
                          <Text fontSize="sm" fontWeight="medium">40%</Text>
                        </HStack>
                      </Flex>
                      <Flex w="full" justify="space-between" align="center">
                        <Text>PRO Level</Text>
                        <HStack>
                          <Progress value={20} size="lg" colorScheme="purple" w="200px" />
                          <Text fontSize="sm" fontWeight="medium">20%</Text>
                        </HStack>
                      </Flex>
                    </VStack>
                  </CardBody>
                </Card>

                <Card bg={cardBg} borderColor={borderColor}>
                  <CardHeader>
                    <Heading size="md">Common Bottlenecks</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Flex justify="space-between" align="center" p={3} bg="red.50" borderRadius="md">
                        <HStack>
                          <Icon as={FiXCircle} color="red.500" />
                          <Text>KYC Verification</Text>
                        </HStack>
                        <Badge colorScheme="red">35% stuck</Badge>
                      </Flex>
                      <Flex justify="space-between" align="center" p={3} bg="orange.50" borderRadius="md">
                        <HStack>
                          <Icon as={FiClock} color="orange.500" />
                          <Text>Client Acquisition</Text>
                        </HStack>
                        <Badge colorScheme="orange">28% stuck</Badge>
                      </Flex>
                      <Flex justify="space-between" align="center" p={3} bg="yellow.50" borderRadius="md">
                        <HStack>
                          <Icon as={FiClock} color="yellow.500" />
                          <Text>Payment Setup</Text>
                        </HStack>
                        <Badge colorScheme="yellow">22% stuck</Badge>
                      </Flex>
                      <Flex justify="space-between" align="center" p={3} bg="green.50" borderRadius="md">
                        <HStack>
                          <Icon as={FiCheckCircle} color="green.500" />
                          <Text>Sub-affiliate Recruitment</Text>
                        </HStack>
                        <Badge colorScheme="green">15% stuck</Badge>
                      </Flex>
                    </VStack>
                  </CardBody>
                </Card>
              </Grid>
            </TabPanel>

            {/* Stuck Partners Tab */}
            <TabPanel p={0} pt={6}>
              <Card bg={cardBg} borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md">Partners Requiring Attention</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    {mockPartners.filter(p => p.status === 'Stuck').map((partner) => (
                      <Box key={partner.id} p={4} border="1px" borderColor="red.200" borderRadius="md" bg="red.50">
                        <Flex justify="space-between" align="center">
                          <HStack>
                            <Avatar size="sm" name={partner.name} />
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="medium">{partner.name}</Text>
                              <Text fontSize="sm" color="gray.600">Stuck at: {partner.currentStage}</Text>
                            </VStack>
                          </HStack>
                          <HStack>
                            <Badge colorScheme="red">Needs Help</Badge>
                            <Button size="sm" colorScheme="red" variant="outline">
                              Contact Partner
                            </Button>
                          </HStack>
                        </Flex>
                      </Box>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Performance Metrics Tab */}
            <TabPanel p={0} pt={6}>
              <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={6}>
                {/* Revenue Metrics Card */}
                <Card bg={cardBg} borderColor={borderColor} position="relative" overflow="hidden">
                  <Box position="absolute" top={0} right={0} w="100px" h="100px" opacity={0.1}>
                    <Icon as={FiTrendingUp} boxSize="100px" color="green.500" />
                  </Box>
                  <CardHeader pb={2}>
                    <Flex align="center" justify="space-between">
                      <Heading size="md" color="green.600">Revenue Metrics</Heading>
                      <Icon as={FiTrendingUp} boxSize={6} color="green.500" />
                    </Flex>
                  </CardHeader>
                  <CardBody pt={2}>
                    <VStack spacing={6} align="stretch">
                      <Box p={4} bg="green.50" borderRadius="lg" border="1px" borderColor="green.200">
                        <Stat textAlign="center">
                          <StatLabel fontSize="sm" color="green.600" fontWeight="medium">Total Commissions</StatLabel>
                          <StatNumber fontSize="2xl" color="green.700" fontWeight="bold">
                            ${totalCommissions.toFixed(2)}
                          </StatNumber>
                          <StatHelpText color="green.600" fontSize="sm">
                            <StatArrow type="increase" />
                            This month
                          </StatHelpText>
                        </Stat>
                      </Box>
                      <Box p={4} bg="gray.50" borderRadius="lg" border="1px" borderColor="gray.200">
                        <Stat textAlign="center">
                          <StatLabel fontSize="sm" color="gray.600" fontWeight="medium">Avg Commission per Partner</StatLabel>
                          <StatNumber fontSize="xl" color="gray.700" fontWeight="bold">
                            ${(totalCommissions / totalPartners).toFixed(2)}
                          </StatNumber>
                          <StatHelpText color="gray.600" fontSize="sm">Per active partner</StatHelpText>
                        </Stat>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Engagement Metrics Card */}
                <Card bg={cardBg} borderColor={borderColor} position="relative" overflow="hidden">
                  <Box position="absolute" top={0} right={0} w="100px" h="100px" opacity={0.1}>
                    <Icon as={FiUsers} boxSize="100px" color="blue.500" />
                  </Box>
                  <CardHeader pb={2}>
                    <Flex align="center" justify="space-between">
                      <Heading size="md" color="blue.600">Engagement Metrics</Heading>
                      <Icon as={FiUsers} boxSize={6} color="blue.500" />
                    </Flex>
                  </CardHeader>
                  <CardBody pt={2}>
                    <VStack spacing={6} align="stretch">
                      <Box p={4} bg="blue.50" borderRadius="lg" border="1px" borderColor="blue.200">
                        <Stat textAlign="center">
                          <StatLabel fontSize="sm" color="blue.600" fontWeight="medium">Daily Active Partners</StatLabel>
                          <StatNumber fontSize="2xl" color="blue.700" fontWeight="bold">
                            {activePartners}
                          </StatNumber>
                          <StatHelpText color="blue.600" fontSize="sm">
                            <StatArrow type="increase" />
                            5% from yesterday
                          </StatHelpText>
                        </Stat>
                      </Box>
                      <Box p={4} bg="gray.50" borderRadius="lg" border="1px" borderColor="gray.200">
                        <Stat textAlign="center">
                          <StatLabel fontSize="sm" color="gray.600" fontWeight="medium">Completion Rate</StatLabel>
                          <StatNumber fontSize="xl" color="gray.700" fontWeight="bold">
                            {Math.round((completedPartners / totalPartners) * 100)}%
                          </StatNumber>
                          <StatHelpText color="gray.600" fontSize="sm">Overall program completion</StatHelpText>
                        </Stat>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Growth Metrics Card */}
                <Card bg={cardBg} borderColor={borderColor} position="relative" overflow="hidden">
                  <Box position="absolute" top={0} right={0} w="100px" h="100px" opacity={0.1}>
                    <Icon as={FiAward} boxSize="100px" color="purple.500" />
                  </Box>
                  <CardHeader pb={2}>
                    <Flex align="center" justify="space-between">
                      <Heading size="md" color="purple.600">Growth Metrics</Heading>
                      <Icon as={FiAward} boxSize={6} color="purple.500" />
                    </Flex>
                  </CardHeader>
                  <CardBody pt={2}>
                    <VStack spacing={6} align="stretch">
                      <Box p={4} bg="purple.50" borderRadius="lg" border="1px" borderColor="purple.200">
                        <Stat textAlign="center">
                          <StatLabel fontSize="sm" color="purple.600" fontWeight="medium">New Partners</StatLabel>
                          <StatNumber fontSize="2xl" color="purple.700" fontWeight="bold">
                            12
                          </StatNumber>
                          <StatHelpText color="purple.600" fontSize="sm">
                            <StatArrow type="increase" />
                            This week
                          </StatHelpText>
                        </Stat>
                      </Box>
                      <Box p={4} bg="gray.50" borderRadius="lg" border="1px" borderColor="gray.200">
                        <Stat textAlign="center">
                          <StatLabel fontSize="sm" color="gray.600" fontWeight="medium">Retention Rate</StatLabel>
                          <StatNumber fontSize="xl" color="gray.700" fontWeight="bold">
                            85%
                          </StatNumber>
                          <StatHelpText color="gray.600" fontSize="sm">30-day retention</StatHelpText>
                        </Stat>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>
              </Grid>

              {/* Additional Performance Insights */}
              <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6} mt={6}>
                {/* Performance Trends */}
                <Card bg={cardBg} borderColor={borderColor}>
                  <CardHeader>
                    <Flex align="center">
                      <Icon as={FiBarChart2} boxSize={5} color="orange.500" mr={2} />
                      <Heading size="md">Performance Trends</Heading>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Flex justify="space-between" align="center" p={3} bg="green.50" borderRadius="md" border="1px" borderColor="green.200">
                        <HStack>
                          <Icon as={FiTrendingUp} color="green.500" />
                          <Text fontWeight="medium">Commission Growth</Text>
                        </HStack>
                        <Badge colorScheme="green" fontSize="sm" px={2}>+23%</Badge>
                      </Flex>
                      <Flex justify="space-between" align="center" p={3} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
                        <HStack>
                          <Icon as={FiUsers} color="blue.500" />
                          <Text fontWeight="medium">Partner Acquisition</Text>
                        </HStack>
                        <Badge colorScheme="blue" fontSize="sm" px={2}>+15%</Badge>
                      </Flex>
                      <Flex justify="space-between" align="center" p={3} bg="purple.50" borderRadius="md" border="1px" borderColor="purple.200">
                        <HStack>
                          <Icon as={FiAward} color="purple.500" />
                          <Text fontWeight="medium">XP Generation</Text>
                        </HStack>
                        <Badge colorScheme="purple" fontSize="sm" px={2}>+18%</Badge>
                      </Flex>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Key Performance Indicators */}
                <Card bg={cardBg} borderColor={borderColor}>
                  <CardHeader>
                    <Flex align="center">
                      <Icon as={FiCheckCircle} boxSize={5} color="teal.500" mr={2} />
                      <Heading size="md">Key Performance Indicators</Heading>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Box p={3} bg="teal.50" borderRadius="md" border="1px" borderColor="teal.200">
                        <Flex justify="space-between" align="center">
                          <Text fontWeight="medium" color="teal.700">Average Time to First Commission</Text>
                          <Text fontSize="lg" fontWeight="bold" color="teal.600">14 days</Text>
                        </Flex>
                      </Box>
                      <Box p={3} bg="orange.50" borderRadius="md" border="1px" borderColor="orange.200">
                        <Flex justify="space-between" align="center">
                          <Text fontWeight="medium" color="orange.700">Partner Satisfaction Score</Text>
                          <Text fontSize="lg" fontWeight="bold" color="orange.600">4.7/5</Text>
                        </Flex>
                      </Box>
                      <Box p={3} bg="pink.50" borderRadius="md" border="1px" borderColor="pink.200">
                        <Flex justify="space-between" align="center">
                          <Text fontWeight="medium" color="pink.700">Support Ticket Resolution</Text>
                          <Text fontSize="lg" fontWeight="bold" color="pink.600">2.3 hrs</Text>
                        </Flex>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default AdminDashboard; 