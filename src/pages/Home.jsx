import React from "react";
import { HomeNavbar, CustomButton, Footer } from "../components";
import Homeasset from "../assets/Homeasset.png";
import { Link, useNavigate } from "react-router-dom";
import Homeasset2 from "../assets/Homeasset2.jpg";
import { CustomCaraousel } from "../components";
import img1 from "../assets/image1.jpg";

const Home = () => {
  const data = {
    name: "shruti",
    review:
      "I was feeling lonely back in my hometown because most of my friends had started romantic relationships while I was abroad. We both decided to download Tinder and see what happened.Without the app we may have never met and embarked on this wild, wonderful journey. Thank you for bringing us and so many other couples together around the world. I will forever be grateful.",
    image: img1,
    alt: "user profile",
  };
  const navigate = useNavigate();
  const handleClick = (value) => {
    //navigate(value);
  };
  return (
    <div className="homepage-container">
      <div className="homepage-section1">
        <HomeNavbar Textcolor="white" NavColor="#ff2c33" />
        <div className="homepage-section1-container">
          <div className="home-icon-container">
            <img
              src={Homeasset}
              alt="phone"
              height={550}
              width={550}
              className="icon-man"
            />
          </div>
          <div className="home-section1-details">
            <div className="home-section1-message">
              Discover Love's Playground: Where Hearts Connect and Sparks
              Ignite!
            </div>
            <div className="home-section1-button">
              <Link to="/login" style={{ textDecoration: "none" }}>
                <CustomButton
                  // onclick={handleClick("/signup")}
                  BodyClass="home-button-body"
                  TextClass="home-text-body"
                  text="Join Now"
                />
              </Link>
            </div>
            <div className="home-login-prompt">
              <span>Already Have An acoount?</span>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <span
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}>
                  Log In
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="homepage-section2">
        <div className="home-section2-details">
          <div>
            <label className="homepage-section2-label">our approach</label>
            <div className="home-section2-message">
              Go on your last first date.
            </div>
          </div>
          <div className="home-section2-button">
            <CustomButton
              onclick={handleClick("/about")}
              BodyClass="home-button-body"
              TextClass="home-text-body"
              text="How we do it"
              styles={{ padding: "2px" }}
            />
          </div>
        </div>
        <div className="home-icon-container">
          <img
            src={Homeasset2}
            alt="phone"
            height={550}
            width={380}
            className="icon-couple"
          />
        </div>
      </div>
      <div className="homepage-section3">
        <div className="homepage-section3-head">Why us?</div>
        <div className="Caraousel-Container">
          <CustomCaraousel data={data} />
        </div>
      </div>
      <div className="homepage-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
