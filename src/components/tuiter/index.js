import React from "react";
import Navigation from "../navigation";
import WhatsHappening from "../whats-happening";
<<<<<<< HEAD
import { Routes, Route, HashRouter} from "react-router-dom";
=======
import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
>>>>>>> A4-dislikes-feature
import Home from "../home";
import Bookmarks from "../bookmarks";
import Profile from "../profile";
import './tuiter.css'
import EditProfile from "../profile/edit-profile";
import Explore from "../explore";
import Notifications from "../notifications";
import Messages from "../messages";
import Lists from "../lists";
import More from "../more";
import {Login} from "../profile/login";
<<<<<<< HEAD
=======
import Signup from "../profile/signup";
import TuitScreen from "../tuits/tuit-screen";
>>>>>>> A4-dislikes-feature

function Tuiter () {
  return(
    <HashRouter>
      <div className="container">
        <div className="ttr-tuiter">
          <div className="ttr-left-column">
            <Navigation/>
          </div>
          <div className="ttr-center-column">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
<<<<<<< HEAD
=======
              <Route path="/signup" element={<Signup/>}/>
>>>>>>> A4-dislikes-feature
              <Route path="/tuiter" element={<Home/>}/>
              <Route path="/tuiter/:uid" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/home/:uid" element={<Home/>}/>
              <Route path="/explore" element={<Explore/>}/>
              <Route path="/notifications" element={<Notifications/>}/>
              <Route path="/messages" element={<Messages/>}/>
              <Route path="/bookmarks" element={<Bookmarks/>}/>
              <Route path="/lists" element={<Lists/>}/>
<<<<<<< HEAD
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/profile/edit" element={<EditProfile/>}/>
              <Route path="/more" element={<More/>}/>
=======
              <Route path="/profile/*" element={<Profile/>}/>
              <Route path="/profile/edit" element={<EditProfile/>}/>
              <Route path="/more" element={<More/>}/>
              <Route path="/tuit/:tid" element={<TuitScreen/>}/>
>>>>>>> A4-dislikes-feature
            </Routes>
          </div>
          <div className="ttr-right-column">
            <WhatsHappening/>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}
export default Tuiter;