import React from "react";
import './Navbar.css'
import logo from '../../assets/logo.png'
import nav_profile from '../../assets/navProfile.png'




const Navbar = ({OnLogOut}) => {

    const login_page=() =>{
        OnLogOut();
    }

    return (

            <div className="navbar">
                <img src={logo} alt="" className="nav-logo" />
                <div className="me">
                    <img src={nav_profile} alt="" className="nav-profile" />
                    <button onClick={login_page}>logout</button>
                </div>
            </div>
        

    )
}

export default Navbar
