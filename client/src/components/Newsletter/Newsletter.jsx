import "./Newsletter.css";

import {
  FaEnvelope,
  FaArrowRight,
  FaTag,
  FaBell,
  FaGift,
  FaCircleCheck,
} from "react-icons/fa6";

const Newsletter = () => {
  return (
    <section className="newsletter-section">

      <div className="newsletter-container">

        {/* Decorative Elements */}
        <div className="newsletter-circle circle-one"></div>
        <div className="newsletter-circle circle-two"></div>

        <div className="newsletter-content">

          {/* LEFT */}

          <div className="newsletter-left">

            <div className="newsletter-badge">
              <FaBell />
              Stay in the Loop
            </div>

            <h2>
              Fresh Deals,
              <span> Straight to Your Inbox.</span>
            </h2>

            <p className="newsletter-description">
              Subscribe to LocalMart and be the first to discover
              exclusive offers, nearby store deals, new arrivals and
              special savings.
            </p>

            {/* Benefits */}

            <div className="newsletter-benefits">

              <div className="newsletter-benefit">
                <FaTag />
                <span>Exclusive Deals</span>
              </div>

              <div className="newsletter-benefit">
                <FaGift />
                <span>Special Rewards</span>
              </div>

              <div className="newsletter-benefit">
                <FaCircleCheck />
                <span>No Spam</span>
              </div>

            </div>

          </div>


          {/* RIGHT */}

          <div className="newsletter-right">

            <div className="subscribe-card">

              <div className="mail-icon">
                <FaEnvelope />
              </div>

              <h3>Join the LocalMart Family</h3>

              <p>
                Get weekly deals and updates from stores near you.
              </p>

              <form
                className="newsletter-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="newsletter-input">

                  <FaEnvelope />

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />

                </div>

                <button type="submit">
                  Subscribe
                  <FaArrowRight />
                </button>

              </form>

              <div className="newsletter-note">
                <FaCircleCheck />

                <span>
                  Free to join. Unsubscribe anytime.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Newsletter;