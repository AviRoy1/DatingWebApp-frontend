import logo from "./logo.svg";
import "./App.css";
import "./css/styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { clearerror, clearmessage } from "./redux/actions/userAction";
import "react-toastify/dist/ReactToastify.css";
import { loaduser } from "./redux/actions/userAction";
import axios from "axios";
import Loader from "./component/Loader/Loader";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import AddProfile from "./pages/Auth/AddProfile";
import "./profile.css";
// import MatchPage from "./pages/Match/Match1";
import Swiper from "swiper";
import "swiper/css";
import ScrollToTop from "./component/layout/scrolltop";
import AboutPage from "./pages/about";
import ContactUs from "./pages/contact";
import ErrorPage from "./pages/errorpage";
import HomePageTwo from "./pages/hometwo";
import MemberDetails from "./pages/member-single";
import MembershipPage from "./pages/membership";
import Policy from "./pages/policy";
import UserProfile from "./pages/UserProfile";
import OtpVerify from "./pages/Auth/OtpVerify";
import Chat from "./pages/Chat";

function App() {
  const { user, isFetching, message, error, accessToken } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    loaduser(dispatch, accessToken);
  }, []);

  console.log(user);

  return (
    <BrowserRouter>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otpverify" element={<OtpVerify />} />
            <Route path="/addprofile" element={<AddProfile />} />
            <Route path="/" element={<HomePageTwo />} />{" "}
            <Route path="/about" element={<AboutPage />} />{" "}
            <Route path="/membership" element={<MembershipPage />} />{" "}
            <Route path="/*" element={<ErrorPage />} />{" "}
            <Route path="/contact" element={<ContactUs />} />{" "}
            <Route path="/register" element={<SignUp />} />{" "}
            <Route path="/member-single" element={<MemberDetails />} />{" "}
            <Route path="/policy" element={<Policy />} />{" "}
            <Route path="/userprofile" element={<UserProfile />} />{" "}
            <Route path="/chat" element={<Chat />} />{" "}
          </Routes>
          <Toaster />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
