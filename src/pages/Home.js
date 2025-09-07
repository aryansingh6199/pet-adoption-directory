import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Pet Paradise 🐾</h1>
          <p>
            Find your new furry friend today! We connect loving homes with pets
            who need them.
          </p>
          <button className="cta-button">Adopt Now</button>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="featured-pets">
        <h2>Featured Pets</h2>
        <div className="pet-cards">
          <div className="pet-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV1RlrbxJfEqwRJACDSVzfUmCqSdrP8QUkYA&s"
              alt="Cute Kitten"
            />
            <h3>Whiskers</h3>
            <p>2-year-old playful tabby cat</p>
            <button className="adopt-button">Adopt Me</button>
          </div>
          <div className="pet-card">
            <img
              src="https://i.pinimg.com/564x/81/c5/9d/81c59dec5d0e295267681c3eab5814fc.jpg"
              alt="Friendly Dog"
            />
            <h3>Buddy</h3>
            <p>3-year-old golden retriever</p>
            <button className="adopt-button">Adopt Me</button>
          </div>
          <div className="pet-card">
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/wolf-dog-breeds-1-northern-inuit-dog-1570410472.jpg"
              alt="Adorable Kitten"
            />
            <h3>Luna</h3>
            <p>1-year-old black and white kitten</p>
            <button className="adopt-button">Adopt Me</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
