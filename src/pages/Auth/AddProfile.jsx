import React, { useState } from "react";
import { Link } from "react-router-dom";

import SelectMarid from "../../components/Select/selectmarid";
import { updateProfile } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const AddProfile = () => {
  const { user, isFetching } = useSelector((state) => state.user);

  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [interestIn, setInterestIn] = useState();
  const [relationshipType, setRelationshipType] = useState("");
  const [location, setLocation] = useState();

  // console.log(location);
  const dispatch = useDispatch();
  const useHandler = (e) => {
    e.preventDefault();
    // console.log(user);
    updateProfile(
      dispatch,
      {
        age,
        gender,
        interestIn,
        relationshipType,
        location,
      },
      user.accessToken
    );
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
                    <label>Age</label>
                    <input
                      type="text"
                      className="my-form-control"
                      onChange={(e) => setAge(e.target.value)}
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
                    <label>Marital status*</label>
                    <div className="banner__inputlist">
                      <div className="s-input me-3">
                        <input
                          type="radio"
                          name="gender3"
                          id="males3"
                          onChange={(e) => setRelationshipType("Single")}
                        />
                        <label htmlFor="males3">Single</label>
                      </div>
                      <div className="s-input">
                        <input
                          type="radio"
                          name="gender3"
                          id="females3"
                          onChange={(e) => setRelationshipType("Marid")}
                        />
                        <label htmlFor="females3">Marid</label>
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
