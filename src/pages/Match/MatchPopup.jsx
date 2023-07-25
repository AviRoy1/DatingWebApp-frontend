import React from "react";
import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";

const MatchPopup = ({ onClose }) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(0, 0, 0, 0.8)"
      zIndex="999">
      <Center height="100%">
        <Flex
          direction="column"
          align="center"
          bg="white"
          borderRadius="md"
          p={6}
          boxShadow="md">
          <Text fontSize="xl" fontWeight="bold" color="teal.500" mb={4}>
            It's a Match!
          </Text>
          <Image
            src="https://images5.alphacoders.com/460/thumbbig-460317.webp"
            alt="Matched User"
            borderRadius="full"
            boxSize="100px"
            mb={4}
          />
          <Text fontSize="lg" textAlign="center">
            Congratulations, you and the other user like each other!
          </Text>
          <Box mt={4}>
            <button onClick={onClose}>Close</button>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
};

export default MatchPopup;
