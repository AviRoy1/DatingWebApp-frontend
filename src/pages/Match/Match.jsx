import React, { useState } from "react";
import {
  Box,
  Center,
  Flex,
  IconButton,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { IoIosClose, IoIosHeart, IoIosStar, IoIosEye } from "react-icons/io";
import { IoIosRocket } from "react-icons/io";
import { TiStarburstOutline } from "react-icons/ti"; // Import the Super Like icon
import { motion } from "framer-motion";
import ProfileMenu from "../Profile/ProfileMenu";

const users = [
  {
    id: 1,
    name: "John Doe",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60", // Replace with actual photo path
    bio: "I love hiking and exploring new places.",
  },
  {
    id: 2,
    name: "Jane Smith",
    photo:
      "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFjZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60", // Replace with actual photo path
    bio: "Looking for someone to share adventures with!",
  },
  {
    id: 3,
    name: "Bob Smith",
    photo:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFjZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60", // Replace with actual photo path
    bio: "Looking for someone to share adventures with!",
  },
  // Add more user data as needed
];

const MatchPage = () => {
  const [isLaptop] = useMediaQuery("(min-width: 1024px)"); // Adjust breakpoint for laptops
  const cardWidth = isLaptop ? "70vw" : "100vw"; // Increased card width for laptops
  const cardHeight = "100vh"; // Full-screen card height

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (isLiked) => {
    // You can add your logic here to handle the swipe action and matching.
    // For this example, we'll just log the action.
    if (isLiked) {
      console.log("Liked");
    } else {
      console.log("Disliked");
    }

    // Move to the next card
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const MotionIconButton = motion(IconButton);

  return (
    <Center bg="#E5E5E5" color="white">
      <ProfileMenu />
      <Box
        maxW={cardWidth}
        h={cardHeight}
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}>
        <Image
          src={users[currentIndex].photo}
          alt={users[currentIndex].name}
          w="100%"
          h="70%"
          objectFit="cover"
          borderTopRadius="lg"
        />

        <Box p={4} h="30%" bg="#FE3C72" borderTop="1px" borderColor="white">
          <Text fontWeight="bold" fontSize="xl" color="white">
            {users[currentIndex].name}
          </Text>
          <Text fontSize="sm" color="white">
            {users[currentIndex].bio}
          </Text>
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
          <MotionIconButton
            aria-label="View Profile"
            icon={<IoIosEye />}
            onClick={() => handleSwipe(false)}
            colorScheme="gray"
            mr={2}
            fontSize="xl"
            whileTap={{ scale: 1.2 }}
          />
          <MotionIconButton
            aria-label="Super Like"
            icon={<IoIosRocket />} // Use the IoIosRocket icon as Super Like icon
            onClick={() => handleSwipe(false)}
            color="#FFD500"
            mr={2}
            fontSize="xl"
            whileTap={{ scale: 1.2 }}
          />
          <MotionIconButton
            aria-label="Dislike"
            icon={<IoIosClose />}
            onClick={() => handleSwipe(false)}
            colorScheme="red"
            mr={2}
            fontSize="xl"
            whileTap={{ scale: 1.2 }}
          />
          <MotionIconButton
            aria-label="Like"
            icon={<IoIosHeart />}
            onClick={() => handleSwipe(true)}
            color="#00C689"
            fontSize="xl"
            whileTap={{ scale: 1.2 }}
          />
        </Flex>
      </Box>
    </Center>
  );
};

export default MatchPage;
