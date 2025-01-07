import React from "react";
import './Breadcrum.css';
import {fassets} from '../../frontend_assets/assets'

const Breadcrum = (props) => {
    
    const { name, category } = props;
    
    return (
        <>
         <div className="breadcrum">
            HOME <img src={fassets.arrow_icon} alt="" />Accessory <img src={fassets.arrow_icon} alt="" /> {category} <img src={fassets.arrow_icon} alt="" /> {name}
         </div>
        </>
    )
}
export default Breadcrum;