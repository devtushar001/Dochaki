import React from "react";
import './ExploreMenu.css';
import {menu_list} from '../../assets/assets';

const ExploreMenu = ({category, setCategory}) => {
    return (
        <>
            <div className="explore-menu" id="explore-menu">
                <h1>Explore our menu</h1>
                <p className="explore-menu-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis aperiam, repudiandae quas molestiae suscipit ratione sequi ea dignissimos, amet libero nemo optio? Sed facere recusandae cupiditate esse deserunt ullam quasi.</p>
                <div className="explore-menu-list">
                    {menu_list.map((item, i)=> {
                        return (
                            <div key={i} className="explore-menu-list-item" onClick={()=>{setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}}>
                                  <img className={category === item.menu_name?"active":""} src={item.menu_image} alt="" />
                                  <p>{item.menu_name}</p>
                            </div>
                        )
                    })}
                </div>
                <hr />
            </div>
        </>
    )
}
export default ExploreMenu;