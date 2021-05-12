import React from "react";


const Footer = () => {
  return (
      <div className="main-footer">
        <div className="container">
          <div className="row">
            {/* Column1 */}
            <div className="col">
              <h4>About BMG</h4>
              <ul className="list-unstyled">
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
              </ul>
            </div>
            {/* Column2 */}
            <div className="col">
              <h4>Contact Us</h4>
              <ul className="list-unstyled">
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
              </ul>
            </div>
            {/* Column3 */}
            <div className="col">
              <h4>Hello World</h4>
              <ul className="list-unstyled">
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
              </ul>
            </div>
          </div>
          <hr></hr>
          <div className="row">
            <p className="col-sm">
              &copy;{new Date().getFullYear()} BMG | All rights reserved | Terms
              of conditions | privacy
            </p>
          </div>
        </div>
      </div>
  );
};
export default Footer;
