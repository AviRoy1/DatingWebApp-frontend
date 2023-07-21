import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Textarea,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import ProfileMenu from "./ProfileMenu";

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Avijit");
  const [age, setAge] = useState("22");
  const [gender, setGender] = useState("male");
  const [interestIn, setInterestIn] = useState("male");
  const [relationshipType, setRelationshipType] = useState("Casual");
  const [location, setLocation] = useState("New York");
  const [about, setAbout] = useState(
    "Hi, I am John! I love hiking and exploring new places."
  );

  const [showMorePhotos, setShowMorePhotos] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Implement logic to save changes to the backend (e.g., API call)
  };

  const photoAnimations = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      y: [0, -5, 0], // Moves up, then back to the initial position
      x: [0, -5, 0], // Moves left, then back to the initial position
      transition: {
        duration: 0.3,
        repeat: Infinity, // Infinite number of times the animation repeats
        repeatType: "reverse", // Reverses the animation after each run
      },
    },
  };

  // Trigger the photo animation on component mount
  useEffect(() => {
    setIsEditing(false); // Ensure view mode is displayed on mount
  }, []);

  const additionalPhotos = [
    "https://images.unsplash.com/photo-1619412112597-0ac2d2a2d0f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    "https://static.zoomnews.com/photo/96566013/96566013.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVw2bktwZxPfa_kLeiLzwqH1TU_F72m_jQIw&usqp=CAU",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      <ProfileMenu />
      <Flex direction="column" alignItems="center" p={4}>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" my={4}>
          {isEditing ? "Edit Your Profile" : "Your Profile"}
        </Text>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <motion.div
            variants={photoAnimations}
            initial="initial"
            whileHover="hover"
            whileTap="hover">
            <Avatar
              size={{ base: "xl", md: "2xl" }}
              mb={4}
              src={"https://cdn.wallpapersafari.com/38/11/2WqNdH.jpg"}
            />
          </motion.div>
        </motion.div>
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                isReadOnly={!isEditing}
                bg="white"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Age</FormLabel>
              <Input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                isReadOnly={!isEditing}
                bg="white"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                isReadOnly={!isEditing}
                bg="white">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Interest In</FormLabel>
              <Select
                value={interestIn}
                onChange={(e) => setInterestIn(e.target.value)}
                isReadOnly={!isEditing}
                bg="white">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Relationship Status</FormLabel>
              <Select
                value={relationshipType}
                onChange={(e) => setRelationshipType(e.target.value)}
                isReadOnly={!isEditing}
                bg="white">
                <option value="Friendship">Friendship</option>
                <option value="Long Term">Long Term</option>
                <option value="Short Term">Short Term</option>
                <option value="Casual">Casual</option>
                <option value="Don't Know">Don't Know</option>
                <option value="Hookups">Hookups</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                isReadOnly={!isEditing}
                bg="white"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>About Me</FormLabel>
              <Textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                isReadOnly={!isEditing}
                bg="white"
              />
              <FormHelperText>
                Tell others a bit about yourself and your interests.
              </FormHelperText>
            </FormControl>
            <Button colorScheme="teal" mt={4} onClick={handleSave}>
              Save
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mt={4}>
              {name}
            </Text>
            <Box
              bg="teal.100"
              borderRadius="md"
              p={2}
              my={4}
              textAlign="center">
              <Text fontSize={{ base: "md", md: "lg" }}>Age: {age}</Text>
            </Box>
            <Box
              bg="purple.100"
              borderRadius="md"
              p={2}
              my={4}
              textAlign="center">
              <Text fontSize={{ base: "md", md: "lg" }}>Gender: {gender}</Text>
            </Box>
            <Box
              bg="orange.100"
              borderRadius="md"
              p={2}
              my={4}
              textAlign="center">
              <Text fontSize={{ base: "md", md: "lg" }}>
                Interest In: {interestIn}
              </Text>
            </Box>
            <Box
              bg="green.100"
              borderRadius="md"
              p={2}
              my={4}
              textAlign="center">
              <Text fontSize={{ base: "md", md: "lg" }}>
                Relationship Status: {relationshipType}
              </Text>
            </Box>
            <Box
              bg="blue.100"
              borderRadius="md"
              p={2}
              my={4}
              textAlign="center">
              <Text fontSize={{ base: "md", md: "lg" }}>
                Location: {location}
              </Text>
            </Box>
            <Text fontSize={{ base: "md", md: "lg" }} my={4} textAlign="center">
              {about}
            </Text>
            <Button colorScheme="teal" mt={4} onClick={handleEdit}>
              Edit Profile
            </Button>
            <Button
              colorScheme="teal"
              ml={12}
              mt={2}
              onClick={() => setShowMorePhotos(true)}>
              View More Photos
            </Button>
          </motion.div>
        )}
      </Flex>

      <Modal isOpen={showMorePhotos} onClose={() => setShowMorePhotos(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>More Photos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={3} spacing={4}>
              {additionalPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  variants={photoAnimations}
                  initial="initial"
                  whileHover="hover"
                  whileTap="hover">
                  <Avatar src={photo} size="xl" />
                </motion.div>
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

export default Profile;
