import React, { useState } from "react";

import { Link } from "react-router-dom";
import { signup } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const title = "Welcome to Ollya";
const desc =
  "Let's create your profile! Just fill in the fields below, and we'll get a new account.";
const accTitle = "Acount Details";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = (e) => {
    e.preventDefault();
    signup(dispatch, { email, name, password });
    navigate("/addprofile");
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
                <h2 className="title">{title} </h2>
                <p>{desc} </p>
              </div>
              <div className="main-content">
                <form action="#">
                  <h4 className="content-title">{accTitle}</h4>
                  <div className="form-group">
                    <label>Name*</label>
                    <input
                      type="text"
                      name="name"
                      id="item01"
                      // value={this.state.regName}
                      // onChange={(e) => {
                      //   this.setState({ regName: e.target.value });
                      // }}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Your Name *"
                      className="my-form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address*</label>
                    <input
                      type="email"
                      name="email"
                      id="item02"
                      // value={this.state.regEmail}
                      // onChange={(e) => {
                      //   this.setState({ regEmail: e.target.value });
                      // }}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email *"
                      className="my-form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password*</label>
                    <input
                      type="password"
                      name="password"
                      id="item03"
                      // value={this.state.regPassword}
                      // onChange={(e) => {
                      //   this.setState({ regPassword: e.target.value });
                      // }}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Your Password *"
                      className="my-form-control"
                    />
                  </div>

                  <button
                    className="default-btn reverse"
                    onClick={clickHandler}>
                    <span>SignUp</span>
                  </button>
                </form>
              </div>
              <div className="or">
                <p>OR</p>
              </div>
              <div className="or-content">
                {/* <p>{otherTitle}</p>
                                            <a href="#" className="default-btn reverse"><img src="assets/images/login/google.png" alt="google" /> <span>Sign Up with Google</span></a> */}
                <p className="or-signup">
                  {" "}
                  Already have an account? <Link to="/login">Sign up here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
