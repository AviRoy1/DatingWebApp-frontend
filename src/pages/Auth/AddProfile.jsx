import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { updateProfile } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, FormLabel, Input } from "@chakra-ui/react";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export const fileUploadCss = {
  cursor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  border: "none",
  height: "100%",
  color: "#ECC94B",
  backgroundColor: "white",
};
const fileUploadStyle = {
  "&::file-selector-button": fileUploadCss,
};

const AddProfile = () => {
  const { user, isFetching, accessToken } = useSelector((state) => state.user);

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [interestIn, setInterestIn] = useState("");
  const [relationshipType, setRelationshipType] = useState("");
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [bio, setBio] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");
  const [file, setfile] = useState(null);
  const nevigate = useNavigate();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
      setfile(file);
    };
  };
  // console.log(user);

  const [location, setLocation] = useState();

  // console.log(location);
  const dispatch = useDispatch();
  const useHandler = (e) => {
    e.preventDefault();

    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(StorageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateProfile(
            dispatch,
            {
              age: age,
              gender: gender,
              interestIn: interestIn,
              location: location,
              relationshipStatus: relationshipStatus,
              relationshipType: relationshipType,
              profilePic: downloadURL,
              bio: bio,
            },
            accessToken
          );
        });
      }
    );
    nevigate("/member-single");
  };

  return (
    <section className="log-reg">
      <div className="top-menu-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-7">
              <div className="logo">
                <Link to="/">
                  <img
                    src="http://ollya.codexcoder.com/assets/images/logo/logo.png"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-5">
              <Link to="/" className="backto-home">
                <i className="fas fa-chevron-left"></i> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="image"></div>
          <div className="col-lg-7">
            <div className="log-reg-inner">
              <div className="section-header">
                <h2 className="title">Profile Details </h2>
              </div>
              <div className="main-content">
                <form action="#">
                  <div className="form-group">
                    <Box my="4" display={"flex"} justifyContent="center">
                      <Avatar src={imagePrev} size={"2xl"} />
                    </Box>
                    <Box my={"4"}>
                      <FormLabel
                        htmlFor="chooseAvatar"
                        children="Choose Avatar"
                      />
                      <Input
                        accept="image/*"
                        required
                        id="chooseAvatar"
                        type={"file"}
                        focusBorderColor="yellow.500"
                        css={fileUploadStyle}
                        onChange={changeImageHandler}
                      />
                    </Box>

                    <label>Age</label>
                    <input
                      type="text"
                      className="my-form-control"
                      onChange={(e) => setAge("male")}
                    />
                  </div>
                  <div className="form-group">
                    <label>I am a*</label>
                    <div className="banner__inputlist">
                      <div className="s-input me-3">
                        <input
                          type="radio"
                          name="gender1"
                          id="males1"
                          onChange={(e) => setGender("male")}
                        />
                        <label htmlFor="males1">Man</label>
                      </div>
                      <div className="s-input">
                        <input
                          type="radio"
                          name="gender1"
                          id="females1"
                          onChange={(e) => setGender("female")}
                        />
                        <label htmlFor="females1">Woman</label>
                      </div>
                      <div className="s-input" style={{ marginLeft: "15px" }}>
                        <input
                          type="radio"
                          name="gender1"
                          id="other1"
                          onChange={(e) => setGender("other")}
                        />
                        <label htmlFor="other1">Other</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Looking for a*</label>
                    <div className="banner__inputlist">
                      <div className="s-input me-3">
                        <input
                          type="radio"
                          name="gender2"
                          id="males"
                          onChange={(e) => setInterestIn("male")}
                        />
                        <label htmlFor="males">Man</label>
                      </div>
                      <div className="s-input">
                        <input
                          type="radio"
                          name="gender2"
                          id="females"
                          onChange={(e) => setInterestIn("female")}
                        />
                        <label htmlFor="females">Woman</label>
                      </div>
                      <div className="s-input" style={{ marginLeft: "15px" }}>
                        <input
                          type="radio"
                          name="gender2"
                          id="other"
                          onChange={(e) => setInterestIn("other")}
                        />
                        <label htmlFor="other2">Other</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Marial status*</label>
                    <div className="banner__inputlist">
                      <div className="s-input me-3">
                        <input
                          type="radio"
                          name="gender3"
                          id="males3"
                          onChange={(e) => setRelationshipStatus("Single")}
                        />
                        <label htmlFor="males3">Single</label>
                      </div>
                      <div className="s-input">
                        <input
                          type="radio"
                          name="gender3"
                          id="females3"
                          onChange={(e) => setRelationshipStatus("Marid")}
                        />
                        <label htmlFor="females3">Marid</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Relationship Type*</label>
                    <div className="banner__inputlist">
                      <div className="s-input me-3">
                        <input
                          type="radio"
                          name="gender4"
                          id="longterm"
                          onChange={(e) => setRelationshipType("Long Term")}
                        />
                        <label htmlFor="longterm">Long Term</label>
                      </div>
                      <div className="s-input me-3">
                        <input
                          type="radio"
                          name="gender4"
                          id="shortterm"
                          onChange={(e) => setRelationshipType("Short Term")}
                        />
                        <label htmlFor="shortterm">Short Term</label>
                      </div>
                      <div className="s-input">
                        <input
                          type="radio"
                          name="gender4"
                          id="friendship"
                          onChange={(e) => setRelationshipType("Friendship")}
                        />
                        <label htmlFor="Friendship">Friendship</label>
                      </div>
                      <div className="s-input">
                        <input
                          type="radio"
                          name="gender4"
                          id="Casual"
                          onChange={(e) => setRelationshipType("Casual")}
                        />
                        <label htmlFor="Casual">Casual</label>
                      </div>
                      <div className="s-input">
                        <input
                          type="radio"
                          name="gender4"
                          id="Hookups"
                          onChange={(e) => setRelationshipType("Marid")}
                        />
                        <label htmlFor="Hookups">Hookups</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>City*</label>
                    <input
                      type="text"
                      className="my-form-control"
                      placeholder="Enter Your City"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>About You*</label>
                    <input
                      type="text"
                      className="my-form-control"
                      placeholder="Enter Your City"
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="default-btn"
                      onClick={useHandler}>
                      <span>Add Profile</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProfile;
