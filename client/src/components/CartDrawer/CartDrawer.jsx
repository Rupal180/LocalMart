import "./CartDrawer.css";

import {
  FiX,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";

function CartDrawer({
  isOpen,
  cart,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onProductClick,
  onCheckout,
}) {

  /* ================================
            SUBTOTAL
  ================================= */

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  /* ================================
          OPEN PRODUCT DETAILS
  ================================= */

  const handleProductClick = (item) => {

    // Close cart drawer
    onClose();

    // Open product details
    onProductClick(item);
  };


  /* ================================
            CHECKOUT
  ================================= */

  const handleCheckout = () => {

    // Close cart drawer first
    onClose();

    // Open checkout page
    onCheckout();
  };


  return (
    <>

      {/* ================================
                  OVERLAY
      ================================= */}

      <div
        className={`cart-overlay ${
          isOpen ? "cart-overlay-show" : ""
        }`}
        onClick={onClose}
      ></div>


      {/* ================================
                  DRAWER
      ================================= */}

      <aside
        className={`cart-drawer ${
          isOpen ? "cart-drawer-open" : ""
        }`}
      >

        {/* ================= HEADER ================= */}

        <div className="cart-drawer-header">

          <div>

            <span className="cart-small-title">
              LOCALMART
            </span>

            <h2>
              Your Cart
            </h2>

            <p>
              {cart.length === 0
                ? "Your cart is waiting for something fresh."
                : `${cart.length} ${
                    cart.length === 1
                      ? "product"
                      : "products"
                  } in your cart`}
            </p>

          </div>


          <button
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            <FiX />
          </button>

        </div>


        {/* ================================
                  CART CONTENT
        ================================= */}

        <div className="cart-drawer-content">

          {cart.length === 0 ? (

            /* ================= EMPTY CART ================= */

            <div className="empty-cart">

              <div className="empty-cart-icon">
                <FiShoppingBag />
              </div>

              <h3>
                Your cart is empty
              </h3>

              <p>
                Add some fresh groceries and everyday
                essentials to get started.
              </p>

              <button onClick={onClose}>

                Continue Shopping

                <FiArrowRight />

              </button>

            </div>

          ) : (

            /* ================= PRODUCTS ================= */

            <div className="cart-items">

              {cart.map((item) => (

                <div
                  className="cart-drawer-item"
                  key={item.id}
                >

                  {/* ================= PRODUCT IMAGE ================= */}

                  <div
                    className="cart-item-image cart-product-clickable"
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

                  </div>


                  {/* ================= DETAILS ================= */}

                  <div className="cart-item-details">

                    <div className="cart-item-top">

                      <div>

                        {/* PRODUCT NAME */}

                        <h3
                          className="cart-product-name"
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


                      {/* REMOVE PRODUCT */}

                      <button
                        className="remove-cart-item"
                        onClick={() =>
                          onRemove(item.id)
                        }
                        aria-label={`Remove ${item.name}`}
                      >

                        <FiTrash2 />

                      </button>

                    </div>


                    {/* ================= PRICE + QUANTITY ================= */}

                    <div className="cart-item-bottom">

                      <div className="cart-item-price">

                        <strong>
                          ₹{item.price * item.quantity}
                        </strong>


                        {item.quantity > 1 && (

                          <span>
                            ₹{item.price} each
                          </span>

                        )}

                      </div>


                      {/* ================= QUANTITY ================= */}

                      <div className="quantity-control">

                        <button
                          onClick={() =>
                            onDecrease(item.id)
                          }
                          aria-label="Decrease quantity"
                        >

                          <FiMinus />

                        </button>


                        <span>
                          {item.quantity}
                        </span>


                        <button
                          onClick={() =>
                            onIncrease(item.id)
                          }
                          aria-label="Increase quantity"
                        >

                          <FiPlus />

                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* ================================
                  CART FOOTER
        ================================= */}

        {cart.length > 0 && (

          <div className="cart-drawer-footer">

            {/* SUBTOTAL */}

            <div className="cart-price-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{subtotal}
              </strong>

            </div>


            {/* DELIVERY */}

            <div className="cart-price-row">

              <span>
                Delivery
              </span>

              <strong className="free-delivery">
                FREE
              </strong>

            </div>


            <div className="cart-divider"></div>


            {/* TOTAL */}

            <div className="cart-total-row">

              <div>

                <span>
                  Total
                </span>

                <small>
                  Inclusive of all taxes
                </small>

              </div>


              <strong>
                ₹{subtotal}
              </strong>

            </div>


            {/* ================================
                    CHECKOUT BUTTON
            ================================= */}

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >

              Proceed to Checkout

              <FiArrowRight />

            </button>


            <p className="cart-secure-text">
              🔒 Safe & secure checkout
            </p>

          </div>

        )}

      </aside>

    </>
  );
}

export default CartDrawer;