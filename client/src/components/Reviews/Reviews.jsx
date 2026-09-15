import "./Reviews.css";

import phc from "../../assets/images/reviews/phc.jpg";

import {
  FaStar,
  FaQuoteLeft,
  FaCircleCheck,
  FaThumbsUp,
  FaPen,
  FaArrowRight,
  FaComments,
  FaFaceSmile,
} from "react-icons/fa6";

const Reviews = () => {
  return (
    <section
      className="reviews"
      id="reviews"
    >

      {/* =========================
            HEADING BACKGROUND
      ========================== */}

      <div
        className="reviews-hero"
        style={{ backgroundImage: `url(${phc})` }}
      >
        <div className="reviews-hero-overlay"></div>

        <div className="reviews-heading">

          <span className="reviews-tag">
            ★ Loved by Thousands
          </span>

          <h2>
            Real Stories From Our
            <span> Happy Customers</span>
          </h2>

          <p>
            See why thousands of shoppers choose LocalMart for fresh
            groceries, fast delivery and everyday convenience.
          </p>

        </div>
      </div>


      {/* =========================
              REVIEWS AREA
      ========================== */}

      <div className="reviews-container">

        <div className="reviews-content">


          {/* =========================
                FEATURED REVIEW
          ========================== */}

          <div className="featured-review">

            <div className="featured-decoration"></div>

            <div className="featured-top">

              <div className="quote-box">
                <FaQuoteLeft />
              </div>

              <div className="featured-rating">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

                <span>5.0</span>
              </div>

            </div>


            <h3>
              “Fresh, fast and
              <br />
              super convenient!”
            </h3>


            <p className="featured-text">
              LocalMart has completely changed my grocery shopping
              experience. The vegetables were fresh, everything was
              packed carefully and my order reached me much faster
              than expected.
            </p>


            <div className="featured-bottom">

              <div className="featured-customer">

                <div className="featured-initial">
                  AS
                </div>

                <div>
                  <h4>Aanya Sharma</h4>

                  <p>
                    <FaCircleCheck />
                    Verified Purchase
                  </p>
                </div>

              </div>


              <button className="featured-helpful">
                <FaThumbsUp />
                Helpful
                <span>42</span>
              </button>


              <span className="featured-date">
                2 days ago
              </span>

            </div>

          </div>


          {/* =========================
                RIGHT REVIEWS
          ========================== */}

          <div className="reviews-right">


            {/* REVIEW 2 */}

            <div className="review-card">

              <div className="review-header">

                <div className="review-user">

                  <div className="review-initial">
                    RM
                  </div>

                  <div>
                    <h4>Rohan Mehta</h4>

                    <p>
                      <FaCircleCheck />
                      Verified Purchase
                    </p>
                  </div>

                </div>


                <div className="review-rating">
                  <FaStar />
                  <span>4.9</span>
                </div>

              </div>


              <h3>Super fast delivery</h3>

              <p className="review-text">
                My groceries arrived quickly and the packaging was
                excellent. Everything was fresh and exactly what I ordered.
              </p>


              <div className="review-footer">

                <button>
                  <FaThumbsUp />
                  Helpful
                  <span>24</span>
                </button>

                <span>3 days ago</span>

              </div>

            </div>


            {/* REVIEW 3 */}

            <div className="review-card">

              <div className="review-header">

                <div className="review-user">

                  <div className="review-initial">
                    PV
                  </div>

                  <div>
                    <h4>Priya Verma</h4>

                    <p>
                      <FaCircleCheck />
                      Verified Purchase
                    </p>
                  </div>

                </div>


                <div className="review-rating">
                  <FaStar />
                  <span>5.0</span>
                </div>

              </div>


              <h3>Excellent product quality</h3>

              <p className="review-text">
                The fruits and vegetables were really fresh. I also loved
                how neatly everything was packed. Definitely ordering again!
              </p>


              <div className="review-footer">

                <button>
                  <FaThumbsUp />
                  Helpful
                  <span>18</span>
                </button>

                <span>5 days ago</span>

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            VIEW ALL REVIEWS
        ========================== */}

        <div className="view-all-reviews">

          <button className="view-all-btn">
            View All Reviews
            <FaArrowRight />
          </button>

        </div>


        {/* =========================
              REVIEW STATS
        ========================== */}

        <div className="review-stats">


          {/* AVERAGE RATING */}

          <div className="stat-item">

            <div className="stat-icon star-icon">
              <FaStar />
            </div>

            <div className="stat-content">

              <h3>4.9</h3>

              <div className="stat-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p>Average Rating</p>

            </div>

          </div>


          <div className="stat-divider"></div>


          {/* REVIEWS */}

          <div className="stat-item">

            <div className="stat-icon">
              <FaComments />
            </div>

            <div className="stat-content">

              <h3>20K+</h3>

              <h4>Customer Reviews</h4>

              <p>From verified shoppers</p>

            </div>

          </div>


          <div className="stat-divider"></div>


          {/* HAPPY CUSTOMERS */}

          <div className="stat-item">

            <div className="stat-icon">
              <FaFaceSmile />
            </div>

            <div className="stat-content">

              <h3>98%</h3>

              <h4>Happy Customers</h4>

              <p>Would shop again</p>

            </div>

          </div>


          <div className="stat-divider"></div>


          {/* WRITE REVIEW */}

          <div className="write-review-area">

            <button className="write-review-btn">

              <FaPen />

              Write a Review

              <FaArrowRight />

            </button>

            <p>
              Share your experience
              <br />
              with other shoppers
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Reviews;