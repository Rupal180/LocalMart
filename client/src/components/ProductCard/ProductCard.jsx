import "./ProductCard.css";

import {
  FaHeart,
  FaStar,
} from "react-icons/fa";

import {
  FiShoppingCart,
} from "react-icons/fi";

function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onProductClick,
}) {
  // =========================================
  // OPEN PRODUCT DETAILS
  // =========================================

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  // =========================================
  // STOCK STATUS
  // =========================================

  const isAvailable =
    product.inStock !== false &&
    (product.stock === undefined ||
      product.stock > 0);

  // =========================================
  // DISCOUNT
  // =========================================

  const discount =
    typeof product.discount === "number"
      ? product.discount
      : 0;

  return (
    <article
      className={`product-card ${
        !isAvailable
          ? "product-card-out-of-stock"
          : ""
      }`}
      onClick={handleProductClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          handleProductClick();
        }
      }}
    >
      {/* =========================================
          WISHLIST
      ========================================== */}

      <button
        type="button"
        className={`wishlist-btn ${
          isWishlisted
            ? "wishlist-active"
            : ""
        }`}
        onClick={(event) => {
          event.stopPropagation();
          onToggleWishlist?.(product);
        }}
        aria-label={
          isWishlisted
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
      >
        <FaHeart />
      </button>

      {/* =========================================
          DISCOUNT
      ========================================== */}

      {discount > 0 && (
        <span className="discount-badge">
          {discount}% OFF
        </span>
      )}

      {/* =========================================
          IMAGE
      ========================================== */}

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </div>

      {/* =========================================
          DETAILS
      ========================================== */}

      <div className="product-details">
        {/* CATEGORY */}

        <span className="product-category">
          {product.category}
        </span>

        {/* PRODUCT NAME */}

        <h3 className="product-name-clickable">
          {product.name}
        </h3>

        {/* ======================================
            RATING
        ======================================= */}

        <div className="rating">
          <FaStar className="star" />

          <span>
            {product.rating ?? 0}
          </span>
        </div>

        {/* ======================================
            UNIT
        ======================================= */}

        <p className="unit">
          {product.unit}
        </p>

        {/* ======================================
            PRICE
        ======================================= */}

        <div className="price-section">
          <span className="price">
            ₹{product.price}
          </span>

          {product.originalPrice >
            product.price && (
            <span className="original-price">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* ======================================
            SAVINGS
        ======================================= */}

        {product.originalPrice >
          product.price && (
          <p className="product-saving-text">
            You save ₹
            {product.originalPrice -
              product.price}
          </p>
        )}

        {/* ======================================
            ADD TO CART
        ======================================= */}

        <button
          type="button"
          className={`cart-btn ${
            !isAvailable
              ? "cart-btn-disabled"
              : ""
          }`}
          disabled={!isAvailable}
          onClick={(event) => {
            event.stopPropagation();

            if (!isAvailable) {
              return;
            }

            onAddToCart?.(
              product,
              1
            );
          }}
        >
          <FiShoppingCart />

          <span>
            {isAvailable
              ? "Add to Cart"
              : "Out of Stock"}
          </span>
        </button>
      </div>
    </article>
  );
}

export default ProductCard;