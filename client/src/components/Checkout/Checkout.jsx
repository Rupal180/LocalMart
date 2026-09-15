import { useState } from "react";
import "./Checkout.css";

import {
  FiArrowLeft,
  FiMapPin,
  FiTag,
  FiCheck,
  FiTruck,
  FiShield,
  FiCreditCard,
  FiShoppingBag,
  FiChevronRight,
  FiPlus,
  FiClock,
  FiPackage,
  FiSmartphone,
  FiX,
  FiEdit2,
  FiTrash2,
  FiUser,
  FiPhone,
  FiHome,
} from "react-icons/fi";

function Checkout({
  cart,
  onBack,
  onPlaceOrder,
}) {

  /* =========================================
                    COUPON STATE
  ========================================= */

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  /* =========================================
                  PAYMENT STATE
  ========================================= */

  const [paymentMethod, setPaymentMethod] = useState("upi");

  /* =========================================
                  ADDRESS STATE
  ========================================= */

  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);

  const [editingAddressId, setEditingAddressId] = useState(null);

  const [addressError, setAddressError] = useState("");

  const [checkoutError, setCheckoutError] = useState("");

  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    house: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
  });


  /* =========================================
                PRICE CALCULATIONS
  ========================================= */

  const mrpTotal = cart.reduce(
    (total, item) =>
      total + item.originalPrice * item.quantity,
    0
  );

  const sellingTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const productSavings =
    mrpTotal - sellingTotal;


  /* =========================================
                COUPON DISCOUNT
  ========================================= */

  let couponDiscount = 0;

  if (appliedCoupon === "LOCAL100") {
    couponDiscount = Math.min(100, sellingTotal);
  }

  if (appliedCoupon === "FRESH50") {
    couponDiscount = Math.min(50, sellingTotal);
  }


  /* =========================================
                  DELIVERY
  ========================================= */

  const deliveryFee =
    sellingTotal >= 299 ? 0 : 25;


  /* =========================================
                    TOTAL
  ========================================= */

  const finalTotal = Math.max(
    0,
    sellingTotal -
      couponDiscount +
      deliveryFee
  );

  const totalSavings =
    productSavings + couponDiscount;

  const totalQuantity = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  /* =========================================
                ADDRESS INPUT CHANGE
  ========================================= */

  const handleAddressChange = (event) => {

    const { name, value } = event.target;

    let newValue = value;

    /* PHONE ONLY NUMBERS */

    if (name === "phone") {
      newValue = value
        .replace(/\D/g, "")
        .slice(0, 10);
    }

    /* PINCODE ONLY NUMBERS */

    if (name === "pincode") {
      newValue = value
        .replace(/\D/g, "")
        .slice(0, 6);
    }

    setAddressForm((previousForm) => ({
      ...previousForm,
      [name]: newValue,
    }));

    setAddressError("");
  };


  /* =========================================
                RESET ADDRESS FORM
  ========================================= */

  const resetAddressForm = () => {

    setAddressForm({
      fullName: "",
      phone: "",
      house: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      type: "Home",
    });

    setEditingAddressId(null);

    setAddressError("");
  };


  /* =========================================
                OPEN ADDRESS FORM
  ========================================= */

  const openAddressForm = () => {

    resetAddressForm();

    setIsAddressFormOpen(true);

    setCheckoutError("");
  };


  /* =========================================
                CLOSE ADDRESS FORM
  ========================================= */

  const closeAddressForm = () => {

    setIsAddressFormOpen(false);

    resetAddressForm();
  };


  /* =========================================
                  SAVE ADDRESS
  ========================================= */

  const handleSaveAddress = (event) => {

    event.preventDefault();

    const {
      fullName,
      phone,
      house,
      area,
      city,
      state,
      pincode,
      type,
    } = addressForm;


    /* VALIDATION */

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !house.trim() ||
      !area.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {

      setAddressError(
        "Please complete all address fields."
      );

      return;
    }


    if (phone.length !== 10) {

      setAddressError(
        "Please enter a valid 10-digit mobile number."
      );

      return;
    }


    if (pincode.length !== 6) {

      setAddressError(
        "Please enter a valid 6-digit PIN code."
      );

      return;
    }


    /* EDIT EXISTING ADDRESS */

    if (editingAddressId !== null) {

      const updatedAddress = {
        id: editingAddressId,
        fullName: fullName.trim(),
        phone,
        house: house.trim(),
        area: area.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode,
        type,
      };


      setAddresses((previousAddresses) =>
        previousAddresses.map((address) =>
          address.id === editingAddressId
            ? updatedAddress
            : address
        )
      );


      if (selectedAddress === editingAddressId) {
        setSelectedAddress(editingAddressId);
      }

    } else {

      /* CREATE NEW ADDRESS */

      const newAddress = {
        id: Date.now(),
        fullName: fullName.trim(),
        phone,
        house: house.trim(),
        area: area.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode,
        type,
      };


      setAddresses((previousAddresses) => [
        ...previousAddresses,
        newAddress,
      ]);


      /* AUTO SELECT NEW ADDRESS */

      setSelectedAddress(newAddress.id);
    }


    setCheckoutError("");

    closeAddressForm();
  };


  /* =========================================
                  EDIT ADDRESS
  ========================================= */

  const handleEditAddress = (address) => {

    setAddressForm({
      fullName: address.fullName,
      phone: address.phone,
      house: address.house,
      area: address.area,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      type: address.type,
    });

    setEditingAddressId(address.id);

    setAddressError("");

    setIsAddressFormOpen(true);
  };


  /* =========================================
                DELETE ADDRESS
  ========================================= */

  const handleDeleteAddress = (addressId) => {

    setAddresses((previousAddresses) =>
      previousAddresses.filter(
        (address) =>
          address.id !== addressId
      )
    );


    if (selectedAddress === addressId) {

      setSelectedAddress(null);

    }

  };


  /* =========================================
              SELECT DELIVERY ADDRESS
  ========================================= */

  const handleSelectAddress = (addressId) => {

    setSelectedAddress(addressId);

    setCheckoutError("");
  };


  /* =========================================
                APPLY COUPON
  ========================================= */

  const applyCoupon = (codeFromCard) => {

    const code = (
      codeFromCard || couponCode
    )
      .trim()
      .toUpperCase();


    if (code === "LOCAL100") {

      setCouponCode("LOCAL100");

      setAppliedCoupon("LOCAL100");

      setCouponMessage(
        "Amazing! You saved an extra ₹100."
      );

      return;
    }


    if (code === "FRESH50") {

      setCouponCode("FRESH50");

      setAppliedCoupon("FRESH50");

      setCouponMessage(
        "Great! ₹50 discount has been applied."
      );

      return;
    }


    setAppliedCoupon("");

    setCouponMessage(
      "That coupon isn't available for this order."
    );
  };


  /* =========================================
                REMOVE COUPON
  ========================================= */

  const removeCoupon = () => {

    setAppliedCoupon("");

    setCouponCode("");

    setCouponMessage("");
  };


  /* =========================================
                  PLACE ORDER
  ========================================= */

  const handlePlaceOrder = () => {

    if (cart.length === 0) {

      setCheckoutError(
        "Your cart is empty."
      );

      return;
    }


    if (!selectedAddress) {

      setCheckoutError(
        "Please add and select a delivery address before placing your order."
      );

      window.scrollTo({
        top: 350,
        behavior: "smooth",
      });

      return;
    }


    const deliveryAddress =
      addresses.find(
        (address) =>
          address.id === selectedAddress
      );


    if (!deliveryAddress) {

      setCheckoutError(
        "Please select a valid delivery address."
      );

      return;
    }


    if (!paymentMethod) {

      setCheckoutError(
        "Please select a payment method."
      );

      return;
    }


    setCheckoutError("");


    if (!onPlaceOrder) {
      return;
    }


    onPlaceOrder({
      paymentMethod,
      deliveryAddress,
      appliedCoupon,
      mrpTotal,
      productSavings,
      couponDiscount,
      deliveryFee,
      finalTotal,
      totalSavings,
      items: cart,
    });
  };


  return (
    <main className="premium-checkout">

      {/* AMBIENT BACKGROUND */}

      <div className="checkout-glow checkout-glow-one"></div>
      <div className="checkout-glow checkout-glow-two"></div>


      {/* =========================================
                    NAVBAR
      ========================================= */}

      <header className="premium-checkout-header">

        <button
          className="checkout-back"
          onClick={onBack}
        >
          <FiArrowLeft />

          <span>
            Back to store
          </span>
        </button>


        <div className="checkout-logo">

          <div className="checkout-logo-icon">
            🛒
          </div>

          <div>

            <h2>
              LocalMart
            </h2>

            <span>
              CHECKOUT
            </span>

          </div>

        </div>


        <div className="checkout-secure">

          <div>
            <FiShield />
          </div>

          <span>
            100% Secure
          </span>

        </div>

      </header>


      {/* =========================================
                  PROGRESS AREA
      ========================================= */}

      <section className="checkout-intro">

        <div className="checkout-intro-text">

          <span className="checkout-eyebrow">
            ALMOST THERE
          </span>

          <h1>
            Your fresh order
            <br />

            <span>
              is ready.
            </span>
          </h1>

          <p>
            Complete the final details and we'll
            take care of everything else.
          </p>

        </div>


        <div className="checkout-progress">

          <div className="progress-step completed">

            <div className="progress-circle">
              <FiCheck />
            </div>

            <span>Bag</span>

          </div>


          <div className="progress-line completed"></div>


          <div
            className={`progress-step ${
              selectedAddress
                ? "completed"
                : "active"
            }`}
          >

            <div className="progress-circle">

              {selectedAddress
                ? <FiCheck />
                : "2"}

            </div>

            <span>Details</span>

          </div>


          <div
            className={`progress-line ${
              selectedAddress
                ? "completed"
                : "active"
            }`}
          ></div>


          <div className="progress-step active">

            <div className="progress-circle">
              3
            </div>

            <span>Payment</span>

          </div>


          <div className="progress-line"></div>


          <div className="progress-step">

            <div className="progress-circle">
              4
            </div>

            <span>Done</span>

          </div>

        </div>

      </section>


      {/* =========================================
                    MAIN GRID
      ========================================= */}

      <div className="premium-checkout-grid">

        <div className="checkout-main-column">


          {/* =========================================
                    01 DELIVERY
          ========================================= */}

          <section className="premium-section-card">

            <div className="premium-section-header">

              <div className="section-number">
                01
              </div>


              <div className="section-heading-text">

                <span>
                  DELIVERY
                </span>

                <h2>
                  Where should we deliver?
                </h2>

              </div>


              <div className="section-header-icon">
                <FiMapPin />
              </div>

            </div>


            {/* =========================================
                      NO SAVED ADDRESS
            ========================================= */}

            {addresses.length === 0 && (

              <div className="no-address-box">

                <div className="no-address-icon">
                  <FiMapPin />
                </div>

                <div>

                  <h3>
                    Add your delivery address
                  </h3>

                  <p>
                    We need your address to know where
                    your fresh groceries should be delivered.
                  </p>

                </div>

              </div>

            )}


            {/* =========================================
                      SAVED ADDRESSES
            ========================================= */}

            {addresses.length > 0 && (

              <div className="premium-addresses">

                {addresses.map((address, index) => {

                  const isSelected =
                    selectedAddress === address.id;


                  return (

                    <div
                      className={`premium-address-card saved-address-card ${
                        isSelected
                          ? "selected"
                          : ""
                      }`}
                      key={address.id}
                      onClick={() =>
                        handleSelectAddress(
                          address.id
                        )
                      }
                    >

                      {/* SELECT */}

                      <div className="address-selector">

                        {isSelected && (
                          <FiCheck />
                        )}

                      </div>


                      {/* DETAILS */}

                      <div className="premium-address-content">

                        <div className="premium-address-title">

                          <h3>
                            {address.type}
                          </h3>


                          {index === 0 && (

                            <span>
                              DEFAULT
                            </span>

                          )}


                          {isSelected && (

                            <span className="selected-address-badge">
                              SELECTED
                            </span>

                          )}

                        </div>


                        <h4 className="address-person-name">
                          {address.fullName}
                        </h4>


                        <p>
                          {address.house},{" "}
                          {address.area},{" "}
                          {address.city},{" "}
                          {address.state} -{" "}
                          {address.pincode}
                        </p>


                        <div className="saved-address-phone">

                          <FiPhone />

                          <span>
                            +91 {address.phone}
                          </span>

                        </div>


                        <div className="address-delivery-note">

                          <FiClock />

                          <span>
                            Eligible for fast delivery
                          </span>

                        </div>

                      </div>


                      {/* ACTIONS */}

                      <div className="saved-address-actions">

                        <button
                          type="button"
                          className="edit-address-btn"
                          onClick={(event) => {

                            event.stopPropagation();

                            handleEditAddress(
                              address
                            );
                          }}
                          aria-label="Edit address"
                        >
                          <FiEdit2 />
                        </button>


                        <button
                          type="button"
                          className="delete-address-btn"
                          onClick={(event) => {

                            event.stopPropagation();

                            handleDeleteAddress(
                              address.id
                            );
                          }}
                          aria-label="Delete address"
                        >
                          <FiTrash2 />
                        </button>

                      </div>

                    </div>

                  );

                })}

              </div>

            )}


            {/* ADD ADDRESS */}

            <button
              className="premium-add-address"
              onClick={openAddressForm}
            >

              <div>
                <FiPlus />
              </div>

              <span>
                Add a new address
              </span>

              <FiChevronRight />

            </button>


            {/* CHECKOUT ERROR */}

            {checkoutError && (

              <div className="checkout-validation-error">

                <span>!</span>

                <p>
                  {checkoutError}
                </p>

              </div>

            )}

          </section>


          {/* =========================================
                    02 SAVINGS
          ========================================= */}

          <section className="premium-section-card">

            <div className="premium-section-header">

              <div className="section-number">
                02
              </div>


              <div className="section-heading-text">

                <span>
                  SAVINGS
                </span>

                <h2>
                  Make this order even better.
                </h2>

              </div>


              <div className="section-header-icon">
                <FiTag />
              </div>

            </div>


            {/* COUPON INPUT */}

            <div className="premium-coupon-entry">

              <div className="coupon-entry-icon">
                <FiTag />
              </div>


              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(event) =>
                  setCouponCode(
                    event.target.value
                  )
                }
              />


              {appliedCoupon ? (

                <button
                  className="remove-coupon-btn"
                  onClick={removeCoupon}
                >
                  Remove
                </button>

              ) : (

                <button
                  className="apply-coupon-btn"
                  onClick={() =>
                    applyCoupon()
                  }
                >
                  Apply
                </button>

              )}

            </div>


            {couponMessage && (

              <div
                className={`premium-coupon-message ${
                  appliedCoupon
                    ? "success"
                    : "error"
                }`}
              >

                {appliedCoupon && (
                  <FiCheck />
                )}

                <span>
                  {couponMessage}
                </span>

              </div>

            )}


            {/* OFFERS */}

            <div className="premium-offers-heading">

              <span>
                BEST OFFERS FOR YOU
              </span>

              <div></div>

            </div>


            <div className="premium-coupon-list">

              {/* LOCAL100 */}

              <div
                className={`premium-coupon-ticket ${
                  appliedCoupon === "LOCAL100"
                    ? "coupon-applied"
                    : ""
                }`}
              >

                <div className="ticket-left">

                  <div className="ticket-percent">
                    %
                  </div>

                </div>


                <div className="ticket-center">

                  <span>
                    EXTRA SAVINGS
                  </span>

                  <h3>
                    LOCAL100
                  </h3>

                  <p>
                    Get flat ₹100 off on
                    your LocalMart order.
                  </p>

                </div>


                <div className="ticket-right">

                  <strong>
                    ₹100
                  </strong>

                  <span>
                    OFF
                  </span>


                  <button
                    onClick={() =>
                      appliedCoupon === "LOCAL100"
                        ? removeCoupon()
                        : applyCoupon("LOCAL100")
                    }
                  >

                    {appliedCoupon === "LOCAL100"
                      ? "Applied ✓"
                      : "Apply"}

                  </button>

                </div>

              </div>


              {/* FRESH50 */}

              <div
                className={`premium-coupon-ticket ${
                  appliedCoupon === "FRESH50"
                    ? "coupon-applied"
                    : ""
                }`}
              >

                <div className="ticket-left">

                  <div className="ticket-percent">
                    %
                  </div>

                </div>


                <div className="ticket-center">

                  <span>
                    FRESH DEAL
                  </span>

                  <h3>
                    FRESH50
                  </h3>

                  <p>
                    Save an extra ₹50 instantly.
                  </p>

                </div>


                <div className="ticket-right">

                  <strong>
                    ₹50
                  </strong>

                  <span>
                    OFF
                  </span>


                  <button
                    onClick={() =>
                      appliedCoupon === "FRESH50"
                        ? removeCoupon()
                        : applyCoupon("FRESH50")
                    }
                  >

                    {appliedCoupon === "FRESH50"
                      ? "Applied ✓"
                      : "Apply"}

                  </button>

                </div>

              </div>

            </div>

          </section>


          {/* =========================================
                    03 PAYMENT
          ========================================= */}

          <section className="premium-section-card">

            <div className="premium-section-header">

              <div className="section-number">
                03
              </div>


              <div className="section-heading-text">

                <span>
                  PAYMENT
                </span>

                <h2>
                  How would you like to pay?
                </h2>

              </div>


              <div className="section-header-icon">
                <FiCreditCard />
              </div>

            </div>


            <div className="premium-payment-grid">

              {/* UPI */}

              <button
                className={`premium-payment-card ${
                  paymentMethod === "upi"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("upi")
                }
              >

                <div className="payment-check">

                  {paymentMethod === "upi" && (
                    <FiCheck />
                  )}

                </div>


                <div className="payment-method-icon">
                  <FiSmartphone />
                </div>


                <div className="payment-method-text">

                  <h3>UPI</h3>

                  <p>
                    Pay instantly using your
                    favourite UPI app.
                  </p>

                  <span>
                    GPay · PhonePe · Paytm
                  </span>

                </div>

              </button>


              {/* CARD */}

              <button
                className={`premium-payment-card ${
                  paymentMethod === "card"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("card")
                }
              >

                <div className="payment-check">

                  {paymentMethod === "card" && (
                    <FiCheck />
                  )}

                </div>


                <div className="payment-method-icon">
                  <FiCreditCard />
                </div>


                <div className="payment-method-text">

                  <h3>Card</h3>

                  <p>
                    Credit or debit card with
                    secure processing.
                  </p>

                  <span>
                    Visa · Mastercard · RuPay
                  </span>

                </div>

              </button>


              {/* COD */}

              <button
                className={`premium-payment-card ${
                  paymentMethod === "cod"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("cod")
                }
              >

                <div className="payment-check">

                  {paymentMethod === "cod" && (
                    <FiCheck />
                  )}

                </div>


                <div className="payment-method-icon">
                  <FiPackage />
                </div>


                <div className="payment-method-text">

                  <h3>
                    Cash on Delivery
                  </h3>

                  <p>
                    Pay when your groceries
                    reach your doorstep.
                  </p>

                  <span>
                    Easy & convenient
                  </span>

                </div>

              </button>

            </div>

          </section>

        </div>


        {/* =========================================
                  RIGHT ORDER SUMMARY
        ========================================= */}

        <aside className="premium-order-column">

          <div className="premium-order-card">

            <div className="premium-order-header">

              <div>

                <span>
                  YOUR BAG
                </span>

                <h2>
                  Order Summary
                </h2>

              </div>


              <div className="premium-bag-count">

                <FiShoppingBag />

                <span>
                  {totalQuantity}
                </span>

              </div>

            </div>


            {/* DELIVERY PROMISE */}

            <div className="delivery-promise">

              <div className="delivery-promise-icon">
                <FiTruck />
              </div>


              <div>

                <span>
                  DELIVERY PROMISE
                </span>

                <strong>
                  Fresh groceries, delivered fast.
                </strong>

              </div>

            </div>


            {/* SELECTED DELIVERY ADDRESS */}

            {selectedAddress && (

              <div className="summary-delivery-address">

                <div className="summary-address-icon">
                  <FiMapPin />
                </div>


                <div>

                  <span>
                    DELIVERING TO
                  </span>


                  {(() => {

                    const address =
                      addresses.find(
                        (item) =>
                          item.id === selectedAddress
                      );


                    if (!address) {
                      return null;
                    }


                    return (
                      <>
                        <strong>
                          {address.type} · {address.fullName}
                        </strong>

                        <p>
                          {address.house}, {address.area},
                          {" "}
                          {address.city} - {address.pincode}
                        </p>
                      </>
                    );

                  })()}

                </div>

              </div>

            )}


            {/* PRODUCTS */}

            <div className="premium-summary-products">

              {cart.map((item) => (

                <div
                  className="premium-summary-product"
                  key={item.id}
                >

                  <div className="premium-summary-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <span>
                      {item.quantity}
                    </span>

                  </div>


                  <div className="premium-summary-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.unit}
                    </p>


                    {item.originalPrice >
                      item.price && (

                      <div className="summary-product-saving">

                        Save ₹
                        {(item.originalPrice -
                          item.price) *
                          item.quantity}

                      </div>

                    )}

                  </div>


                  <div className="premium-summary-price">

                    <strong>
                      ₹{item.price * item.quantity}
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


            {/* PRICE DETAILS */}

            <div className="premium-price-breakdown">

              <div className="price-breakdown-title">

                <span>
                  PRICE DETAILS
                </span>

                <div></div>

              </div>


              <div className="premium-price-row">

                <span>
                  MRP Total
                </span>

                <strong>
                  ₹{mrpTotal}
                </strong>

              </div>


              {productSavings > 0 && (

                <div className="premium-price-row">

                  <span>
                    Product savings
                  </span>

                  <strong className="green-price">
                    − ₹{productSavings}
                  </strong>

                </div>

              )}


              {couponDiscount > 0 && (

                <div className="premium-price-row coupon-price-row">

                  <span>
                    {appliedCoupon}
                  </span>

                  <strong className="green-price">
                    − ₹{couponDiscount}
                  </strong>

                </div>

              )}


              <div className="premium-price-row">

                <span>
                  Delivery fee
                </span>


                {deliveryFee === 0 ? (

                  <strong className="green-price">
                    FREE
                  </strong>

                ) : (

                  <strong>
                    ₹{deliveryFee}
                  </strong>

                )}

              </div>

            </div>


            {/* TOTAL */}

            <div className="premium-total-area">

              <div>

                <span>
                  TOTAL TO PAY
                </span>

                <p>
                  Inclusive of all taxes
                </p>

              </div>


              <strong>
                ₹{finalTotal}
              </strong>

            </div>


            {/* SAVINGS */}

            {totalSavings > 0 && (

              <div className="premium-saving-banner">

                <div className="saving-celebration">
                  ✨
                </div>


                <div>

                  <span>
                    YOU'RE SAVING
                  </span>

                  <strong>
                    ₹{totalSavings}
                  </strong>

                  <p>
                    on this order
                  </p>

                </div>

              </div>

            )}


            {/* PLACE ORDER */}

            <button
              className="premium-place-order"
              onClick={handlePlaceOrder}
              disabled={cart.length === 0}
            >

              <div>

                <span>
                  PLACE ORDER
                </span>

                <strong>
                  ₹{finalTotal}
                </strong>

              </div>


              <div className="place-order-arrow">
                <FiChevronRight />
              </div>

            </button>


            {!selectedAddress && (

              <p className="place-order-address-note">
                Add a delivery address to complete your order.
              </p>

            )}


            <div className="premium-security-row">

              <FiShield />

              <div>

                <strong>
                  Safe & secure checkout
                </strong>

                <span>
                  Your payment information is protected.
                </span>

              </div>

            </div>


            <div className="checkout-trust-points">

              <span>
                ✓ Quality checked
              </span>

              <span>
                ✓ Secure payment
              </span>

              <span>
                ✓ Local stores
              </span>

            </div>

          </div>

        </aside>

      </div>


      {/* =====================================================
                      ADDRESS MODAL
      ====================================================== */}

      {isAddressFormOpen && (

        <div className="address-modal-overlay">

          <div className="address-modal">

            {/* MODAL HEADER */}

            <div className="address-modal-header">

              <div>

                <span>
                  DELIVERY DETAILS
                </span>

                <h2>
                  {editingAddressId !== null
                    ? "Edit your address"
                    : "Add a new address"}
                </h2>

                <p>
                  Tell us where you'd like your
                  LocalMart order delivered.
                </p>

              </div>


              <button
                className="address-modal-close"
                onClick={closeAddressForm}
                type="button"
              >
                <FiX />
              </button>

            </div>


            {/* FORM */}

            <form
              className="premium-address-form"
              onSubmit={handleSaveAddress}
            >

              {/* NAME + PHONE */}

              <div className="address-form-row">

                <div className="address-form-group">

                  <label>
                    Full Name
                  </label>

                  <div className="address-input-box">

                    <FiUser />

                    <input
                      type="text"
                      name="fullName"
                      placeholder="Your full name"
                      value={addressForm.fullName}
                      onChange={handleAddressChange}
                    />

                  </div>

                </div>


                <div className="address-form-group">

                  <label>
                    Mobile Number
                  </label>

                  <div className="address-input-box">

                    <FiPhone />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="10-digit number"
                      value={addressForm.phone}
                      onChange={handleAddressChange}
                    />

                  </div>

                </div>

              </div>


              {/* HOUSE */}

              <div className="address-form-group">

                <label>
                  House / Flat / Building
                </label>

                <div className="address-input-box">

                  <FiHome />

                  <input
                    type="text"
                    name="house"
                    placeholder="House no., flat or building"
                    value={addressForm.house}
                    onChange={handleAddressChange}
                  />

                </div>

              </div>


              {/* AREA */}

              <div className="address-form-group">

                <label>
                  Street / Area / Locality
                </label>

                <div className="address-input-box">

                  <FiMapPin />

                  <input
                    type="text"
                    name="area"
                    placeholder="Street, area or locality"
                    value={addressForm.area}
                    onChange={handleAddressChange}
                  />

                </div>

              </div>


              {/* CITY + PINCODE */}

              <div className="address-form-row">

                <div className="address-form-group">

                  <label>
                    City
                  </label>

                  <div className="address-input-box">

                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={addressForm.city}
                      onChange={handleAddressChange}
                    />

                  </div>

                </div>


                <div className="address-form-group">

                  <label>
                    PIN Code
                  </label>

                  <div className="address-input-box">

                    <input
                      type="text"
                      name="pincode"
                      placeholder="6-digit PIN"
                      value={addressForm.pincode}
                      onChange={handleAddressChange}
                    />

                  </div>

                </div>

              </div>


              {/* STATE */}

              <div className="address-form-group">

                <label>
                  State
                </label>

                <div className="address-input-box">

                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={addressForm.state}
                    onChange={handleAddressChange}
                  />

                </div>

              </div>


              {/* ADDRESS TYPE */}

              <div className="address-type-section">

                <label>
                  Save address as
                </label>


                <div className="address-type-options">

                  {["Home", "Work", "Other"].map(
                    (type) => (

                      <button
                        type="button"
                        key={type}
                        className={`address-type-btn ${
                          addressForm.type === type
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setAddressForm(
                            (previousForm) => ({
                              ...previousForm,
                              type,
                            })
                          )
                        }
                      >

                        {type === "Home" && (
                          <FiHome />
                        )}

                        {type === "Work" && (
                          <FiCreditCard />
                        )}

                        {type === "Other" && (
                          <FiMapPin />
                        )}

                        {type}

                      </button>

                    )
                  )}

                </div>

              </div>


              {/* ERROR */}

              {addressError && (

                <div className="address-form-error">

                  <span>!</span>

                  <p>
                    {addressError}
                  </p>

                </div>

              )}


              {/* ACTIONS */}

              <div className="address-form-actions">

                <button
                  type="button"
                  className="cancel-address-btn"
                  onClick={closeAddressForm}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="save-address-btn"
                >

                  <FiCheck />

                  {editingAddressId !== null
                    ? "Update Address"
                    : "Save Delivery Address"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}

export default Checkout;