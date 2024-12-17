import React, { useContext, useEffect } from "react";
import { assets } from '../../assets/assets';
import { fassets } from '../../frontend_assets/assets';
import './Footer.css'
import { Link, useNavigate } from "react-router-dom";
import { DochakiContext } from "../Context/Contact";

const Footer = () => {
    const {token} = useContext(DochakiContext);
    const navigate = useNavigate();
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',  // Adds smooth scrolling animation
        });
    }


    return (
        <>
            <div className="footer" id="footer">
                <div className="footer-content">
                    <div className="footer-content-left">
                        <img className="logo-image" src={assets.logo_blur} alt="" />
                        <p>Welcome to Dochaki Designs,<br /> We are motivated to give you better product and services....</p>
                        <div className="footer-social-icon">
                            <img src={fassets.facebook_icon} alt="" /><img src={fassets.twitter_icon} alt="" /><img src={fassets.linkedin_icon} alt="" />
                        </div>
                    </div>
                    <div className="footer-content-center">
                         <h2>COMPANY</h2>
                         <ul>
                           <Link to='/'><li onClick={scrollToTop}>Home</li></Link> 
                            <Link to='/about-us'><li onClick={scrollToTop}>About Us</li></Link> 
                            <Link to='/myorders'> <li onClick={scrollToTop}>My Orders</li></Link>
                            <Link to='/privacy-policy'><li onClick={scrollToTop}>Privecy Policy</li></Link>
                         </ul>
                    </div>
                    <div className="footer-content-right">
                        <h2>GET IN TOUCH</h2>
                        <ul>
                            <li>+91-880-679-5165</li>
                            <li>dochakidesigns@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className="footer-copyright">
                    Copyright 2024 &#169; dochaki.com - All Right Reserved.
                </p>
            </div>
        </>
    )
}

export default Footer;