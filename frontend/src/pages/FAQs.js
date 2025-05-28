import React, { useState } from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  Stack,
  Card,
  CardBody,
  useColorModeValue,
  Flex,
  Collapse,
  Button,
  Icon,
  Badge
} from '@chakra-ui/react';
import { FiChevronDown, FiChevronUp, FiHelpCircle, FiAward, FiTrendingUp, FiUsers } from 'react-icons/fi';

const FAQs = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const [expandedFAQs, setExpandedFAQs] = useState({});

  const toggleFAQ = (faqId) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }));
  };

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: FiHelpCircle,
      color: 'blue',
      faqs: [
        {
          id: 'getting-started-1',
          question: 'How do I start my partner journey?',
          answer: 'Welcome to the Partner Activation Academy! Start by completing your Level-Up Journey. Begin with the BASIC Level actions like completing KYC and setting up your payment method. These foundational steps will prepare you for earning tokens and advancing through the program.'
        },
        {
          id: 'getting-started-2',
          question: 'What is the Level-Up Journey?',
          answer: 'The Level-Up Journey is our structured curriculum designed to help you become a successful partner. It consists of four levels: BASIC (account setup - mandatory, no tokens), MEDIUM (client acquisition - 500 tokens each), HIGH (commission goals - 1000 tokens each), and PRO (advanced targets - 2500 tokens each). Each level contains specific actions that earn you tokens when completed.'
        },
        {
          id: 'getting-started-3',
          question: 'How long does it take to complete the program?',
          answer: 'The timeline varies based on your dedication and business development pace. The BASIC level can be completed in a few days, while advancing through MEDIUM, HIGH, and PRO levels depends on your success in bringing clients and generating commissions. Most active partners see significant progress within 3-6 months.'
        }
      ]
    },
    {
      title: 'XP & Rewards',
      icon: FiTrendingUp,
      color: 'red',
      faqs: [
        {
          id: 'xp-rewards-1',
          question: 'How do I earn tokens?',
          answer: 'You earn tokens by completing actions in your Level-Up Journey. MEDIUM level actions (bringing clients/sub-affiliates) earn 500 tokens each, HIGH level actions (commissions/trading volume) earn 1000 tokens each, and PRO level actions earn 2500 tokens each. BASIC level actions are mandatory but don\'t grant tokens - they unlock other levels.'
        },
        {
          id: 'xp-rewards-2',
          question: 'What are the token milestones?',
          answer: 'There are key token milestones that unlock new opportunities and recognition within the partner program. Your progress is tracked on your dashboard and throughout the platform. The more tokens you earn, the higher your ranking and rewards potential.'
        },
        {
          id: 'xp-rewards-3',
          question: 'How do I redeem rewards?',
          answer: 'Once you\'ve accumulated enough tokens, you can redeem them for various rewards including Amazon gift cards, Spotify Premium, Canva Pro, Netflix subscriptions, and more. Contact your partner manager to process your reward redemption. We recommend saving up for higher-value tiers to maximize your rewards.'
        },
        {
          id: 'xp-rewards-4',
          question: 'What reward tiers are available?',
          answer: 'We offer four reward tiers: $30, $50, $70, and $100 in prizes. Each tier includes various options like gift cards, software subscriptions, course vouchers, and coaching sessions. Higher tiers offer better value and more premium rewards.'
        }
      ]
    },
    {
      title: 'Partner Activities',
      icon: FiUsers,
      color: 'green',
      faqs: [
        {
          id: 'activities-1',
          question: 'How do I bring my first clients?',
          answer: 'Start with the "Getting our first clients (The fishing formula)" lesson in your Level-Up Journey. This covers proven strategies for client acquisition, including identifying your target audience, creating compelling content, and leveraging your network. Focus on building trust and providing value to potential clients.'
        },
        {
          id: 'activities-2',
          question: 'What counts as a sub-affiliate?',
          answer: 'A sub-affiliate is someone you recruit who becomes a partner under your referral. They should be actively engaged in promoting our products and services. When you successfully bring 5 sub-affiliates, you\'ll earn 500 tokens and advance in the MEDIUM level of your journey.'
        },
        {
          id: 'activities-3',
          question: 'How are commissions calculated?',
          answer: 'Commissions are based on the trading activity and deposits of clients you refer. The exact calculation depends on the specific products and client activity levels. Detailed commission structures are available in your partner dashboard and through your partner manager.'
        },
        {
          id: 'activities-4',
          question: 'What support is available for partners?',
          answer: 'We provide comprehensive support including this Level-Up Journey curriculum, regular coaching sessions, marketing materials, and dedicated partner manager support. You can also access our community forums and attend regular webinars and training sessions.'
        }
      ]
    },
    {
      title: 'Technical & Account',
      icon: FiAward,
      color: 'purple',
      faqs: [
        {
          id: 'technical-1',
          question: 'I\'m having trouble with KYC verification. What should I do?',
          answer: 'Ensure all your documents are clear, valid, and match the information in your account. Common issues include blurry photos, expired documents, or mismatched names. If you continue having problems, contact our support team with your specific error messages for personalized assistance.'
        },
        {
          id: 'technical-2',
          question: 'How do I set up my payment method?',
          answer: 'Go to your account settings and navigate to the payment methods section. You can add bank accounts, e-wallets, or other supported payment options. Ensure your payment method matches your verified identity for smooth commission payouts.'
        },
        {
          id: 'technical-3',
          question: 'Can I track my progress in real-time?',
          answer: 'Yes! Your dashboard provides real-time updates on your tokens, completed actions, leaderboard ranking, and overall progress. The progress bar shows your current position and next milestones. All your achievements and statistics are updated automatically.'
        },
        {
          id: 'technical-4',
          question: 'Who do I contact for additional support?',
          answer: 'For general questions, start with these FAQs. For account-specific issues, contact your assigned partner manager. For technical problems, reach out to our support team through the help desk. For reward redemptions, coordinate with your partner manager.'
        }
      ]
    }
  ];

  return (
    <Container maxW="container.xl" py={5}>
      <Stack spacing={8}>
        {/* Header */}
        <Box>
          <Heading mb={2}>Frequently Asked Questions</Heading>
          <Text color="gray.600">
            Find answers to common questions about the Partner Activation Academy.
          </Text>
        </Box>

        {/* FAQ Categories */}
        <Stack spacing={6}>
          {faqCategories.map((category) => (
            <Box key={category.title}>
              <Flex align="center" mb={4}>
                <Icon as={category.icon} boxSize={6} color={`${category.color}.500`} mr={3} />
                <Heading size="lg">{category.title}</Heading>
                <Badge ml={3} colorScheme={category.color}>{category.faqs.length} questions</Badge>
              </Flex>
              
              <Stack spacing={3}>
                {category.faqs.map((faq) => (
                  <Card 
                    key={faq.id}
                    bg={cardBg} 
                    boxShadow="md" 
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor={`${category.color}.200`}
                  >
                    <CardBody>
                      <Stack spacing={3}>
                        {/* Question - Always Visible */}
                        <Button
                          variant="ghost"
                          onClick={() => toggleFAQ(faq.id)}
                          justifyContent="space-between"
                          size="lg"
                          p={0}
                          h="auto"
                          _hover={{ bg: 'transparent' }}
                        >
                          <Flex align="center" justify="space-between" w="full">
                            <Text fontSize="md" fontWeight="semibold" textAlign="left">
                              {faq.question}
                            </Text>
                            <Icon 
                              as={expandedFAQs[faq.id] ? FiChevronUp : FiChevronDown} 
                              boxSize={5}
                              color="gray.500"
                              ml={4}
                            />
                          </Flex>
                        </Button>

                        {/* Answer - Collapsible */}
                        <Collapse in={expandedFAQs[faq.id]} animateOpacity>
                          <Box pt={2} borderTop="1px" borderColor="gray.200">
                            <Text color="gray.600" lineHeight="1.6">
                              {faq.answer}
                            </Text>
                          </Box>
                        </Collapse>
                      </Stack>
                    </CardBody>
                  </Card>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>

        {/* Contact Support */}
        <Card bg={cardBg} boxShadow="lg" borderRadius="lg" borderWidth="2px" borderColor="blue.200">
          <CardBody>
            <Stack spacing={4}>
              <Heading size="md" color="blue.600">Still Need Help?</Heading>
              <Text color="gray.600">
                Can't find the answer you're looking for? Our support team is here to help you succeed in your partner journey.
              </Text>
              <Flex gap={4} flexWrap="wrap">
                <Button colorScheme="blue" variant="solid">
                  Contact Partner Manager
                </Button>
                <Button colorScheme="blue" variant="outline">
                  Submit Support Ticket
                </Button>
              </Flex>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Container>
  );
};

export default FAQs; 