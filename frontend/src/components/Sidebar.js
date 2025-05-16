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
  Heading,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue
} from '@chakra-ui/react';
import { 
  FiHome, 
  FiBook, 
  FiAward, 
  FiUser,
  FiBarChart2,
  FiLayers,
  FiTrendingUp
} from 'react-icons/fi';
import { NavLink as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Navigation items
const navItems = [
  { name: 'Dashboard', icon: FiHome, path: '/' },
  { name: 'Level-Up Journey', icon: FiLayers, path: '/curriculum' },
  { name: 'Modules', icon: FiBook, path: '/modules' },
  { name: 'Rewards & XP', icon: FiTrendingUp, path: '/gamification' },
  { name: 'Leaderboard', icon: FiBarChart2, path: '/leaderboard' },
  { name: 'Profile', icon: FiUser, path: '/profile' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Calculate progress percentage (simplified)
  const progressPercent = user?.modules_completed?.length 
    ? (user.modules_completed.length / 5) * 100 
    : 0;
  
  // Use drawer on mobile, regular sidebar on desktop
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  const SidebarContent = (
    <Box
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      w="full"
      h="full"
      overflowY="auto"
    >
      <Flex h="20" alignItems="center" justifyContent="space-between" px={4}>
        <Text fontSize="2xl" fontWeight="bold" color="brand.600">
          Partner Hub
        </Text>
        {isMobile && <CloseButton onClick={onClose} />}
      </Flex>

      <Box px={4} pb={4}>
        <Heading size="sm" mb={2}>My Progress</Heading>
        <Progress value={progressPercent} size="sm" colorScheme="brand" borderRadius="full" mb={2} />
        <Flex justify="space-between" fontSize="sm">
          <Text>{user?.modules_completed?.length || 0}/5 modules</Text>
          <Text>{progressPercent.toFixed(0)}% complete</Text>
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
      
      <Divider />
      
      <Box px={4} py={4}>
        <Heading size="sm" mb={2}>My Badges</Heading>
        <Flex wrap="wrap" gap={2}>
          {user?.badges?.map((badge, i) => (
            <Badge 
              key={i} 
              colorScheme="accent" 
              p={2} 
              borderRadius="md"
              fontSize="xs"
            >
              <Flex align="center">
                <Icon as={FiAward} mr={1} />
                {badge}
              </Flex>
            </Badge>
          ))}
          {(!user?.badges || user.badges.length === 0) && (
            <Text fontSize="sm" color="gray.500">
              Complete modules to earn badges
            </Text>
          )}
        </Flex>
      </Box>
      
      <Divider />
      
      <Box px={4} py={4}>
        <Heading size="sm" mb={2}>Fast Track to Silver</Heading>
        <Progress value={70} size="sm" colorScheme="yellow" borderRadius="full" mb={2} />
        <Flex justify="space-between" fontSize="sm">
          <Text>Level 2/5</Text>
          <Text>3 more to go</Text>
        </Flex>
        <Text fontSize="xs" color="gray.500" mt={2}>
          Complete all levels to fast-track to Silver tier
        </Text>
      </Box>
    </Box>
  );

  // Render as drawer on mobile
  if (isMobile) {
    return (
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          {SidebarContent}
        </DrawerContent>
      </Drawer>
    );
  }
  
  // Render as sidebar on desktop
  return (
    <Box
      position="fixed"
      w={60}
      h="full"
      display={{ base: 'none', md: 'block' }}
    >
      {SidebarContent}
    </Box>
  );
};

// NavItem component
const NavItem = ({ icon, path, children, onClose }) => {
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
          bg: 'brand.50',
          color: 'brand.600',
        }}
      >
        <Icon
          mr={4}
          fontSize="18"
          as={icon}
          _groupHover={{
            color: 'brand.600',
          }}
        />
        {children}
      </Flex>
    </Box>
  );
};

export default Sidebar; 