import React from "react";
import { redirect, useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";

import img1 from "../../css/assets/images/logo/logo.png";
import { useSelector } from "react-redux";

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
              <div className="navbar-nav mainmenu">
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
                  //   <button
                  //     className="default-btn"
                  //     onClick={useHandler}
                  //     type="button"
                  //     //   id="moreoption"
                  //     //   data-bs-toggle="dropdown"
                  //     aria-expanded="false">
                  //     <span>{user?.name}</span>
                  //   </button>
                  <li>
                    <NavLink to="/">{user.user.name}</NavLink>
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
