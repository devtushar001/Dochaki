import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Accessory from "./pages/Accessory/Accessory";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import AboutUs from "./pages/AboutUs/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from "./pages/Verify/Verify";
import MyOrder from "./pages/MyOrders/MyOrders";
import ContactUs from "./pages/ContactUs/ContactUs";
import Shop from "./pages/Shop/Shop";

const App = () => {
   const [showLogin, setShowLogin] = useState(false);
   return (
      <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
         <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
      <ToastContainer/>
         <div className="app">
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/shop" element={<Shop />} />
               <Route path="/order" element={<PlaceOrder />} />
               <Route path="/accessory/:id" element={<Accessory />} />
               <Route path="/shop/accessory/:id" element={<Accessory />} />
               <Route path="/about-us" element={<AboutUs/>} />
               <Route path="/contact-us" element={<ContactUs/>} />
               <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
               <Route path="/verify" element={<Verify/>} />
               <Route path="/myorders" element={<MyOrder/>} />
            </Routes>
         </div>
         <Footer />
      </>
   )
}

export default App;