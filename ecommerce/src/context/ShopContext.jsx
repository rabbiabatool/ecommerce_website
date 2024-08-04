import React, { createContext, useState } from "react";
import { useEffect } from "react";





export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index=0; index < 20+1; index++){
        cart[index]= 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {


    const [all_products,setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());



    useEffect(()=>{

        fetch('http://localhost:4000/all_products')
        .then((response)=>response.json())
        .then((data)=>setAllProducts(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            })
            .then((response)=>response.json())
            .then((data)=>setCartItems(data))
        }
    },[])

    const addToCart = (itemId) => {
    
        
        if(localStorage.getItem('auth-token')){

            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

            fetch('http://localhost:4000/add_to_cart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
                
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
        else{

            window.location.replace("#/login");
    
        }
    };

    const removeCart = (itemId) =>{
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]- 1}));

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removeCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
                
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
        
    };
    
    
    const getTotal = () => {

        let Total = 0;

        for (const itemId in cartItems) {

            if (cartItems[itemId] > 0) {
                console.log('hello');
                let itemInfo = all_products.find((product) => product.id === Number(itemId));
                
                  Total += itemInfo.new_price * cartItems[itemId];
                
            }
        }
        return Total;
    };

    const getCart = () => {
        let total = 0;

        for(const item in cartItems){
            if(cartItems[item]>0){
                total+=cartItems[item];
            }
        }
        return total;
    };
    
    const contextValue = {getCart, getTotal,all_products,cartItems , addToCart, removeCart};

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

    
}
export default ShopContextProvider;



