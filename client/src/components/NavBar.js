import React from 'react'
import "../index.css";
import Logo from "../images/logo-2.png"
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <nav className="bg-slate-300 flex justify-between">
      <img src={Logo} alt="" className="h-16 ml-4 mt-2" />
      <ul className="flex py-5 space-x-10 justify-end mr-11">
        <Link to="/">
          <li className="cursor-pointer">Home</li>
        </Link>
        <Link to="/event-form">
          <li className="cursor-pointer">Create Event</li>
        </Link>
        <Link to="/events">
          <li className="cursor-pointer">My events</li>
        </Link>
        <Link to="/contact">
          <li className="cursor-pointer">Contact us</li>
        </Link>
        <Link to="/login">
          <li className="cursor-pointer">Login</li>
        </Link>
        <Link to="/register">
          <li className="cursor-pointer">Register</li>
        </Link>
      </ul>
    </nav>
  );
}

export default NavBar
