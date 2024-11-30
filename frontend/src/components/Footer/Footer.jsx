import React from "react";
import { assets } from '../../assets/assets';
import { fassets } from '../../frontend_assets/assets';
import './Footer.css'

const Footer = () => {
    return (
        <>
            <div className="footer" id="footer">
                <div className="footer-content">
                    <div className="footer-content-left">
                        <img className="logo-image" src={assets.logo_blur} alt="" />
                        <p>Lorem ipsum dolor sit amet, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad, earum nihil possimus quasi minima hic qui quam quas consectetur explicabo itaque beatae necessitatibus minus harum facilis officiis voluptatum, molestias ut aperiam commodi impedit, magnam vitae cum! Distinctio, reprehenderit? Culpa quia quaerat quo inventore, soluta necessitatibus.consectetur a blanditiis asperiores quia magnam inventore voluptas? Optio, alias.</p>
                        <div className="footer-social-icon">
                            <img src={fassets.facebook_icon} alt="" /><img src={fassets.twitter_icon} alt="" /><img src={fassets.linkedin_icon} alt="" />
                        </div>
                    </div>
                    <div className="footer-content-center">
                         <h2>COMPANY</h2>
                         <ul>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Delivery</li>
                            <li>Privecy Policy</li>
                         </ul>
                    </div>
                    <div className="footer-content-right">
                        <h2>GET IN TOUCH</h2>
                        <ul>
                            <li>+1-222-456-7890</li>
                            <li>contact@dochaki.com</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className="footer-copyright">
                    Copyright 2024 &#169; Dochaki.com - All Right Reserved.
                </p>
            </div>
        </>
    )
}

export default Footer;