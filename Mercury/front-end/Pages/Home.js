import React from "react";
import Showcase from '../Components/Navbar/Showcase';
import Section from '../Components/Navbar/Section';
import Footer from "../Components/Navbar/Footer";


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