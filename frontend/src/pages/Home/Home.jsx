import React, { useState } from "react";
import './Home.css';
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import AccessoriesDisplay from "../../components/AccesoriesDisplay/AccessoriesDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = () => {
    const [category, setCategory] = useState('All');
    return (
        <>
         <div className="home">
            <Header/>
            <ExploreMenu category={category} setCategory={setCategory}/>
            <AccessoriesDisplay category={category} />
            <AppDownload/>
         </div>
        </>
    )
}
export default Home;