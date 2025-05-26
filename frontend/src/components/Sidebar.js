import React from 'react';
import {
  Box,
  Flex,
  VStack,
  Icon,
  Text,
  CloseButton,
  useColorModeValue,
  Divider,
  Badge,
  Progress,
  Heading
} from '@chakra-ui/react';
import { 
  FiHome, 
  FiBook, 
  FiAward, 
  FiUser,
  FiBarChart2,
  FiLayers,
  FiTrendingUp,
  FiHelpCircle,
  FiSettings
} from 'react-icons/fi';
import { NavLink as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import XPProgressBar from './XPProgressBar';

// Navigation items
const navItems = [
  { name: 'Dashboard', icon: FiHome, path: '/' },
  { name: 'Level-Up Journey', icon: FiLayers, path: '/curriculum' },
  { name: 'XP & Leaderboard', icon: FiTrendingUp, path: '/gamification' },
  { name: 'Rewards', icon: FiAward, path: '/rewards' },
  { name: 'FAQs', icon: FiHelpCircle, path: '/faqs' },
  { name: 'Profile', icon: FiUser, path: '/profile' },
];

// Admin navigation items
const adminItems = [
  { name: 'Admin Dashboard', icon: FiSettings, path: '/admin' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Calculate progress percentage (simplified)
  const progressPercent = user?.modules_completed?.length 
    ? (user.modules_completed.length / 5) * 100 
    : 0;

  // Check if user is admin (for now, we'll assume all users can see admin for demo)
  const isAdmin = true; // TODO: Replace with actual admin check
  
  return (
    <Box
      position="fixed"
      w={{ base: 'full', md: 60 }}
      h="full"
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      transition="3s ease"
      zIndex={{ base: 20, md: 10 }}
      overflowY="auto"
    >
      <Flex h="20" alignItems="center" justifyContent="space-between" px={4}>
        <Text fontSize="2xl" fontWeight="bold" color="brand.600">
          Partner Hub
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      <Box px={4} pb={4}>
        <Heading size="sm" mb={2}>My Progress</Heading>
        <Box mb={2}>
          <Progress 
            value={(user?.xp || 750) / 30} // Scale to percentage (750/3000 * 100 = 25%)
            size="sm" 
            colorScheme="red" 
            borderRadius="full" 
            bg="gray.200"
          />
        </Box>
        <Flex justify="space-between" fontSize="sm">
          <Text>{user?.xp || 750} XP earned</Text>
          <Badge colorScheme="brand">{user?.level || 'Apprentice'}</Badge>
        </Flex>
      </Box>
      
      <Divider />
      
      <Box px={4} py={4}>
        <VStack align="stretch" spacing={1}>
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              icon={item.icon}
              path={item.path}
              onClose={onClose}
            >
              {item.name}
            </NavItem>
          ))}
        </VStack>
      </Box>

      {/* Admin Section */}
      {isAdmin && (
        <>
          <Divider />
          <Box px={4} py={4}>
            <Heading size="xs" mb={3} color="gray.500" textTransform="uppercase" letterSpacing="wider">
              Administration
            </Heading>
            <VStack align="stretch" spacing={1}>
              {adminItems.map((item) => (
                <NavItem
                  key={item.name}
                  icon={item.icon}
                  path={item.path}
                  onClose={onClose}
                  isAdmin={true}
                >
                  {item.name}
                </NavItem>
              ))}
            </VStack>
          </Box>
        </>
      )}
    </Box>
  );
};

// NavItem component
const NavItem = ({ icon, path, children, onClose, isAdmin = false }) => {
  return (
    <Box
      as={RouterLink}
      to={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={() => {
        if (window.innerWidth < 768) {
          onClose();
        }
      }}
    >
      <Flex
        align="center"
        p={3}
        mx={-4}
        borderRadius="md"
        role="group"
        cursor="pointer"
        _hover={{
          bg: isAdmin ? 'orange.50' : 'brand.50',
          color: isAdmin ? 'orange.600' : 'brand.600',
        }}
      >
        <Icon
          mr={4}
          fontSize="18"
          as={icon}
          _groupHover={{
            color: isAdmin ? 'orange.600' : 'brand.600',
          }}
        />
        {children}
      </Flex>
    </Box>
  );
};

export default Sidebar; 