// import {
//   Avatar,
//   Box,
//   Container,
//   FormLabel,
//   HStack,
//   Heading,
//   Input,
//   Select,
//   Stack,
//   Text,
//   VStack,
// } from "@chakra-ui/react";
// import ProfileMenu from "./ProfileMenu";
// import { Button, ButtonGroup } from "@chakra-ui/react";
// import { useState } from "react";

// export const fileUploadCss = {
//   cursor: "pointer",
//   marginLeft: "-5%",
//   width: "110%",
//   border: "none",
//   height: "100%",
//   color: "black",
//   backgroundColor: "pink",
// };
// const fileUploadStyle = {
//   "&::file-selector-button": fileUploadCss,
// };

// const Profile = ({ user }) => {
//   const [imagePrev, setImagePrev] = useState(
//     "https://cdn.wallpapersafari.com/38/11/2WqNdH.jpg"
//   );
//   const [image, setImage] = useState("");

//   const changeImageHandler = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.readAsDataURL(file);

//     reader.onloadend = () => {
//       setImagePrev(reader.result);
//       setImage(file);
//     };
//   };

//   return (
//     <>
//       <ProfileMenu />
//       <Container minW={"86vh"} minH={"105vh"} maxH="container.lg" py="5">
//         <Heading children="Profile" m="8" textTransform={"uppercase"} />
//         <Stack
//           justifyContent={"flex-start"}
//           direction={["column", "row"]}
//           alignItems={"right"}
//           spacing={["10", "16"]}
//           padding="5">
//           <VStack>
//             <Box my="4" display={"flex"} justifyContent="center">
//               <Avatar src={imagePrev} size={"2xl"} />
//             </Box>
//             <Box my={"4"}>
//               <FormLabel
//                 htmlFor="chooseAvatar"
//                 children="Change Profile Photo"
//               />
//               <Input
//                 accept="image/*"
//                 required
//                 id="chooseAvatar"
//                 type={"file"}
//                 focusBorderColor="pink"
//                 css={fileUploadStyle}
//                 onChange={changeImageHandler}
//               />
//             </Box>
//             <HStack>
//               <Text color={"pink.600"} children="Bio" fontWeight={"bold"} />
//               <Text children="Hello friends!!" />
//               <Button
//                 ml={"3"}
//                 color={"pink.300"}
//                 colorScheme="teal"
//                 onClick={""}
//                 variant="ghost">
//                 Update
//               </Button>
//             </HStack>{" "}
//           </VStack>

//           <VStack spacing={"4"} alignItems={["center", "flex-start"]}>
//             <HStack>
//               <Text color={"pink.600"} children="Name" fontWeight={"bold"} />
//               <Text children="Avijit" ml={3} />
//               <Button
//                 ml={"3"}
//                 color={"pink.300"}
//                 colorScheme="teal"
//                 onClick={""}
//                 variant="ghost">
//                 Update
//               </Button>
//             </HStack>
//             {"   "}
//             <HStack>
//               <Text color={"pink.600"} children="Email" fontWeight={"bold"} />
//               <Text children="abc1@gmail.com" ml={3} />

//               <Button
//                 ml={"3"}
//                 color={"pink.300"}
//                 colorScheme="teal"
//                 onClick={""}
//                 variant="ghost">
//                 Update
//               </Button>
//             </HStack>
//             {"   "}
//             <HStack>
//               <Text
//                 color={"pink.600"}
//                 children="Relationship Status"
//                 fontWeight={"bold"}
//               />
//               <Text children="Single" ml={3} />
//               <Button
//                 ml={"3"}
//                 color={"pink.300"}
//                 colorScheme="teal"
//                 onClick={""}
//                 variant="ghost">
//                 Update
//               </Button>
//             </HStack>
//             {"   "}
//             <HStack>
//               <Text
//                 color={"pink.600"}
//                 children="Interest In"
//                 fontWeight={"bold"}
//               />
//               <Text children="Female" ml={3} />
//               <Button
//                 ml={"3"}
//                 color={"pink.300"}
//                 colorScheme="teal"
//                 onClick={""}
//                 variant="ghost">
//                 Update
//               </Button>
//             </HStack>
//             {"   "}
//             <HStack>
//               <Text color={"pink.600"} children="Hobbies" fontWeight={"bold"} />
//               <Text children="Football" ml={3} />
//               <Button
//                 ml={"3"}
//                 color={"pink.300"}
//                 colorScheme="teal"
//                 onClick={""}
//                 variant="ghost">
//                 Update
//               </Button>
//             </HStack>
//             {"   "}
//             <HStack>
//               <Text color={"pink.600"} children="Age" fontWeight={"bold"} />
//               <Text children="22" ml={3} />
//               <Button
//                 ml={"3"}
//                 color={"pink.300"}
//                 colorScheme="teal"
//                 onClick={""}
//                 variant="ghost">
//                 Update
//               </Button>
//             </HStack>
//             {"   "}
//             <HStack>
//               <Text color={"pink.600"} children="Gender" fontWeight={"bold"} />
//               <Select placeholder="Select option" ml={3}>
//                 <option value="option1">Male</option>
//                 <option value="option2">Female</option>
//                 <option value="option3">Other</option>
//               </Select>
//               <Button
//                 ml={"3"}
//                 color={"pink.300"}
//                 colorScheme="teal"
//                 onClick={""}
//                 variant="ghost">
//                 Update
//               </Button>
//             </HStack>
//             {"   "}
//             <HStack>
//               <Text
//                 color={"pink.600"}
//                 children="Location"
//                 fontWeight={"bold"}
//               />
//               <Text children="India" ml={3} />
//               <Button
//                 ml={"3"}
//                 color={"pink.300"}
//                 colorScheme="teal"
//                 onClick={""}
//                 variant="ghost">
//                 Update
//               </Button>
//             </HStack>
//             {"   "}
//           </VStack>
//         </Stack>
//       </Container>
//     </>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Badge,
  Heading,
  Text,
  Divider,
  VStack,
  HStack,
  Icon,
  IconButton,
  useColorModeValue,
  Input,
  Button,
  Container,
} from "@chakra-ui/react";
import {
  MdLocationOn,
  MdCake,
  MdPerson,
  MdEdit,
  MdCheck,
} from "react-icons/md";
import ProfileMenu from "./ProfileMenu";

