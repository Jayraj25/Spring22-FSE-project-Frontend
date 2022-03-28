<<<<<<< HEAD
<<<<<<< HEAD
import Tuits from "../tuits";
=======
import React from "react";
import TuitsList from "../tuits";
>>>>>>> A3
import {Link} from "react-router-dom";
=======
import React, {useEffect, useState} from "react";
import MyTuits from "./my-tuits";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/security-service"
import TuitsAndReplies from "./tuits-and-replies";
import Media from "./media";
import MyLikes from "./my-likes";
import MyDislikes from "./my-dislikes";
>>>>>>> A4-dislikes-feature

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState({});
  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);
  const logout = () => {
    service.logout()
        .then(() => navigate('/login'));
  }
  return(
    <div className="ttr-profile">
      <div className="border border-bottom-0">
<<<<<<< HEAD
<<<<<<< HEAD
        <h4 className="p-2 mb-0 pb-0 fw-bolder">NASA<i className="fa fa-badge-check text-primary"></i></h4>
=======
        <h4 className="p-2 mb-0 pb-0 fw-bolder">
          {profile.username}
          <i className="fa fa-badge-check text-primary"/></h4>
>>>>>>> A4-dislikes-feature
        <span className="ps-2">67.6K Tuits</span>
        <div className="mb-5 position-relative">
          <img className="w-100" src={`../images/nasa-profile-header.jpg`} alt=""/>
          <div className="bottom-0 left-0 position-absolute">
            <div className="position-relative">
              <img className="position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px"
<<<<<<< HEAD
                   src="../images/nasa-3.png"/>
=======
        <h4 className="p-2 mb-0 pb-0 fw-bolder">NASA<i className="fa fa-badge-check text-primary"/></h4>
        <span className="ps-2">67.6K Tuits</span>
        <div className="mb-5 position-relative">
          <img className="w-100" src={`../images/nasa-profile-header.jpg`} alt=""/>
          <div className="bottom-0 left-0 position-absolute">
            <div className="position-relative">
              <img className="position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px"
                   src={`../images/nasa-3.png`} alt=""/>
>>>>>>> A3
=======
                   src={`../images/nasa-3.png`} alt=""/>
>>>>>>> A4-dislikes-feature
            </div>
          </div>
          <Link to="/profile/edit"
                className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right">
            Edit profile
          </Link>
          <button onClick={logout} className="mt-2 float-end btn btn-warning rounded-pill">
            Logout
          </button>
        </div>

        <div className="p-2">
          <h4 className="fw-bolder pb-0 mb-0">
<<<<<<< HEAD
<<<<<<< HEAD
            NASA<i className="fa fa-badge-check text-primary"></i>
=======
            NASA<i className="fa fa-badge-check text-primary"/>
>>>>>>> A3
=======
            {profile.username}<i className="fa fa-badge-check text-primary"/>
>>>>>>> A4-dislikes-feature
          </h4>
          <h6 className="pt-0">@{profile.username}</h6>
          <p className="pt-2">
            There's space for everybody. Sparkles
          </p>
          <p>
<<<<<<< HEAD
<<<<<<< HEAD
            <i className="far fa-location-dot me-2"></i>
=======
            <i className="far fa-location-dot me-2"/>
>>>>>>> A4-dislikes-feature
            Pale Blue Dot
            <i className="far fa-link ms-3 me-2"/>
            <a href="https://nasa.gov" className="text-decoration-none">nasa.gov</a>
            <i className="far fa-balloon ms-3 me-2"/>
            Born October 1, 1958
            <br/>
<<<<<<< HEAD
            <i className="far fa-calendar me-2"></i>
=======
            <i className="far fa-location-dot me-2"/>
            Pale Blue Dot
            <i className="far fa-link ms-3 me-2"/>
            <a href="nasa.gov" className="text-decoration-none">nasa.gov</a>
            <i className="far fa-balloon ms-3 me-2"/>
            Born October 1, 1958
            <br/>
            <i className="far fa-calendar me-2"/>
>>>>>>> A3
=======
            <i className="far fa-calendar me-2"/>
>>>>>>> A4-dislikes-feature
            Joined December 2007
          </p>
          <b>178</b> Following
          <b className="ms-4">51.1M</b> Followers
          <ul className="mt-4 nav nav-pills nav-fill">
            <li className="nav-item">
              <Link to="/profile/my-tuits"
                    className={`nav-link ${location.pathname.indexOf('my-tuits') >= 0 ? 'active':''}`}>
                Tuits</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/mylikes"
                    className={`nav-link ${location.pathname.indexOf('mylikes') >= 0 ? 'active':''}`}>
                Likes</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/tuits-and-replies"
                    className={`nav-link ${location.pathname.indexOf('tuits-and-replies') >= 0 ? 'active':''}`}>
                Tuits & replies</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/dislikes"
                    className={`nav-link ${location.pathname.indexOf('dislikes') >= 0 ? 'active':''}`}>
                Dislikes</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/media"
                    className={`nav-link ${location.pathname.indexOf('media') >= 0 ? 'active':''}`}>
                Media</Link>
            </li>
          </ul>
        </div>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
      <Tuits/>
=======
      <TuitsList/>
>>>>>>> A3
=======
        <Routes>
          <Route path="/my-tuits" element={<MyTuits/>}/>
          <Route path="/tuits-and-replies" element={<TuitsAndReplies/>}/>
          <Route path="/media" element={<Media/>}/>
          <Route path="/mylikes" element={<MyLikes/>}/>
          <Route path="/dislikes" element={<MyDislikes/>}/>
        </Routes>
>>>>>>> A4-dislikes-feature
    </div>
  );
}
export default Profile;