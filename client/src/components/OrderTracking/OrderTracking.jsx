import "./OrderTracking.css";

import {
  FiArrowLeft,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiShield,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

function OrderTracking({
  order,
  onBack,
  onContinueShopping,
}) {

  if (!order) {
    return null;
  }

  /* =========================================
              ORDER INFORMATION
  ========================================= */

  const items = order.items || [];

  const orderDate = order.orderedAt
    ? new Date(order.orderedAt).toLocaleString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }
      )
    : "Recently";


  /* =========================================
                  ADDRESS
  ========================================= */

  const address = order.address;

  const formattedAddress = address
    ? [
        address.house,
        address.area,
        address.city,
        address.state,
        address.pincode,
      ]
        .filter(Boolean)
        .join(", ")
    : "Delivery address unavailable";


  /* =========================================
                  TRACKING
  ========================================= */

  const trackingSteps =
    order.tracking || [
      {
        title: "Order Confirmed",
        completed: true,
      },
      {
        title: "Packed",
        completed: false,
      },
      {
        title: "Out for Delivery",
        completed: false,
      },
      {
        title: "Delivered",
        completed: false,
      },
    ];


  const completedSteps =
    trackingSteps.filter(
      (step) => step.completed
    ).length;


  const progress =
    trackingSteps.length > 1
      ? ((completedSteps - 1) /
          (trackingSteps.length - 1)) *
        100
      : 0;


  /* =========================================
                   TOTAL ITEMS
  ========================================= */

  const totalItems = items.reduce(
    (total, item) =>
      total + (item.quantity || 1),
    0
  );


  return (
    <div className="tracking-page">

      {/* =====================================
                    HEADER
      ====================================== */}

      <header className="tracking-header">

        <button
          className="tracking-brand"
          onClick={onContinueShopping}
        >
          <span>🛒</span>

          <div>
            <h2>LocalMart</h2>
            <small>ORDER TRACKING</small>
          </div>
        </button>


        <div className="tracking-header-secure">
          <FiShield />
          <span>
            Secure order experience
          </span>
        </div>


        <button
          className="tracking-back-btn"
          onClick={onBack}
        >
          <FiArrowLeft />
          My Orders
        </button>

      </header>


      {/* =====================================
                    HERO
      ====================================== */}

      <section className="tracking-hero">

        <div className="tracking-hero-inner">

          <div className="tracking-hero-copy">

            <span className="tracking-eyebrow">
              <FiPackage />
              LIVE ORDER STATUS
            </span>


            <h1>
              Your groceries are
              <span> on the way.</span>
            </h1>


            <p>
              Follow your LocalMart order from
              confirmation to your doorstep.
            </p>

          </div>


          {/* ETA CARD */}

          <div className="tracking-eta-card">

            <div className="tracking-eta-icon">
              <FiClock />
            </div>

            <div>
              <span>
                ESTIMATED DELIVERY
              </span>

              <h3>
                {order.estimatedDelivery ||
                  "10–20 minutes"}
              </h3>

              <p>
                We'll keep you updated
                along the way.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================
                MAIN CONTAINER
      ====================================== */}

      <main className="tracking-main">

        {/* =====================================
                    ORDER SUMMARY BAR
        ====================================== */}

        <section className="tracking-order-bar">

          <div>

            <span>
              ORDER ID
            </span>

            <strong>
              #{order.id}
            </strong>

          </div>


          <div>

            <span>
              ORDERED ON
            </span>

            <strong>
              {orderDate}
            </strong>

          </div>


          <div>

            <span>
              ITEMS
            </span>

            <strong>
              {totalItems}
            </strong>

          </div>


          <div>

            <span>
              ORDER TOTAL
            </span>

            <strong className="tracking-total">
              ₹{order.finalTotal || 0}
            </strong>

          </div>


          <div className="tracking-status">

            <span className="tracking-live-dot">
            </span>

            {order.status ||
              "Order Confirmed"}

          </div>

        </section>


        {/* =====================================
                  TRACKING CARD
        ====================================== */}

        <section className="tracking-status-card">

          <div className="tracking-section-heading">

            <div>

              <span>
                ORDER JOURNEY
              </span>

              <h2>
                Track your delivery
              </h2>

            </div>


            <div className="tracking-live-badge">

              <span></span>

              LIVE

            </div>

          </div>


          {/* PROGRESS */}

          <div className="tracking-progress-wrapper">

            <div className="tracking-progress-line">

              <div
                className="tracking-progress-fill"
                style={{
                  width: `${Math.max(
                    0,
                    progress
                  )}%`,
                }}
              ></div>

            </div>


            <div className="tracking-steps">

              {trackingSteps.map(
                (step, index) => (

                  <div
                    className={`tracking-step ${
                      step.completed
                        ? "tracking-step-complete"
                        : ""
                    }`}
                    key={index}
                  >

                    <div className="tracking-step-icon">

                      {step.completed ? (
                        <FiCheck />
                      ) : index === 1 ? (
                        <FiPackage />
                      ) : index === 2 ? (
                        <FiTruck />
                      ) : (
                        <FiShoppingBag />
                      )}

                    </div>


                    <div className="tracking-step-copy">

                      <strong>
                        {step.title}
                      </strong>

                      <span>
                        {step.completed
                          ? "Completed"
                          : "Waiting"}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>


        {/* =====================================
                    TWO COLUMNS
        ====================================== */}

        <div className="tracking-grid">

          {/* =================================
                    LEFT COLUMN
          ================================== */}

          <div className="tracking-left-column">

            {/* PRODUCTS */}

            <section className="tracking-card">

              <div className="tracking-card-title">

                <div>

                  <span>
                    YOUR BAG
                  </span>

                  <h2>
                    Ordered Products
                  </h2>

                </div>


                <span className="tracking-item-count">
                  {totalItems} items
                </span>

              </div>


              <div className="tracking-products">

                {items.map((item) => (

                  <div
                    className="tracking-product"
                    key={item.id}
                  >

                    <div className="tracking-product-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                    </div>


                    <div className="tracking-product-info">

                      <h3>
                        {item.name}
                      </h3>

                      <span>
                        {item.unit}
                      </span>

                      <p>
                        Qty:{" "}
                        {item.quantity || 1}
                      </p>

                    </div>


                    <strong>
                      ₹
                      {item.price *
                        (item.quantity ||
                          1)}
                    </strong>

                  </div>

                ))}

              </div>

            </section>


            {/* DELIVERY ADDRESS */}

            <section className="tracking-card">

              <div className="tracking-card-title">

                <div>

                  <span>
                    DELIVERY
                  </span>

                  <h2>
                    Delivery Details
                  </h2>

                </div>

              </div>


              <div className="tracking-address">

                <div className="tracking-info-icon">
                  <FiMapPin />
                </div>


                <div>

                  <span>
                    DELIVERY ADDRESS
                  </span>

                  <strong>
                    {address?.name ||
                      "Customer"}
                  </strong>

                  <p>
                    {formattedAddress}
                  </p>


                  {address?.phone && (

                    <div className="tracking-phone">

                      <FiPhone />

                      {address.phone}

                    </div>

                  )}

                </div>

              </div>

            </section>

          </div>


          {/* =================================
                    RIGHT COLUMN
          ================================== */}

          <div className="tracking-right-column">

            {/* PAYMENT */}

            <section className="tracking-card">

              <div className="tracking-card-title">

                <div>

                  <span>
                    PAYMENT
                  </span>

                  <h2>
                    Payment Details
                  </h2>

                </div>

              </div>


              <div className="tracking-payment-row">

                <div className="tracking-info-icon">
                  <FiCreditCard />
                </div>


                <div>

                  <span>
                    PAYMENT METHOD
                  </span>

                  <strong>
                    {order.paymentMethod ||
                      "Not specified"}
                  </strong>

                </div>

              </div>


              <div className="tracking-secure-note">

                <FiShield />

                Payment information is
                securely protected.

              </div>

            </section>


            {/* BILL */}

            <section className="tracking-card">

              <div className="tracking-card-title">

                <div>

                  <span>
                    PAYMENT SUMMARY
                  </span>

                  <h2>
                    Bill Details
                  </h2>

                </div>

              </div>


              <div className="tracking-bill">

                <div>
                  <span>Item subtotal</span>

                  <strong>
                    ₹{order.subtotal || 0}
                  </strong>
                </div>


                {order.productSavings >
                  0 && (

                  <div className="tracking-saving-row">

                    <span>
                      Product savings
                    </span>

                    <strong>
                      -₹
                      {order.productSavings}
                    </strong>

                  </div>

                )}


                {order.couponDiscount >
                  0 && (

                  <div className="tracking-saving-row">

                    <span>
                      Coupon discount
                    </span>

                    <strong>
                      -₹
                      {order.couponDiscount}
                    </strong>

                  </div>

                )}


                <div>

                  <span>
                    Delivery fee
                  </span>

                  <strong>
                    {order.deliveryFee ===
                    0
                      ? "FREE"
                      : `₹${order.deliveryFee}`}
                  </strong>

                </div>


                <div className="tracking-bill-divider">
                </div>


                <div className="tracking-final-total">

                  <span>
                    Total Paid
                  </span>

                  <strong>
                    ₹{order.finalTotal || 0}
                  </strong>

                </div>

              </div>

            </section>


            {/* SUPPORT */}

            <section className="tracking-support-card">

              <div className="tracking-support-icon">
                <FiPhone />
              </div>


              <div>

                <span>
                  NEED HELP?
                </span>

                <h3>
                  We're here for you.
                </h3>

                <p>
                  Contact LocalMart support
                  if you have any issue with
                  your order.
                </p>

              </div>

            </section>

          </div>

        </div>


        {/* =====================================
                    BOTTOM ACTION
        ====================================== */}

        <div className="tracking-bottom-actions">

          <button
            className="tracking-shop-btn"
            onClick={onContinueShopping}
          >
            <FiShoppingBag />

            Continue Shopping
          </button>

        </div>

      </main>

    </div>
  );
}

export default OrderTracking;