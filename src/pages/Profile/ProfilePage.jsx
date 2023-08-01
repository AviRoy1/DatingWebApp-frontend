import { Box, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { addPhoto, updateProfile } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonBase } from "@mui/material";

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

const ProfilePage = () => {
  const { isFetching, accessToken, user } = useSelector((state) => state.user);
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

  const [gender, setGender] = useState(user.gender);
  const [interestIn, setInterestIn] = useState(user.interestIn);
  const [name, setName] = useState(user.name);
  const [location, setLocation] = useState(user.location);

  const [relationshipType, setRelationshipType] = useState(
    user.relationshipType
  );

  const [relationshipStatus, setRelationshipStatus] = useState(
    user.relationshipStatus
  );
  const [age, setAge] = useState(user.age);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleSaveChanges = () => {
    updateProfile(
      dispatch,
      {
        age: age,
        relationshipStatus: relationshipStatus,
        relationshipType: relationshipType,
        name: name,
        gender: gender,
        interestIn: interestIn,
        location: location,
      },
      accessToken
    );
    setIsEditing(false);
  };

  return (
    <div className="info" style={{ marginLeft: "0px" }}>
      <div className="info-card mb-4">
        <div className="info-card-title">
          <h6>Profile Picture</h6>
        </div>
        <div className="info-card-content">
          <img
            src={user.profilePic}
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
          {user.photos && user.photos.length > 0 ? (
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
          style={{
            cursor: "pointer",
            width: "100%",
            border: "none",
            height: "100%",
            color: "red",
            backgroundColor: "white",
          }}
          onChange={handleAddPhoto}
        />
      </Box>

      <div className="info-card mb-4">
        <div className="info-card-title">
          <h6>Basic Info</h6>
        </div>
        <div className="info-card-content">
          {isEditing ? ( // Render editable fields if in edit mode
            <form>
              <ul className="info-list">
                <li>
                  <p className="info-name">Name</p>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {/* Add blue tick icon logic here */}
                </li>
                <li>
                  <p className="info-name">I'm a</p>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </li>
                <li>
                  <p className="info-name">Looking for a</p>
                  <select
                    value={interestIn}
                    onChange={(e) => setInterestIn(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </li>
                {/* Add other editable fields here */}
                <li>
                  <p className="info-name">Marital Status</p>
                  <select
                    value={relationshipStatus}
                    onChange={(e) => setRelationshipStatus(e.target.value)}>
                    <option value="Single">Single</option>
                    <option value="Marid">Marid</option>
                  </select>
                </li>
                <li>
                  <p className="info-name">Age</p>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </li>
                <li>
                  <p className="info-name">Marital Status</p>
                  <select
                    value={relationshipType}
                    onChange={(e) => setRelationshipType(e.target.value)}>
                    <option value="Friendship">Friendship</option>
                    <option value="Long Term">Long Term</option>
                    <option value="Short Term">Short Term</option>
                    <option value="Casual">Casual</option>
                    <option value="Hookups">Hookups</option>
                  </select>
                </li>
                <li>
                  <p className="info-name">Location</p>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </li>
              </ul>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}>
                Save Profile
              </Button>
            </form>
          ) : (
            // Render non-editable fields if not in edit mode
            <ul className="info-list">
              <li>
                <p className="info-name">Name</p>
                <p className="info-details">
                  {user?.name}
                  {user.subscription.plan === "2" ||
                  user.subscription.plan === "3" ? (
                    <BlueTickIcon />
                  ) : null}
                </p>
              </li>
              <li>
                <p className="info-name">Age</p>
                <p className="info-details">{user.age}</p>
              </li>
              <li>
                <p className="info-name">I'm a</p>
                <p className="info-details">{user.gender}</p>
              </li>
              <li>
                <p className="info-name">Looking for a</p>
                <p className="info-details">{user.interestIn}</p>
              </li>
              {/* Add other non-editable fields here */}
              <li>
                <p className="info-name">Marital Status</p>
                <p className="info-details">{user.relationshipStatus}</p>
              </li>
              <li>
                <p className="info-name">Relationship Type</p>
                <p className="info-details">{user.relationshipType}</p>
              </li>
              <li>
                <p className="info-name">Location</p>
                <p className="info-details">{user.location}</p>
              </li>
            </ul>
          )}
          <Button
            variant="contained"
            color={isEditing ? "secondary" : "primary"}
            onClick={toggleEditMode}>
            {isEditing ? "Cancel" : "Update Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
