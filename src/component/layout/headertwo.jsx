import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import img1 from "../../css/assets/images/logo/logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import { logout } from "../../redux/reducers/userReducer";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Modal, Popover } from "@mui/material";
import axios from "axios";
import Loader from "../Loader/Loader";
import { server } from "../../redux/store";

const Headertwo = () => {
  const { user, accessToken } = useSelector((state) => state.user);
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const [isMatch, setIsMatch] = useState(false);
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
  const logoutcontroller = () => {
    dispatch(logout());
    nevigate("/login");
  };
  const useHandler = (e) => {
    e.preventDefault();
    nevigate("/login");
  };

  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(true);
  // const allnoti = async () => {
  //   try {
  //     const res = await axios.post(
  //       `${server}/api/payment/getnotification`,
  //       {
  //         id: user.user._id,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/JSON",
  //         },
  //       }
  //     );
  //     setNotifications(res.data.notifications);
  //     setCount(res.data.count);
  //     setLoading(false);
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   allnoti();
  // }, []);

  const [notificationCount, setNotificationCount] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // console.log(notifications);
  return (
    <>
      {/* {loading === true ? (
        <Loader />
      ) : ( */}
      <>
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
                          <NavLink to="/member-single">
                            {user.user?.name}
                          </NavLink>
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
                          <IconButton
                            style={{ color: "green" }}
                            onClick={handleButtonClick}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}>
                              <NotificationsIcon fontSize="medium" />
                              {notificationCount > 0 && (
                                <span
                                  style={{
                                    fontSize: "12px",
                                    marginLeft: "5px",
                                  }}>
                                  {notificationCount}
                                </span>
                              )}
                            </div>
                          </IconButton>
                          <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handlePopoverClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}>
                            <div style={{ padding: "20px", width: "200px" }}>
                              {/* {notifications?.length === 0 ? (
                                  <Typography>
                                    You have no new notifications.
                                  </Typography>
                                ) : (
                                  notifications.map((e) => (
                                    <Typography key={e.time}>
                                      {e.text}
                                    </Typography>
                                  ))
                                )} */}
                              <Typography>
                                You have no new notifications.
                              </Typography>
                            </div>
                          </Popover>
                          <div style={{ marginLeft: "10px" }}>
                            <IconButton onClick={logoutcontroller}>
                              <LogoutIcon
                                style={{
                                  padding: "3vw !important",
                                  color: "#ec5e6f !important",
                                }}
                              />
                            </IconButton>
                          </div>
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
      </>
      {/* // )} */}
    </>
  );
};

export default Headertwo;
