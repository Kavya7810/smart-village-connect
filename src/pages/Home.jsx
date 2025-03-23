import React from "react";
import { Carousel } from "react-bootstrap";
import "../styles/Home.css";

import img1 from "../assets/village1.jpg"; 
import img2 from "../assets/village2.jpg"; 
import img3 from "../assets/village3.jpg"; 

const Home = () => {
  return (
    <div className="home-container">
      <Carousel controls={true} indicators={true} pause={false} interval={2000} className="custom-carousel">
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={img1} alt="Village 1" />
          <Carousel.Caption className="overlay">
            <h1>Innovation in Agriculture</h1>
            <p>Bringing technology to rural farming.</p>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={img2} alt="Village 2" />
          <Carousel.Caption className="overlay">
            <h1>Smart Infrastructure</h1>
            <p>Building sustainable and connected villages.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={img3} alt="Village 3" />
          <Carousel.Caption className="overlay">
            <h1>Empowering Rural Communities</h1>
            <p>Enhancing lives through technology and education.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;

