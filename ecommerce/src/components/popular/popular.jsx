import React from "react";
import './popular.css';
import Item from "../item/item";
import { useState } from "react";
import { useEffect } from "react";

const Popular = () => {
    const [Data_product,setCollection] = useState([]);
    useEffect(()=>{
        fetch('https://ecommerce-website-server-psi.vercel.app/popular')
        .then((response)=>response.json())
        .then((data)=>setCollection(data))

    },[]);


    return (

        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {Data_product.map((item) => (
                    <Item 
                        key={item.id} // Add key for React to track elements
                        id={item.id} 
                        name={item.name} 
                        image={item.image} 
                        new_price={item.new_price} 
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    );
};

export default Popular;


