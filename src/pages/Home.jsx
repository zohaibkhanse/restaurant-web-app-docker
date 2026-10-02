import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <section className="hero">
      <div className="overlay">
        <h1>Welcome to Bistro Delight</h1>

        <p className="subtitle">
          Experience exceptional dining with handcrafted dishes prepared by our
          world-class chefs using the freshest ingredients.
        </p>

        <p className="description">
          Whether you're celebrating a special occasion, enjoying a family
          dinner, or simply craving delicious food, Bistro Delight offers a
          warm atmosphere, outstanding service, and unforgettable flavors.
        </p>

        <Link to="/menu" className="btn">
          Explore Our Menu
        </Link>

        <div className="features">
          <div className="feature">
            <h3>🍽️ Premium Cuisine</h3>
            <p>
              Fresh ingredients prepared with passion and creativity.
            </p>
          </div>

          <div className="feature">
            <h3>👨‍🍳 Expert Chefs</h3>
            <p>
              Our experienced chefs craft every dish to perfection.
            </p>
          </div>

          <div className="feature">
            <h3>⭐ Cozy Atmosphere</h3>
            <p>
              Perfect for family dinners, dates and celebrations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;