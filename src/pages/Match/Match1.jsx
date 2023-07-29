import React, { useEffect, useState } from "react";
import { Box, Center, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { motion, wrap } from "framer-motion";
import TinderCard from "react-tinder-card";
import "./TinderCard.css";
import "./SwipeButtons.css";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import IconButton from "@mui/material/IconButton";
import ReplyIcon from "@mui/icons-material/Reply";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import UserProfile from "../UserProfile";
import Loader from "../../component/Loader/Loader";
import MatchPopup from "./MatchPopup";
import ProfilePopup from "./ProfilePopup";
import { server } from "../../redux/store";

const Match1 = () => {
  const [isLaptop] = useMediaQuery("(min-width: 1024px)");
  const { user, accessToken, isFetching } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const cardWidth = isLaptop ? "70vw" : "100vw";
  const MotionButton = motion.button;
  const [isMatch, setIsMatch] = useState(false);
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [lastswap, setLastswap] = useState("");
  const [lastswapaction, setLastswapaction] = useState("none");
  const [matchusers, setMatchusers] = useState([]);
  const [curuser, setCuruser] = useState({});

  const getuser = async () => {
    try {
      const res = await axios.post(
        `${server}/api/match/create`,
        {},
        {
          headers: {
            token: accessToken,
          },
        }
      );
      setMatchusers(res.data.alluser);
      setCuruser(res.data.alluser[0]);
      setLoading(false);
    } catch (error) {
      // Handle the error
    }
  };
  useEffect(() => {
    getuser();
  }, []);

  const likehandler = async () => {
    try {
      setLastswap(matchusers[0]._id);
      setLastswapaction("dislike");
      const rr = await await axios.post(
        `${server}/api/match/like`,
        { userid: matchusers[0]._id },
        {
          headers: {
            token: accessToken,
          },
        }
      );
      console.log(rr.data);
      if (rr.data.ismatch) {
        setIsMatch(true);
      }
      setLastswap(matchusers[0]._id);
      setLastswapaction("like");
      getuser();
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleOpenProfile = () => {
    setProfilePopupOpen(true);
  };

  const handleCloseProfile = () => {
    setProfilePopupOpen(false);
  };
  const dislikehandler = async () => {
    try {
      setLastswap(matchusers[0]._id);
      setLastswapaction("dislike");
      const rr = await axios.post(
        `${server}/api/match/dislike`,
        { userid: matchusers[0]._id },
        {
          headers: {
            token: accessToken,
          },
        }
      );
      console.log(rr.data);
      setLastswap(matchusers[0]._id);
      setLastswapaction("dislike");
      getuser();
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.response.data.message);
    }
  };

  const onSwipe = async (dir) => {
    if (dir === "right") {
      try {
        setLastswap(matchusers[0]._id);
        setLastswapaction("like");
        const rr = await await axios.post(
          `${server}/api/match/like`,
          { userid: matchusers[0]._id },
          {
            headers: {
              token: accessToken,
            },
          }
        );
        console.log(rr.data);
        if (rr.data.ismatch) {
          setIsMatch(true);
        }
        getuser();
      } catch (error) {
        // console.error("API Error:", error);
        // toast.error(error.response.message);
      }
    } else {
      try {
        setLastswap(matchusers[0]._id);
        setLastswapaction("dislike");
        const rr = await await axios.post(
          `${server}/api/match/dislike`,
          { userid: matchusers[0]._id },
          {
            headers: {
              token: accessToken,
            },
          }
        );
        console.log(rr.data);
        getuser();
      } catch (error) {
        console.error("API Error:", error);
        // toast.error(error.response.data.message);
      }
    }
  };

  const undoHandler = async () => {
    if (lastswapaction !== "none") {
      try {
        await axios.post(
          `${server}/api/match/undoswap`,
          {
            lastswapaction: lastswapaction,
            lastswap: lastswap,
          },
          {
            headers: {
              token: accessToken,
            },
          }
        );
      } catch (error) {
        console.error("API Error:", error);
      }
      getuser();
    }
  };

  const openprofile = async () => {
    return <UserProfile user={curuser} />;
  };

  console.log(lastswap, lastswapaction);

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <div>
            <Center bg="none" color="white">
              <Box bg="none" color="none" height={"500px"} width={cardWidth}>
                <Flex
                  flexWrap={wrap}
                  justifyContent="center"
                  height={"100%"}
                  width={"100%"}>
                  <TinderCard
                    className="swipe"
                    onSwipe={onSwipe}
                    key={matchusers[0].name}
                    preventSwipe={["up", "down"]}>
                    <div
                      style={{
                        height: "440px",
                        backgroundImage: `url(${matchusers[0].profilePic})`,
                      }}
                      className="cardd">
                      <h3>{matchusers[0].name}</h3>
                    </div>
                  </TinderCard>
                </Flex>
              </Box>
            </Center>
            <div className="swipeButtons">
              <IconButton
                className="swipeButtons__repeat"
                onClick={undoHandler}>
                <ReplyIcon fontSize="large" />
              </IconButton>
              <IconButton className="swipeButtons__star">
                <VisibilityRoundedIcon fontSize="large" />
              </IconButton>

              <IconButton
                className="swipeButtons__left"
                onClick={dislikehandler}>
                <CloseIcon fontSize="large" />
              </IconButton>

              <IconButton className="swipeButtons__right" onClick={likehandler}>
                <FavoriteIcon fontSize="large" />
              </IconButton>

              <IconButton className="swipeButtons__lightning">
                <FlashOnIcon fontSize="large" />
              </IconButton>
            </div>
            {isProfilePopupOpen && (
              <ProfilePopup user={matchusers[0]} onClose={handleCloseProfile} />
            )}
            {isMatch && <MatchPopup onClose={() => setIsMatch(false)} />}
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar
            />
          </div>
        </>
      )}
    </>
  );
};

export default Match1;
