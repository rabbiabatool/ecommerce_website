import React, { useState,useEffect } from "react";
import './ListProduct.css'

const ListProduct = () => {

        const [allProducts,setAllProducts] = useState([]);

        const fetchInfo = async ()=> {
            await fetch('http://localhost:4000/all_products')
            .then((resp)=>resp.json())
            .then((data)=>{setAllProducts(data)});

        }

        useEffect(()=>{
            fetchInfo();
        },[])

        const removeProduct = async (id)=>{
            await fetch('http://localhost:4000/remove_product',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-type':'application/json'
                },
                body:JSON.stringify({"id":id})
            })
            await fetchInfo();
        }
    
    return (
    
        <div className="list_product">
            <h1>All Products list</h1>
            <div className="list_product_format_main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="list_product_all">
                <hr />
                {allProducts.map((product,index)=>{
                    return <><div key={index} className="list_product_format_main list_product_format">
                        <img src={product.image} alt="" className="list_product_icon" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <i className="fa fa-remove remove_icon" onClick={()=>{removeProduct(product.id)}}></i>
                    </div>
                    <hr />
                    </>
                })}

            </div>

        </div>
    )
}

export default ListProduct
