import "./WishlistDrawer.css";

import {
  FiX,
  FiHeart,
  FiTrash2,
  FiShoppingCart,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";

function WishlistDrawer({
  isOpen,
  wishlist,
  onClose,
  onRemove,
  onAddToCart,
  onProductClick,
}) {

  /* =========================================
          OPEN PRODUCT DETAILS
  ========================================= */

  const handleProductClick = (item) => {

    // Close wishlist drawer
    onClose();

    // Open product details modal
    onProductClick(item);
  };


  return (
    <>

      {/* ================= OVERLAY ================= */}

      <div
        className={`wishlist-overlay ${
          isOpen ? "wishlist-overlay-show" : ""
        }`}
        onClick={onClose}
      ></div>


      {/* ================= DRAWER ================= */}

      <aside
        className={`wishlist-drawer ${
          isOpen ? "wishlist-drawer-open" : ""
        }`}
      >

        {/* ================= HEADER ================= */}

        <div className="wishlist-drawer-header">

          <div>

            <span className="wishlist-small-title">
              YOUR FAVOURITES
            </span>

            <h2>
              My Wishlist
            </h2>

            <p>
              {wishlist.length === 0
                ? "Save products you love."
                : `${wishlist.length} ${
                    wishlist.length === 1
                      ? "product"
                      : "products"
                  } saved`}
            </p>

          </div>


          <button
            className="wishlist-close-btn"
            onClick={onClose}
            aria-label="Close wishlist"
          >
            <FiX />
          </button>

        </div>


        {/* ================= CONTENT ================= */}

        <div className="wishlist-drawer-content">

          {wishlist.length === 0 ? (

            /* ================= EMPTY WISHLIST ================= */

            <div className="empty-wishlist">

              <div className="empty-wishlist-icon">
                <FiHeart />
              </div>

              <h3>
                Your wishlist is empty
              </h3>

              <p>
                Tap the heart on products you love and
                they'll appear here for later.
              </p>

              <button onClick={onClose}>

                Explore Products

                <FiArrowRight />

              </button>

            </div>

          ) : (

            /* ================= PRODUCTS ================= */

            <div className="wishlist-items">

              {wishlist.map((item) => (

                <div
                  className="wishlist-item"
                  key={item.id}
                >

                  {/* ================= PRODUCT IMAGE ================= */}

                  <div
                    className="wishlist-item-image wishlist-product-clickable"
                    onClick={() =>
                      handleProductClick(item)
                    }
                    role="button"
                    tabIndex="0"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />


                    {item.discount > 0 && (

                      <span className="wishlist-discount">
                        {item.discount}% OFF
                      </span>

                    )}

                  </div>


                  {/* ================= PRODUCT DETAILS ================= */}

                  <div className="wishlist-item-details">

                    <div className="wishlist-item-top">

                      <div>

                        {/* CLICKABLE PRODUCT NAME */}

                        <h3
                          className="wishlist-product-name"
                          onClick={() =>
                            handleProductClick(item)
                          }
                        >
                          {item.name}
                        </h3>


                        <p>
                          {item.unit}
                        </p>

                      </div>


                      {/* ================= REMOVE ================= */}

                      <button
                        className="wishlist-remove-btn"
                        onClick={() =>
                          onRemove(item)
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        <FiTrash2 />
                      </button>

                    </div>


                    {/* ================= RATING ================= */}

                    <div className="wishlist-rating">

                      <FiStar />

                      <span>
                        {item.rating}
                      </span>

                    </div>


                    {/* ================= PRICE ================= */}

                    <div className="wishlist-price">

                      <strong>
                        ₹{item.price}
                      </strong>

                      <span>
                        ₹{item.originalPrice}
                      </span>

                    </div>


                    {/* ================= ADD TO CART ================= */}

                    <button
                      className="wishlist-cart-btn"
                      onClick={() =>
                        onAddToCart(item)
                      }
                    >

                      <FiShoppingCart />

                      Add to Cart

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </aside>

    </>
  );
}

export default WishlistDrawer;