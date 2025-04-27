import React from "react";
import { Carousel } from "react-bootstrap";
import "../styles/Home.css";

import img1 from "../assets/village1.jpg"; 
import img4 from "../assets/village4.jpg"; 
import img3 from "../assets/village3.jpg"; 
import img7 from "../assets/village7.jpg";
import img2 from "../assets/village2.jpg"; 

const Home = () => {
  return (
    <div className="home-container">
      <Carousel
        controls
        indicators
        pause={false}
        interval={2000}
        className="custom-carousel"
      >
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={img1}
            alt="Village 1"
          />
          <Carousel.Caption className="overlay">
            <h1>Innovation in Agriculture</h1>
            <p>Introducing modern tools, precision farming, and digital platforms to help farmers increase productivity and sustainability in rural areas.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={img4}
            alt="Village 4"
          />
          <Carousel.Caption className="overlay">
            <h1>Smart Infrastructure</h1>
            <p>Developing roads, digital connectivity, clean water, and energy solutions to transform villages into self-sustained and future-ready communities.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={img3}
            alt="Village 3"
          />
          <Carousel.Caption className="overlay">
            <h1>Empowering Rural Communities</h1>
            <p>Fostering entrepreneurship, digital literacy, and access to resources to uplift rural populations and create equal opportunities for growth.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={img7}
            alt="Village 7"
          />
          <Carousel.Caption className="overlay">
            <h1>Rural Healthcare</h1>
            <p>Establishing well-equipped rural hospitals with telemedicine support, maternal care, and emergency services to ensure timely medical assistance.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={img2}
            alt="Village 2"
          />
          <Carousel.Caption className="overlay">
            <h1>Accessible Medical Support</h1>
            <p>Using technology and trained healthcare workers to deliver doorstep healthcare services, improving the quality of life in underserved regions.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;

