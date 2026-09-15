import "./WhyChoose.css";

import deliveryGirl from "../../assets/images/whychoose/delivery-girl.png";

import {
  FaTruckFast,
  FaLeaf,
  FaShieldHalved,
  FaHeadset,
} from "react-icons/fa6";

const WhyChoose = () => {

  // Smooth scroll
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
      className="why"
      id="about"
    >

      {/* Decorative Background */}

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>


      <div className="why-container">

        {/* ================= LEFT ================= */}

        <div className="why-left">

          <span className="why-tag">
            Why Choose LocalMart
          </span>


          <h2>
            Grocery Shopping
            <br />
            Made <span>Smarter & Faster</span>
          </h2>


          <p>
            Fresh groceries delivered from trusted local stores in
            just minutes. Enjoy premium quality, secure payments
            and an amazing shopping experience.
          </p>


          <div className="why-features">

            <div className="feature-box">

              <FaTruckFast />

              <div>

                <h4>
                  10 Minute Delivery
                </h4>

                <p>
                  Lightning fast delivery across your city.
                </p>

              </div>

            </div>


            <div className="feature-box">

              <FaLeaf />

              <div>

                <h4>
                  Farm Fresh Products
                </h4>

                <p>
                  Fresh vegetables & fruits delivered daily.
                </p>

              </div>

            </div>


            <div className="feature-box">

              <FaShieldHalved />

              <div>

                <h4>
                  Secure Payments
                </h4>

                <p>
                  UPI, Cards, Wallets & COD supported.
                </p>

              </div>

            </div>


            <div className="feature-box">

              <FaHeadset />

              <div>

                <h4>
                  24×7 Support
                </h4>

                <p>
                  Always ready to help whenever you need.
                </p>

              </div>

            </div>

          </div>


          <button
            className="why-btn"
            onClick={() => scrollToSection("reviews")}
          >
            Explore More →
          </button>

        </div>


        {/* ================= RIGHT ================= */}

        <div className="why-right">

          <div className="girl-glow"></div>


          <img
            src={deliveryGirl}
            alt="LocalMart Delivery Partner"
            className="delivery-girl"
          />


          <div className="floating-card card1">

            🚚

            <span>
              10 Min Delivery
            </span>

          </div>


          <div className="floating-card card2">

            ⭐

            <span>
              4.9 Rating
            </span>

          </div>

        </div>

      </div>


      {/* ================= STATS ================= */}

      <div className="why-stats">

        <div className="stat">

          <h2>
            50K+
          </h2>

          <p>
            Happy Customers
          </p>

        </div>


        <div className="stat">

          <h2>
            10M+
          </h2>

          <p>
            Orders Delivered
          </p>

        </div>


        <div className="stat">

          <h2>
            4.9★
          </h2>

          <p>
            Average Rating
          </p>

        </div>


        <div className="stat">

          <h2>
            99%
          </h2>

          <p>
            Customer Satisfaction
          </p>

        </div>

      </div>

    </section>
  );
};

export default WhyChoose;