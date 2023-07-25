import { Fragment, useEffect, useState } from "react";
import React from "react";
import { Box, Center, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { server } from "../store";
import { motion } from "framer-motion";
import { IoIosClose, IoIosHeart, IoIosRocket, IoIosEye } from "react-icons/io";
import { Link } from "react-router-dom";
import FooterThree from "../component/layout/footerthree";
import HeaderTwo from "../component/layout/headertwo";
import PageHeader from "../component/layout/pageheader";
import SelectAge from "../component/select/selectage";
import SelectCountry from "../component/select/selectcountry";
import SelectGender from "../component/select/selectgender";
import SelectProduct from "../component/select/selectproduct";
import ActiveGroup from "../component/sidebar/group";
import ActiveMember from "../component/sidebar/member";
import ModalSearch from "../component/sidebar/modalsearch";
import MatchCard from "./Match/Match1";
import { Container } from "react-bootstrap";
import { loaduser } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { matchuser } from "../redux/actions/matchAction";
import axios from "axios";
import Loader from "../component/Loader/Loader";
import MatchPopup from "./Match/MatchPopup";

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
];

const MemberDetails = () => {
  const { user } = useSelector((state) => state.user);

  const [isLaptop] = useMediaQuery("(min-width: 1024px)");
  const [loading, setLoading] = useState(true);

  const cardWidth = isLaptop ? "70vw" : "100vw";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMatch, setIsMatch] = useState(false);
  const dispatch = useDispatch();
  const [matchusers, setMatchusers] = useState([]);

  const MotionButton = motion.button;

  const Spacer = () => <Box w={4} />; // Customize the space between icons here

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
            token: user.accessToken,
          },
        }
      );
      setMatchusers(res.data.alluser);
      setLoading(false);
    } catch (error) {
      // Handle the error
    }
  };

  useEffect(() => {
    getuser();
  }, []);
  const likehandler = async () => {
    const rr = await await axios.post(
      `${server}/api/match/like`,
      { userid: matchusers[0]._id },
      {
        headers: {
          token: user.accessToken,
        },
      }
    );
    console.log(rr.data);
    if (rr.data.ismatch) {
      setIsMatch(true);
    }
    getuser();
  };
  const handleMatchPopupClose = () => {
    setIsMatch(false); // Function to close the MatchPopup
  };
  const dislikehandler = async () => {
    const rr = await await axios.post(
      `${server}/api/match/dislike`,
      { userid: matchusers[0]._id },
      {
        headers: {
          token: user.accessToken,
        },
      }
    );
    getuser();
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
                          <div className="group__bottom--head group__bottom--activity bg-white mb-4 border-0">
                            <ul
                              className="nav nav-tabs"
                              id="myTab2"
                              role="tablist">
                              <li className="nav-item" role="presentation">
                                {/* <button
                                  className="nav-link active"
                                  id="Personal-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#Personal"
                                  type="button"
                                  role="tab"
                                  aria-controls="Personal"
                                  aria-selected="true">
                                  Personal
                                </button> */}
                              </li>
                            </ul>
                          </div>

                          <div className="group__bottom--area group__bottom--memberactivity">
                            <div className="group__bottom--body">
                              <div className="group__bottom--allmedia">
                                <div className="media-wrapper">
                                  <div
                                    className="tab-content"
                                    id="myTabContent2">
                                    <div
                                      className="tab-pane fade show active"
                                      id="Personal"
                                      role="tabpanel"
                                      aria-labelledby="Personal-tab">
                                      <div className="create-post mb-4">
                                        <div className="lab-inner">
                                          <div className="lab-thumb">
                                            <div
                                              className="thumb-inner"
                                              style={{
                                                marginBottom: "30px",
                                              }}>
                                              <div className="thumb-img">
                                                <img
                                                  src={user.user.profilePic}
                                                  alt="datting thumb"
                                                />
                                              </div>
                                              <div className="thumb-content">
                                                <h6>
                                                  <a href="#">
                                                    {user.user.name}
                                                  </a>
                                                </h6>
                                                {/* <div className="custom-select">
                                              <select>
                                                <option value="1">
                                                   Public
                                                </option>
                                                <option value="2">
                                                   Private
                                                </option>
                                                <option value="3">
                                                   Friends
                                                </option>
                                              </select>
                                            </div> */}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="lab-content">
                                            {/* <form action="#" className="post-form"> */}
                                            {/* <input
                                              type="text"
                                              placeholder="Whats on your mind. William?"
                                            /> */}

                                            {matchusers.length === 0 ? (
                                              <>
                                                <div>
                                                  <h1>NO user found</h1>
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                <div>
                                                  <Center
                                                    bg="#E5E5E5"
                                                    color="white">
                                                    <Box
                                                      bg="#E5E5E5"
                                                      color="white">
                                                      <Box
                                                        maxW={cardWidth}
                                                        height="600px"
                                                        overflowY="auto">
                                                        <Flex
                                                          flexWrap="wrap"
                                                          justify="center">
                                                          {/* Render only the current card */}
                                                          {/* <MatchCard
                                                          key={
                                                            matchusers[0]._id
                                                          }
                                                          user={matchusers[0]}
                                                          onSwipe={handleSwipe}
                                                        /> */}

                                                          <Box
                                                            w="340px" // Adjust card width as needed
                                                            h="70%" // Adjust card height as needed
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
                                                              src={
                                                                matchusers[0]
                                                                  .profilePic
                                                              }
                                                              alt={
                                                                matchusers[0]
                                                                  .name
                                                              }
                                                              w="100%"
                                                              h="70%"
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
                                                                {
                                                                  matchusers[0]
                                                                    .name
                                                                }
                                                              </Center>
                                                              <Center
                                                                fontSize="sm"
                                                                color="white">
                                                                {
                                                                  matchusers[0]
                                                                    .bio
                                                                }
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
                                                                whileTap={{
                                                                  scale: 1.2,
                                                                }}
                                                                bg="transparent">
                                                                <IoIosEye
                                                                  size={24}
                                                                  color="white"
                                                                />
                                                              </MotionButton>
                                                              <Spacer />
                                                              <MotionButton
                                                                aria-label="Super Like"
                                                                whileTap={{
                                                                  scale: 1.2,
                                                                }}
                                                                bg="transparent">
                                                                <IoIosRocket
                                                                  size={24}
                                                                  color="#FFD500"
                                                                />
                                                              </MotionButton>
                                                              <Spacer />
                                                              <MotionButton
                                                                aria-label="Dislike"
                                                                onClick={
                                                                  dislikehandler
                                                                }
                                                                whileTap={{
                                                                  scale: 1.2,
                                                                }}
                                                                bg="transparent">
                                                                <IoIosClose
                                                                  size={24}
                                                                  color="red"
                                                                />
                                                              </MotionButton>
                                                              <Spacer />
                                                              <MotionButton
                                                                aria-label="Like"
                                                                onClick={
                                                                  likehandler
                                                                }
                                                                whileTap={{
                                                                  scale: 1.2,
                                                                }}
                                                                bg="transparent">
                                                                <IoIosHeart
                                                                  size={24}
                                                                  color="#00C689"
                                                                />
                                                              </MotionButton>
                                                            </Flex>
                                                          </Box>
                                                        </Flex>
                                                      </Box>
                                                    </Box>
                                                  </Center>
                                                  {isMatch && (
                                                    <MatchPopup
                                                      onClose={() =>
                                                        setIsMatch(false)
                                                      }
                                                    />
                                                  )}
                                                </div>
                                              </>
                                            )}

                                            {/* <div className="content-type">
                                            <ul className="content-list">
                                              <li className="image-video">
                                                <div className="file-btn">
                                                  <i className="fa-solid fa-camera"></i>
                                                  Photo
                                                </div>
                                                <input type="file" />
                                              </li>
                                              <li className="post-submit">
                                                <input
                                                  type="submit"
                                                  value="Post"
                                                  className="default-btn"
                                                />
                                              </li>
                                            </ul>
                                          </div> */}
                                            {/* </form> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="gt2"
                          role="tabpanel"
                          aria-labelledby="gt2-tab">
                          <div className="info">
                            <div className="info-card mb-4">
                              <div className="info-card-title">
                                <h6>Base Info</h6>
                              </div>
                              <div className="info-card-content">
                                <ul className="info-list">
                                  <li>
                                    <p className="info-name">Name</p>
                                    <p className="info-details">
                                      {user.user?.name}
                                    </p>
                                  </li>
                                  <li>
                                    <p className="info-name">I'm a</p>
                                    <p className="info-details">
                                      {user.user.gender}
                                    </p>
                                  </li>
                                  <li>
                                    <p className="info-name">Loking for a</p>
                                    <p className="info-details">Men</p>
                                  </li>
                                  <li>
                                    <p className="info-name">Marital Status</p>
                                    <p className="info-details">Single</p>
                                  </li>
                                  <li>
                                    <p className="info-name">Age</p>
                                    <p className="info-details">36</p>
                                  </li>
                                  {/* <li>
                                <p className="info-name">Date of Birth</p>
                                <p className="info-details">27-02-1996</p>
                              </li> */}
                                  <li>
                                    <p className="info-name">Address</p>
                                    <p className="info-details">
                                      Streop Rd, Peosur, Inphodux, USA.
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="info-card mb-4">
                              <div className="info-card-title">
                                <h6>Myself Summary</h6>
                              </div>
                              <div className="info-card-content">
                                <p>
                                  Collaboratively innovate compelling mindshare
                                  after prospective partnership Competently
                                  sereiz long-term high-impact internal or
                                  "organic" sources vias user friendly strategic
                                  themesr areas creat Dramatically coordinate
                                  premium partnerships rather than standards
                                  compliant technologies ernd Dramaticaly matrix
                                  ethical collaboration and idea-sharing through
                                  opensour methodolog and Intrinsicly grow
                                  collaborative platforms vis-a-vis effective
                                  scenarios. The energistically strategize cost
                                  effective ideas before the worke unde.
                                </p>
                              </div>
                            </div>

                            <div className="info-card mb-4">
                              <div className="info-card-title">
                                <h6>Looking For</h6>
                              </div>
                              <div className="info-card-content">
                                <ul className="info-list">
                                  <li>
                                    <p className="info-name">I'm looking for</p>
                                    <p className="info-details">
                                      I want a funny person
                                    </p>
                                  </li>
                                  <li>
                                    <p className="info-name">Whatever I like</p>
                                    <p className="info-details">
                                      I like to travel a lot
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 order-xl-0">
                    <div className="group__bottom--center">
                      <div className="story__item style2">
                        <div className="story__inner">
                          <div className="story__thumb position-relative">
                            <img
                              src="assets/images/member/profile/profile.jpg"
                              alt="dating thumb"
                            />
                          </div>
                        </div>
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
    </Fragment>
  );
};

export default MemberDetails;
