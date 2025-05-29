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
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Calculate progress percentage with correct max XP of 8000
  const maxXP = 8000;
  const currentXP = user?.xp || 1250;
  const progressPercent = (currentXP / maxXP) * 100;

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
            value={progressPercent}
            size="sm" 
            colorScheme="red" 
            borderRadius="full" 
            bg="gray.200"
          />
        </Box>
        <Flex justify="space-between" fontSize="sm">
          <Text>{currentXP} XP earned</Text>
          <Badge colorScheme="brand">{user?.level || 'APPRENTICE'}</Badge>
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
              isActive={location.pathname === item.path}
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
                  isActive={location.pathname === item.path}
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
const NavItem = ({ icon, path, children, onClose, isAdmin = false, isActive = false }) => {
  const activeBg = useColorModeValue(
    isAdmin ? 'orange.100' : 'brand.100', 
    isAdmin ? 'orange.900' : 'brand.900'
  );
  const activeColor = useColorModeValue(
    isAdmin ? 'orange.700' : 'brand.700', 
    isAdmin ? 'orange.200' : 'brand.200'
  );
  const hoverBg = useColorModeValue(
    isAdmin ? 'orange.50' : 'brand.50', 
    isAdmin ? 'orange.800' : 'brand.800'
  );
  const hoverColor = useColorModeValue(
    isAdmin ? 'orange.600' : 'brand.600', 
    isAdmin ? 'orange.300' : 'brand.300'
  );

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
        bg={isActive ? activeBg : 'transparent'}
        color={isActive ? activeColor : 'inherit'}
        fontWeight={isActive ? '600' : '400'}
        borderLeft={isActive ? '4px solid' : '4px solid transparent'}
        borderLeftColor={isActive ? (isAdmin ? 'orange.500' : 'brand.500') : 'transparent'}
        _hover={{
          bg: isActive ? activeBg : hoverBg,
          color: isActive ? activeColor : hoverColor,
        }}
        transition="all 0.2s"
      >
        <Icon
          mr={4}
          fontSize="18"
          as={icon}
          color={isActive ? activeColor : 'inherit'}
          _groupHover={{
            color: isActive ? activeColor : hoverColor,
          }}
        />
        {children}
      </Flex>
    </Box>
  );
};

export default Sidebar; 