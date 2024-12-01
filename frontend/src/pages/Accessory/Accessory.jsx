import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { DochakiContext } from "../../components/Context/Contact";
import AccessoryView from "../../components/AccessoryView/AccessoryView";
import Breadcrum from "../../components/Breadcrum/Breadcrum";

const Accessory = () => {
    const { id } = useParams();
    const { bikeAccessories } = useContext(DochakiContext);

    return (
        <>
            <div className="accessory-full-view">
                {bikeAccessories.map((item, i) => {
                    if (Number(id) === item._id) {
                        const { id, name, _id, reviews, reviewCount, category, price, description, images, additionalInfo } = item;
                        return (
                            <>
                                <Breadcrum key={i} name={name} id={_id} category={category} />
                                <AccessoryView key={i} id={_id} name={name} _id={_id} reviews={reviews} reviewCount={reviewCount} price={price} description={description} images={images} additionalInfo={additionalInfo} />
                            </>
                        )
                    }
                })}
            </div>
        </>
    )
}
export default Accessory;