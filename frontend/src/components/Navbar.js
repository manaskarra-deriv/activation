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
  Image,
  useBreakpointValue,
  Spacer,
  Stack
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
  
  // Responsive display
  const isMobile = useBreakpointValue({ base: true, md: false });
  const logoSize = useBreakpointValue({ base: "60px", md: "80px" });
  const headingSize = useBreakpointValue({ base: "sm", md: "md" });

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
      <Flex 
        px={3} 
        h={16} 
        alignItems="center" 
        justifyContent="space-between"
        flexWrap="nowrap"
      >
        <HStack spacing={2}>
          <IconButton
            icon={<FiMenu />}
            aria-label="Open menu"
            variant="ghost"
            onClick={onMenuClick}
          />
          
          <HStack spacing={1} align="center" maxW={{ base: "180px", md: "auto" }}>
            <Image src="/Deriv.png" alt="Deriv Logo" height={logoSize} objectFit="contain" display={{ base: "none", sm: "block" }} />
            <Heading 
              size={headingSize} 
              fontWeight="bold" 
              isTruncated
              noOfLines={1}
            >
              Partner Activation
            </Heading>
          </HStack>
        </HStack>
        
        <Spacer />
        
        <Stack 
          direction="row" 
          spacing={{ base: 1, md: 4 }}
          align="center"
        >
          {!isMobile && (
            <Flex align="center">
              <Badge colorScheme="green" mr={2} fontSize="sm" py={1} px={2} borderRadius="full">
                {user?.level || 'Novice'}
              </Badge>
              <Text fontWeight="bold" fontSize="sm">
                XP: {user?.xp || 0}
              </Text>
            </Flex>
          )}
          
          <Menu>
            <Box>
              <IconButton
                icon={<FiBell />}
                aria-label="Notifications"
                variant="ghost"
                as={MenuButton}
                size={isMobile ? "sm" : "md"}
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
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar; 