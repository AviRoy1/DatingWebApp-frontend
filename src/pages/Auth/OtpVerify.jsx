import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const title = "Please Verify Your Email";
const otherTitle = "Sign up with your email";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  let isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const useHandler = (e) => {
    e.preventDefault();
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
          <div className="image image-log"></div>
          <div className="col-lg-7">
            <div
              className="log-reg-inner"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "-10px",
              }}>
              <div className="section-header inloginp">
                <h2 className="title">{title}</h2>
              </div>
              <div className="main-content inloginp">
                <form action="#">
                  <div className="form-group">
                    <label></label>
                    {/* <br></br> */}
                    <input
                      type="email"
                      name="email"
                      id="item01"
                      //   value={this.state.userEmail}
                      onChange={(e) => {
                        setOtp(e.target.value);
                      }}
                      placeholder="Enter your OTP"
                      className="my-form-control"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="default-btn"
                      onClick={useHandler}>
                      <span>Confirm</span>
                    </button>
                  </div>
                  <div className="or">
                    <p>OR</p>
                  </div>
                  <div className="or-content">
                    {/* <p>{otherTitle}</p>
                                            <a href="#" className="default-btn reverse"><img src="assets/images/login/google.png" alt="google" /> <span>Sign Up with Google</span></a> */}
                    <p className="or-signup">
                      {" "}
                      Didn't receive your OTP?{" "}
                      <Link to="/register">&nbsp;Resend</Link>
                    </p>
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

export default OtpVerify;
