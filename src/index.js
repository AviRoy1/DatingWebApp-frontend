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
import Loader from "./components/Loader/Loader";
import Match from "./pages/Match/Match";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import AddProfile from "./pages/Auth/AddProfile";
import Profile from "./pages/Profile/Profile";
import "./profile.css";
import MatchPage from "./pages/Match/Match";

function App() {
  const { user, isFetching, message, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  console.log(error, message);

  useEffect(() => {
    if (error) {
      toast.error(message);
      console.log("hitting");
      clearerror(dispatch);
    }
    if (message) {
      toast.success(message);
      clearmessage(dispatch);
    }
  }, []);

  // useEffect(() => {
  //   loaduser(dispatch, user.accessToken);
  // }, []);
  // console.log(user);

  //   return (
  //     <BrowserRouter>
  //       {isFetching ? (
  //         <Loader />
  //       ) : (
  //         <>
  //           <Routes>
  //             <Route
  //               index
  //               path="/"
  //               element={
  //                 user !== null ? (
  //                   <Home />
  //                 ) : (
  //                   <Navigate to={"/login"} replace={true} />
  //                 )
  //               }
  //             />
  //             <Route
  //               path="/login"
  //               element={
  //                 user === null ? <Login /> : <Navigate to={"/"} replace={true} />
  //               }
  //             />
  //             <Route
  //               path="signup"
  //               element={
  //                 user === null ? (
  //                   <SignUp />
  //                 ) : (
  //                   <Navigate to={"/"} replace={true} />
  //                 )
  //               }
  //             />

  //             <Route
  //               path="/profile"
  //               element={
  //                 <div className="profile-container">
  //                   <Profile user={user} />
  //                 </div>
  //               }
  //             />

  //             <Route path="/match" element={<Match />} />
  //           </Routes>
  //         </>
  //       )}
  //     </BrowserRouter>
  //   );
  // }

  return (
    <BrowserRouter>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addprofile" element={<AddProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/match" element={<MatchPage />} />
          </Routes>
          <Toaster />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
