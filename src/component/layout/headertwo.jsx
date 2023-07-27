import React from "react";
import { redirect, useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import img1 from "../../css/assets/images/logo/logo.png";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";

const Headertwo = () => {
  const { user } = useSelector((state) => state.user);
  const nevigate = useNavigate();
  window.addEventListener("scroll", function () {
    var value = window.scrollY;
    if (value > 200) {
      document
        .querySelector(".header")
        .classList.add(["header-fixed"], ["animated"], ["fadeInDown"]);
    } else {
      document
        .querySelector(".header")
        .classList.remove(["header-fixed"], ["animated"], ["fadeInDown"]);
    }
  });

  const useHandler = (e) => {
    e.preventDefault();
    nevigate("/login");
  };
  // console.log(user);
  return (
    <header className="header" id="navbar">
      <div className="header__bottom">
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">
              <img src={img1} alt="logo" />
            </Link>
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler--icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNavAltMarkup">
              <div
                className="navbar-nav mainmenu"
                style={{ marginLeft: "-20px" }}>
                <ul>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">About us</NavLink>
                  </li>
                  <li>
                    <NavLink to="/membership">Membership</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">contact</NavLink>
                  </li>
                </ul>
              </div>
              <div className="header__more">
                {user !== null ? (
                  <li>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "-19px",
                      }}>
                      <img
                        src={`${user?.user?.profilePic}`}
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          marginRight: "8px",
                        }}
                        alt=""
                      />
                      <NavLink to="/">{user.user?.name}</NavLink>
                      {user.user.subscription.plan === "2" ? (
                        <FaCheckCircle
                          size={25}
                          color="rgb(77, 121, 255)"
                          style={{ marginLeft: "5px" }}
                        />
                      ) : user.user.subscription.plan === "3" ? (
                        <FaCheckCircle
                          size={25}
                          color="rgb(0, 64, 255)"
                          style={{ marginLeft: "5px" }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                ) : (
                  <button
                    className="default-btn"
                    onClick={useHandler}
                    type="button"
                    //   id="moreoption"
                    //   data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <span>Sign IN</span>
                  </button>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Headertwo;
