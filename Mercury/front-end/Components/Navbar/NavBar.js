import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';

const NavBar = ({setAuth}) => {
  const [token, setToken] = useState(null);
    const [tokenExpirationTime, setTokenExpirationTime] = useState();
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
    
    
  //   const [name, setName] = useState("");

  //   const getProfile = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5000/dashboard/", {
  //         method: "POST",
  //         headers: { jwt_token: localStorage.token },
  //       });
  //       const parseData = await res.json();
  //       setName(parseData.user_name);
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };

  const logout = async (e) => {
    e.preventDefault();
    try {
      // setToken(null);
      // setTokenExpirationTime(null); 
      localStorage.clear();
      localStorage.removeItem("token");
      setAuth(false);
      toast.error("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  // useEffect(() => {
  //   getProfile();
    
  // }, []);
  const userLink = (
  <>
    <li><Link className = "link" to="./Register" >Register </Link></li>
    <li><Link className = "link" to="./Login" >Login </Link></li>
  </>
 );
 const loginLink =(
 <>
      <li><Link className = "link" to="./Rewards">Rewards </Link></li>
      <li><Link className = "link" to="/dashboard">Profile </Link></li>
      <li><Link className = "link" onClick={logout} to="/">Logout</Link></li>
 </>
 )
    return(
     <Fragment>
    <nav>
        <div className="logo">
            <i className="fas fa-poll"></i>
            <h4>Mercury</h4>
        </div>
        <ul className = {renderClassses()}>
            <li><Link className = "link" to="/">Home </Link></li>
            <li><Link className = "link" to="./About">About</Link></li>
            <li><Link className = "link" to="./Contact">Contact </Link></li>
            {!localStorage.getItem('token') ? userLink : loginLink}
        </ul>

        <div onClick= {handleNavLinksToggle} className="hamburger-toggle">
            <i className="fas fa-bars fa-lg"></i>
        </div>
       
    </nav> 
    </Fragment>
    
 )   
}
export default NavBar;

