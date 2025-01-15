import { React, useContext} from "react";
import { fassets } from "../../frontend_assets/assets";
import { Link } from "react-router-dom";
import './AccessoriesItem.css';
// import { HashLink as Link } from "react-router-hash-link";
import { DochakiContext } from "../Context/Contact";

const AccessoriesItem = (props) => {
  const {addToCart, removeFromCart, cartItem, url} = useContext(DochakiContext);
  const { _id, name, price, images, category, subcategory } = props;
  console.log(subcategory)
  return (
    <>
      <div className="accessory-item">
        <div className="accessories-item-img-container">
          <img src={url+"/images/"+images} alt="" className="accessory-item-image" />
          {!cartItem[_id] ? <img className="add" onClick={() => addToCart(_id)} src={fassets.add_icon_white} alt="" />
            : <div className="accessory-item-counter">
              <img src={fassets.remove_icon_red} onClick={() => removeFromCart(_id)} alt="" />
              <p>{cartItem[_id]}</p>
              <img className="adds" onClick={()=> addToCart(_id)} src={fassets.add_icon_green} alt="" />
            </div>
          }
        </div>
        <div className="accesory-item-info">
          <div className="accessory-item-name-rating">
            <h3>{name}</h3>
          </div>
          <div className="accessory-item-ratings">
            {/* <div className="first">
              <img src={fassets.rating_starts} alt="" /><span>{reviews}</span>
            </div>
            <p><span>Total Ratings : </span>{reviewCount}</p> */}
          </div>
          <div className="accessory-item-price">
            <div className="prices">
              <p className="accessory-item-new-price">&#8377;{price.oldPrice} </p>
              <p className="accessory-item-old-price">&#8377;{price.newPrice}</p>
            </div>
          </div>

          <p className="accessory-item-category" id="ctgs" ><span >Fit In : </span><p id="ctg-sub-ctg"> {category} {!subcategory? "" : <img src={fassets.arrow_icon}  alt="" />}{subcategory}</p></p>
        </div>
        <Link to={`/accessory/${_id}`}><button className="view-more">View More..</button></Link>
      </div>
    </>
  )
}
export default AccessoriesItem;