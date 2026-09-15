import "./Features.css";

import {
  FiTruck,
  FiDollarSign,
  FiShield,
} from "react-icons/fi";

import { FaLeaf } from "react-icons/fa";

function Features() {
  return (
    <section className="features">

      <div className="feature-card">
        <FiTruck className="feature-icon" />
        <div>
          <h3>Fast Delivery</h3>
          <p>Delivered within 30 minutes</p>
        </div>
      </div>

      <div className="feature-card">
        <FiDollarSign className="feature-icon" />
        <div>
          <h3>Best Prices</h3>
          <p>Affordable everyday shopping</p>
        </div>
      </div>

      <div className="feature-card">
        <FaLeaf className="feature-icon" />
        <div>
          <h3>Fresh Quality</h3>
          <p>100% fresh products daily</p>
        </div>
      </div>

      <div className="feature-card">
        <FiShield className="feature-icon" />
        <div>
          <h3>Secure Payment</h3>
          <p>Safe & trusted checkout</p>
        </div>
      </div>

    </section>
  );
}

export default Features;