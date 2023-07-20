import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  IconButton,
  Input,
  Select,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import { FaArrowLeft, FaHeart, FaTimes, FaCamera } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../redux/store";

export const fileUploadCss = {
  cursor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  border: "none",
  height: "100%",
  color: "black",
  backgroundColor: "pink",
};
const fileUploadStyle = {
  "&::file-selector-button": fileUploadCss,
};

const Profile = () => {
  let userdata = useSelector((state) => state.user);
  let user = userdata.user;
  // console.log(user);

  const [imagePrev, setImagePrev] = useState(
    "https://cdn.wallpapersafari.com/38/11/2WqNdH.jpg"
  );
  const [name, setName] = useState(user.user.name);
  const [age, setAge] = useState(
    user.user?.age !== undefined ? user.user.age : "Please Enter Your Age"
  );
  const [location, setLocation] = useState(
    user.user?.location !== undefined
      ? user.user.location
      : "Please Enter Your Location*"
  );
  const [gender, setGender] = useState(
    user.user?.gender !== undefined
      ? user.user.gender
      : "Please Enter Your gender*"
  );
  const [interestIn, setInterestIn] = useState("female");
  const [bio, setBio] = useState("Hello friends!!");
  const [hobbies, setHobbies] = useState("Football");
  const [showUpdatePhoto, setShowUpdatePhoto] = useState(false);
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
    };
  };

  const handleUpdatePhoto = () => {
    // Implement your logic to update the photo here
    setShowUpdatePhoto(false);
  };

  const handleUpdateInfo = async () => {
    let res = await axios(`${server}/api/user/profileupdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
        token: user.accessToken,
      },
      body: JSON.stringify({
        gender: gender,
        name: name,
        bio: bio,
        interestIn: interestIn,
        location: location,
      }),
    });
    // .then((data) => {
    //   alert("Your profile has been updated");
    //   window.location.reload(true);
    // });
    // console.log(res.data.user);
    user = res.data.user;
    setShowUpdateInfo(false);
  };

  return (
    <>
      <ProfileMenu />
      <Container minW={"86vh"} minH={"105vh"} maxH="container.lg" py="5">
        <Heading children="Profile" m="8" textTransform="uppercase" />

        <Stack>
          <VStack spacing={4} mt="5">
            <Box my="4" display={"flex"} justifyContent="center">
              <Avatar src={imagePrev} size={"2xl"} />
            </Box>
            <Box my={"4"}>
              <FormLabel
                htmlFor="chooseAvatar"
                children="Change Profile Photo"
              />
              <Input
                accept="image/*"
                required
                id="chooseAvatar"
                type={"file"}
                focusBorderColor="pink"
                css={fileUploadStyle}
                onChange={changeImageHandler}
              />
            </Box>
            <HStack alignItems="center">
              <FormLabel fontSize="xl" fontWeight="bold" color="pink.600">
                Name:
              </FormLabel>
              {showUpdateInfo ? (
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              ) : (
                <Text fontSize="xl">{name}</Text>
              )}
              {showUpdateInfo ? (
                <Button colorScheme="pink" onClick={handleUpdateInfo}>
                  Save
                </Button>
              ) : (
                <Button
                  colorScheme="teal"
                  onClick={() => setShowUpdateInfo(true)}>
                  Update
                </Button>
              )}
            </HStack>
            <HStack alignItems="center">
              <FormLabel fontSize="xl" fontWeight="bold" color="pink.600">
                Age:
              </FormLabel>
              {showUpdateInfo ? (
                <Input value={age} onChange={(e) => setAge(e.target.value)} />
              ) : (
                <Text fontSize="xl">{age}</Text>
              )}
              {showUpdateInfo ? (
                <Button colorScheme="pink" onClick={handleUpdateInfo}>
                  Save
                </Button>
              ) : (
                <Button
                  colorScheme="teal"
                  onClick={() => setShowUpdateInfo(true)}>
                  Update
                </Button>
              )}
            </HStack>
            <HStack alignItems="center">
              <FormLabel fontSize="xl" fontWeight="bold" color="pink.600">
                Location:
              </FormLabel>
              {showUpdateInfo ? (
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              ) : (
                <Text fontSize="xl">{location}</Text>
              )}
              {showUpdateInfo ? (
                <Button colorScheme="pink" onClick={handleUpdateInfo}>
                  Save
                </Button>
              ) : (
                <Button
                  colorScheme="teal"
                  onClick={() => setShowUpdateInfo(true)}>
                  Update
                </Button>
              )}
            </HStack>
            <HStack alignItems="center">
              <FormLabel fontSize="xl" fontWeight="bold" color="pink.600">
                Gender:
              </FormLabel>
              {showUpdateInfo ? (
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              ) : (
                <Text fontSize="xl">{gender}</Text>
              )}
              {showUpdateInfo ? (
                <Button colorScheme="pink" onClick={handleUpdateInfo}>
                  Save
                </Button>
              ) : (
                <Button
                  colorScheme="teal"
                  onClick={() => setShowUpdateInfo(true)}>
                  Update
                </Button>
              )}
            </HStack>
            <HStack alignItems="center">
              <FormLabel fontSize="xl" fontWeight="bold" color="pink.600">
                Interested In:
              </FormLabel>
              {showUpdateInfo ? (
                <Select
                  value={interestIn}
                  onChange={(e) => setInterestIn(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="both">Both</option>
                </Select>
              ) : (
                <Text fontSize="xl">{interestIn}</Text>
              )}
              {showUpdateInfo ? (
                <Button colorScheme="pink" onClick={handleUpdateInfo}>
                  Save
                </Button>
              ) : (
                <Button
                  colorScheme="teal"
                  onClick={() => setShowUpdateInfo(true)}>
                  Update
                </Button>
              )}
            </HStack>
            <HStack alignItems="center">
              <FormLabel fontSize="xl" fontWeight="bold" color="pink.600">
                Bio:
              </FormLabel>
              {showUpdateInfo ? (
                <Input value={bio} onChange={(e) => setBio(e.target.value)} />
              ) : (
                <Text fontSize="xl">{bio}</Text>
              )}
              {showUpdateInfo ? (
                <Button colorScheme="pink" onClick={handleUpdateInfo}>
                  Save
                </Button>
              ) : (
                <Button
                  colorScheme="teal"
                  onClick={() => setShowUpdateInfo(true)}>
                  Update
                </Button>
              )}
            </HStack>
            <HStack alignItems="center">
              <FormLabel fontSize="xl" fontWeight="bold" color="pink.600">
                Hobbies:
              </FormLabel>
              {showUpdateInfo ? (
                <Input
                  value={hobbies}
                  onChange={(e) => setHobbies(e.target.value)}
                />
              ) : (
                <Text fontSize="xl">{hobbies}</Text>
              )}
              {showUpdateInfo ? (
                <Button colorScheme="pink" onClick={handleUpdateInfo}>
                  Save
                </Button>
              ) : (
                <Button
                  colorScheme="teal"
                  onClick={() => setShowUpdateInfo(true)}>
                  Update
                </Button>
              )}
            </HStack>
            <HStack spacing={4}></HStack>
          </VStack>
        </Stack>
      </Container>
    </>
  );
};

export default Profile;