const Profile = () => {
  const pinkColor = "#FF70A6";
  const profileBgColor = useColorModeValue("pink.50", "gray.700");
  const editIconColor = useColorModeValue("gray.600", "gray.400");

  // Replace these with your user data or fetch from an API
  const initialUserData = {
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    avatarUrl: "https://via.placeholder.com/150",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus luctus ullamcorper.",
    gender: "Male",
    age: 30,
    location: "New York, USA",
    hobbies: ["Photography", "Travel", "Reading"],
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (field, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    // <>
    //
    //   <Container minW={"100vh"} minH={"200vh"} maxH="container.lg" py="5">

    //   </Container>
    // </>
    <Box
      p={4}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      bg={profileBgColor}>
      <Flex align="center" justify="space-between">
        <ProfileMenu />
        <Flex align="center">
          <Avatar size="xl" name={userData.name} src={userData.avatarUrl} />
          <Box ml={4}>
            <Heading as="h2" size="lg">
              {userData.name}
            </Heading>
            <Text>@{userData.username}</Text>
          </Box>
        </Flex>
        {isEditing ? (
          <IconButton
            icon={<Icon as={MdCheck} />}
            colorScheme="pink"
            onClick={handleSaveClick}
            aria-label="Save"
          />
        ) : (
          <IconButton
            icon={<Icon as={MdEdit} />}
            colorScheme="pink"
            onClick={handleEditClick}
            aria-label="Edit"
          />
        )}
      </Flex>
      <Divider my={4} />

      <VStack spacing={2}>
        <Text fontSize="lg">Bio</Text>
        {isEditing ? (
          <Input
            value={userData.bio}
            onChange={(e) => handleFieldChange("bio", e.target.value)}
            size="md"
            variant="filled"
          />
        ) : (
          <Text>{userData.bio}</Text>
        )}
      </VStack>

      <Divider my={4} />

      <Flex justify="space-between">
        <HStack spacing={4}>
          <Icon as={MdPerson} boxSize={5} />
          {isEditing ? (
            <Input
              value={userData.gender}
              onChange={(e) => handleFieldChange("gender", e.target.value)}
              size="md"
              variant="filled"
            />
          ) : (
            <Text>{userData.gender}</Text>
          )}
        </HStack>
        <HStack spacing={4}>
          <Icon as={MdCake} boxSize={5} />
          {isEditing ? (
            <Input
              value={userData.age}
              onChange={(e) => handleFieldChange("age", e.target.value)}
              size="md"
              variant="filled"
              type="number"
            />
          ) : (
            <Text>{userData.age} years old</Text>
          )}
        </HStack>
        <HStack spacing={4}>
          <Icon as={MdLocationOn} boxSize={5} />
          {isEditing ? (
            <Input
              value={userData.location}
              onChange={(e) => handleFieldChange("location", e.target.value)}
              size="md"
              variant="filled"
            />
          ) : (
            <Text>{userData.location}</Text>
          )}
        </HStack>
      </Flex>

      <Divider my={4} />

      <VStack spacing={2}>
        <Text fontSize="lg">Hobbies</Text>
        {isEditing ? (
          <Input
            value={userData.hobbies.join(", ")}
            onChange={(e) =>
              handleFieldChange("hobbies", e.target.value.split(", "))
            }
            size="md"
            variant="filled"
          />
        ) : (
          <HStack>
            {userData.hobbies.map((hobby, index) => (
              <Badge key={index} colorScheme="pink">
                {hobby}
              </Badge>
            ))}
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default Profile;
