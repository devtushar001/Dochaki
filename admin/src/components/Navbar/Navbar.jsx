import React from "react";
import './Navbar.css';
import nav_icon from "../../assets/db";

const  Navbar = () => {
  return (
    <>
     <div className="navbar">
        <img className='logo'  src={nav_icon.logo_icon} alt="" />
        <img className="profile" src={nav_icon.user_icon} alt="" />
     </div>
    </>
  )
}
export default Navbar;