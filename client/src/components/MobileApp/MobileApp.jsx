import "./MobileApp.css";

import {
  FaCheckCircle,
  FaGooglePlay,
  FaApple,
  FaLocationArrow,
  FaStore,
  FaTags,
  FaTruck,
  FaArrowRight,
} from "react-icons/fa";

import mobileApp from "../../assets/images/app/mobile-app.png";

const MobileApp = () => {
  return (
    <section className="mobile-app-section">

      <div className="mobile-app-wrapper">

        {/* ================= LEFT SIDE ================= */}

        <div className="mobile-app-visual">

          <div className="phone-glow"></div>

          <div className="app-image-box">
            <img
              src={mobileApp}
              alt="LocalMart mobile grocery shopping app"
            />
          </div>

          {/* Floating Card */}

          <div className="app-floating-card floating-delivery">
            <div className="floating-icon">
              <FaTruck />
            </div>

            <div>
              <strong>10-20 Min</strong>
              <span>Fast Delivery</span>
            </div>
          </div>

          {/* Floating Card */}

          <div className="app-floating-card floating-store">
            <div className="floating-icon">
              <FaStore />
            </div>

            <div>
              <strong>Nearby Stores</strong>
              <span>Shop locally</span>
            </div>
          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div className="mobile-app-content">

          <div className="app-tag">
            <span>📱</span>
            LocalMart Mobile App
          </div>

          <h2>
            Your Local Market,
            <span> Right In Your Pocket.</span>
          </h2>

          <p className="app-description">
            Discover nearby stores, compare prices and get fresh
            groceries delivered straight to your doorstep — all from
            one simple app.
          </p>


          {/* ================= BENEFITS ================= */}

          <div className="app-benefits">

            <div className="app-benefit">

              <div className="benefit-icon">
                <FaLocationArrow />
              </div>

              <div>
                <h4>Discover Nearby Stores</h4>

                <p>
                  Find trusted grocery stores available around your
                  location.
                </p>
              </div>

            </div>


            <div className="app-benefit">

              <div className="benefit-icon">
                <FaTags />
              </div>

              <div>
                <h4>Compare Prices</h4>

                <p>
                  Compare product prices across local stores and save
                  more.
                </p>
              </div>

            </div>


            <div className="app-benefit">

              <div className="benefit-icon">
                <FaCheckCircle />
              </div>

              <div>
                <h4>Check Product Availability</h4>

                <p>
                  Know which nearby store has the product before
                  placing your order.
                </p>
              </div>

            </div>


            <div className="app-benefit">

              <div className="benefit-icon">
                <FaTruck />
              </div>

              <div>
                <h4>Track Your Delivery</h4>

                <p>
                  Follow your grocery order from the store to your
                  doorstep.
                </p>
              </div>

            </div>

          </div>


          {/* ================= DOWNLOAD ================= */}

          <div className="app-download-area">

            <p className="download-title">
              Download the LocalMart App
            </p>

            <div className="download-buttons">

              <button className="store-button">

                <FaGooglePlay />

                <div>
                  <span>GET IT ON</span>
                  <strong>Google Play</strong>
                </div>

              </button>


              <button className="store-button">

                <FaApple />

                <div>
                  <span>Download on the</span>
                  <strong>App Store</strong>
                </div>

              </button>

            </div>

          </div>


          {/* ================= SMALL INFO ================= */}

          <div className="app-small-info">

            <div className="app-users">
              <div className="user-circle">10K+</div>

              <div>
                <strong>Happy Shoppers</strong>
                <span>Growing every day</span>
              </div>
            </div>

            <button className="learn-app-btn">
              Explore App
              <FaArrowRight />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default MobileApp;