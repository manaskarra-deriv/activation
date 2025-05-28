import React from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Tooltip
} from '@chakra-ui/react';

const XPProgressBar = ({ currentXP = 1250, showLabels = true }) => {
  const milestones = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000];
  const maxXP = 8000;
  const progressPercent = (currentXP / maxXP) * 100;
  
  const progressBg = useColorModeValue('gray.100', 'gray.700');
  const achievedColor = useColorModeValue('#E53E3E', '#FC8181');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const milestoneTextColor = useColorModeValue('gray.500', 'gray.500');
  
  return (
    <Box position="relative" w="full" py={2}>
      {/* Progress Bar Container */}
      <Box position="relative" h="12px" bg={progressBg} borderRadius="full" overflow="visible" mb={6}>
        {/* Filled Progress */}
        <Tooltip label={`${currentXP} tokens earned`} placement="top" hasArrow>
          <Box
            position="absolute"
            top="0"
            left="0"
            h="full"
            w={`${progressPercent}%`}
            bg={achievedColor}
            borderRadius="full"
            transition="width 0.8s ease-out"
            boxShadow="0 2px 4px rgba(229, 62, 62, 0.2)"
            _after={{
              content: '""',
              position: 'absolute',
              right: '-8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid',
              borderLeftColor: achievedColor,
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              display: progressPercent > 0 ? 'block' : 'none',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
            }}
            cursor="pointer"
          />
        </Tooltip>
        
        {/* Milestone Markers */}
        {milestones.slice(1).map((milestone) => {
          const position = (milestone / maxXP) * 100;
          const isAchieved = currentXP >= milestone;
          
          return (
            <Box
              key={milestone}
              position="absolute"
              left={`${position}%`}
              top="50%"
              transform="translate(-50%, -50%)"
              w="3px"
              h="16px"
              bg={isAchieved ? achievedColor : progressBg}
              borderRadius="full"
              border="2px solid white"
              boxShadow="0 1px 3px rgba(0,0,0,0.1)"
              zIndex={2}
            />
          );
        })}
      </Box>
      
      {/* Milestone Labels */}
      {showLabels && (
        <Flex position="relative" justify="space-between" align="center" mb={4}>
          {[0, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000].map((milestone) => {
            const position = (milestone / maxXP) * 100;
            const isAchieved = currentXP >= milestone;
            
            return (
              <Box
                key={milestone}
                position="absolute"
                left={`${position}%`}
                transform="translateX(-50%)"
                textAlign="center"
              >
                <Text
                  fontSize="xs"
                  fontWeight={isAchieved ? "600" : "400"}
                  color={isAchieved ? achievedColor : milestoneTextColor}
                  letterSpacing="0.5px"
                >
                  {milestone === 0 ? 'START' : `${milestone}`}
                </Text>
              </Box>
            );
          })}
        </Flex>
      )}
      
      {/* Progress Text */}
      <Flex justify="center" mt={2}>
        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="600" color={textColor} letterSpacing="0.5px">
            {currentXP.toLocaleString()} / {maxXP.toLocaleString()} Tokens
          </Text>
          <Text fontSize="xs" color={milestoneTextColor} mt={1}>
            {((currentXP / maxXP) * 100).toFixed(1)}% Complete
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default XPProgressBar; 