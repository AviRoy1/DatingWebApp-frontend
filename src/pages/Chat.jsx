import React, { useRef, useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
} from "mdb-react-ui-kit";

import ChatContact from "../component/layout/ChatContact";
import { useMediaQuery } from "react-responsive";
import img1 from "../css/assets/images/member/male/04.jpg";
import MessageBox from "../component/layout/MessageBox";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getLatestMessage } from "../apis/MessageRequest";
import axios from "axios";
import Loader from "../component/Loader/Loader";
import { server } from "../redux/store";

export default function Chat() {
  //logic for testing

  const { user, accessToken } = useSelector((state) => state.user);
  let userId = user.user._id;
  //logic to fectch contacts
  const [chats, setChats] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChats = async () => {
      try {
        // const { data } = await userChats(userId);
        const { data } = await axios.post(`${server}/api/chat/getall`, {
          userId: user.user._id,
        });
        setChats(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getChats();
  }, []);

  //Logic to set user data of current chat
  const [currentChat, setCurrentChat] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const Id = currentChat?.members?.find((id) => id !== userId);
    const getUserData = async () => {
      try {
        const { data } = await axios.post(`${server}/api/chat/detail`, {
          userId: Id,
        });
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  //tofetch latest message to diplay

  //logic to fetch online users using socket.io

  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  //for getting online users
  useEffect(() => {
    socket.current = io(`${server}`);
    socket.current.emit("new-user-add", userId);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [userId]);

  //check status
  const checkStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== userId);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  // for sending real time messages
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //for receiving real time messages
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
      console.log(receiveMessage);
    });
  }, []);

  useEffect(() => {
    console.log("receiveMessage state:", receiveMessage);
  }, [receiveMessage]);

  // Logic to make chat responsive
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const [Contactlty, setContactlty] = useState(true);
  const [Messagelty, setMessagelty] = useState(true);
  useEffect(() => {
    if (isSmallScreen) {
      setMessagelty(false);
    } else {
      setContactlty(true);
      setMessagelty(true);
    }
  }, [isSmallScreen]);

  const handleClick = async (val, chat) => {
    if (isSmallScreen) {
      if (val === "Contact") {
        setMessagelty(true);
        setContactlty(false);
      } else {
        setMessagelty(false);
        setContactlty(true);
      }
    }

    if (val === "Contact") {
      setCurrentChat(chat);
    }
  };

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <div style={{ height: "100vh" }}>
            <MDBContainer
              fluid
              className="py-5"
              style={{
                background:
                  "linear-gradient(120deg, rgb(255, 182, 193), rgb(250, 250, 210))",
                height: "100%",
              }}>
              <MDBRow>
                <MDBCol md="12">
                  <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
                    <MDBCardBody>
                      <MDBRow>
                        {Contactlty && (
                          <MDBCol
                            md="6"
                            lg="5"
                            xl="4"
                            className="mb-0 mb-md-0"
                            style={{
                              borderRight: !isSmallScreen
                                ? "1px solid pink"
                                : "none",
                            }}>
                            <div className="p-3">
                              <MDBInputGroup
                                className="rounded mb-3"
                                style={{ border: "1px solid #f24570" }}>
                                <input
                                  className="form-control rounded"
                                  placeholder="Search"
                                  type="search"
                                />
                                <span
                                  className="input-group-text border-0"
                                  id="search-addon"
                                  style={{ backgroundColor: " #f24570" }}>
                                  <MDBIcon
                                    fas
                                    icon="search"
                                    style={{ color: "white" }}
                                  />
                                </span>
                              </MDBInputGroup>
                              <div
                                style={{
                                  overflowY: "auto",
                                  position: "relative",
                                  height: "68.2vh",
                                }}>
                                <MDBTypography listUnStyled className="mb-0">
                                  {chats.map((chat, index) => (
                                    <div
                                      onClick={() =>
                                        handleClick("Contact", chat)
                                      }
                                      index={index}>
                                      <ChatContact
                                        data={chat}
                                        currentUser={userId}
                                        online={checkStatus(chat)}
                                        receiveMessage={receiveMessage}
                                        sendMessage={sendMessage}
                                      />
                                    </div>
                                  ))}
                                </MDBTypography>
                              </div>
                            </div>
                          </MDBCol>
                        )}
                        <></>
                        {Messagelty && (
                          <MDBCol md="6" lg="7" xl="8">
                            {currentChat ? (
                              <>
                                <MDBCardHeader
                                  className="d-flex justify-content-between align-items-center p-3"
                                  style={{
                                    backgroundColor: "white",
                                    border: "1px solid #f24570",
                                    borderRadius: "10px",
                                    zIndex: "1px",
                                  }}>
                                  <div className="d-flex flex-row">
                                    <div>
                                      <img
                                        src={
                                          userData?.profilePic
                                            ? userData.profilePic
                                            : img1
                                        }
                                        alt="avatar"
                                        className="d-flex align-self-center me-3"
                                        width="50px"
                                        style={{ borderRadius: "100%" }}
                                      />
                                      <span className="badge bg-success badge-dot"></span>
                                    </div>
                                    <div className="pt-1">
                                      <p className="fw-bold mb-0 mt-1">
                                        {userData ? userData.name : ""}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-row align-items-center">
                                    {isSmallScreen && (
                                      <MDBIcon
                                        fas
                                        icon="times"
                                        size="m"
                                        className="me-3 text-muted"
                                        style={{ marginLeft: "5px" }}
                                        onClick={() => {
                                          handleClick("message", null);
                                        }}
                                      />
                                    )}
                                  </div>
                                </MDBCardHeader>
                                <MessageBox
                                  chat={currentChat}
                                  userData={userData}
                                  currentUser={userId}
                                  setSendMessage={setSendMessage}
                                  receiveMessage={receiveMessage}
                                />
                              </>
                            ) : (
                              <span> please pick a chat</span>
                            )}
                          </MDBCol>
                        )}
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        </>
      )}
    </>
  );
}
