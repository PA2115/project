import React, { Fragment } from "react";
import Footer from '../Components/Navbar/Footer';
const Contact = () => (
  <Fragment>
  <div className="container">
  <div className="content"> 
    <form className = "contact-form" method = "POST">
      <h1 className="my-5 ">Contact Form</h1>
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
   <Footer></Footer>
  </Fragment>
);

export default Contact;