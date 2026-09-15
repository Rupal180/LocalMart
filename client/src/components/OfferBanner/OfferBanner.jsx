import { useEffect, useState } from "react";

import "./OfferBanner.css";

import basket from "../../assets/images/offers/grocery-basket.png";


const OfferBanner = () => {

  /* =========================================
                COUNTDOWN TIMER
  ========================================= */

  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 35,
    seconds: 18,
  });


  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((previousTime) => {

        let {
          hours,
          minutes,
          seconds
        } = previousTime;


        /* Decrease seconds */

        if (seconds > 0) {

          seconds--;

        }

        /* Seconds finished */

        else if (minutes > 0) {

          minutes--;

          seconds = 59;

        }

        /* Minutes finished */

        else if (hours > 0) {

          hours--;

          minutes = 59;

          seconds = 59;

        }

        /* Timer finished - restart */

        else {

          hours = 12;

          minutes = 0;

          seconds = 0;

        }


        return {
          hours,
          minutes,
          seconds,
        };

      });

    }, 1000);


    /* Cleanup timer */

    return () => clearInterval(timer);

  }, []);


  /* =========================================
                FORMAT NUMBERS
  ========================================= */

  const formatTime = (number) => {
    return String(number).padStart(2, "0");
  };


  /* =========================================
                SMOOTH SCROLL
  ========================================= */

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
      className="offer"
      id="deals"
    >

      <div className="offer-banner">


        {/* =================================
                    LEFT SIDE
        ================================= */}

        <div className="offer-left">

          <span className="offer-badge">
            🔥 Limited Time Offer
          </span>


          <h2>
            Fresh Groceries <br />

            Up To <span>50% OFF</span>
          </h2>


          <p>
            Shop fresh vegetables, fruits, dairy products, snacks,
            beverages and all your daily essentials with lightning-fast
            delivery directly to your doorstep.
          </p>


          {/* =================================
                    LIVE TIMER
          ================================= */}

          <div className="offer-timer">

            <div>

              <h3>
                {formatTime(timeLeft.hours)}
              </h3>

              <span>
                Hours
              </span>

            </div>


            <div>

              <h3>
                {formatTime(timeLeft.minutes)}
              </h3>

              <span>
                Minutes
              </span>

            </div>


            <div>

              <h3>
                {formatTime(timeLeft.seconds)}
              </h3>

              <span>
                Seconds
              </span>

            </div>

          </div>


          {/* =================================
                      BUTTONS
          ================================= */}

          <div className="offer-buttons">

            <button
              className="shop-btn"
              onClick={() =>
                scrollToSection("featured-products")
              }
            >
              Shop Now →
            </button>


            <button
              className="deal-btn"
              onClick={() =>
                scrollToSection("featured-products")
              }
            >
              View Deals
            </button>

          </div>

        </div>


        {/* =================================
                    RIGHT SIDE
        ================================= */}

        <div className="offer-right">

          <div className="glow"></div>


          <img
            src={basket}
            alt="Basket"
            className="basket"
          />


          <div className="discount">
            🎉 50% OFF
          </div>


          <div className="delivery">
            ⚡ 10 Min Delivery
          </div>

        </div>

      </div>


      {/* =================================
                  BOTTOM CARDS
      ================================= */}

      <div className="offer-cards">


        <div className="card">

          <h3>
            🥬 Farm Fresh
          </h3>

          <p>
            Directly sourced from trusted local farms every morning.
          </p>

        </div>


        <div className="card">

          <h3>
            🚚 Fast Delivery
          </h3>

          <p>
            Get your groceries delivered within 10–20 minutes.
          </p>

        </div>


        <div className="card">

          <h3>
            💳 Secure Payments
          </h3>

          <p>
            UPI, Cards, Wallets and Cash on Delivery supported.
          </p>

        </div>

      </div>

    </section>

  );

};


export default OfferBanner;