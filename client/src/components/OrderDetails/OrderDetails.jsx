import "./OrderDetails.css";

import {
  FiArrowLeft,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiDownload,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiRefreshCw,
  FiShield,
  FiShoppingBag,
  FiTruck,
  FiZap,
} from "react-icons/fi";

function OrderDetails({
  order,
  onBack,
  onTrackOrder,
  onReorder,
  onContinueShopping,
}) {
  if (!order) {
    return null;
  }

  const items = order.items || [];

  const totalItems = items.reduce(
    (total, item) =>
      total + (item.quantity || 1),
    0
  );

  const orderDate = order.orderedAt
    ? new Date(order.orderedAt).toLocaleString(
        "en-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }
      )
    : "Recently";

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

  const totalSavings =
    (order.productSavings || 0) +
    (order.couponDiscount || 0);

  const trackingSteps =
    order.tracking || [
      {
        title: "Confirmed",
        completed: true,
      },
      {
        title: "Packed",
        completed: false,
      },
      {
        title: "On the way",
        completed: false,
      },
      {
        title: "Delivered",
        completed: false,
      },
    ];

  const handleDownloadInvoice = () => {
    window.print();
  };

  return (
    <div className="od-page">

      {/* =========================================
                        HEADER
      ========================================= */}

      <header className="od-header">

        <button
          className="od-brand"
          onClick={onContinueShopping}
        >
          <div className="od-brand-icon">
            🛒
          </div>

          <div>
            <h2>LocalMart</h2>
            <span>ORDER EXPERIENCE</span>
          </div>
        </button>


        <div className="od-header-center">
          <FiShield />
          Secure LocalMart Order
        </div>


        <button
          className="od-back"
          onClick={onBack}
        >
          <FiArrowLeft />
          My Orders
        </button>

      </header>


      {/* =========================================
                         HERO
      ========================================= */}

      <section className="od-hero">

        <div className="od-hero-glow od-glow-one"></div>
        <div className="od-hero-glow od-glow-two"></div>


        <div className="od-hero-inner">

          <div className="od-hero-left">

            <span className="od-eyebrow">
              <FiPackage />
              ORDER #{order.id}
            </span>


            <h1>
              Your order,
              <br />
              <span>beautifully organised.</span>
            </h1>


            <p>
              Everything from products and payment
              to delivery progress — all in one
              secure place.
            </p>


            <div className="od-hero-actions">

              <button
                className="od-primary-action"
                onClick={() =>
                  onTrackOrder(order)
                }
              >
                <FiTruck />
                Track Order
              </button>


              <button
                className="od-secondary-action"
                onClick={() =>
                  onReorder(order)
                }
              >
                <FiRefreshCw />
                Order Again
              </button>

            </div>

          </div>


          {/* HERO STATUS CARD */}

          <div className="od-status-panel">

            <div className="od-status-top">

              <span>
                LIVE ORDER STATUS
              </span>

              <div className="od-live">
                <span></span>
                LIVE
              </div>

            </div>


            <div className="od-status-main">

              <div className="od-status-icon">
                <FiCheck />
              </div>


              <div>
                <span>CURRENT STATUS</span>

                <h2>
                  {order.status ||
                    "Order Confirmed"}
                </h2>

                <p>
                  Your order is being prepared
                  with care.
                </p>
              </div>

            </div>


            <div className="od-eta">

              <div>
                <FiClock />

                <span>
                  Estimated delivery
                </span>
              </div>

              <strong>
                {order.estimatedDelivery ||
                  "10–20 min"}
              </strong>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
                    QUICK INFORMATION
      ========================================= */}

      <section className="od-summary-wrapper">

        <div className="od-summary">

          <div className="od-summary-item">

            <span>
              ORDER PLACED
            </span>

            <strong>
              {orderDate}
            </strong>

          </div>


          <div className="od-summary-divider"></div>


          <div className="od-summary-item">

            <span>
              ITEMS
            </span>

            <strong>
              {totalItems}{" "}
              {totalItems === 1
                ? "Item"
                : "Items"}
            </strong>

          </div>


          <div className="od-summary-divider"></div>


          <div className="od-summary-item">

            <span>
              PAYMENT
            </span>

            <strong>
              {order.paymentMethod ||
                "Not specified"}
            </strong>

          </div>


          <div className="od-summary-divider"></div>


          <div className="od-summary-item od-summary-total">

            <span>
              TOTAL PAID
            </span>

            <strong>
              ₹{order.finalTotal || 0}
            </strong>

          </div>

        </div>

      </section>


      {/* =========================================
                    MAIN CONTENT
      ========================================= */}

      <main className="od-main">

        {/* =====================================
                    TRACKING PREVIEW
        ====================================== */}

        <section className="od-card od-tracking-card">

          <div className="od-section-heading">

            <div>

              <span className="od-section-label">
                DELIVERY JOURNEY
              </span>

              <h2>
                Order Progress
              </h2>

              <p>
                Follow each stage of your
                LocalMart delivery.
              </p>

            </div>


            <button
              className="od-text-button"
              onClick={() =>
                onTrackOrder(order)
              }
            >
              View live tracking
              <FiArrowLeft />
            </button>

          </div>


          <div className="od-progress">

            {trackingSteps.map(
              (step, index) => (

                <div
                  className={`od-progress-step ${
                    step.completed
                      ? "od-progress-complete"
                      : ""
                  }`}
                  key={index}
                >

                  <div className="od-progress-row">

                    <div className="od-progress-circle">

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


                    {index <
                      trackingSteps.length -
                        1 && (

                      <div className="od-progress-line">

                        <span
                          className={
                            step.completed
                              ? "od-progress-line-active"
                              : ""
                          }
                        ></span>

                      </div>

                    )}

                  </div>


                  <strong>
                    {step.title}
                  </strong>


                  <span>
                    {step.completed
                      ? "Completed"
                      : "Upcoming"}
                  </span>

                </div>

              )
            )}

          </div>

        </section>


        {/* =====================================
                      CONTENT GRID
        ====================================== */}

        <div className="od-grid">

          {/* =================================
                       LEFT
          ================================== */}

          <div className="od-left">


            {/* PRODUCTS */}

            <section className="od-card">

              <div className="od-card-header">

                <div>

                  <span className="od-section-label">
                    YOUR BAG
                  </span>

                  <h2>
                    Ordered Products
                  </h2>

                </div>


                <span className="od-count-pill">
                  {totalItems} items
                </span>

              </div>


              <div className="od-products">

                {items.map((item) => (

                  <div
                    className="od-product"
                    key={item.id}
                  >

                    <div className="od-product-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span>
                        ×{item.quantity || 1}
                      </span>

                    </div>


                    <div className="od-product-copy">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.unit}
                      </p>


                      <div className="od-product-tags">

                        <span>
                          Quality Checked
                        </span>

                        <span>
                          Fresh Pick
                        </span>

                      </div>

                    </div>


                    <div className="od-product-price">

                      <span>
                        ₹{item.price} each
                      </span>

                      <strong>
                        ₹
                        {item.price *
                          (item.quantity ||
                            1)}
                      </strong>

                    </div>

                  </div>

                ))}

              </div>

            </section>


            {/* DELIVERY */}

            <section className="od-card">

              <div className="od-card-header">

                <div>

                  <span className="od-section-label">
                    DELIVERY
                  </span>

                  <h2>
                    Delivery Information
                  </h2>

                </div>


                <div className="od-delivery-badge">
                  <FiTruck />
                  Quick Delivery
                </div>

              </div>


              <div className="od-delivery-grid">

                <div className="od-info-block">

                  <div className="od-info-icon">
                    <FiMapPin />
                  </div>


                  <div>

                    <span>
                      DELIVERING TO
                    </span>

                    <h3>
                      {address?.name ||
                        "Customer"}
                    </h3>

                    <p>
                      {formattedAddress}
                    </p>


                    {address?.phone && (

                      <div className="od-phone">

                        <FiPhone />

                        {address.phone}

                      </div>

                    )}

                  </div>

                </div>


                <div className="od-info-block">

                  <div className="od-info-icon od-clock-icon">
                    <FiClock />
                  </div>


                  <div>

                    <span>
                      EXPECTED IN
                    </span>

                    <h3>
                      {order.estimatedDelivery ||
                        "10–20 minutes"}
                    </h3>

                    <p>
                      We'll keep you updated
                      as your order moves.
                    </p>

                  </div>

                </div>

              </div>

            </section>

          </div>


          {/* =================================
                       RIGHT
          ================================== */}

          <aside className="od-right">


            {/* BILL */}

            <section className="od-card od-bill-card">

              <div className="od-card-header">

                <div>

                  <span className="od-section-label">
                    PAYMENT SUMMARY
                  </span>

                  <h2>
                    Bill Details
                  </h2>

                </div>


                <FiCreditCard className="od-header-icon" />

              </div>


              <div className="od-bill">

                <div className="od-bill-row">

                  <span>
                    Item subtotal
                  </span>

                  <strong>
                    ₹{order.subtotal || 0}
                  </strong>

                </div>


                {order.productSavings >
                  0 && (

                  <div className="od-bill-row od-saving">

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

                  <div className="od-bill-row od-saving">

                    <span>
                      Coupon discount
                    </span>

                    <strong>
                      -₹
                      {order.couponDiscount}
                    </strong>

                  </div>

                )}


                <div className="od-bill-row">

                  <span>
                    Delivery
                  </span>

                  <strong
                    className={
                      order.deliveryFee === 0
                        ? "od-free"
                        : ""
                    }
                  >

                    {order.deliveryFee === 0
                      ? "FREE"
                      : `₹${
                          order.deliveryFee ||
                          0
                        }`}

                  </strong>

                </div>


                <div className="od-bill-divider"></div>


                <div className="od-total-row">

                  <div>

                    <span>
                      Total Paid
                    </span>

                    <small>
                      Inclusive of all taxes
                    </small>

                  </div>

                  <strong>
                    ₹{order.finalTotal || 0}
                  </strong>

                </div>

              </div>


              {totalSavings > 0 && (

                <div className="od-savings-box">

                  <div className="od-saving-icon">
                    <FiZap />
                  </div>


                  <div>

                    <span>
                      TOTAL SAVINGS
                    </span>

                    <strong>
                      You saved ₹
                      {totalSavings}
                    </strong>

                  </div>

                </div>

              )}


              <button
                className="od-invoice-button"
                onClick={
                  handleDownloadInvoice
                }
              >

                <FiDownload />

                Download Invoice

              </button>

            </section>


            {/* PAYMENT METHOD */}

            <section className="od-card od-payment-card">

              <div className="od-payment-icon">

                <FiCreditCard />

              </div>


              <div>

                <span>
                  PAYMENT METHOD
                </span>

                <h3>
                  {order.paymentMethod ||
                    "Not specified"}
                </h3>

                <p>
                  Payment details are securely
                  protected.
                </p>

              </div>


              <FiShield className="od-payment-shield" />

            </section>


            {/* TRUST CARD */}

            <section className="od-trust-card">

              <div className="od-trust-decoration"></div>


              <div className="od-trust-icon">

                <FiShield />

              </div>


              <span>
                LOCALMART PROMISE
              </span>


              <h3>
                Fresh. Local. Reliable.
              </h3>


              <p>
                Quality products from trusted
                local stores, delivered with
                care.
              </p>


              <div className="od-trust-points">

                <span>
                  <FiCheck />
                  Quality checked
                </span>

                <span>
                  <FiCheck />
                  Secure checkout
                </span>

                <span>
                  <FiCheck />
                  Trusted delivery
                </span>

              </div>

            </section>

          </aside>

        </div>


        {/* =====================================
                     BOTTOM ACTIONS
        ====================================== */}

        <section className="od-bottom-bar">

          <div>

            <span>
              Need these products again?
            </span>

            <strong>
              Reorder everything in one click.
            </strong>

          </div>


          <div>

            <button
              className="od-bottom-secondary"
              onClick={
                onContinueShopping
              }
            >
              Continue Shopping
            </button>


            <button
              className="od-bottom-primary"
              onClick={() =>
                onReorder(order)
              }
            >

              <FiRefreshCw />

              Order Again

            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default OrderDetails;