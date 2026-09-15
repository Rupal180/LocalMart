import "./Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaGooglePlay,
  FaApple,
  FaShieldHalved,
  FaTruckFast,
  FaRotateLeft,
  FaHeadset,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">

      {/* =========================================
                    TOP SERVICE STRIP
      ========================================== */}

      <div className="footer-service-wrapper">

        <div className="footer-services">

          <div className="footer-service">
            <div className="footer-service-icon">
              <FaTruckFast />
            </div>

            <div>
              <h4>Fast Delivery</h4>
              <p>Groceries at your doorstep</p>
            </div>
          </div>


          <div className="footer-service">
            <div className="footer-service-icon">
              <FaShieldHalved />
            </div>

            <div>
              <h4>Secure Payments</h4>
              <p>100% protected payments</p>
            </div>
          </div>


          <div className="footer-service">
            <div className="footer-service-icon">
              <FaRotateLeft />
            </div>

            <div>
              <h4>Easy Returns</h4>
              <p>Simple & hassle-free support</p>
            </div>
          </div>


          <div className="footer-service">
            <div className="footer-service-icon">
              <FaHeadset />
            </div>

            <div>
              <h4>24×7 Support</h4>
              <p>We're always here to help</p>
            </div>
          </div>

        </div>

      </div>


      {/* =========================================
                    MAIN FOOTER
      ========================================== */}

      <div className="footer-main">

        <div className="footer-container">

          {/* BRAND COLUMN */}

          <div className="footer-brand">

            <div className="footer-logo">
              <span className="footer-cart">🛒</span>
              <h2>LocalMart</h2>
            </div>

            <p className="footer-about">
              Your smarter way to shop locally. Discover nearby stores,
              compare prices and get everyday essentials delivered
              straight to your doorstep.
            </p>


            {/* CONTACT */}

            <div className="footer-contact">

              <div>
                <FaLocationDot />

                <span>
                  Punjab, India
                </span>
              </div>


              <div>
                <FaPhone />

                <span>
                  +91 98765 43210
                </span>
              </div>


              <div>
                <FaEnvelope />

                <span>
                  support@localmart.com
                </span>
              </div>

            </div>


            {/* SOCIAL */}

            <div className="footer-social">

              <button aria-label="Facebook">
                <FaFacebookF />
              </button>

              <button aria-label="Instagram">
                <FaInstagram />
              </button>

              <button aria-label="Twitter">
                <FaXTwitter />
              </button>

              <button aria-label="YouTube">
                <FaYoutube />
              </button>

              <button aria-label="LinkedIn">
                <FaLinkedinIn />
              </button>

            </div>

          </div>


          {/* SHOP */}

          <div className="footer-column">

            <h3>Shop</h3>

            <ul>
              <li>
                <a href="#">Groceries</a>
              </li>

              <li>
                <a href="#">Fresh Fruits</a>
              </li>

              <li>
                <a href="#">Vegetables</a>
              </li>

              <li>
                <a href="#">Dairy & Eggs</a>
              </li>

              <li>
                <a href="#">Snacks</a>
              </li>

              <li>
                <a href="#">Beverages</a>
              </li>

              <li>
                <a href="#">Household</a>
              </li>
            </ul>

          </div>


          {/* LOCALMART */}

          <div className="footer-column">

            <h3>LocalMart</h3>

            <ul>
              <li>
                <a href="#">About Us</a>
              </li>

              <li>
                <a href="#">Nearby Stores</a>
              </li>

              <li>
                <a href="#">Compare Prices</a>
              </li>

              <li>
                <a href="#">Today's Deals</a>
              </li>

              <li>
                <a href="#">Brands</a>
              </li>

              <li>
                <a href="#">Careers</a>
              </li>

              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>

          </div>


          {/* SUPPORT */}

          <div className="footer-column">

            <h3>Help & Support</h3>

            <ul>
              <li>
                <a href="#">Help Center</a>
              </li>

              <li>
                <a href="#">Track Order</a>
              </li>

              <li>
                <a href="#">Delivery Information</a>
              </li>

              <li>
                <a href="#">Returns & Refunds</a>
              </li>

              <li>
                <a href="#">Payment Options</a>
              </li>

              <li>
                <a href="#">FAQs</a>
              </li>

              <li>
                <a href="#">Report a Problem</a>
              </li>
            </ul>

          </div>


          {/* PARTNERS */}

          <div className="footer-column footer-partner-column">

            <h3>Partner With Us</h3>

            <ul>
              <li>
                <a href="#">Sell on LocalMart</a>
              </li>

              <li>
                <a href="#">Register Your Store</a>
              </li>

              <li>
                <a href="#">Seller Dashboard</a>
              </li>

              <li>
                <a href="#">Become a Delivery Partner</a>
              </li>

              <li>
                <a href="#">Partner Support</a>
              </li>
            </ul>


            <div className="footer-partner-box">

              <span>🏪</span>

              <div>
                <strong>Own a local store?</strong>

                <p>
                  Grow your business with LocalMart.
                </p>
              </div>

              <button aria-label="Register store">
                <FaArrowRight />
              </button>

            </div>

          </div>

        </div>


        {/* =========================================
                    APP DOWNLOAD
        ========================================== */}

        <div className="footer-app-row">

          <div className="footer-app-text">

            <span className="footer-app-icon">
              📱
            </span>

            <div>
              <h4>Shop faster with the LocalMart App</h4>

              <p>
                Nearby stores, better prices and faster delivery.
              </p>
            </div>

          </div>


          <div className="footer-app-buttons">

            <button>

              <FaGooglePlay />

              <div>
                <span>GET IT ON</span>
                <strong>Google Play</strong>
              </div>

            </button>


            <button>

              <FaApple />

              <div>
                <span>Download on the</span>
                <strong>App Store</strong>
              </div>

            </button>

          </div>

        </div>


        {/* =========================================
                      BOTTOM
        ========================================== */}

        <div className="footer-bottom">

          <p>
            © 2026 LocalMart. All rights reserved.
          </p>


          <div className="footer-legal">

            <a href="#">
              Privacy Policy
            </a>

            <span></span>

            <a href="#">
              Terms & Conditions
            </a>

            <span></span>

            <a href="#">
              Cookie Policy
            </a>

          </div>


          <div className="footer-payment">

            <span>Secure Payments</span>

            <div className="payment-badges">

              <div>UPI</div>

              <div>VISA</div>

              <div>RuPay</div>

              <div>COD</div>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;