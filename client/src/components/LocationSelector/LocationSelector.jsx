import { useState } from "react";
import "./LocationSelector.css";

import {
  FiMapPin,
  FiNavigation,
  FiSearch,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

function LocationSelector({
  isOpen,
  onClose,
  onLocationSelect,
}) {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState(null);
  const [message, setMessage] = useState("");

  /* =========================================
              PINCODE CHECK
  ========================================= */

  const handlePincodeCheck = () => {
    const cleanPincode = pincode.trim();

    if (!/^\d{6}$/.test(cleanPincode)) {
      setLocationStatus("error");
      setMessage("Please enter a valid 6-digit pincode.");
      return;
    }

    /*
      Temporary deliverability logic.

      Later this will come from our backend/store database.
    */

    setLocationStatus("success");

    setMessage(
      "Great! LocalMart delivery is available in your area."
    );

    if (onLocationSelect) {
      onLocationSelect({
        type: "pincode",
        pincode: cleanPincode,
        label: cleanPincode,
      });
    }
  };

  /* =========================================
             CURRENT LOCATION
  ========================================= */

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");

      setMessage(
        "Location services are not supported by this browser."
      );

      return;
    }

    setLoading(true);
    setLocationStatus(null);
    setMessage("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        setLoading(false);

        setLocationStatus("success");

        setMessage(
          "Location detected. Checking nearby LocalMart stores."
        );

        if (onLocationSelect) {
          onLocationSelect({
            type: "current",
            latitude,
            longitude,
            label: "Current Location",
          });
        }
      },

      (error) => {
        console.error(
          "Location error:",
          error
        );

        setLoading(false);

        setLocationStatus("error");

        setMessage(
          "We couldn't access your location. You can enter your pincode instead."
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* OVERLAY */}

      <div
        className="location-overlay"
        onClick={onClose}
      ></div>

      {/* MODAL */}

      <div className="location-modal">

        {/* TOP DECORATION */}

        <div className="location-modal-glow"></div>

        {/* CLOSE */}

        <button
          className="location-close-btn"
          onClick={onClose}
          aria-label="Close location selector"
        >
          <FiX />
        </button>

        {/* HEADER */}

        <div className="location-header">

          <div className="location-icon">
            <FiMapPin />
          </div>

          <span className="location-tag">
            LOCAL DELIVERY
          </span>

          <h2>
            Where should we
            <span> deliver?</span>
          </h2>

          <p>
            Share your location to discover nearby
            stores, delivery availability and better
            local prices.
          </p>

        </div>

        {/* CURRENT LOCATION */}

        <button
          className="current-location-btn"
          onClick={handleUseCurrentLocation}
          disabled={loading}
        >
          <div className="current-location-icon">
            <FiNavigation />
          </div>

          <div>
            <strong>
              {loading
                ? "Detecting your location..."
                : "Use my current location"}
            </strong>

            <span>
              Find nearby stores automatically
            </span>
          </div>

          <FiNavigation className="location-arrow-icon" />
        </button>

        {/* DIVIDER */}

        <div className="location-divider">

          <span></span>

          <p>OR ENTER PINCODE</p>

          <span></span>

        </div>

        {/* PINCODE */}

        <div className="location-pincode-box">

          <div className="location-input-wrapper">

            <FiMapPin />

            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="Enter 6-digit pincode"
              value={pincode}
              onChange={(event) => {
                const value =
                  event.target.value.replace(
                    /\D/g,
                    ""
                  );

                setPincode(value);

                setLocationStatus(null);
                setMessage("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handlePincodeCheck();
                }
              }}
            />

          </div>

          <button
            className="check-location-btn"
            onClick={handlePincodeCheck}
          >
            <FiSearch />
            Check
          </button>

        </div>

        {/* STATUS */}

        {locationStatus && (
          <div
            className={`location-status ${
              locationStatus === "success"
                ? "location-success"
                : "location-error"
            }`}
          >

            <div className="location-status-icon">

              {locationStatus === "success" ? (
                <FiCheckCircle />
              ) : (
                <FiAlertCircle />
              )}

            </div>

            <div>

              <strong>
                {locationStatus === "success"
                  ? "You're in our delivery zone"
                  : "Location needs attention"}
              </strong>

              <p>
                {message}
              </p>

            </div>

          </div>
        )}

        {/* BENEFITS */}

        <div className="location-benefits">

          <div>
            <span>01</span>

            <p>
              Nearby
              <strong> stores</strong>
            </p>
          </div>

          <div>
            <span>02</span>

            <p>
              Accurate
              <strong> ETA</strong>
            </p>
          </div>

          <div>
            <span>03</span>

            <p>
              Compare
              <strong> prices</strong>
            </p>
          </div>

        </div>

        <p className="location-privacy">
          Your location is only used to improve
          store and delivery availability.
        </p>

      </div>
    </>
  );
}

export default LocationSelector;