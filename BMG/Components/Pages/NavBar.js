import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';

const NavBar = ({setAuth}) => {
    
 
    
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
    
    
    
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });
      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.warning("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  
    return(
     <Fragment>
    <nav>
        {/* Logo */}
        <div className="logo">
            <i className="fas fa-poll"></i>
            <h4>BMG</h4>
        </div>
        {/* Toggle Navbar    */}
        <ul className= {renderClassses()}  setAuth={true}>
            {/* navbar links */}
            <li><Link className = "link" to="/">Home <i className="fas fa-home"></i></Link></li>
            <li><Link className = "link" to="./About">About <i className="fas fa-users"></i></Link></li>
            <li><Link className = "link" to="./Contact">Contact <i className="fas fa-phone"></i></Link></li>
            {/* <a href = "#" onClick={e  => logout(e).then(setAuth)} >Logout</a> */}
            {
                localStorage.getItem("token") ? 
                <>
                <li><Link className = "link" to="./Rewards">Rewards <i className="fas fa-handshake"></i></Link></li>
                 <li><Link className = "link" to="/Dashboard" onChange={e =>  logout(e)}>Dashboard <i className="fas fa-sign-out-alt"></i></Link></li> 
                 {/* <button onClick={e => logout(e)} className="btn btn-primary">Logout </button> */}
                </>
                :
                <>
                <li><Link className = "link" to="./Register" >Register <i className="fas fa-users"></i></Link></li>
                <li><Link className = "link" to="./Login" >Login <i className="fas fa-user-circle"></i></Link></li>
                </>
            }
            
           
        </ul>

        <div onClick= {handleNavLinksToggle} className="hamburger-toggle">
            <i className="fas fa-bars fa-lg"></i>
        </div>
       
    </nav> 
    </Fragment>
    
 )   
}
export default NavBar;