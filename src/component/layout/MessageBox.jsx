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
import { addMessage, getMessages } from "../../apis/MessageRequest";
import img1 from "../../css/assets/images/member/male/04.jpg";
import { format } from "timeago.js";
import { getDetails } from "../../apis/ChatRequest";

const MessageBox = ({
  chat,
  userData,
  currentUser,
  setSendMessage,
  receiveMessage,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserData, setCurrentUserData] = useState();
  const [isPickerVisible, setPickerVisible] = useState(true);
  const scroll = useRef();

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  //for fetching old message
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat, currentUser]);

  //for fetching getting message from socket.io
  useEffect(() => {
    console.group(receiveMessage);
    if (receiveMessage != null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  //scroll to last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //get currenrUser data
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getDetails(currentUser);
        setCurrentUserData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [currentUser]);

  const handelSend = async (e) => {
    e.preventDefault();

    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }

    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handelSend(e);
    }
  };

  return (
    <>
      <div
        style={{
          overflowY: "auto",
          position: "relative",
          height: "67.2vh",
        }}
        className="pt-3 pe-3"
      >
        {messages.map((message, index) => (
          <>
            {message.senderId === currentUser ? (
              <div className="d-flex flex-row justify-content-end" ref={scroll}>
                <div>
                  <p
                    className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                    style={{ maxWidth: "400px" }}
                  >
                    {message.text}
                  </p>
                  <p
                    className="small me-3 mb-3 rounded-3 text-muted"
                    style={{ textAlign: "right" }}
                  >
                    {format(message.createdAt)}
                  </p>
                </div>
                <img
                  src={
                    currentUserData?.profilePic
                      ? currentUserData.profilePic
                      : img1
                  }
                  alt="avatar 1"
                  style={{
                    width: "45px",
                    height: "100%",
                    borderRadius: "100%",
                  }}
                />
              </div>
            ) : (
              <div
                className="d-flex flex-row justify-content-start"
                style={{ overflowY: "auto" }}
                ref={scroll}
              >
                <img
                  src={userData?.profilePic ? userData.profilePic : img1}
                  alt="avatar 1"
                  style={{
                    width: "45px",
                    height: "100%",
                    borderRadius: "100%",
                  }}
                />
                <div>
                  <p
                    className="small p-2 ms-3 mb-1 rounded-3"
                    style={{
                      backgroundColor: "#f5f6f7",
                      maxWidth: "400px",
                    }}
                  >
                    {message.text}
                  </p>
                  <p
                    className="small ms-3 mb-3 rounded-3 text-muted float-start"
                    style={{ textAlign: "left" }}
                  >
                    {format(message.createdAt)}
                  </p>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
      <div
        className="text-muted d-flex justify-content-start align-items-center pe-3  mt-2"
        style={{
          border: "1px solid #f24570",
          borderRadius: "10px",
        }}
      >
        <input
          type="text"
          className="form-control form-control-lg"
          id="exampleFormControlInput2"
          placeholder="Type message"
          onChange={(e) => handleChange(e)}
          value={newMessage}
          // KeyPress={handleKeyPress}
          onKeyUp={handleKeyPress}
        />
        <a className="ms-3 text-muted">
          <input type="file" id="uploadFile" style={{ display: "none" }} />
          <label htmlFor="uploadFile">
            <MDBIcon fas icon="paperclip" />
          </label>
        </a>
        <a class="ms-3" href="#!" onClick={handelSend}>
          <i class="fas fa-paper-plane"></i>
        </a>
      </div>
    </>
  );
};

export default MessageBox;
