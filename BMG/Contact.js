import React, { Fragment } from "react";
import styled from 'styled-components';
// import Footer from "./Components/Pages/Footer";

// const Style = styled.div`
//   .container{
//     padding-top:50px;
//   }
//   h1{
//     font-family: "arial";
//   }
//   .name{
//     font-family: "arial";
//     text-decoration:none;
//   }
// `;
const Contact = () => (

  <Fragment>
  <div className="container">
  <div className="content"> 
    
    <form class = "contact-form" method = "POST">
      <h1>Contact Form</h1>
      <div className="form-group">
        <label className="name">Name</label>
        <input type="text" className="cform-control" />
      </div>
      <div className="form-group">
        <label className="name">Email</label>
        <input type="text" className="cform-control" />
      </div>
      <div className="form-group">
        <label className="message">Message</label>
        <textarea className="cform-control" rows="5"></textarea>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    <hr></hr>
    </form>
    </div>
   </div> 
  </Fragment>
);

export default Contact;