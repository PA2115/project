import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    const [navLinkOpen, navLinkToggle]=useState(false);

    const handleNavLinksToggle = () => {
        navLinkToggle(!navLinkOpen);
    };
    const renderClassses = () => {
        let classes = "navlinks";

        if(navLinkOpen){
            classes += " active";
        }
        return classes;
    };
    return(
     
    <nav>
        {/* Logo */}
        <div className="logo">
            <i className="fas fa-poll"></i>
            <h4>BMG</h4>
        </div>
        {/* Toggle Navbar    */}
        
        <ul className= {renderClassses()} >
            {/* navbar links */}
            <li><Link className = "link" to="/">Home <i className="fas fa-home"></i></Link></li>
            <li><Link className = "link" to="./About">About <i className="fas fa-users"></i></Link></li>
            <li><Link className = "link" to="./Services">Services <i className="fas fa-handshake"></i></Link></li>
            <li><Link className = "link" to="./Contact">Contact <i className="fas fa-phone"></i></Link></li>
            <li><Link className = "link" to="./Login">Login <i className="fas fa-user-circle"></i></Link></li>
        </ul>
     
        <div onClick= {handleNavLinksToggle} className="hamburger-toggle">
            <i className="fas fa-bars fa-lg"></i>
        </div>
       
    </nav> 

    
 )   
}
export default NavBar;