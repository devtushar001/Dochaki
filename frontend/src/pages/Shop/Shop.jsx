import React, { useState, useContext, useEffect } from "react";
import './Shop.css';
import { DochakiContext } from "../../components/Context/Contact";
import ShopCategories from "../../components/ShopCategories/ShopCategories";
import ShopAccessoryDisplay from "../../components/ShopAccessoryDisplay/ShopAccessoryDisplay";

const Shop = () => {
  const [category, setCategory] = useState('All');
  const { bikeAccessories } = useContext(DochakiContext);
  console.log(bikeAccessories)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
    <div className="ksdl">
      <ShopCategories category={category} setCategory={setCategory} />
      < ShopAccessoryDisplay category={category}/>
    </div>
      {/* {bikeAccessories.map((item,i)=>{
        return <AccessoriesItem key={i} _id={item._id} name={item.name} price={item.price} images={item.images} category/>
      })} */}
    </>
  )
}

export default Shop;