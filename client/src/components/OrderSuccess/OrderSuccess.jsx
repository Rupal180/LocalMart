import "./OrderSuccess.css";

import {
  FiCheck,
  FiCheckCircle,
  FiShoppingBag,
  FiMapPin,
  FiCreditCard,
  FiTruck,
  FiArrowRight,
  FiHome,
  FiPackage,
  FiClock,
  FiShield,
  FiChevronRight,
  FiTag,
} from "react-icons/fi";

function OrderSuccess({
  order,
  onContinueShopping,
  onViewOrders,
  onTrackOrder,
}) {
  if (!order) {
    return null;
  }

  const orderDate = new Date(order.orderedAt);

  const formattedDate = orderDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = orderDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalSavings =
    (order.productSavings || 0) +
    (order.couponDiscount || 0);

  const paymentNames = {
    upi: "UPI Payment",
    card: "Credit / Debit Card",
    cod: "Cash on Delivery",
  };

  const paymentName =
    paymentNames[order.paymentMethod] ||
    order.paymentMethod ||
    "Payment selected";

  return (
    <main className="order-success-page">

      {/* BACKGROUND */}

      <div className="success-glow success-glow-one"></div>
      <div className="success-glow success-glow-two"></div>

      <div className="success-pattern"></div>


      {/* =========================================
                      HEADER
      ========================================= */}

      <header className="success-header">

        <button
          className="success-brand"
          onClick={onContinueShopping}
        >
          <span className="success-brand-icon">
            🛒
          </span>

          <div>
            <h2>LocalMart</h2>
            <span>FRESH • FAST • LOCAL</span>
          </div>
        </button>


        <div className="success-header-security">

          <div>
            <FiShield />
          </div>

          <span>
            Secure Order
          </span>

        </div>

      </header>


      {/* =========================================
                  SUCCESS HERO
      ========================================= */}

      <section className="success-hero">

        <div className="success-check-wrapper">

          <div className="success-check-ring success-ring-one"></div>
          <div className="success-check-ring success-ring-two"></div>

          <div className="success-check-circle">
            <FiCheck />
          </div>

        </div>


        <span className="success-eyebrow">
          ORDER CONFIRMED
        </span>


        <h1>
          Your order is
          <span> on its way!</span>
        </h1>


        <p className="success-hero-text">
          Thank you for shopping with LocalMart.
          We've received your order and our team is
          getting everything ready for delivery.
        </p>


        <div className="success-order-meta">

          <div>
            <span>ORDER ID</span>
            <strong>#{order.id}</strong>
          </div>

          <div className="success-meta-divider"></div>

          <div>
            <span>ORDERED ON</span>
            <strong>{formattedDate}</strong>
          </div>

          <div className="success-meta-divider"></div>

          <div>
            <span>ORDER TIME</span>
            <strong>{formattedTime}</strong>
          </div>

        </div>

      </section>


      {/* =========================================
                  MAIN CONTENT
      ========================================= */}

      <div className="success-container">

        <div className="success-main-grid">


          {/* =====================================
                        LEFT COLUMN
          ===================================== */}

          <div className="success-left-column">


            {/* DELIVERY CARD */}

            <section className="success-delivery-card">

              <div className="delivery-card-top">

                <div className="delivery-icon-area">

                  <div className="delivery-icon-box">
                    <FiTruck />
                  </div>

                  <div>
                    <span className="success-small-label">
                      ESTIMATED DELIVERY
                    </span>

                    <h2>
                      Arriving in{" "}
                      <span>
                        {order.estimatedDelivery ||
                          "10–20 minutes"}
                      </span>
                    </h2>
                  </div>

                </div>


                <div className="delivery-live-badge">
                  <span></span>
                  LIVE
                </div>

              </div>


              {/* TRACKING PREVIEW */}

              <div className="success-tracking">

                {order.tracking?.map((step, index) => {

                  const isFirst = index === 0;

                  return (
                    <div
                      className={`success-track-step ${
                        step.completed
                          ? "track-completed"
                          : ""
                      }`}
                      key={step.title}
                    >

                      <div className="track-step-top">

                        <div className="track-circle">

                          {step.completed ? (
                            <FiCheck />
                          ) : (
                            index + 1
                          )}

                        </div>


                        {index <
                          order.tracking.length - 1 && (

                          <div
                            className={`track-line ${
                              isFirst
                                ? "track-line-active"
                                : ""
                            }`}
                          ></div>

                        )}

                      </div>


                      <span>
                        {step.title}
                      </span>

                    </div>
                  );

                })}

              </div>


              <button
                className="success-track-btn"
                onClick={onTrackOrder}
              >
                <div>
                  <FiPackage />

                  <span>
                    Track your order
                  </span>
                </div>

                <FiArrowRight />
              </button>

            </section>


            {/* =====================================
                      ORDERED PRODUCTS
            ===================================== */}

            <section className="success-section-card">

              <div className="success-section-header">

                <div>

                  <span>
                    YOUR SHOPPING BAG
                  </span>

                  <h2>
                    Items in this order
                  </h2>

                </div>


                <div className="success-item-count">
                  <FiShoppingBag />

                  <span>
                    {totalItems}
                  </span>
                </div>

              </div>


              <div className="success-products">

                {order.items.map((item) => (

                  <div
                    className="success-product"
                    key={item.id}
                  >

                    <div className="success-product-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span>
                        ×{item.quantity}
                      </span>

                    </div>


                    <div className="success-product-info">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.unit}
                      </p>


                      {item.originalPrice >
                        item.price && (

                        <div className="success-product-saving">

                          <FiTag />

                          Saved ₹
                          {(item.originalPrice -
                            item.price) *
                            item.quantity}

                        </div>

                      )}

                    </div>


                    <div className="success-product-price">

                      <strong>
                        ₹
                        {item.price *
                          item.quantity}
                      </strong>


                      {item.originalPrice >
                        item.price && (

                        <span>
                          ₹
                          {item.originalPrice *
                            item.quantity}
                        </span>

                      )}

                    </div>

                  </div>

                ))}

              </div>

            </section>


            {/* =====================================
                    ADDRESS + PAYMENT
            ===================================== */}

            <div className="success-info-grid">


              {/* ADDRESS */}

              <section className="success-info-card">

                <div className="success-info-icon">
                  <FiMapPin />
                </div>


                <div className="success-info-content">

                  <span>
                    DELIVERING TO
                  </span>

                  <h3>
                    {order.address?.name ||
                      "Delivery Address"}
                  </h3>


                  {order.address ? (
                    <>

                      <p>
                        {order.address.house},
                        {" "}
                        {order.address.area}
                      </p>

                      <p>
                        {order.address.city},
                        {" "}
                        {order.address.state}
                        {" - "}
                        {order.address.pincode}
                      </p>


                      {order.address.phone && (
                        <strong>
                          +91 {order.address.phone}
                        </strong>
                      )}

                    </>
                  ) : (

                    <p>
                      Your selected delivery address
                    </p>

                  )}

                </div>

              </section>


              {/* PAYMENT */}

              <section className="success-info-card">

                <div className="success-info-icon">
                  <FiCreditCard />
                </div>


                <div className="success-info-content">

                  <span>
                    PAYMENT METHOD
                  </span>

                  <h3>
                    {paymentName}
                  </h3>

                  <p>
                    {order.paymentMethod === "cod"
                      ? "Pay when your order arrives"
                      : "Payment secured by LocalMart"}
                  </p>


                  <strong className="payment-status-success">
                    <FiCheckCircle />

                    {order.paymentMethod === "cod"
                      ? "Payment on delivery"
                      : "Payment confirmed"}
                  </strong>

                </div>

              </section>

            </div>

          </div>


          {/* =====================================
                       RIGHT COLUMN
          ===================================== */}

          <aside className="success-right-column">

            <div className="success-summary-card">


              {/* SUMMARY HEADER */}

              <div className="success-summary-header">

                <div>
                  <span>
                    PAYMENT SUMMARY
                  </span>

                  <h2>
                    Order Total
                  </h2>
                </div>


                <div className="success-summary-check">
                  <FiCheckCircle />
                </div>

              </div>


              {/* BILL */}

              <div className="success-bill">

                <div className="success-bill-row">

                  <span>
                    Item subtotal
                  </span>

                  <strong>
                    ₹{order.subtotal}
                  </strong>

                </div>


                {order.productSavings > 0 && (

                  <div className="success-bill-row saving-row">

                    <span>
                      Product savings
                    </span>

                    <strong>
                      -₹{order.productSavings}
                    </strong>

                  </div>

                )}


                {order.couponDiscount > 0 && (

                  <div className="success-bill-row saving-row">

                    <span>
                      Coupon discount
                    </span>

                    <strong>
                      -₹{order.couponDiscount}
                    </strong>

                  </div>

                )}


                <div className="success-bill-row">

                  <span>
                    Delivery fee
                  </span>

                  <strong
                    className={
                      order.deliveryFee === 0
                        ? "success-free"
                        : ""
                    }
                  >
                    {order.deliveryFee === 0
                      ? "FREE"
                      : `₹${order.deliveryFee}`}
                  </strong>

                </div>

              </div>


              {/* TOTAL */}

              <div className="success-final-total">

                <div>
                  <span>
                    TOTAL PAID
                  </span>

                  <p>
                    Inclusive of all taxes
                  </p>
                </div>

                <strong>
                  ₹{order.finalTotal}
                </strong>

              </div>


              {/* SAVINGS */}

              {totalSavings > 0 && (

                <div className="success-savings-box">

                  <div className="savings-emoji">
                    🎉
                  </div>

                  <div>
                    <span>
                      GREAT CHOICE!
                    </span>

                    <strong>
                      You saved ₹{totalSavings}
                    </strong>

                    <p>
                      on this LocalMart order
                    </p>
                  </div>

                </div>

              )}


              {/* MY ORDERS */}

              <button
                className="success-orders-btn"
                onClick={onViewOrders}
              >

                <div>

                  <FiShoppingBag />

                  <span>
                    View My Orders
                  </span>

                </div>

                <FiChevronRight />

              </button>


              {/* SHOPPING */}

              <button
                className="success-shopping-btn"
                onClick={onContinueShopping}
              >

                <FiHome />

                Continue Shopping

              </button>


              {/* SECURITY */}

              <div className="success-security">

                <FiShield />

                <div>
                  <strong>
                    Your order is protected
                  </strong>

                  <span>
                    Secure checkout • Trusted sellers
                  </span>
                </div>

              </div>

            </div>


            {/* HELP CARD */}

            <div className="success-help-card">

              <div className="success-help-icon">
                <FiClock />
              </div>

              <div>

                <span>
                  NEED HELP?
                </span>

                <h3>
                  We're here for you.
                </h3>

                <p>
                  Get support with delivery,
                  payment or your order.
                </p>

              </div>

              <FiChevronRight />

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default OrderSuccess;