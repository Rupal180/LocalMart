import { useState } from "react";

import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiArrowRight,
  FiShield,
  FiCheck,
  FiBriefcase,
  FiTruck,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import "./Signup.css";

function Signup({ onBack, onLogin }) {
  const [selectedRole, setSelectedRole] =
    useState("customer");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      storeName: "",
      storeArea: "",
      storeType: "",
    });

  const [errors, setErrors] =
    useState({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  /* =====================================================
                        ROLES
  ===================================================== */

  const roles = [
    {
      id: "customer",
      title: "Customer",
      description: "Shop and order locally",
      icon: FiUser,
    },

    {
      id: "vendor",
      title: "Vendor",
      description: "Sell products on LocalMart",
      icon: FiBriefcase,
    },

    {
      id: "delivery",
      title: "Delivery Partner",
      description: "Deliver orders nearby",
      icon: FiTruck,
    },
  ];

  /* =====================================================
                    INPUT CHANGE
  ===================================================== */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      general: "",
    }));

    setSuccessMessage("");
  };

  /* =====================================================
                    VALIDATION
  ===================================================== */

  const validateForm = () => {
    const newErrors = {};

    /* NAME */

    if (!formData.name.trim()) {
      newErrors.name =
        "Please enter your full name";
    } else if (
      formData.name.trim().length < 3
    ) {
      newErrors.name =
        "Name must be at least 3 characters";
    }

    /* EMAIL */

    if (!formData.email.trim()) {
      newErrors.email =
        "Please enter your email address";
    } else if (
      !/\S+@\S+\.\S+/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email address";
    }

    /* PASSWORD */

    if (!formData.password) {
      newErrors.password =
        "Please create a password";
    } else if (
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    /* CONFIRM PASSWORD */

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    /* =========================================
       VENDOR STORE VALIDATION
    ========================================= */

    if (selectedRole === "vendor") {
      if (!formData.storeName.trim()) {
        newErrors.storeName =
          "Please enter your store name";
      }

      if (!formData.storeArea.trim()) {
        newErrors.storeArea =
          "Please enter your store area";
      }

      if (!formData.storeType.trim()) {
        newErrors.storeType =
          "Please enter your store type";
      }
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  /* =====================================================
                    SAVE USER
  ===================================================== */

  const saveUser = async () => {
    try {
      const normalizedEmail =
        formData.email
          .trim()
          .toLowerCase();

      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: normalizedEmail,
            password: formData.password,
            role: selectedRole,
            ...(selectedRole === "vendor"
              ? {
                  storeName:
                    formData.storeName.trim(),
                  storeArea:
                    formData.storeArea.trim(),
                  storeType:
                    formData.storeType.trim(),
                }
              : {}),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          email:
            data.message ||
            "Unable to create account",
        });

        return false;
      }

      return true;
    } catch (error) {
      console.error("Signup error:", error);

      setErrors({
        general:
          "Unable to connect to server. Please make sure the backend is running.",
      });

      return false;
    }
  };

  /* =====================================================
                    SUBMIT
  ===================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const isUserSaved = await saveUser();

    setIsSubmitting(false);

    if (!isUserSaved) {
      return;
    }

    const selectedRoleData =
      roles.find(
        (role) =>
          role.id === selectedRole
      );

    setSuccessMessage(
      `Your ${selectedRoleData?.title} account has been created successfully!`
    );

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      storeName: "",
      storeArea: "",
      storeType: "",
    });
  };

  return (
    <div className="signup-page">

      {/* BACKGROUND */}

      <div className="signup-bg signup-bg-one"></div>

      <div className="signup-bg signup-bg-two"></div>


      {/* MAIN CONTAINER */}

      <div className="signup-container">

        {/* =========================================
            LEFT PANEL
        ========================================= */}

        <section className="signup-intro">

          {/* BACK BUTTON */}

          <button
            type="button"
            className="signup-back-btn"
            onClick={onBack}
          >
            <FiArrowLeft />

            <span>
              Back to LocalMart
            </span>
          </button>


          {/* BRAND */}

          <div className="signup-brand">

            <div className="signup-brand-icon">
              🛒
            </div>

            <div className="signup-brand-name">
              Local<span>Mart</span>
            </div>

            <h1>
              Everything local,
              <br />
              all in one place.
            </h1>

            <p>
              Create your LocalMart account and
              start shopping, selling or delivering
              with your local community.
            </p>

          </div>


          {/* BENEFITS */}

          <div className="signup-benefits">

            <div className="signup-benefit">

              <div className="signup-benefit-icon">
                <FiCheck />
              </div>

              <div>
                <strong>
                  Simple & convenient
                </strong>

                <span>
                  Your local shopping made easier
                </span>
              </div>

            </div>


            <div className="signup-benefit">

              <div className="signup-benefit-icon">
                <FiCheck />
              </div>

              <div>
                <strong>
                  Built for local businesses
                </strong>

                <span>
                  Connect with stores around you
                </span>
              </div>

            </div>


            <div className="signup-benefit">

              <div className="signup-benefit-icon">
                <FiShield />
              </div>

              <div>
                <strong>
                  Secure account
                </strong>

                <span>
                  Your information stays protected
                </span>
              </div>

            </div>

          </div>


          {/* FOOTER */}

          <div className="signup-intro-footer">

            <span className="signup-footer-dot"></span>

            Shop locally. Support locally.

          </div>

        </section>


        {/* =========================================
            RIGHT PANEL
        ========================================= */}

        <section className="signup-card">

          {/* HEADER */}

          <div className="signup-header">

            <div className="signup-welcome">
              GET STARTED
            </div>

            <h2>
              Create your account
            </h2>

            <p>
              Join LocalMart and make local
              shopping easier.
            </p>

          </div>


          {/* ROLE SELECTION */}

          <div className="signup-role-section">

            <div className="signup-section-label">
              I WANT TO JOIN AS
            </div>

            <div className="signup-role-grid">

              {roles.map((role) => {
                const Icon = role.icon;

                const isActive =
                  selectedRole === role.id;

                return (
                  <button
                    key={role.id}
                    type="button"
                    className={`signup-role-card ${
                      isActive
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedRole(role.id)
                    }
                  >

                    <div className="signup-role-icon">
                      <Icon />
                    </div>

                    <div className="signup-role-content">

                      <strong>
                        {role.title}
                      </strong>

                      <span>
                        {role.description}
                      </span>

                    </div>

                    <div className="signup-role-radio">

                      {isActive && (
                        <span></span>
                      )}

                    </div>

                  </button>
                );
              })}

            </div>

          </div>


          {/* SUCCESS MESSAGE */}

          {successMessage && (

            <div className="signup-success-message">

              <FiCheckCircle />

              <span>
                {successMessage}
              </span>

            </div>

          )}


          {/* FORM */}

          <form
            className="signup-form"
            onSubmit={handleSubmit}
            noValidate
          >

            {/* FULL NAME */}

            <div className="signup-field">

              <label htmlFor="signup-name">
                Full Name
              </label>

              <div
                className={`signup-input-wrapper ${
                  errors.name
                    ? "input-error"
                    : ""
                }`}
              >

                <FiUser className="signup-input-icon" />

                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />

              </div>

              {errors.name && (

                <p className="signup-error-message">

                  <FiAlertCircle />

                  {errors.name}

                </p>

              )}

            </div>


            {/* EMAIL */}

            <div className="signup-field">

              <label htmlFor="signup-email">
                Email Address
              </label>

              <div
                className={`signup-input-wrapper ${
                  errors.email
                    ? "input-error"
                    : ""
                }`}
              >

                <FiMail className="signup-input-icon" />

                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                />

              </div>

              {errors.email && (

                <p className="signup-error-message">

                  <FiAlertCircle />

                  {errors.email}

                </p>

              )}

            </div>


            {/* PASSWORD */}

            <div className="signup-field">

              <label htmlFor="signup-password">
                Password
              </label>

              <div
                className={`signup-input-wrapper ${
                  errors.password
                    ? "input-error"
                    : ""
                }`}
              >

                <FiLock className="signup-input-icon" />

                <input
                  id="signup-password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="signup-password-btn"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                >

                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}

                </button>

              </div>

              {errors.password && (

                <p className="signup-error-message">

                  <FiAlertCircle />

                  {errors.password}

                </p>

              )}

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="signup-field">

              <label htmlFor="signup-confirm-password">
                Confirm Password
              </label>

              <div
                className={`signup-input-wrapper ${
                  errors.confirmPassword
                    ? "input-error"
                    : ""
                }`}
              >

                <FiLock className="signup-input-icon" />

                <input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="signup-password-btn"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) =>
                        !previous
                    )
                  }
                >

                  {showConfirmPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}

                </button>

              </div>

              {errors.confirmPassword && (

                <p className="signup-error-message">

                  <FiAlertCircle />

                  {errors.confirmPassword}

                </p>

              )}

            </div>


            {/* =========================================
                VENDOR STORE DETAILS
            ========================================= */}

            {selectedRole === "vendor" && (

              <div className="signup-store-details">

                <div className="signup-section-label">
                  STORE DETAILS
                </div>


                {/* STORE NAME */}

                <div className="signup-field">

                  <label htmlFor="storeName">
                    Store Name
                  </label>

                  <div
                    className={`signup-input-wrapper ${
                      errors.storeName
                        ? "input-error"
                        : ""
                    }`}
                  >

                    <input
                      id="storeName"
                      name="storeName"
                      type="text"
                      value={formData.storeName}
                      onChange={handleChange}
                      placeholder="Enter your store name"
                    />

                  </div>

                  {errors.storeName && (

                    <p className="signup-error-message">

                      <FiAlertCircle />

                      {errors.storeName}

                    </p>

                  )}

                </div>


                {/* STORE AREA */}

                <div className="signup-field">

                  <label htmlFor="storeArea">
                    Store Area
                  </label>

                  <div
                    className={`signup-input-wrapper ${
                      errors.storeArea
                        ? "input-error"
                        : ""
                    }`}
                  >

                    <input
                      id="storeArea"
                      name="storeArea"
                      type="text"
                      value={formData.storeArea}
                      onChange={handleChange}
                      placeholder="Enter your store area"
                    />

                  </div>

                  {errors.storeArea && (

                    <p className="signup-error-message">

                      <FiAlertCircle />

                      {errors.storeArea}

                    </p>

                  )}

                </div>


                {/* STORE TYPE */}

                <div className="signup-field">

                  <label htmlFor="storeType">
                    Store Type
                  </label>

                  <div
                    className={`signup-input-wrapper ${
                      errors.storeType
                        ? "input-error"
                        : ""
                    }`}
                  >

                    <input
                      id="storeType"
                      name="storeType"
                      type="text"
                      value={formData.storeType}
                      onChange={handleChange}
                      placeholder="Example: Grocery & Essentials"
                    />

                  </div>

                  {errors.storeType && (

                    <p className="signup-error-message">

                      <FiAlertCircle />

                      {errors.storeType}

                    </p>

                  )}

                </div>

              </div>

            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className={`signup-submit-btn ${
                isSubmitting
                  ? "loading"
                  : ""
              }`}
              disabled={isSubmitting}
            >

              {isSubmitting ? (

                <span>
                  Creating Account...
                </span>

              ) : (

                <>

                  <span>
                    Create Account
                  </span>

                  <FiArrowRight />

                </>

              )}

            </button>

          </form>


          {/* DIVIDER */}

          <div className="signup-divider">

            <span></span>

            <strong>
              OR
            </strong>

            <span></span>

          </div>


          {/* LOGIN */}

          <div className="signup-login">

            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={onLogin}
            >
              Login
            </button>

          </div>


          {/* SECURITY */}

          <div className="signup-security">

            <FiShield />

            <span>
              Your account information is kept secure.
            </span>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Signup;