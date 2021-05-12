import React from 'react'
import {Link} from 'react-router-dom'


export default function showcase() {
    return (
        <div className = "showcase">
            <h2>Lorem ipsum dolor sit amet</h2>
            <h1>Neque porro quisquam</h1>
            <p>consectetur adipiscing elit. Etiam bibendum a est sit amet mattis</p>
<div className="showcase__buttons">
    
    <Link to = '../Services'><button  className="showcase__btn-services">Services</button></Link>
    <Link to = '../About'><button className="showcase__btn-about">About</button></Link>


</div>
        </div>
    )
}
