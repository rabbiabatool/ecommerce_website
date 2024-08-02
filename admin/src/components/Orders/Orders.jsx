import React, { useEffect, useState } from "react";
import './Orders.css';

const Orders = () =>{

    const [allOrders,setAllOrders] = useState([]);

    const [allProducts,setAllProducts] = useState([]);



    const fetchInfo = async ()=> {
        try {
            // Fetch both requests concurrently using Promise.all  
            const [orderData, productData] = await Promise.all([
                fetch('http://localhost:4000/view_order').then((resp) => resp.json()),
                fetch('http://localhost:4000/all_products').then((resp) => resp.json()),
            ]);

            setAllOrders(orderData);
            setAllProducts(productData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }  
    
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const removeProduct = async (email)=>{
        await fetch('http://localhost:4000/remove_order',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({"email":email}),
        })
        await fetchInfo();
    }
    let total=0;

    return (

        <div className="list_product">
            <h1>All Orders list</h1>
            <div className="list_product_format_main">
                <p>Email</p>
                <p>Cart Data (product id: quantity: price)</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <div className="list_product_all">
                <hr />
                {allOrders.map((product, index) => {
                    return <><div key={index} className="list_product_format_main list_product_format">
                        
                        <p>${product.email}</p>
                        <div>
                            <ul>
                                {Object.entries(product.cartData).map(([index, quantity]) => {
                                    if (quantity > 0) {
                                        const productDetails = allProducts.find((e)=>e.id===Number(index));
                
                                        total+=productDetails.new_price*quantity;
                                            return (
                                                <li key={index}>
                                                    {index} &nbsp; {quantity} &nbsp; {productDetails.new_price*quantity},
                                                </li>
                                            );
                                    }
                                    return null; // Don't render items with quantity 0  
                                })}
                                {Object.keys(product.cartData).length === 0 && (
                                    <li>Your cart is empty.</li>
                                )}
                            </ul>  
                        </div>
                        <p>${total}</p>
                        <i className="fa fa-remove remove_icon" onClick={() => { removeProduct(product.email) }}></i>
                    </div>
                        <hr />
                    </>
                })}

            </div>

        </div>
    )
}
export default Orders