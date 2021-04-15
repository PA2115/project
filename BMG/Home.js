import React from "react";
import Showcase from './Components/Pages/Showcase';
import Section from './Components/Pages/Section';
import Footer from "./Components/Pages/Footer";


const Home = () => (
  <div>
    <div className = "main">
            <Showcase></Showcase>
        </div>
    <div className = "section-top">

    <Section></Section>
    </div>
 <Footer></Footer>
  </div>
 
);

export default Home;