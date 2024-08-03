import React from "react";
import './CSS/loginSignup.css'
import { useState } from "react";

const LoginSignup = () => {
    // const [menu,setMenu] = useState("shop");

    const [state,setState]= useState("Login");

    const [formData,setFormData] = useState({
        username:"",
        email :"",
        password: ""
        
    });

    const changeHandler = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
        
    }

    const login = async () =>{
        console.log("login");
        let responseData;

        await fetch('https://ecommerce-website-server-psi.vercel.app/login',{

            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',

            },

            body:JSON.stringify(formData),

        }).then((response)=> response.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors);
        }
    }

    const signup = async () =>{

        console.log("signup");
        let responseData;

        await fetch('https://ecommerce-website-server-psi.vercel.app/signup',{

            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',

            },

            body:JSON.stringify(formData),

        }).then((response)=> response.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors);
        }
    }


    return (
        
        <div className="login_sign_up">
            <div className="login_sign_up-container">
                <h1>{state}</h1>
                <div className="login_sign_up-fields">
                    {state==="Sign Up"?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder='Your name' />:<></>}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button onClick={()=>{state ==="Login"?login():signup()}}>Continue</button>
                {state==="Sign Up"?<p className="login_sign_up_login">Already have an account ? <span onClick={()=>{setState("Login")}}>Login here</span></p>: <p className="login_sign_up_login">Create an account ? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
                <div className="login_sign_up_agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing , I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
        
    )
}

export default LoginSignup
