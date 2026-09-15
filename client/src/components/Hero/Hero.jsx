import "./Hero.css";

import heroBg from "../../assets/images/hero/hero-bg.jpg";
import groceryBag from "../../assets/images/hero/grocery-bag.png";

function Hero() {

  // Scroll function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="home"
      className="hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="overlay"></div>

      <div className="hero-content">

        <span className="hero-tag">
          Freshness You Can Trust
        </span>

        <h1>
          Fresh Groceries
          <br />
          Delivered to
          <br />
          <span>Your Doorstep</span>
        </h1>

        <p>
          Discover farm-fresh fruits, vegetables, dairy, bakery,
          beverages, and everyday essentials delivered quickly
          at the best prices.
        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={() => scrollToSection("featured-products")}
          >
            Shop Now
          </button>

          <button
            className="secondary-btn"
            onClick={() => scrollToSection("categories")}
          >
            Explore Categories
          </button>

        </div>

      </div>

      <div className="hero-image">

        <img
          src={groceryBag}
          alt="LocalMart Grocery Bag"
        />

      </div>

    </section>
  );
}

export default Hero;