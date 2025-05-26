import React, { useState } from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
  Flex,
  Collapse,
  Button,
  Icon
} from '@chakra-ui/react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Rewards = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // State for managing which reward tiers are expanded
  const [expandedTiers, setExpandedTiers] = useState({});

  const toggleTier = (tierAmount) => {
    setExpandedTiers(prev => ({
      ...prev,
      [tierAmount]: !prev[tierAmount]
    }));
  };

  const rewardTiers = [
    {
      amount: '$30',
      color: 'red',
      rewards: [
        { name: 'Amazon Gift Card', details: '$30 credit to spend on Amazon (global)', where: 'Amazon, Dundle, Giftcards.com' },
        { name: 'Spotify Premium – 3 mo', details: '3 months ($10.99/mo x 3 = $33)', where: 'Spotify.com gift card' },
        { name: 'Canva Pro – 2 mo', details: '2 months Canva Pro ($12.99 x 2 = $26)', where: 'Canva.com' },
        { name: 'Netflix Gift Card', details: '$30 balance', where: 'Netflix.com/gift-cards, Dundle' },
        { name: 'Google Play or Apple Card', details: '$30 for apps or stores', where: 'Dundle, Apple.com' },
        { name: 'Udemy Course Voucher', details: 'Up to $30 for courses', where: 'Udemy.com/gift' },
        { name: 'Steam Gift Card', details: '$30 credit', where: 'Steam, Dundle' },
        { name: 'Airbnb Gift Card', details: '$30 travel/experiences credit', where: 'Airbnb.com/gift' },
        { name: 'Coaching Session', details: '30-min intro on business/skills/soft skills', where: 'Coach.me, Clarity.fm' }
      ]
    },
    {
      amount: '$50',
      color: 'orange',
      rewards: [
        { name: 'Amazon Gift Card', details: '$50 credit to spend on Amazon (global)', where: 'Amazon, Dundle, Giftcards.com' },
        { name: 'Spotify Premium – 4 mo', details: '4 months Spotify', where: 'Spotify.com gift card' },
        { name: 'Canva Pro – 4 mo', details: '4 months Canva Pro ($12.99 x 4 = $52)', where: 'Canva.com' },
        { name: 'Netflix Gift Card', details: '$50 balance', where: 'Netflix.com/gift-cards, Dundle' },
        { name: 'Google Play or Apple Card', details: '$50 for apps or stores', where: 'Dundle, Apple.com' },
        { name: 'Udemy Course Voucher', details: 'Up to $50 for courses', where: 'Udemy.com/gift' },
        { name: 'Steam Gift Card', details: '$50 credit', where: 'Steam, Dundle' },
        { name: 'Airbnb Gift Card', details: '$50 travel/experiences credit', where: 'Airbnb.com/gift' },
        { name: 'Coaching Session', details: '45-60min intro on business/skills/soft skills', where: 'Coach.me, Clarity.fm' }
      ]
    },
    {
      amount: '$70',
      color: 'purple',
      rewards: [
        { name: 'Amazon Gift Card', details: '$70 credit to spend on Amazon (global)', where: 'Amazon, Dundle, Giftcards.com' },
        { name: 'Spotify Premium – 6 mo', details: '6 months Spotify', where: 'Spotify.com gift card' },
        { name: 'Canva Pro – 4 mo', details: '4 months Canva Pro ($12.99 x 4 = $52)', where: 'Canva.com' },
        { name: 'Netflix Gift Card', details: '$70 balance', where: 'Netflix.com/gift-cards, Dundle' },
        { name: 'Google Play or Apple Card', details: '$70 for apps or stores', where: 'Dundle, Apple.com' },
        { name: 'Udemy Course Voucher', details: 'Up to $70 for courses', where: 'Udemy.com/gift' },
        { name: 'Steam Gift Card', details: '$70 credit', where: 'Steam, Dundle' },
        { name: 'Airbnb Gift Card', details: '$70 travel/experiences credit', where: 'Airbnb.com/gift' },
        { name: 'Coaching Session', details: '60-75min intro on business/skills/soft skills', where: 'Coach.me, Clarity.fm' }
      ]
    },
    {
      amount: '$85',
      color: 'teal',
      rewards: [
        { name: 'Amazon Gift Card', details: '$85 credit to spend on Amazon (global)', where: 'Amazon, Dundle, Giftcards.com' },
        { name: 'Spotify Premium – 8 mo', details: '8 months Premium', where: 'Spotify.com gift card' },
        { name: 'Canva Pro – 6 mo', details: '6 months Canva Pro', where: 'Canva.com' },
        { name: 'Netflix Gift Card', details: '$85 balance', where: 'Netflix.com/gift-cards, Dundle' },
        { name: 'Google Play or Apple Card', details: '$85 for apps or stores', where: 'Dundle, Apple.com' },
        { name: 'Udemy Course Voucher', details: 'Up to $85 for courses', where: 'Udemy.com/gift' },
        { name: 'Steam Gift Card', details: '$85 credit', where: 'Steam, Dundle' },
        { name: 'Airbnb Gift Card', details: '$85 travel/experiences credit', where: 'Airbnb.com/gift' },
        { name: 'Coaching Session', details: '1-2 sessions (business/skills/soft skills)', where: 'Coach.me, Clarity.fm' }
      ]
    },
    {
      amount: '$100',
      color: 'green',
      rewards: [
        { name: 'Amazon Gift Card', details: '$100 credit to spend on Amazon (global)', where: 'Amazon, Dundle, Giftcards.com' },
        { name: 'Spotify Premium – 9 mo', details: '9 months Spotify', where: 'Spotify.com gift card' },
        { name: 'Canva Pro – 8 mo', details: '8 months Canva Pro', where: 'Canva.com' },
        { name: 'Netflix Gift Card', details: '$100 balance', where: 'Netflix.com/gift-cards, Dundle' },
        { name: 'Google Play or Apple Card', details: '$100 for apps or stores', where: 'Dundle, Apple.com' },
        { name: 'Udemy Course Voucher', details: 'Up to $100 for courses', where: 'Udemy.com/gift' },
        { name: 'Steam Gift Card', details: '$100 credit', where: 'Steam, Dundle' },
        { name: 'Airbnb Gift Card', details: '$100 travel/experiences credit', where: 'Airbnb.com/gift' },
        { name: 'Masterclass Membership', details: '1 yr unlimited access to all courses ($96-$120)*', where: 'Masterclass.com/gift' },
        { name: 'Extended Coaching Pack', details: 'Multiple sessions or premium consult ($100 value)', where: 'Coach.me, Clarity.fm' }
      ]
    }
  ];

  return (
    <Container maxW="container.xl" py={5}>
      <Stack spacing={8}>
        {/* Header */}
        <Box>
          <Heading mb={2}>Rewards</Heading>
          <Text color="gray.600">
            Redeem your earned XP for exciting rewards and prizes.
          </Text>
        </Box>

        {/* How to Redeem - Featured at the top */}
        <Card bg={cardBg} boxShadow="lg" borderRadius="lg" borderWidth="2px" borderColor="blue.200">
          <CardBody>
            <Stack spacing={4}>
              <Heading size="lg" color="blue.600">How to Redeem Rewards</Heading>
              <Text color="gray.600" fontSize="lg">
                Earn XP by completing actions in your Level-Up Journey. Once you've accumulated enough XP, 
                you can redeem them for any of the rewards below. Contact your partner manager to process 
                your reward redemption.
              </Text>
              <Box bg="blue.50" p={4} borderRadius="md" borderLeft="4px" borderLeftColor="blue.500">
                <Text fontWeight="medium" color="blue.800">
                  💡 Pro Tip: Save up your XP for higher-value reward tiers to get more value for your efforts!
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>

        {/* Reward Tiers with Dropdowns */}
        <Box>
          <Heading size="md" mb={4}>Available Reward Tiers</Heading>
          <Stack spacing={4}>
            {rewardTiers.map((tier, index) => (
              <Card 
                key={tier.amount} 
                bg={cardBg} 
                boxShadow="md" 
                borderRadius="lg"
                borderWidth="2px"
                borderColor={`${tier.color}.200`}
              >
                <CardBody>
                  <Stack spacing={4}>
                    {/* Tier Header - Always Visible */}
                    <Button
                      variant="ghost"
                      onClick={() => toggleTier(tier.amount)}
                      justifyContent="space-between"
                      size="lg"
                      p={0}
                      h="auto"
                      _hover={{ bg: 'transparent' }}
                    >
                      <Flex align="center" justify="space-between" w="full">
                        <Flex align="center">
                          <Badge 
                            colorScheme={tier.color} 
                            fontSize="xl" 
                            p={3} 
                            borderRadius="lg"
                            fontWeight="bold"
                            mr={4}
                          >
                            {tier.amount}
                          </Badge>
                          <Text fontSize="lg" fontWeight="medium" color="gray.600">
                            in prizes • {tier.rewards.length} rewards available
                          </Text>
                        </Flex>
                        <Icon 
                          as={expandedTiers[tier.amount] ? FiChevronUp : FiChevronDown} 
                          boxSize={5}
                          color="gray.500"
                        />
                      </Flex>
                    </Button>

                    {/* Collapsible Rewards Table */}
                    <Collapse in={expandedTiers[tier.amount]} animateOpacity>
                      <Box overflowX="auto" mt={4}>
                        <Table variant="simple" size="sm">
                          <Thead>
                            <Tr>
                              <Th>Reward</Th>
                              <Th>Details</Th>
                              <Th>How/Where to Purchase/Distribute</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {tier.rewards.map((reward, rewardIndex) => (
                              <Tr key={rewardIndex}>
                                <Td fontWeight="medium">{reward.name}</Td>
                                <Td fontSize="sm">{reward.details}</Td>
                                <Td fontSize="sm" color="gray.600">{reward.where}</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </Box>
                    </Collapse>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Rewards; 