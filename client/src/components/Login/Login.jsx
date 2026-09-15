import { useState } from "react";

import {
  FiUser,
  FiBriefcase,
  FiTruck,
  FiShield,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiMapPin,
  FiTag,
  FiCheckCircle,
  FiShoppingBag,
  FiArrowRight,
  FiAlertCircle,
} from "react-icons/fi";

import "./Login.css";

function Login({ onBack, onSignup, onLoginSuccess }) {
  const [selectedRole, setSelectedRole] =
    useState("customer");

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /* =====================================================
                    ROLES
  ===================================================== */

  const roles = [
    {
      id: "customer",
      title: "Customer",
      description:
        "Shop products, manage cart & orders",
      icon: FiUser,
    },

    {
      id: "vendor",
      title: "Vendor",
      description:
        "Manage products, stock & orders",
      icon: FiBriefcase,
    },

    {
      id: "delivery",
      title: "Delivery Partner",
      description:
        "View deliveries & update status",
      icon: FiTruck,
    },

    {
      id: "admin",
      title: "Admin",
      description:
        "Manage the complete platform",
      icon: FiShield,
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

    setErrorMessage("");
    setSuccessMessage("");
  };

  /* =====================================================
                    LOGIN
  ===================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.email.trim() || !formData.password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (selectedRole === "customer" || selectedRole === "vendor") {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setIsSubmitting(false);
          setErrorMessage(data.message || "Invalid email or password.");
          return;
        }

        const user = data.user;

        if (user.role !== selectedRole) {
          setIsSubmitting(false);
          const userRole = roles.find((role) => role.id === user.role);
          setErrorMessage(
            `This account is registered as ${userRole?.title || user.role}. Please select the correct account type.`
          );
          return;
        }

        localStorage.setItem(
          "localMartCurrentUser",
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone || null,
            storeId: user.storeId || null,
            createdAt: user.createdAt || null,
          })
        );

        setIsSubmitting(false);
        setSuccessMessage(`Welcome back, ${user.name}! Login successful.`);
        console.log("Logged in user from backend:", user);

        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(user);
        }, 700);

        return;
      }

      // Delivery/Admin still use the existing local login for now.
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("localMartUsers")) || [];
        const normalizedEmail = formData.email.trim().toLowerCase();
        const user = users.find(
          (existingUser) => existingUser.email.toLowerCase() === normalizedEmail
        );

        if (!user) {
          setIsSubmitting(false);
          setErrorMessage(
            "No account found with this email. Please create an account first."
          );
          return;
        }

        if (user.role !== selectedRole) {
          setIsSubmitting(false);
          const userRole = roles.find((role) => role.id === user.role);
          setErrorMessage(
            `This account is registered as ${userRole?.title || user.role}. Please select the correct account type.`
          );
          return;
        }

        if (user.password !== formData.password) {
          setIsSubmitting(false);
          setErrorMessage("Incorrect password. Please try again.");
          return;
        }

        localStorage.setItem(
          "localMartCurrentUser",
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            storeId: user.storeId || null,
          })
        );

        setIsSubmitting(false);
        setSuccessMessage(`Welcome back, ${user.name}! Login successful.`);

        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess(user);
        }, 700);
      }, 800);
    } catch (error) {
      console.error("Login error:", error);
      setIsSubmitting(false);
      setErrorMessage(
        "Unable to connect to server. Please make sure the backend is running."
      );
    }
  };
  /* =====================================================
                    CURRENT ROLE
  ===================================================== */

  const currentRole =
    roles.find(
      (role) =>
        role.id === selectedRole
    );

  return (
    <div className="login-page">

      {/* =================================================
                        BACKGROUND
      ================================================= */}

      <div className="login-bg-circle login-bg-circle-one"></div>

      <div className="login-bg-circle login-bg-circle-two"></div>

      {/* =================================================
                        MAIN CARD
      ================================================= */}

      <div className="login-container">

        {/* =================================================
                          LEFT PANEL
        ================================================= */}

        <section className="login-intro">

          {/* BACK */}

          <button
            type="button"
            className="login-back-btn"
            onClick={onBack}
          >

            <FiArrowLeft />

            <span>
              Back to LocalMart
            </span>

          </button>

          {/* BRAND CONTENT */}

          <div className="login-intro-content">

            <div className="login-brand-badge">

              <span className="login-brand-badge-icon">
                ✦
              </span>

              Your Local. Your Mart.

            </div>

            <div className="login-brand">

              <h1>
                Local<span>Mart</span>
              </h1>

              <h2>
                Shop local.
                <br />
                Live local.
              </h2>

              <p>
                Discover fresh products, trusted
                local stores and great prices —
                all in one place.
              </p>

            </div>

            {/* FEATURES */}

            <div className="login-features">

              <div className="login-feature">

                <div className="login-feature-icon">
                  <FiMapPin />
                </div>

                <div>

                  <strong>
                    Stores near you
                  </strong>

                  <span>
                    Discover nearby local shops
                  </span>

                </div>

              </div>

              <div className="login-feature">

                <div className="login-feature-icon">
                  <FiTag />
                </div>

                <div>

                  <strong>
                    Better local prices
                  </strong>

                  <span>
                    Compare and save more
                  </span>

                </div>

              </div>

              <div className="login-feature">

                <div className="login-feature-icon">
                  <FiCheckCircle />
                </div>

                <div>

                  <strong>
                    Trusted shopping
                  </strong>

                  <span>
                    Safe and reliable experience
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* SHOPPING VISUAL */}

          <div className="login-shopping-visual">

            <div className="login-glow"></div>

            <div className="login-store">

              <div className="login-store-roof"></div>

              <div className="login-store-body">

                <div className="login-store-sign">
                  LOCAL
                </div>

                <div className="login-store-windows">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

              </div>

            </div>

            <div className="login-shopping-bag">

              <FiShoppingBag />

              <span>
                LM
              </span>

            </div>

            <div className="login-floating-item login-item-one">
              🥬
            </div>

            <div className="login-floating-item login-item-two">
              🍎
            </div>

            <div className="login-floating-item login-item-three">
              🥛
            </div>

          </div>

          {/* BOTTOM */}

          <div className="login-intro-footer">

            <span className="login-status-dot"></span>

            <span>
              Supporting local businesses,
              one order at a time.
            </span>

          </div>

        </section>

        {/* =================================================
                          RIGHT PANEL
        ================================================= */}

        <section className="login-card">

          {/* HEADER */}

          <div className="login-header">

            <div className="login-welcome">
              WELCOME BACK
            </div>

            <h2>
              Login to LocalMart
            </h2>

            <p>
              Choose your account type and
              continue to your LocalMart account.
            </p>

          </div>

          {/* ROLE SELECTOR */}

          <div className="login-role-section">

            <div className="login-section-heading">

              <div>

                <span>
                  ACCOUNT TYPE
                </span>

                <strong>
                  Login as
                </strong>

              </div>

            </div>

            <div className="login-role-grid">

              {roles.map((role) => {
                const Icon = role.icon;

                const isActive =
                  selectedRole === role.id;

                return (
                  <button
                    key={role.id}
                    type="button"
                    className={`login-role-card ${
                      isActive
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedRole(role.id);
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                  >

                    <div className="login-role-icon">
                      <Icon />
                    </div>

                    <div className="login-role-info">

                      <strong>
                        {role.title}
                      </strong>

                      <span>
                        {role.description}
                      </span>

                    </div>

                    <div className="login-role-radio">

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

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                padding: "12px 14px",
                borderRadius: "10px",
                color: "#166534",
                background: "#dcfce7",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >

              <FiCheckCircle />

              {successMessage}

            </div>

          )}

          {/* ERROR MESSAGE */}

          {errorMessage && (

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                padding: "12px 14px",
                borderRadius: "10px",
                color: "#b91c1c",
                background: "#fee2e2",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >

              <FiAlertCircle />

              {errorMessage}

            </div>

          )}

          {/* FORM */}

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}

            <div className="login-field">

              <label htmlFor="login-email">
                Email Address
              </label>

              <div className="login-input-wrapper">

                <div className="login-input-icon">
                  <FiMail />
                </div>

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="login-field">

              <div className="login-label-row">

                <label htmlFor="login-password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password-btn"
                >
                  Forgot password?
                </button>

              </div>

              <div className="login-input-wrapper">

                <div className="login-input-icon">
                  <FiLock />
                </div>

                <input
                  id="login-password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}

                </button>

              </div>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-submit-btn"
              disabled={isSubmitting}
            >

              <span className="login-submit-icon">
                <FiLock />
              </span>

              <span>

                {isSubmitting
                  ? "Logging in..."
                  : (
                    <>
                      Login as{" "}
                      <strong>
                        {currentRole?.title}
                      </strong>
                    </>
                  )}

              </span>

              {!isSubmitting && (

                <FiArrowRight
                  className="login-submit-arrow"
                />

              )}

            </button>

          </form>

          {/* DIVIDER */}

          <div className="login-divider">

            <span></span>

            <strong>
              OR
            </strong>

            <span></span>

          </div>

          {/* SIGN UP */}

          <div className="login-signup">

            <span>
              Don't have an account?
            </span>

            <button
              type="button"
              onClick={onSignup}
            >
              Create an account
            </button>

          </div>

          {/* SECURITY */}

          <div className="login-security">

            <FiShield />

            <span>
              Your information is protected
              with secure authentication.
            </span>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Login;