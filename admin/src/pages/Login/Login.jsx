import React from "react";
import './Login.css'
import { useState } from "react";


const Login = ({ onLogin }) => {


    const state = "login";

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

        await fetch('http://localhost:4000/ad_login',{

            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',

            },

            body:JSON.stringify(formData),

        }).then((response)=> response.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            onLogin();
        }
        else{
            alert(responseData.errors);
        }
    }

    // const signup = async () =>{

    //     console.log("signup");
    //     let responseData;

    //     await fetch('http://localhost:4000/signup',{

    //         method:'POST',
    //         headers:{
    //             Accept:'application/form-data',
    //             'Content-Type':'application/json',

    //         },

    //         body:JSON.stringify(formData),

    //     }).then((response)=> response.json()).then((data)=>responseData=data)

    //     if(responseData.success){
    //         localStorage.setItem('auth-token',responseData.token);
    
    //     }
    //     else{
    //         alert(responseData.errors);
    //     }
    // }


    return (
        
        <div className="login_sign_up">
            <div className="login_sign_up-container">
                <h1>{state}</h1>
                <div className="login_sign_up-fields">
                    {/* {state==="Sign Up"?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder='Your name' />:<></>} */}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button onClick={()=>{login()}}>Continue</button>
                {/* {state==="Sign Up"?<p className="login_sign_up_login">Already have an account ? <span onClick={()=>{setState("Login")}}>Login here</span></p>: <p className="login_sign_up_login">Create an account ? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>} */}

            </div>
        </div>
        
    )
}

export default Login
