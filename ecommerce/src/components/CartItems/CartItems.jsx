import React, { useContext } from "react";
import './CartItems.css'
import { ShopContext } from "../../context/ShopContext";
import {loadStripe} from '@stripe/stripe-js';

const CartItems = () => {
    const {getTotal, all_products, cartItems, removeCart} = useContext(ShopContext);

    const paymentHandler = async () => {
        // Load the Stripe object using the publishable key
        const stripe = await loadStripe("pk_test_51Phy2JAfxtUK8UfaHFh5eP82w1KVcElB81pEj2TWE4xMNT8CJQgUCd4uRElKbpocsRhQSAHSjmaSwb3MTPxcHqfQ00WZ2y9J2S");
        
        // Prepare the request body and headers
        const body = {
            products: all_products.map(item=> ({
        

                        id: item.id,
                        name: item.name,
                        new_price: item.new_price, // Ensure this is sent as a number
                        quantity: item.quantity

            }))
        };
        console.log("Products to be sent:", body.products);
        const headers = {
            "Content-Type": "application/json"
        };
        
        try {
            // Send request to your server to create a checkout session
            const response = await fetch('http://localhost:4000/create-checkout-session', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const session = await response.json();
    
            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });
    
            if (result.error) {
                // Handle any errors from Stripe Checkout
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (

        <div className="cart_items">
            <div className="cart_items_format_main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_products.map((e)=>{
                if(cartItems[e.id]>0)
                {
            
                    return <div>
                        <div className="cart_items_format cart_items_format_main">
                            <img src={e.image} alt="" className="cart_icon" />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <button className="cart_items_quantity">{cartItems[e.id]}</button>
                            <p>${e.new_price*cartItems[e.id]}</p>
                            <i className="fa fa-remove remove_icon" onClick={() => { removeCart(e.id) }}></i>
                        </div>
                    </div>
                }
                return null;

            })}
            <div className="cart_items_down">
                <div className="cart_items_total">
                    <h1>cart Totals</h1>
                    <div>
                        <div className="cart_items_total_item">
                            <p>SubTotal</p>
                            <p>${getTotal()}</p>
                        </div>
                        <hr />
                        <div className="cart_items_total_item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cart_items_total_item">
                            <h3>Total</h3>
                            <h3>${getTotal()}</h3>
                        </div>
                    </div>
                    <button onClick={()=>{paymentHandler()}}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart_items_promo">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cart_items_promo_box">
                        <input type="text" placeholder="promo code" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems
