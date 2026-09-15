import "./ProductDetails.css";

import {
  FiX,
  FiHeart,
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiTruck,
  FiShield,
  FiCheckCircle,
  FiStar,
  FiMapPin,
  FiTrendingDown,
  FiArrowRight,
  FiPackage,
  FiAlertCircle,
} from "react-icons/fi";


/* =========================================================
                  FALLBACK STORE NAMES
========================================================= */

const STORE_NAMES = {
  1: "The Daily Basket",
  2: "Urban Grocers",
  3: "FreshLane Market",
  4: "Harvest & Co.",
  5: "Everyday Market",
  6: "Green Basket Mart",
};


function ProductDetails({
  product,
  isOpen,
  onClose,

  onAddToCart,
  onToggleWishlist,

  isWishlisted,

  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,

  onComparePrices,
  onViewStore,
}) {

  /* =========================================================
                         SAFETY CHECK
  ========================================================= */

  if (!product) {
    return null;
  }


  /* =========================================================
                       PRODUCT DATA
  ========================================================= */

  const price = Number(product.price) || 0;

  const originalPrice =
    Number(product.originalPrice) || price;

  const stock =
    Number(product.stock) || 0;

  const isAvailable =
    product.inStock !== false &&
    stock > 0;


  /* =========================================================
                         DISCOUNT
  ========================================================= */

  const calculatedDiscount =
    originalPrice > price
      ? Math.round(
          ((originalPrice - price) /
            originalPrice) *
            100
        )
      : 0;

  const discount =
    typeof product.discount === "number"
      ? product.discount
      : calculatedDiscount;


  /* =========================================================
                          SAVINGS
  ========================================================= */

  const savings =
    originalPrice > price
      ? originalPrice - price
      : 0;


  /* =========================================================
                        SELLER / STORE
  ========================================================= */

  const storeName =
    product.seller ||
    product.storeName ||
    STORE_NAMES[Number(product.storeId)] ||
    "LocalMart Partner Store";


  /* =========================================================
                         DELIVERY
  ========================================================= */

  const deliveryTime =
    product.deliveryTime ||
    product.eta ||
    "15–25 min";


  const distance =
    product.distance ||
    "Nearby";


  /* =========================================================
                         REVIEWS
  ========================================================= */

  const rating =
    product.rating || "4.7";


  const reviews =
    product.reviews || 0;


  /* =========================================================
                        DESCRIPTION
  ========================================================= */

  const description =
    product.description ||
    "Carefully selected for freshness and quality. LocalMart connects you with trusted nearby stores so you can shop conveniently and get your everyday essentials delivered quickly.";


  return (
    <>
      {/* =====================================================
                            OVERLAY
      ===================================================== */}

      <div
        className={`product-modal-overlay ${
          isOpen
            ? "product-modal-overlay-show"
            : ""
        }`}
        onClick={onClose}
      />


      {/* =====================================================
                             MODAL
      ===================================================== */}

      <div
        className={`product-modal ${
          isOpen
            ? "product-modal-open"
            : ""
        }`}
      >

        {/* ===================================================
                              CLOSE
        =================================================== */}

        <button
          type="button"
          className="product-modal-close"
          onClick={onClose}
          aria-label="Close product details"
        >
          <FiX />
        </button>


        <div className="product-modal-content">


          {/* =================================================
                              LEFT
          ================================================= */}

          <div className="product-modal-left">


            {/* =================================================
                            PRODUCT IMAGE
            ================================================= */}

            <div className="product-modal-image">

              {discount > 0 && (
                <span className="modal-discount">
                  {discount}% OFF
                </span>
              )}


              <img
                src={product.image}
                alt={product.name}
              />


              {!isAvailable && (
                <div className="modal-out-of-stock-overlay">
                  <span>
                    Out of Stock
                  </span>
                </div>
              )}

            </div>


            {/* =================================================
                         TRUST FEATURES
            ================================================= */}

            <div className="product-trust-row">

              <div>
                <FiTruck />

                <span>
                  Fast Delivery
                </span>
              </div>


              <div>
                <FiShield />

                <span>
                  Quality Checked
                </span>
              </div>

            </div>


            {/* =================================================
                         SELLER / STORE CARD
            ================================================= */}

            <div className="product-seller-card">

              <div className="seller-card-icon">
                <FiPackage />
              </div>


              <div className="seller-card-content">

                <span className="seller-label">
                  SOLD BY
                </span>


                <strong>
                  {storeName}
                </strong>


                <div className="seller-meta">

                  <span>
                    <FiMapPin />
                    {distance}
                  </span>


                  <span>
                    <FiTruck />
                    {deliveryTime}
                  </span>

                </div>

              </div>


              {product.storeId && (
                <button
                  type="button"
                  className="seller-view-btn"
                  onClick={() =>
                    onViewStore?.({
                      id: product.storeId,
                      name: storeName,
                    })
                  }
                >
                  View Store

                  <FiArrowRight />
                </button>
              )}

            </div>

          </div>


          {/* =================================================
                              RIGHT
          ================================================= */}

          <div className="product-modal-right">


            {/* =================================================
                              BADGE
            ================================================= */}

            <span className="product-modal-tag">
              {product.badge ||
                "LOCALMART PICK"}
            </span>


            {/* =================================================
                         PRODUCT NAME
            ================================================= */}

            <h2>
              {product.name}
            </h2>


            {/* =================================================
                           BRAND
            ================================================= */}

            {product.brand && (
              <p className="modal-brand">
                {product.brand}
              </p>
            )}


            {/* =================================================
                           RATING
            ================================================= */}

            <div className="modal-rating">

              <div>

                <FiStar />

                <strong>
                  {rating}
                </strong>

              </div>


              <span>
                {reviews > 0
                  ? `${reviews.toLocaleString()} verified ratings`
                  : "Verified customer ratings"}
              </span>

            </div>


            {/* =================================================
                              UNIT
            ================================================= */}

            <p className="modal-unit">
              {product.unit}
            </p>


            {/* =================================================
                             PRICE
            ================================================= */}

            <div className="modal-price-area">

              <span className="modal-price">
                ₹{price}
              </span>


              {originalPrice > price && (
                <span className="modal-original-price">
                  ₹{originalPrice}
                </span>
              )}


              {discount > 0 && (
                <span className="modal-off">
                  {discount}% OFF
                </span>
              )}

            </div>


            {/* =================================================
                            SAVINGS
            ================================================= */}

            {savings > 0 && (
              <p className="modal-saving">
                You save ₹{savings} on this product
              </p>
            )}


            {/* =================================================
                       PRICE COMPARISON
            ================================================= */}

            <button
              type="button"
              className="modal-compare-price"
              onClick={() =>
                onComparePrices?.(product)
              }
            >

              <div className="compare-price-icon">
                <FiTrendingDown />
              </div>


              <div className="compare-price-content">

                <strong>
                  Compare nearby prices
                </strong>

                <span>
                  Check if another nearby mart
                  offers a better price
                </span>

              </div>


              <FiArrowRight
                className="compare-price-arrow"
              />

            </button>


            {/* =================================================
                         STOCK STATUS
            ================================================= */}

            {isAvailable ? (

              <div className="modal-stock modal-stock-available">

                <FiCheckCircle />

                <div>

                  <strong>
                    In Stock
                  </strong>

                  <span>
                    {stock}{" "}
                    {stock === 1
                      ? "unit"
                      : "units"}{" "}
                    available for delivery
                  </span>

                </div>

              </div>

            ) : (

              <div className="modal-stock modal-stock-unavailable">

                <FiAlertCircle />

                <div>

                  <strong>
                    Out of Stock
                  </strong>

                  <span>
                    This product is currently
                    unavailable at this store.
                  </span>

                </div>

              </div>

            )}


            {/* =================================================
                            DELIVERY
            ================================================= */}

            <div className="modal-delivery">

              <FiTruck />

              <div>

                <strong>
                  {isAvailable
                    ? `Delivery in ${deliveryTime}`
                    : "Delivery unavailable"}
                </strong>

                <span>
                  Fulfilled by {storeName}
                </span>

              </div>

            </div>


            {/* =================================================
                           QUANTITY
            ================================================= */}

            <div className="modal-quantity-section">

              <div>

                <h4>
                  Quantity
                </h4>

                <p>
                  {isAvailable
                    ? `Maximum ${stock} ${
                        stock === 1
                          ? "unit"
                          : "units"
                      } available`
                    : "Currently unavailable"}
                </p>

              </div>


              <div className="modal-quantity">

                <button
                  type="button"
                  onClick={onDecreaseQuantity}
                  disabled={
                    !isAvailable ||
                    quantity <= 1
                  }
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>


                <span>
                  {quantity}
                </span>


                <button
                  type="button"
                  onClick={onIncreaseQuantity}
                  disabled={
                    !isAvailable ||
                    quantity >= stock
                  }
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>

              </div>

            </div>


            {/* =================================================
                             ACTIONS
            ================================================= */}

            <div className="modal-actions">


              {/* WISHLIST */}

              <button
                type="button"
                className={`modal-wishlist-btn ${
                  isWishlisted
                    ? "modal-wishlist-active"
                    : ""
                }`}
                onClick={() =>
                  onToggleWishlist?.(product)
                }
              >

                <FiHeart />

                {isWishlisted
                  ? "Wishlisted"
                  : "Wishlist"}

              </button>


              {/* CART */}

              <button
                type="button"
                className="modal-cart-btn"
                disabled={!isAvailable}
                onClick={() => {

                  if (!isAvailable) {
                    return;
                  }

                  onAddToCart?.(
                    {
                      ...product,
                      storeName,
                    },
                    quantity
                  );

                }}
              >

                <FiShoppingCart />

                {isAvailable
                  ? `Add ${quantity} to Cart`
                  : "Out of Stock"}

              </button>

            </div>


            {/* =================================================
                         PRODUCT DETAILS
            ================================================= */}

            <div className="modal-product-info">

              <h3>
                Product Details
              </h3>


              <p>
                {description}
              </p>


              {/* TAGS */}

              {product.tags?.length > 0 && (

                <div className="modal-product-tags">

                  {product.tags.map(
                    (tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    )
                  )}

                </div>

              )}


              {/* INFO POINTS */}

              <div className="modal-info-points">

                <span>
                  <FiCheckCircle />
                  Quality checked
                </span>


                <span>
                  <FiCheckCircle />
                  Secure packaging
                </span>


                <span>
                  <FiCheckCircle />
                  Trusted local seller
                </span>

              </div>

            </div>


          </div>

        </div>

      </div>
    </>
  );
}


export default ProductDetails;