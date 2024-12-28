import React, { useState } from "react";
import './Home.css';
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import AccessoriesDisplay from "../../components/AccesoriesDisplay/AccessoriesDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import ShopNow from "../../components/ShopNow/ShopNow";

const Home = () => {
    const [category, setCategory] = useState('All');
    return (
        <>
         <div className="home">
            <Header/>
            <ExploreMenu category={category} setCategory={setCategory}/>
            <AccessoriesDisplay category={category} />
            <ShopNow/>
            <AppDownload/>
         </div>
        </>
    )
}
export default Home;