import React from "react";

const Contact = () => (
  <div className="outer-container">
  <div className="content"> 
    <h1 className="title is-1">This is the Contact Page</h1>
    <form class = "contact-form" method = "POST">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="name">Email</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" rows="5"></textarea>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    <hr></hr>
    </form>
    </div>
    <div className="sidebar">
    <h1 className="title">Contact Us</h1>
  <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida,
      risus at dapibus aliquet, elit quam scelerisque tortor, nec accumsan eros
      nulla interdum justo. Pellentesque dignissim, sapien et congue rutrum,
      lorem tortor dapibus turpis, sit amet vestibulum eros mi et odio.
    </p>
  </div>
  </div>
);

export default Contact;