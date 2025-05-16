import React from 'react';
import { 
  Box, 
  Flex, 
  IconButton, 
  Heading, 
  HStack, 
  Avatar, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem,
  Text,
  Badge,
  useColorModeValue,
  Image
} from '@chakra-ui/react';
import { 
  FiMenu, 
  FiBell, 
  FiSettings
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="header"
      position="fixed"
      w="full"
      bg={bgColor}
      boxShadow="sm"
      zIndex="10"
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Flex px={4} h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={4} w="full">
          <IconButton
            icon={<FiMenu />}
            aria-label="Open menu"
            variant="ghost"
            onClick={onMenuClick}
          />
          
          <HStack spacing={3} align="center">
            <Image src="/Deriv.png" alt="Deriv Logo" height="80px" objectFit="contain" />
            <Heading size="md" fontWeight="bold">Partner Activation Academy</Heading>
          </HStack>
          
          <HStack ml="auto" spacing={4}>
            <Flex align="center">
              <Badge colorScheme="green" mr={2} fontSize="sm" py={1} px={2} borderRadius="full">
                {user?.level || 'Novice'}
              </Badge>
              <Text fontWeight="bold" fontSize="sm">
                XP: {user?.xp || 0}
              </Text>
            </Flex>
            
            <Menu>
              <Box>
                <IconButton
                  icon={<FiBell />}
                  aria-label="Notifications"
                  variant="ghost"
                  as={MenuButton}
                />
              </Box>
              <MenuList>
                <MenuItem>New module available</MenuItem>
                <MenuItem>You earned a badge!</MenuItem>
                <MenuItem>Quiz results ready</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <Avatar
                size="sm"
                name={user?.username || 'User'}
                cursor="pointer"
                as={MenuButton}
              />
              <MenuList>
                <MenuItem onClick={() => navigate('/profile')}>
                  <FiSettings size={18} style={{ marginRight: '8px' }} />
                  Profile
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar; 