import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Avatar,
  Badge,
  Divider
} from '@chakra-ui/react';
import { FiMessageCircle, FiX, FiSend, FiTrash2 } from 'react-icons/fi';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your Partner Academy Assistant. I can help you navigate through the Level-Up Journey, understand XP & Rewards, and answer questions about becoming a successful partner. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef(null);

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  
  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Hi! I'm your Partner Academy Assistant. I can help you navigate through the Level-Up Journey, understand XP & Rewards, and answer questions about becoming a successful partner. How can I assist you today?",
        timestamp: new Date()
      }
    ]);
    setInputValue('');
    setIsTyping(false);
  };

  // Enhanced knowledge base with FAQ content
  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Level-Up Journey related (check this first before general "how to" questions)
    if (message.includes('level-up') || message.includes('level up') || message.includes('journey') || message.includes('curriculum')) {
      return "The Level-Up Journey is your path to becoming a successful partner! It has 4 levels:\n\n🔹 Mandatory Level: Complete KYC & Set Payment Method (0 XP)\n🔹 Medium Level: Bring 5 clients & 5 sub-affiliates (500 XP each)\n🔹 High Level: Earn $50 commissions & $500 trading volume (600 XP each)\n🔹 PRO Level: Earn $200 commissions & $1000 trading volume (2500 XP each)\n\nStart with the Mandatory level and work your way up!";
    }
    
    // Timeline/completion questions
    if (message.includes('how long') || message.includes('timeline') || message.includes('complete') && message.includes('program')) {
      return "The timeline varies based on your dedication and business development pace! ⏱️\n\n📅 Mandatory level: Can be completed in a few days\n📅 Medium, High, PRO levels: Depends on your success in bringing clients and generating commissions\n📅 Most active partners: See significant progress within 3-6 months\n\nYour pace depends on how quickly you can acquire clients and build your network!";
    }
    
    // XP related
    if (message.includes('xp') || message.includes('experience') || message.includes('points') || message.includes('earn xp')) {
      return "XP (Experience Points) are earned by completing actions in your Level-Up Journey:\n\n⭐ Medium Level: 500 XP per action\n⭐ High Level: 600 XP per action\n⭐ PRO Level: 2500 XP per action\n\nMilestones: 500, 1000, 1500, and 3000 XP\n\nMandatory actions don't grant XP but are required to unlock other levels. You can track your progress on the Dashboard and redeem XP for rewards!";
    }
    
    // XP milestones
    if (message.includes('milestone') || message.includes('xp milestone')) {
      return "There are four key XP milestones: 🎯\n\n• 500 XP - First milestone\n• 1000 XP - Second milestone\n• 1500 XP - Third milestone\n• 3000 XP - Final milestone\n\nReaching these milestones unlocks new opportunities and recognition within the partner program. Your progress is tracked on your dashboard and throughout the platform.";
    }
    
    // Rewards related
    if (message.includes('reward') || message.includes('redeem') || message.includes('prize') || message.includes('tier')) {
      return "Great question about rewards! 🎁\n\nWe offer 5 reward tiers: $30, $50, $70, $85, and $100 in prizes including:\n• Amazon Gift Cards\n• Spotify Premium subscriptions\n• Netflix subscriptions\n• Canva Pro access\n• Coaching sessions\n• Course vouchers\n• And more!\n\nTo redeem: Contact your partner manager once you've earned enough XP. Higher tiers offer better value and more premium rewards!";
    }
    
    // Getting started (check before general navigation)
    if (message.includes('start') || message.includes('begin') || message.includes('new') || message.includes('first')) {
      return "Welcome to your partner journey! 🚀\n\nGetting started steps:\n1. Complete KYC verification (Mandatory)\n2. Set up your payment method (Mandatory)\n3. Start the Level-Up Journey\n4. Begin with Medium level actions\n5. Track your XP progress on Dashboard\n\nFirst goal: Complete Mandatory level, then aim for your first 500 XP!\n\nNeed help with any specific step?";
    }
    
    // Client acquisition
    if (message.includes('client') || message.includes('customer') || message.includes('referral') || message.includes('bring clients')) {
      return "Bringing clients is key to your success! 🎯\n\nTips for client acquisition:\n• Complete the 'Getting our first clients (The fishing formula)' lesson\n• Focus on building trust and providing value\n• Identify your target audience\n• Create compelling content\n• Leverage your network\n\nGoal: Bring 5 clients to earn 500 XP in the Medium level!\n\nThe fishing formula lesson covers proven strategies including targeting and relationship building.";
    }
    
    // Sub-affiliates
    if (message.includes('sub-affiliate') || message.includes('recruit') || message.includes('partner')) {
      return "Sub-affiliates are partners you recruit under your referral! 👥\n\nWhat counts as a sub-affiliate:\n• Someone you recruit who becomes a partner\n• They should be actively promoting our products\n• They're engaged in the partner program\n\nGoal: Bring 5 sub-affiliates to earn 500 XP in the Medium level!\n\nThis helps build your network and increases your earning potential.";
    }
    
    // KYC related
    if (message.includes('kyc') || message.includes('verification') || message.includes('documents') || message.includes('trouble')) {
      return "KYC (Know Your Customer) verification is required in the Mandatory level! 📋\n\nTips for successful KYC:\n• Ensure documents are clear and valid\n• Make sure names match your account info\n• Avoid blurry photos or expired documents\n• Upload government-issued ID\n\nCommon issues: blurry photos, expired documents, or mismatched names.\n\nIf you're having trouble, contact support with specific error messages for personalized assistance!";
    }
    
    // Payment method
    if (message.includes('payment') || message.includes('payout') || message.includes('commission')) {
      return "Setting up your payment method is crucial for receiving commissions! 💳\n\nSteps:\n1. Go to account settings\n2. Navigate to payment methods\n3. Add bank account, e-wallet, or supported option\n4. Ensure it matches your verified identity\n\nCommission calculation depends on client trading activity and deposits. Detailed commission structures are available in your partner dashboard and through your partner manager!";
    }
    
    // Progress tracking
    if (message.includes('track') || message.includes('progress') || message.includes('real-time')) {
      return "Yes! You can track your progress in real-time! 📊\n\nYour dashboard provides:\n• Real-time XP updates\n• Completed actions count\n• Leaderboard ranking\n• Overall progress tracking\n• XP progress bar with milestones\n\nAll your achievements and statistics are updated automatically as you complete actions in your Level-Up Journey!";
    }
    
    // Support questions
    if (message.includes('support') || message.includes('help') || message.includes('contact')) {
      return "We provide comprehensive support! 🤝\n\nAvailable support:\n• Level-Up Journey curriculum\n• Regular coaching sessions\n• Marketing materials\n• Dedicated partner manager support\n• Community forums\n• Regular webinars and training sessions\n\nFor specific issues:\n• General questions: Start with FAQs\n• Account issues: Contact your partner manager\n• Technical problems: Support team via help desk\n• Reward redemptions: Coordinate with partner manager";
    }
    
    // Leaderboard
    if (message.includes('leaderboard') || message.includes('ranking') || message.includes('position')) {
      return "The Leaderboard shows your ranking among all partners! 🏆\n\nYou can find it in the 'XP & Leaderboard' section. It displays:\n• Your current rank\n• Top performers\n• XP comparison with other partners\n\nClimb the ranks by completing more actions in your Level-Up Journey and earning XP!";
    }
    
    // Navigation help (moved to end so specific questions are caught first)
    if (message.includes('navigate') || message.includes('find') || message.includes('where') || (message.includes('how to') && !message.includes('level'))) {
      return "I can help you navigate the Partner Academy! 🧭\n\nMain sections:\n• Dashboard: Your progress overview\n• Level-Up Journey: Complete actions to earn XP\n• XP & Leaderboard: Track progress and see rankings\n• Rewards: Redeem XP for prizes\n• FAQs: Common questions answered\n• Profile: Your account settings\n\nWhat specific section would you like help with?";
    }
    
    // Default response for unrelated queries
    return "I'm your Partner Academy Assistant and I'm here to help with questions about:\n\n• Level-Up Journey and curriculum\n• XP earning and milestones\n• Rewards and redemption\n• Client acquisition strategies\n• KYC and payment setup\n• Progress tracking\n• Support options\n• Navigation through the platform\n\nI'm specifically designed to help with Partner Academy topics. For other questions, please contact your partner manager or support team. How can I help you with your partner journey?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: getAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Box
          position="fixed"
          bottom="20px"
          right="20px"
          zIndex={1000}
        >
          <IconButton
            onClick={openChat}
            colorScheme="blue"
            size="xl"
            borderRadius="full"
            boxShadow="lg"
            icon={<FiMessageCircle size={24} />}
            _hover={{ transform: 'scale(1.1)' }}
            transition="all 0.2s"
            aria-label="Open AI Assistant"
            w="60px"
            h="60px"
          />
        </Box>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Box
          position="fixed"
          bottom="20px"
          right="20px"
          w="380px"
          h="500px"
          maxW="calc(100vw - 40px)"
          maxH="calc(100vh - 40px)"
          zIndex={999}
        >
          <Card bg={cardBg} boxShadow="2xl" borderRadius="lg" h="full" overflow="hidden">
            {/* Header */}
            <CardHeader pb={2} flexShrink={0}>
              <Flex justify="space-between" align="center">
                <HStack>
                  <Avatar size="sm" bg="blue.500" icon={<FiMessageCircle />} />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">Partner Assistant</Text>
                    <Badge colorScheme="green" size="sm">Online</Badge>
                  </VStack>
                </HStack>
                <HStack spacing={1}>
                  <IconButton
                    icon={<FiTrash2 />}
                    size="sm"
                    variant="ghost"
                    onClick={clearChat}
                    _hover={{ bg: 'red.50', color: 'red.500' }}
                    aria-label="Clear chat"
                    title="Clear conversation"
                  />
                  <IconButton
                    icon={<FiX />}
                    size="sm"
                    variant="ghost"
                    onClick={closeChat}
                    _hover={{ bg: 'gray.100' }}
                    aria-label="Close chat"
                  />
                </HStack>
              </Flex>
            </CardHeader>

            <Divider />

            {/* Messages */}
            <CardBody p={0} display="flex" flexDirection="column" overflow="hidden">
              <Box
                flex="1"
                overflowY="auto"
                overflowX="hidden"
                p={3}
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#CBD5E0',
                    borderRadius: '24px',
                  },
                }}
              >
                <VStack spacing={3} align="stretch">
                  {messages.map((message) => (
                    <Flex
                      key={message.id}
                      justify={message.type === 'user' ? 'flex-end' : 'flex-start'}
                    >
                      <Box
                        maxW="90%"
                        bg={message.type === 'user' ? 'blue.500' : 'gray.100'}
                        color={message.type === 'user' ? 'white' : 'gray.800'}
                        px={3}
                        py={2}
                        borderRadius="lg"
                        fontSize="sm"
                        whiteSpace="pre-wrap"
                        wordBreak="break-word"
                        overflowWrap="anywhere"
                        lineHeight="1.4"
                        width="fit-content"
                      >
                        {message.content}
                      </Box>
                    </Flex>
                  ))}
                  
                  {isTyping && (
                    <Flex justify="flex-start">
                      <Box
                        bg="gray.100"
                        px={3}
                        py={2}
                        borderRadius="lg"
                        fontSize="sm"
                        maxW="90%"
                        wordBreak="break-word"
                      >
                        <Text>Assistant is typing...</Text>
                      </Box>
                    </Flex>
                  )}
                  <div ref={messagesEndRef} />
                </VStack>
              </Box>

              {/* Input */}
              <Box p={3} borderTop="1px" borderColor={borderColor} flexShrink={0}>
                <HStack spacing={2}>
                  <Input
                    placeholder="Ask about Level-Up Journey, XP, Rewards..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    size="sm"
                    fontSize="sm"
                    flex="1"
                  />
                  <IconButton
                    icon={<FiSend />}
                    onClick={handleSendMessage}
                    colorScheme="blue"
                    size="sm"
                    isDisabled={!inputValue.trim()}
                    flexShrink={0}
                  />
                </HStack>
              </Box>
            </CardBody>
          </Card>
        </Box>
      )}
    </>
  );
};

export default AIAssistant; 