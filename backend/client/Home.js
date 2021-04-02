import React from "react";
import Showcase from './Components/Showcase';
import Section from './Components/Section';


const Home = () => (
  <div>
    <div className = "main">
            <Showcase></Showcase>
        </div>
    <div className = "section-top">

    <Section></Section>
    </div>
  </div>
);

export default Home;