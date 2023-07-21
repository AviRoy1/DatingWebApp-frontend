import logo from "./logo.svg";
import "./App.css";
import "./css/styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, SignUp } from "./pages";
import Profile from "./pages/Profile/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useDispatch, useSelector } from "react-redux";
// import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { clearmessage } from "./redux/actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loaduser } from "./redux/actions/userAction";
import axios from "axios";
import Loader from "./components/Loader/Loader";
import Match from "./pages/Match/Match";
import "./profile.css"; // Import the CSS file we created

function App() {
  const { user, isFetching } = useSelector((state) => state.user);
  // console.log(user);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   loaduser(dispatch, user.accessToken);
  // }, [dispatch]);

  return (
    <BrowserRouter>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route
              index
              path="/"
              element={
                user !== null ? (
                  <Home />
                ) : (
                  <Navigate to={"/login"} replace={true} />
                )
              }
            />
            <Route
              path="/login"
              element={
                user === null ? <Login /> : <Navigate to={"/"} replace={true} />
              }
            />
            <Route
              path="signup"
              element={
                user === null ? (
                  <SignUp />
                ) : (
                  <Navigate to={"/"} replace={true} />
                )
              }
            />

            <Route
              path="/profile"
              element={
                <div className="profile-container">
                  <Profile />
                </div>
              }
              // element={<Profile />}
            />
            <Route path="/match" element={<Match />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
