import { useState } from "react";
import "./MyOrders.css";
import productsData from "../../data/products";

import {
  FiArrowLeft,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiPackage,
  FiRefreshCw,
  FiShoppingBag,
  FiTruck,
  FiMapPin,
  FiCreditCard,
  FiShield,
  FiSearch,
} from "react-icons/fi";

function MyOrders({
  orders = [],
  onBack,
  onTrackOrder,
  onViewOrder,
  onReorder,
}) {
  const [activeTab, setActiveTab] = useState("active");

  const activeOrders = orders.filter(
    (order) =>
      order.status !== "Delivered" &&
      order.status !== "Cancelled"
  );

  const pastOrders = orders.filter(
    (order) =>
      order.status === "Delivered" ||
      order.status === "Cancelled"
  );

  const visibleOrders =
    activeTab === "active"
      ? activeOrders
      : pastOrders;

  const getTotalItems = (items = []) => {
    return items.reduce(
      (total, item) =>
        total + (item.quantity || 0),
      0
    );
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getCurrentStep = (status) => {
    const steps = {
      "Order Confirmed": 1,
      Packed: 2,
      "Out for Delivery": 3,
      Delivered: 4,
    };

    return steps[status] || 1;
  };

  // Backend orders may not contain the Vite image import.
  // Find the matching static product and use its image as a fallback.
  const getProductImage = (item) => {
    if (item?.image) {
      return item.image;
    }

    const productFromBackend =
      item?.productId && typeof item.productId === "object"
        ? item.productId
        : null;

    const itemLegacyId =
      item?.legacyId ??
      productFromBackend?.legacyId ??
      null;

    const itemId =
      item?.id ??
      (typeof item?.productId === "string"
        ? item.productId
        : productFromBackend?._id) ??
      null;

    const numericId =
      itemLegacyId !== null && !Number.isNaN(Number(itemLegacyId))
        ? Number(itemLegacyId)
        : itemId !== null && !Number.isNaN(Number(itemId))
        ? Number(itemId)
        : null;

    const matchingProduct = productsData.find((product) => {
      if (
        item?.name &&
        product.name?.toLowerCase() === item.name.toLowerCase()
      ) {
        return true;
      }

      if (numericId !== null && Number(product.id) === numericId) {
        return true;
      }

      return false;
    });

    return matchingProduct?.image || null;
  };

  return (
    <main className="my-orders-page">

      {/* BACKGROUND */}

      <div className="orders-bg-glow orders-glow-one"></div>
      <div className="orders-bg-glow orders-glow-two"></div>


      {/* =========================================
                        HEADER
      ========================================= */}

      <header className="orders-header">

        <button
          className="orders-logo"
          onClick={onBack}
        >
          <span>🛒</span>

          <div>
            <h2>LocalMart</h2>
            <small>FRESH • FAST • LOCAL</small>
          </div>
        </button>


        <div className="orders-header-center">

          <FiShield />

          <span>
            Your purchases are protected
          </span>

        </div>


        <button
          className="orders-back-btn"
          onClick={onBack}
        >
          <FiArrowLeft />
          Back to Store
        </button>

      </header>


      {/* =========================================
                      HERO
      ========================================= */}

      <section className="orders-hero">

        <div className="orders-hero-inner">

          <div className="orders-hero-copy">

            <span className="orders-eyebrow">
              <FiShoppingBag />
              YOUR LOCALMART ACCOUNT
            </span>

            <h1>
              My <span>Orders</span>
            </h1>

            <p>
              Everything you've ordered, all in one
              place. Track active deliveries, review
              past purchases and quickly reorder your
              favourites.
            </p>

          </div>


          <div className="orders-overview">

            <div className="overview-card">

              <div className="overview-icon active-icon">
                <FiTruck />
              </div>

              <div>
                <strong>
                  {activeOrders.length}
                </strong>

                <span>
                  Active Orders
                </span>
              </div>

            </div>


            <div className="overview-divider"></div>


            <div className="overview-card">

              <div className="overview-icon">
                <FiPackage />
              </div>

              <div>
                <strong>
                  {orders.length}
                </strong>

                <span>
                  Total Orders
                </span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
                     MAIN CONTENT
      ========================================= */}

      <section className="orders-main">

        <div className="orders-toolbar">

          {/* TABS */}

          <div className="orders-tabs">

            <button
              className={
                activeTab === "active"
                  ? "orders-tab-active"
                  : ""
              }
              onClick={() =>
                setActiveTab("active")
              }
            >
              Active Orders

              {activeOrders.length > 0 && (
                <span>
                  {activeOrders.length}
                </span>
              )}
            </button>


            <button
              className={
                activeTab === "history"
                  ? "orders-tab-active"
                  : ""
              }
              onClick={() =>
                setActiveTab("history")
              }
            >
              Order History

              {pastOrders.length > 0 && (
                <span>
                  {pastOrders.length}
                </span>
              )}
            </button>

          </div>


          <div className="orders-search">

            <FiSearch />

            <span>
              {orders.length}{" "}
              {orders.length === 1
                ? "order"
                : "orders"}{" "}
              in your account
            </span>

          </div>

        </div>


        {/* =========================================
                     EMPTY STATE
        ========================================= */}

        {visibleOrders.length === 0 ? (

          <div className="orders-empty">

            <div className="orders-empty-visual">

              <div className="empty-circle empty-circle-one"></div>
              <div className="empty-circle empty-circle-two"></div>

              <div className="orders-empty-icon">
                {activeTab === "active" ? (
                  <FiTruck />
                ) : (
                  <FiPackage />
                )}
              </div>

            </div>


            <span>
              {activeTab === "active"
                ? "ALL CAUGHT UP"
                : "YOUR ORDER JOURNEY"}
            </span>


            <h2>
              {activeTab === "active"
                ? "No active orders right now."
                : "No past orders yet."}
            </h2>


            <p>
              {activeTab === "active"
                ? "Your next fresh LocalMart delivery will appear here as soon as you place an order."
                : "Once your orders are delivered, you'll find your complete purchase history here."}
            </p>


            <button onClick={onBack}>
              <FiShoppingBag />
              Start Shopping
              <FiChevronRight />
            </button>

          </div>

        ) : (

          /* =========================================
                         ORDERS
          ========================================= */

          <div className="orders-list">

            {visibleOrders.map((order) => {

              const currentStep =
                getCurrentStep(order.status);

              const totalItems =
                getTotalItems(order.items);

              return (

                <article
                  className="premium-order-card"
                  key={order.id}
                >

                  {/* ===============================
                         ORDER TOP BAR
                  =============================== */}

                  <div className="order-card-top">

                    <div className="order-identity">

                      <div className="order-package-icon">
                        <FiPackage />
                      </div>

                      <div>

                        <span>
                          ORDER
                        </span>

                        <h3>
                          #{order.id}
                        </h3>

                      </div>

                    </div>


                    <div className="order-top-meta">

                      <div>
                        <span>PLACED ON</span>

                        <strong>
                          {formatDate(
                            order.orderedAt
                          )}
                        </strong>
                      </div>


                      <div>
                        <span>ORDER TOTAL</span>

                        <strong>
                          ₹{order.finalTotal}
                        </strong>
                      </div>


                      <div
                        className={`order-status-pill ${
                          order.status ===
                          "Delivered"
                            ? "status-delivered"
                            : order.status ===
                              "Cancelled"
                            ? "status-cancelled"
                            : "status-active"
                        }`}
                      >

                        <span></span>

                        {order.status}

                      </div>

                    </div>

                  </div>


                  {/* ===============================
                          CARD BODY
                  =============================== */}

                  <div className="order-card-body">

                    {/* PRODUCTS */}

                    <div className="order-products-area">

                      <div className="order-product-images">

                        {order.items
                          ?.slice(0, 4)
                          .map((item) => (

                            <div
                              className="order-mini-product"
                              key={item.id}
                            >
                              <img
                                src={getProductImage(item)}
                                alt={item.name}
                              />

                              {item.quantity > 1 && (
                                <span>
                                  ×{item.quantity}
                                </span>
                              )}
                            </div>

                          ))}


                        {order.items?.length > 4 && (

                          <div className="order-more-products">
                            +
                            {order.items.length -
                              4}
                          </div>

                        )}

                      </div>


                      <div className="order-product-copy">

                        <span>
                          {totalItems}{" "}
                          {totalItems === 1
                            ? "ITEM"
                            : "ITEMS"}
                        </span>

                        <h3>
                          {order.items
                            ?.slice(0, 2)
                            .map(
                              (item) =>
                                item.name
                            )
                            .join(", ")}

                          {order.items?.length >
                            2 && " & more"}
                        </h3>

                        <p>
                          Freshly packed from
                          trusted LocalMart sellers.
                        </p>

                      </div>

                    </div>


                    {/* DELIVERY INFO */}

                    <div className="order-delivery-info">

                      <div>

                        <FiClock />

                        <div>
                          <span>
                            DELIVERY
                          </span>

                          <strong>
                            {order.status ===
                            "Delivered"
                              ? "Delivered successfully"
                              : order.estimatedDelivery ||
                                "10–20 minutes"}
                          </strong>
                        </div>

                      </div>


                      {order.address && (

                        <div>

                          <FiMapPin />

                          <div>
                            <span>
                              DELIVERING TO
                            </span>

                            <strong>
                              {order.address
                                .area ||
                                order.address
                                  .city ||
                                "Saved address"}
                            </strong>
                          </div>

                        </div>

                      )}


                      <div>

                        <FiCreditCard />

                        <div>
                          <span>
                            PAYMENT
                          </span>

                          <strong>
                            {order.paymentMethod ===
                            "cod"
                              ? "Cash on Delivery"
                              : order.paymentMethod ===
                                "upi"
                              ? "UPI"
                              : order.paymentMethod ===
                                "card"
                              ? "Card"
                              : order.paymentMethod ||
                                "Payment"}
                          </strong>
                        </div>

                      </div>

                    </div>

                  </div>


                  {/* ===============================
                        PROGRESS TRACKER
                  =============================== */}

                  {order.status !==
                    "Cancelled" && (

                    <div className="order-progress-area">

                      <div className="order-progress-header">

                        <div>

                          <span>
                            DELIVERY PROGRESS
                          </span>

                          <strong>
                            {order.status ===
                            "Delivered"
                              ? "Your order has arrived"
                              : "Your fresh order is moving"}
                          </strong>

                        </div>


                        {order.status !==
                          "Delivered" && (

                          <div className="order-live-status">
                            <span></span>
                            LIVE
                          </div>

                        )}

                      </div>


                      <div className="order-progress">

                        {[
                          "Confirmed",
                          "Packed",
                          "Out for Delivery",
                          "Delivered",
                        ].map(
                          (step, index) => {

                            const stepNumber =
                              index + 1;

                            const completed =
                              stepNumber <=
                              currentStep;

                            return (

                              <div
                                className={`order-progress-step ${
                                  completed
                                    ? "order-step-completed"
                                    : ""
                                }`}
                                key={step}
                              >

                                <div className="order-step-row">

                                  <div className="order-step-circle">

                                    {completed ? (
                                      <FiCheck />
                                    ) : (
                                      stepNumber
                                    )}

                                  </div>


                                  {index < 3 && (

                                    <div
                                      className={`order-step-line ${
                                        stepNumber <
                                        currentStep
                                          ? "order-line-completed"
                                          : ""
                                      }`}
                                    ></div>

                                  )}

                                </div>


                                <span>
                                  {step}
                                </span>

                              </div>

                            );

                          }
                        )}

                      </div>

                    </div>

                  )}


                  {/* CANCELLED */}

                  {order.status ===
                    "Cancelled" && (

                    <div className="cancelled-order-message">

                      <FiPackage />

                      <div>
                        <strong>
                          This order was cancelled
                        </strong>

                        <span>
                          You can reorder these
                          products anytime.
                        </span>
                      </div>

                    </div>

                  )}


                  {/* ===============================
                           ACTIONS
                  =============================== */}

                  <div className="order-card-actions">

                    <div className="order-saving-note">

                      {order.couponDiscount > 0 ||
                      order.productSavings > 0 ? (
                        <>
                          <span>🎉</span>

                          <p>
                            You saved{" "}
                            <strong>
                              ₹
                              {(order.couponDiscount ||
                                0) +
                                (order.productSavings ||
                                  0)}
                            </strong>{" "}
                            on this order
                          </p>
                        </>
                      ) : (
                        <>
                          <FiShield />

                          <p>
                            LocalMart Purchase
                            Protection
                          </p>
                        </>
                      )}

                    </div>


                    <div className="order-action-buttons">

                      {(order.status ===
                        "Delivered" ||
                        order.status ===
                          "Cancelled") && (

                        <button
                          className="order-reorder-btn"
                          onClick={() =>
                            onReorder?.(order)
                          }
                        >
                          <FiRefreshCw />
                          Reorder
                        </button>

                      )}


                      {order.status !==
                        "Delivered" &&
                        order.status !==
                          "Cancelled" && (

                          <button
                            className="order-track-btn"
                            onClick={() =>
                              onTrackOrder?.(
                                order
                              )
                            }
                          >
                            <FiTruck />
                            Track Order
                          </button>

                        )}


                      <button
                        className="order-details-btn"
                        onClick={() =>
                          onViewOrder?.(order)
                        }
                      >
                        View Details
                        <FiChevronRight />
                      </button>

                    </div>

                  </div>

                </article>

              );

            })}

          </div>

        )}

      </section>


      {/* =========================================
                    BOTTOM TRUST
      ========================================= */}

      <section className="orders-trust-strip">

        <div>
          <FiShield />

          <span>
            <strong>Secure purchases</strong>
            Protected checkout
          </span>
        </div>


        <div>
          <FiTruck />

          <span>
            <strong>Fast delivery</strong>
            Fresh at your doorstep
          </span>
        </div>


        <div>
          <FiRefreshCw />

          <span>
            <strong>Easy reorder</strong>
            Your favourites in one tap
          </span>
        </div>

      </section>

    </main>
  );
}

export default MyOrders;