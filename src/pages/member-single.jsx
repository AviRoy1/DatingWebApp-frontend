import { Fragment, useEffect, useState } from "react";
import React from "react";
import { Box, Center, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IoIosEye } from "react-icons/io";
import { AiTwotoneFire } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { BsFillArrowThroughHeartFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { MdStars } from "react-icons/md";
import { Link } from "react-router-dom";
import FooterThree from "../component/layout/footerthree";
import HeaderTwo from "../component/layout/headertwo";
import PageHeader from "../component/layout/pageheader";
import { useDispatch, useSelector } from "react-redux";
import { matchuser } from "../redux/actions/matchAction";
import axios from "axios";
import Loader from "../component/Loader/Loader";
import MatchPopup from "./Match/MatchPopup";
import UserProfile from "./UserProfile";
import "./toast.css";
import ProfilePopup from "./Match/ProfilePopup";
import ProfilePage from "./Profile/ProfilePage";
import { server } from "../redux/store";

const MemberDetails = () => {
  const { user, accessToken } = useSelector((state) => state.user);
  console.log(user);
  const [isLaptop] = useMediaQuery("(min-width: 1024px)");
  const [loading, setLoading] = useState(true);

  const cardWidth = isLaptop ? "70vw" : "100vw";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMatch, setIsMatch] = useState(false);
  const [curuser, setCuruser] = useState({});
  const dispatch = useDispatch();
  const [matchusers, setMatchusers] = useState([]);

  const MotionButton = motion.button;

  const Spacer = () => <Box w={8} />;

  const handleSwipe = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

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
      console.log(user.user.profilePic);
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
      console.error("API Error:", error);
      toast.error(error.response.data.message);
    }
  };
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);

  const handleOpenProfile = () => {
    setProfilePopupOpen(true);
  };

  const handleCloseProfile = () => {
    setProfilePopupOpen(false);
  };
  const dislikehandler = async () => {
    try {
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
      if (rr.data.ismatch) {
        setIsMatch(true);
      }
      getuser();
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.response.data.message);
    }
  };

  const openprofile = async () => {
    return <UserProfile user={curuser} />;
  };
  return (
    <Fragment>
      <HeaderTwo />
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <div title={"Member Single Page"} curPage={"Member Single"} />
          <div className="group group--single padding-bottom">
            <div className="group__top">
              <div className="container">
                <div className="row">
                  <div className="col-xl-3 d-none d-xl-block"></div>
                  <div className="col-xl-9">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="gt1-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#gt1"
                          type="button"
                          role="tab"
                          aria-controls="gt1"
                          aria-selected="true">
                          <i className="fa-solid fa-house"></i> Activity
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="gt2-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#gt2"
                          type="button"
                          role="tab"
                          aria-controls="gt2"
                          aria-selected="false">
                          <i className="fa-solid fa-users"></i> Profile{" "}
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="gt4-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#gt4"
                          type="button"
                          role="tab"
                          aria-controls="gt4"
                          aria-selected="false">
                          <i className="fa-solid fa-users"></i> Message{" "}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="group__bottom">
              <div className="container">
                <div className="row g-4">
                  <div className="col-xl-6 order-xl-1">
                    <div className="group__bottom--left">
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="gt1"
                          role="tabpanel"
                          aria-labelledby="gt1-tab">
                          <div
                            className="group__bottom--area group__bottom--memberactivity"
                            style={{ backgroundColor: "none", color: "black" }}>
                            {matchusers.length === 0 ? (
                              <>
                                <div>
                                  <h1>NO user found</h1>
                                </div>
                              </>
                            ) : (
                              <>
                                <div
                                  style={{
                                    width: "100%",
                                    height: "620px",
                                    // marginLeft: "-40px",
                                  }}>
                                  <Center bg="none" color="white">
                                    <Box bg="none" color="white">
                                      <Box
                                        maxW={cardWidth}
                                        height="620px"
                                        // overflowY="auto"
                                      >
                                        <Flex flexWrap="wrap" justify="center">
                                          <Box
                                            w="490px" // Adjust card width as needed
                                            h="640px" // Adjust card height as needed
                                            borderRadius="lg"
                                            overflow="hidden"
                                            position="relative"
                                            initial={{
                                              scale: 0.9,
                                            }}
                                            animate={{
                                              scale: 1,
                                            }}
                                            transition={{
                                              duration: 0.2,
                                            }}
                                            m={2} // Add some margin between cards
                                          >
                                            <Image
                                              src={matchusers[0].profilePic}
                                              alt={matchusers[0].name}
                                              w="480px"
                                              h="480px"
                                              objectFit="cover"
                                              borderTopRadius="lg"
                                            />

                                            <Box
                                              p={4}
                                              h="30%"
                                              bg="#FE3C72"
                                              borderTop="1px"
                                              borderColor="white">
                                              <Center
                                                fontWeight="bold"
                                                fontSize="xl"
                                                color="white"
                                                mb={2}
                                                textTransform="capitalize">
                                                {matchusers[0].name}
                                              </Center>
                                              <Center
                                                fontSize="sm"
                                                color="white"
                                                style={{
                                                  marginTop: "-10px",
                                                }}>
                                                {matchusers[0].bio}
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
                                              {/* <Link
                                                            to={{
                                                              pathname:
                                                                "/userprofile",
                                                              state: {
                                                                curuser,
                                                              },
                                                            }}> */}
                                              <MotionButton
                                                aria-label="View Profile"
                                                whileTap={{
                                                  scale: 1.2,
                                                }}
                                                onClick={handleOpenProfile}
                                                bg="transparent">
                                                <IoIosEye
                                                  size={38}
                                                  color="white"
                                                />
                                              </MotionButton>
                                              {/* </Link> */}
                                              <Spacer />
                                              <MotionButton
                                                aria-label="Super Like"
                                                whileTap={{
                                                  scale: 1.2,
                                                }}
                                                bg="transparent">
                                                <MdStars
                                                  size={38}
                                                  color="rgb(255, 255, 102)"
                                                />
                                              </MotionButton>
                                              <Spacer />
                                              <MotionButton
                                                aria-label="Dislike"
                                                onClick={dislikehandler}
                                                whileTap={{
                                                  scale: 1.2,
                                                }}
                                                bg="transparent">
                                                <ImCross
                                                  size={33}
                                                  color="rgb(0, 153, 51)"
                                                />
                                              </MotionButton>
                                              <Spacer />
                                              <MotionButton
                                                aria-label="Like"
                                                onClick={likehandler}
                                                whileTap={{
                                                  scale: 1.2,
                                                }}
                                                bg="transparent">
                                                <BsFillArrowThroughHeartFill
                                                  size={38}
                                                  color="rgb(254, 22, 22)"
                                                />
                                              </MotionButton>
                                            </Flex>
                                          </Box>
                                        </Flex>
                                      </Box>
                                    </Box>
                                  </Center>
                                  {isProfilePopupOpen && (
                                    <ProfilePopup
                                      user={matchusers[0]}
                                      onClose={handleCloseProfile}
                                    />
                                  )}
                                  {isMatch && (
                                    <MatchPopup
                                      onClose={() => setIsMatch(false)}
                                    />
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="gt2"
                          role="tabpanel"
                          aria-labelledby="gt2-tab">
                          <ProfilePage user={user} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 order-xl-0">
                    <div className="group__bottom--center">
                      <div className="story__item style2">
                        <div className="story__inner"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <FooterThree />
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
    </Fragment>
  );
};

export default MemberDetails;
