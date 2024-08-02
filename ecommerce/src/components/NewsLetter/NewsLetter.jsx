import React from "react";
import './NewsLetter.css'
const NewsLetter = () => {
    return (

        <div className="news_letter">
            <h1>Get Exclusive Offers on your Email</h1>
            <p>Subscribe to our news letter and stay updated</p>
            <div>
                <input type="email" placeholder="Your Email Id" />
                <button>Subscribe</button>
            </div>
        </div>
    )
}

export default NewsLetter
