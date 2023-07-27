import { Box, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { addPhoto } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const BlueTickIcon = () => (
  <i
    className="fas fa-check-circle"
    style={{
      color: "rgb(0, 64, 255)",
      fontSize: "16px",
      marginLeft: "4px",
    }}
  />
);

export const fileUploadCss = {
  cursor: "pointer",
  marginLeft: "-5%",
  width: "110%",
  border: "none",
  height: "100%",
  color: "red",
  backgroundColor: "white",
};
const fileUploadStyle = {
  "&::file-selector-button": fileUploadCss,
};

const ProfilePage = ({ user }) => {
  const { isFetching, accessToken } = useSelector((state) => state.user);
  const [file, setfile] = useState(null);
  const dispatch = useDispatch();
  const handleAddPhoto = (e) => {
    console.log("okkk");
    // e.preventDefault();
    const selectedFile = e.target.files[0];
    setfile(selectedFile);
    const fileName = new Date().getTime() + selectedFile?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(StorageRef, selectedFile); // Use selectedFile directly here
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addPhoto(dispatch, { photo: downloadURL }, accessToken);
        });
      }
    );
  };

  return (
    <div className="info" style={{ marginLeft: "80px" }}>
      <div className="info-card mb-4">
        <div className="info-card-title">
          <h6>Profile Picture</h6>
        </div>
        <div className="info-card-content">
          <img
            src={user.user.profilePic}
            alt="datting thumb"
            style={{ width: "300px", height: "350px" }}
          />
        </div>
      </div>

      {/* Show Other Photos Section */}
      <div className="info-card mb-4">
        <div className="info-card-title">
          <h6>Show Other Photos</h6>
        </div>
        <div className="info-card-content">
          {/* Display user photos if available */}
          {user.user.photos && user.user.photos.length > 0 ? (
            <div style={{ display: "flex", gap: "10px" }}>
              {user.user.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  style={{ width: "120px", height: "120px" }}
                />
              ))}
            </div>
          ) : (
            <p>No photos available.</p>
          )}
        </div>
      </div>

      {/* Add Photo Section */}
      <Box my={"4"}>
        <FormLabel htmlFor="chooseAvatar" children="Add Photo" />
        <Input
          accept="image/*"
          required
          id="chooseAvatar"
          type={"file"}
          focusBorderColor="yellow.500"
          css={fileUploadStyle}
          onChange={handleAddPhoto}
        />
      </Box>

      {/* Basic Info Section */}
      <div className="info-card mb-4">
        <div className="info-card-title">
          <h6>Basic Info</h6>
        </div>
        <div className="info-card-content">
          <ul className="info-list">
            <li>
              <p className="info-name">Name</p>
              <p className="info-details">
                {user.user?.name}
                {user.user.subscription.plan === "2" ||
                user.user.subscription.plan === "3" ? (
                  <BlueTickIcon />
                ) : null}
              </p>
            </li>
            <li>
              <p className="info-name">I'm a</p>
              <p className="info-details">{user.user.gender}</p>
            </li>
            <li>
              <p className="info-name">Looking for a</p>
              <p className="info-details">{user.user.interestIn}</p>
            </li>
            <li>
              <p className="info-name">Marital Status</p>
              <p className="info-details">{user.user.relationshipStatus}</p>
            </li>
            <li>
              <p className="info-name">Age</p>
              <p className="info-details">{user.user.age}</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Myself Summary Section */}
      <div className="info-card mb-4">
        <div className="info-card-title">
          <h6>Myself Summary</h6>
        </div>
        <div className="info-card-content">
          <p>{user.user.bio}</p>
        </div>
      </div>

      {/* Looking For Section */}
      <div className="info-card mb-4">
        <div className="info-card-title">
          <h6>Looking For</h6>
        </div>
        <div className="info-card-content">
          <ul className="info-list">
            <li>
              <p className="info-name">I'm looking for </p>
              <p className="info-details">{user.user.relationshipType}</p>
            </li>
            <li>
              <p className="info-name">Whatever I like</p>
              <p className="info-details">I like to travel a lot</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
