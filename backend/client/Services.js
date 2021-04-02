import React, { Fragment } from "react";
import Input from './Components/Input';
import List from './Components/List';

const Services = () => (
<Fragment>
  <div className="outer-container">
  <div className="content"> 

    <h1 className="title is-1">This is the Services Page</h1>
    <Input></Input>
     <List></List>
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
  </Fragment>
);

export default Services;