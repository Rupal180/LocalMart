import { useState } from "react";

import "./Navbar.css";

import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiPackage,
  FiMapPin,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
function Navbar({
  cartCount = 0,
  wishlistCount = 0,

  onCartClick,
  onWishlistClick,
  onOrdersClick,
  onLoginClick,
  onLogout,

  currentUser,

  selectedLocation,
  onLocationClick,

  searchQuery = "",
  onSearchChange,
  onClearSearch,
}) {
  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  /* =========================================
              SMOOTH SCROLL
  ========================================= */

  const scrollToSection = (sectionId) => {
    const section =
      document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* =========================================
              LOCATION TEXT
  ========================================= */

  const getLocationText = () => {
    if (!selectedLocation) {
      return "Select location";
    }

    if (
      selectedLocation.type === "pincode"
    ) {
      return selectedLocation.pincode;
    }

    if (
      selectedLocation.type === "current"
    ) {
      return (
        selectedLocation.label ||
        "Current Location"
      );
    }

    return (
      selectedLocation.label ||
      "Selected Location"
    );
  };

  /* =========================================
              SEARCH HANDLER
  ========================================= */

  const handleSearchChange = (event) => {
    const value = event.target.value;

    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  /* =========================================
              CLEAR SEARCH
  ========================================= */

  const handleClearSearch = () => {
    if (onClearSearch) {
      onClearSearch();
      return;
    }

    if (onSearchChange) {
      onSearchChange("");
    }
  };

  /* =========================================
              USER NAME
  ========================================= */

  const getUserName = () => {
    if (!currentUser) {
      return "";
    }

    return (
      currentUser.name ||
      currentUser.fullName ||
      currentUser.username ||
      "User"
    );
  };

  /* =========================================
              USER INITIAL
  ========================================= */

  const getUserInitial = () => {
    const name = getUserName();

    return name
      ? name.charAt(0).toUpperCase()
      : "U";
  };

  /* =========================================
              LOGOUT
  ========================================= */

  const handleLogout = () => {
    setIsProfileOpen(false);

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <nav className="navbar">

      {/* LOGO */}

      <div
        className="logo"
        onClick={() =>
          scrollToSection("home")
        }
      >
        <span className="logo-icon">
          🛒
        </span>

        <h2>LocalMart</h2>
      </div>


      {/* LOCATION */}

      <button
        type="button"
        className="navbar-location"
        onClick={onLocationClick}
        aria-label="Select delivery location"
      >
        <div className="navbar-location-icon">
          <FiMapPin />
        </div>

        <div className="navbar-location-text">
          <span>DELIVERING TO</span>

          <strong>
            {getLocationText()}
          </strong>
        </div>

        <FiChevronDown
          className="navbar-location-arrow"
        />
      </button>


      {/* SEARCH */}

      <div className="search-box">
        <FiSearch className="search-icon" />

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          aria-label="Search products"
        />

        {searchQuery.trim() !== "" && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>


      {/* NAVIGATION */}

      <ul className="nav-links">

        <li
          onClick={() =>
            scrollToSection("home")
          }
        >
          Home
        </li>

        <li
          onClick={() =>
            scrollToSection("categories")
          }
        >
          Categories
        </li>

        <li
          onClick={() =>
            scrollToSection("deals")
          }
        >
          Deals
        </li>

        <li
          onClick={() =>
            scrollToSection("about")
          }
        >
          About
        </li>

        <li
          className="orders-nav-link"
          onClick={onOrdersClick}
        >
          <FiPackage />

          <span>My Orders</span>
        </li>

      </ul>


      {/* RIGHT SIDE */}

      <div className="nav-actions">

        {/* WISHLIST */}

        <button
          type="button"
          className="nav-icon-btn wishlist-nav-btn"
          aria-label="Wishlist"
          onClick={onWishlistClick}
        >
          <FiHeart className="nav-icon" />

          {wishlistCount > 0 && (
            <span className="wishlist-count">
              {wishlistCount}
            </span>
          )}
        </button>


        {/* CART */}

        <button
          type="button"
          className="cart"
          aria-label="Shopping cart"
          onClick={onCartClick}
        >
          <FiShoppingCart className="nav-icon" />

          <span>{cartCount}</span>
        </button>


        {/* LOGIN / PROFILE */}

        {currentUser ? (

          <div className="profile-wrapper">

            <button
              type="button"
              className="user-profile-btn"
              onClick={() =>
                setIsProfileOpen(
                  !isProfileOpen
                )
              }
            >
              <div className="user-avatar">
                {getUserInitial()}
              </div>

              <span className="user-profile-name">
                {getUserName()}
              </span>

              <FiChevronDown
                className={
                  isProfileOpen
                    ? "profile-chevron rotate"
                    : "profile-chevron"
                }
              />
            </button>


            {/* PROFILE DROPDOWN */}

            {isProfileOpen && (
              <div className="profile-dropdown">

                <div className="profile-dropdown-header">

                  <div className="dropdown-avatar">
                    {getUserInitial()}
                  </div>

                  <div>
                    <strong>
                      {getUserName()}
                    </strong>

                    <span>
                      {currentUser.email}
                    </span>
                  </div>

                </div>


                <div className="profile-divider" />


                <button
                      type="button"
                      className="profile-menu-item"
                    >
                      <span className="profile-menu-icon">👤</span>
                      <span>My Profile</span>
                    </button>


                <button
                  type="button"
                  className="profile-menu-item"
                  onClick={() => {
                    setIsProfileOpen(false);

                    if (onOrdersClick) {
                      onOrdersClick();
                    }
                  }}
                >
                  <FiPackage />
                  My Orders
                </button>


                <button
                  type="button"
                  className="profile-menu-item"
                  onClick={() => {
                    setIsProfileOpen(false);

                    if (onWishlistClick) {
                      onWishlistClick();
                    }
                  }}
                >
                  <FiHeart />
                  Wishlist
                </button>


                <div className="profile-divider" />


                <button
                  type="button"
                  className="profile-menu-item logout-menu-item"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        ) : (

          <button
            type="button"
            className="login-btn"
            onClick={onLoginClick}
          >
            <span style={{ fontSize: "18px" }}>👤</span>

            <span>
              Login
            </span>
          </button>

        )}

      </div>

    </nav>
  );
}

export default Navbar;