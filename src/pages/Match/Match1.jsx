import React, { useState } from "react";
import { Box, Center, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IoIosClose, IoIosHeart, IoIosRocket, IoIosEye } from "react-icons/io";
import ProfileMenu from "../Profile/ProfileMenu";
import { Container } from "react-bootstrap";

const MotionButton = motion.button;

const Spacer = () => <Box w={4} />; // Customize the space between icons here

const MatchCard = ({ user, onSwipe }) => {
  return (
    <Box
      w="340px" // Adjust card width as needed
      h="70%" // Adjust card height as needed
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      m={2} // Add some margin between cards
    >
      <Image
        src={user.profilePic}
        alt={user.name}
        w="100%"
        h="70%"
        objectFit="cover"
        borderTopRadius="lg"
      />

      <Box p={4} h="30%" bg="#FE3C72" borderTop="1px" borderColor="white">
        <Center
          fontWeight="bold"
          fontSize="xl"
          color="white"
          mb={2}
          textTransform="capitalize">
          {user.name}
        </Center>
        <Center fontSize="sm" color="white">
          {user.bio}
        </Center>
      </Box>

      <Flex
        justify="center"
        align="center"
        p={2}
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
        bg="rgba(0, 0, 0, 0.6)"
        borderBottomRadius="lg">
        <MotionButton
          aria-label="View Profile"
          whileTap={{ scale: 1.2 }}
          onClick={() => onSwipe(false)}
          bg="transparent">
          <IoIosEye size={24} color="white" />
        </MotionButton>
        <Spacer />
        <MotionButton
          aria-label="Super Like"
          whileTap={{ scale: 1.2 }}
          onClick={() => onSwipe(false)}
          bg="transparent">
          <IoIosRocket size={24} color="#FFD500" />
        </MotionButton>
        <Spacer />
        <MotionButton
          aria-label="Dislike"
          whileTap={{ scale: 1.2 }}
          onClick={() => onSwipe(false)}
          bg="transparent">
          <IoIosClose size={24} color="red" />
        </MotionButton>
        <Spacer />
        <MotionButton
          aria-label="Like"
          whileTap={{ scale: 1.2 }}
          onClick={() => onSwipe(true)}
          bg="transparent">
          <IoIosHeart size={24} color="#00C689" />
        </MotionButton>
      </Flex>
    </Box>
  );
};

export default MatchCard;

const MatchPage = () => {
  const [isLaptop] = useMediaQuery("(min-width: 1024px)"); // Adjust breakpoint for laptops
  const cardWidth = isLaptop ? "70vw" : "100vw"; // Increased card width for laptops

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (isLiked) => {
    // You can add your logic here to handle the swipe action and matching.
    // For this example, we'll just log the action.
    if (isLiked) {
      console.log("Liked");
    } else {
      console.log("Disliked");
    }
  };
};
