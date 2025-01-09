import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { DochakiContext } from "../../components/Context/Contact";
import AccessoryView from "../../components/AccessoryView/AccessoryView";
import Breadcrum from "../../components/Breadcrum/Breadcrum";

const Accessory = () => {
    const { id } = useParams();
    // console.log("parameter",id);
    const newId = id;
    const { bikeAccessories } = useContext(DochakiContext);
    console.log("Hello")
    return (
        <>
            <div className="accessory-full-view">
                {bikeAccessories.map((item, i) => {
                    if (newId === item._id) {
                        const { _id, name,  reviews, reviewCount, category, price, description, images, additionalInfo } = item;
                        return (
                            <>
                                <Breadcrum key={i} name={name} id={_id} category={category} />
                                <AccessoryView key={i} _id={_id} name={name} reviews={reviews} reviewCount={reviewCount} price={price} description={description} images={images} additionalInfo={additionalInfo} />
                            </>
                        )
                    }
                })}
            </div>
        </>
    )
}
export default Accessory;