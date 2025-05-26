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
  Divider,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { FiMessageCircle, FiX, FiSend, FiTrash2, FiMaximize2, FiMinimize2 } from 'react-icons/fi';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your Partner Academy Assistant powered by AI. I can help you navigate through the Level-Up Journey, understand XP & Rewards, and answer questions about becoming a successful partner. How can I assist you today?",
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
  const toggleExpanded = () => setIsExpanded(!isExpanded);
  
  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Hi! I'm your Partner Academy Assistant powered by AI. I can help you navigate through the Level-Up Journey, understand XP & Rewards, and answer questions about becoming a successful partner. How can I assist you today?",
        timestamp: new Date()
      }
    ]);
    setInputValue('');
    setIsTyping(false);
    setError(null);
  };

  // Function to format text with markdown-like formatting
  const formatMessage = (content) => {
    // Split content by **text** pattern and format accordingly
    const parts = content.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove ** and make bold
        const boldText = part.slice(2, -2);
        return (
          <Text as="span" key={index} fontWeight="bold">
            {boldText}
          </Text>
        );
      }
      return part;
    });
  };

  // Get chat window dimensions based on expanded state
  const getChatDimensions = () => {
    if (isExpanded) {
      return {
        width: Math.min(600, window.innerWidth - 40),
        height: Math.min(700, window.innerHeight - 40)
      };
    }
    return {
      width: 380,
      height: 500
    };
  };

  const chatDimensions = getChatDimensions();

  // System prompt with comprehensive Partner Academy knowledge
  const getSystemPrompt = () => {
    return `You are a helpful AI assistant for the Deriv Partner Activation Academy. You ONLY answer questions related to the Partner Academy, partner program, and Deriv partnership topics.

IMPORTANT GUIDELINES:
- Keep responses concise and to the point. Aim for 2-3 sentences maximum unless specifically asked for detailed explanations.
- ONLY answer questions about Partner Academy topics listed below
- If asked about anything unrelated to the Partner Academy (anime, general topics, comparisons to non-partner subjects, etc.), politely decline and redirect to partner-related topics
- Do NOT engage with off-topic questions, even if they mention "Deriv Partners" in comparison to unrelated subjects

PARTNER ACADEMY KNOWLEDGE BASE:

LEVEL-UP JOURNEY STRUCTURE:
- 4 Levels: Mandatory, Medium, High, PRO
- Mandatory Level: Complete KYC & Set Payment Method (0 XP - required foundation)
- Medium Level: Bring 5 clients (500 XP) & Bring 5 sub-affiliates (500 XP)
- High Level: Earn $50 USD commissions (600 XP) & Earn $500 trading volume (600 XP)
- PRO Level: Earn $200 USD commissions (2500 XP) & Earn $1000 trading volume (2500 XP)

XP SYSTEM:
- XP Milestones: 500, 1000, 1500, 3000 XP
- Medium Level actions: 500 XP each
- High Level actions: 600 XP each
- PRO Level actions: 2500 XP each
- Mandatory actions don't grant XP but unlock other levels

REWARDS SYSTEM:
- 5 reward tiers: $30, $50, $70, $85, $100
- Rewards include: Amazon Gift Cards, Spotify Premium, Netflix, Canva Pro, coaching sessions, course vouchers
- Contact partner manager to redeem rewards
- Higher tiers offer better value

NAVIGATION STRUCTURE:
- Dashboard: Progress overview and XP tracking
- Level-Up Journey: Complete actions to earn XP
- XP & Leaderboard: Track progress and see rankings
- Rewards: Redeem XP for prizes
- FAQs: Common questions answered
- Profile: Account settings
- Admin Dashboard: For Deriv staff only

COMMON PROCESSES:
- KYC: Upload clear, valid documents that match account info
- Payment Setup: Add bank account/e-wallet in account settings
- Client Acquisition: Use "The fishing formula" lesson, build trust, provide value
- Sub-affiliates: Recruit partners under your referral who actively promote
- Commission Tracking: Based on client trading activity and deposits

SUPPORT AVAILABLE:
- Level-Up Journey curriculum
- Regular coaching sessions
- Marketing materials
- Dedicated partner manager support
- Community forums
- Regular webinars and training

TIMELINE EXPECTATIONS:
- Mandatory level: Few days
- Medium/High/PRO levels: Depends on client acquisition success
- Most active partners: Significant progress within 3-6 months

For questions outside the Partner Academy scope, respond with: "I'm here to help with Partner Academy questions only. Feel free to ask about the Level-Up Journey, XP system, rewards, or how to succeed as a Deriv partner!"

Always provide helpful, accurate information based on this knowledge. Keep responses brief and actionable. Be encouraging and supportive in your responses about partner-related topics. Use **bold text** for emphasis on important points.`;
  };

  // Animated thinking component
  const ThinkingAnimation = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        setDots(prev => {
          if (prev === '...') return '';
          return prev + '.';
        });
      }, 500);

      return () => clearInterval(interval);
    }, []);

    return (
      <Flex justify="flex-start">
        <Box
          bg="gray.100"
          px={3}
          py={2}
          borderRadius="lg"
          fontSize="sm"
          maxW="90%"
          wordBreak="break-word"
          minW="80px"
        >
          <HStack spacing={2}>
            <Box
              w="6px"
              h="6px"
              bg="gray.400"
              borderRadius="full"
              animation="pulse 1.5s ease-in-out infinite"
            />
            <Box
              w="6px"
              h="6px"
              bg="gray.400"
              borderRadius="full"
              animation="pulse 1.5s ease-in-out infinite 0.2s"
            />
            <Box
              w="6px"
              h="6px"
              bg="gray.400"
              borderRadius="full"
              animation="pulse 1.5s ease-in-out infinite 0.4s"
            />
            <Text color="gray.600" fontSize="xs">
              AI is thinking{dots}
            </Text>
          </HStack>
        </Box>
      </Flex>
    );
  };

  // Make API call to OpenAI
  const getAIResponse = async (userMessage, conversationHistory) => {
    try {
      setError(null);
      
      // Prepare messages for the API
      const apiMessages = [
        {
          role: 'system',
          content: getSystemPrompt()
        },
        // Include recent conversation history for context
        ...conversationHistory.slice(-6).map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        {
          role: 'user',
          content: userMessage
        }
      ];

      const response = await fetch('https://litellm.deriv.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: apiMessages,
          max_tokens: 200,
          temperature: 0.7,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setError('Sorry, I encountered an error. Please try again.');
      
      // Fallback response
      return "I apologize, but I'm having trouble connecting to my AI service right now. Please try asking your question again, or contact your partner manager for immediate assistance with Partner Academy questions.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    const currentInput = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Get AI response with conversation history
      const aiResponse = await getAIResponse(currentInput, messages);
      
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again or contact your partner manager for assistance.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
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
          w={`${chatDimensions.width}px`}
          h={`${chatDimensions.height}px`}
          maxW="calc(100vw - 40px)"
          maxH="calc(100vh - 40px)"
          zIndex={999}
          transition="all 0.3s ease-in-out"
        >
          <Card bg={cardBg} boxShadow="2xl" borderRadius="lg" h="full" overflow="hidden">
            {/* Header */}
            <CardHeader pb={2} flexShrink={0}>
              <Flex justify="space-between" align="center">
                <HStack>
                  <Avatar size="sm" bg="blue.500" icon={<FiMessageCircle />} />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold" fontSize="sm">AI Partner Assistant</Text>
                    <Badge colorScheme="green" size="sm">Powered by GPT-4</Badge>
                  </VStack>
                </HStack>
                <HStack spacing={1}>
                  <IconButton
                    icon={isExpanded ? <FiMinimize2 /> : <FiMaximize2 />}
                    size="sm"
                    variant="ghost"
                    onClick={toggleExpanded}
                    _hover={{ bg: 'blue.50', color: 'blue.500' }}
                    aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
                    title={isExpanded ? "Minimize" : "Expand"}
                  />
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

            {/* Error Alert */}
            {error && (
              <Alert status="error" size="sm">
                <AlertIcon />
                <Text fontSize="xs">{error}</Text>
              </Alert>
            )}

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
                        {message.type === 'bot' ? formatMessage(message.content) : message.content}
                      </Box>
                    </Flex>
                  ))}
                  
                  {isTyping && <ThinkingAnimation />}
                  <div ref={messagesEndRef} />
                </VStack>
              </Box>

              {/* Input */}
              <Box p={3} borderTop="1px" borderColor={borderColor} flexShrink={0}>
                <HStack spacing={2}>
                  <Input
                    placeholder="Ask me anything about the Partner Academy..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    size="sm"
                    fontSize="sm"
                    flex="1"
                    isDisabled={isTyping}
                  />
                  <IconButton
                    icon={<FiSend />}
                    onClick={handleSendMessage}
                    colorScheme="blue"
                    size="sm"
                    isDisabled={!inputValue.trim() || isTyping}
                    flexShrink={0}
                    isLoading={isTyping}
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
