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
                    if (Number(id) === item.id) {
                        const { id, name, category, reviews, reviewCount, price, description, images, additionalInfo } = item;
                        return (
                            <>
                                <Breadcrum key={i} name={name} category={category}/>
                                <AccessoryView key={i} id={id} name={name} category={category} reviews={reviews} reviewCount={reviewCount} price={price} description={description} images={images} additionalInfo={additionalInfo} />
                            </>
                        )
                    }
                })}
            </div>
        </>
    )
}
export default Accessory;