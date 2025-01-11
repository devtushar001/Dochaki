import React from "react";
import { fassets } from "../../frontend_assets/assets";
import './AppDownload.css'

const AppDownload = () => {
    return (
        <>
         <div className="app-download" id="app-download">
            <p>For Better Experience Download <br /> Dochaki App</p>
            <div className="app-download-platforms">
                <img src={fassets.play_store} alt="" />
                <img src={fassets.app_store} alt="" />
            </div>
         </div>
        </>
    )
}

export default AppDownload;