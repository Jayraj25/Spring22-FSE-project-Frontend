<<<<<<< HEAD
import "./navigation.css";
import {useLocation, Link} from "react-router-dom";

function Index() {
  const location = useLocation();
  console.log(location.pathname);
  const links = [
    {label: 'Tuiter', icon: 'fa-square-t', href: 'tuiter.html', path: '/tuiter'},
    {label: 'Home', icon: 'fa-home', href: 'home.html', path: '/home'},
    {label: 'Explore', icon: 'fa-hashtag', href: 'explore.html', path: '/explore'},
    {label: 'Notifications', icon: 'fa-bell', href: 'notifications.html', path: '/notifications'},
    {label: 'Messages', icon: 'fa-envelope', href: 'messages.html', path: '/messages'},
    {label: 'Bookmarks', icon: 'fa-bookmark', href: 'bookmarks.html', path: '/bookmarks'},
    {label: 'Lists', icon: 'fa-list', href: 'lists.html', path: '/lists'},
    {label: 'Profile', icon: 'fa-user', href: 'profile.html', path: '/profile'},
    {label: 'More', icon: 'fa-circle-ellipsis', href: 'more.html', path: '/more'},
  ]
  return(
    <div class="ttr-navigation">
     <ul class="list-group">
      {
      links.map(link => {
        return(
        <li class={`list-group-item border-0 ttr-font-size-150pc text-nowrap ${location.pathname.indexOf(link.path) >= 0 ? 'fw-bold':''}`}>
          <Link to={link.path}
             className="text-decoration-none text-black">
            <i className={`fa ${link.icon} text-center`}></i>
=======
import React from "react";
import "./navigation.css";
import {useLocation, Link} from "react-router-dom";

function Navigation() {
  const {pathname} = useLocation();
  // console.log(location.pathname);
  const links = [
    {label: 'Tuiter', icon: 'fa-square-t', path: '/tuiter'},
    {label: 'Home', icon: 'fa-home', path: '/home'},
    {label: 'Explore', icon: 'fa-hashtag', path: '/explore'},
    {label: 'Notifications', icon: 'fa-bell', path: '/notifications'},
    {label: 'Messages', icon: 'fa-envelope', path: '/messages'},
    {label: 'Bookmarks', icon: 'fa-bookmark', path: '/bookmarks'},
    {label: 'Lists', icon: 'fa-list', path: '/lists'},
    {label: 'Profile', icon: 'fa-user', path: '/profile'},
    {label: 'More', icon: 'fa-circle-ellipsis', path: '/more'},
    {label: 'Login', icon: 'fa-user', path: '/login'},
  ]
  return(
    <div className="ttr-navigation">
     <ul className="list-group">
      {
      links.map((link, ndx) => {
        return(
        <li key={ndx} className={`list-group-item border-0 ttr-font-size-150pc text-nowrap
         ${pathname.indexOf(link.path) >= 0 ? 'fw-bold':''}`}>
          <Link to={link.path} id={link.label}
             className="text-decoration-none text-black">
            <i className={`fa ${link.icon} text-center`}/>
>>>>>>> A3
            <span className="ttr-label">{link.label}</span>
          </Link>
        </li>
        );
      })
      }
      </ul>
<<<<<<< HEAD
     <a href="#" class="mt-3 btn btn-lg btn-primary rounded-pill w-100 fw-bold text-white">
      Tuit</a>
    </div>
  );
};

export default Index;
=======
     <button className="mt-3 btn btn-lg btn-primary rounded-pill w-100 fw-bold text-white">
      Tuit</button>
    </div>
  );
}

export default Navigation;
>>>>>>> A3
