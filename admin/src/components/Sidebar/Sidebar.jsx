import React from "react";
import './Sidebar.css'
import {Link} from 'react-router-dom'
import Add from '../../assets/cart_icon.png'
import List from '../../assets/list.png'

const Sidebar = () => {
    return (

            <div className="sidebar">
                <Link to={'/add_product'} style={{ textDecoration: "none" }}>
                    <div className="sidebar-item">
                        <img src={Add} alt="" className="add" />
                        <p>Add product</p>
                    </div>
                </Link>
                <Link to={'/all_products'} style={{ textDecoration: "none" }}>
                    <div className="sidebar-item">
                        <img src={List} alt="" className="list" />
                        <p>Product list</p>
                    </div>
                </Link>
                <Link to={'/view_order'} style={{ textDecoration: "none" }}>
                    <div className="sidebar-item">
                        <img src={List} alt="" className="list" />
                        <p>View Orders</p>
                    </div>
                </Link>

            </div>
    )
}

export default Sidebar
