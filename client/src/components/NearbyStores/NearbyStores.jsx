import { useMemo, useState } from "react";
import { stores } from "../../data/stores";

import "./NearbyStores.css";

import {
  FiMapPin,
  FiStar,
  FiClock,
  FiTruck,
  FiArrowRight,
  FiNavigation,
  FiSliders,
  FiCheckCircle,
  FiZap,
  FiShoppingBag,
  FiTrendingDown,
  FiAward,
} from "react-icons/fi";

/* =========================================================
   FILTERS
========================================================= */

const filters = [
  {
    id: "recommended",
    label: "Recommended",
    icon: FiAward,
  },
  {
    id: "fastest",
    label: "Fastest",
    icon: FiZap,
  },
  {
    id: "price",
    label: "Best Prices",
    icon: FiTrendingDown,
  },
  {
    id: "rating",
    label: "Top Rated",
    icon: FiStar,
  },
  {
    id: "distance",
    label: "Nearest",
    icon: FiMapPin,
  },
];


/* =========================================================
   RECOMMENDATION SCORE
========================================================= */

const getRecommendationScore = (store) => {
  const ratingScore = store.rating * 20;
  const distanceScore = Math.max(0, 35 - store.distance * 7);
  const speedScore = Math.max(0, 40 - store.deliveryTime);
  const priceScore = store.cheaperProducts * 1.4;
  const deliveryScore = store.deliveryFee === 0 ? 12 : 0;
  const featuredScore = store.featured ? 8 : 0;

  return (
    ratingScore +
    distanceScore +
    speedScore +
    priceScore +
    deliveryScore +
    featuredScore
  );
};


function NearbyStores({
  selectedLocation,
  onChangeLocation,
  onStoreClick,
}) {
  const [activeFilter, setActiveFilter] =
    useState("recommended");


  /* =========================================================
     LOCATION
  ========================================================= */

  const locationLabel = useMemo(() => {
    if (!selectedLocation) {
      return "Select your location";
    }

    if (selectedLocation.type === "pincode") {
      return `Pincode ${selectedLocation.pincode}`;
    }

    return selectedLocation.label || "Current Location";
  }, [selectedLocation]);


  /* =========================================================
     SORT
  ========================================================= */

  const sortedStores = useMemo(() => {
    const result = [...stores];

    switch (activeFilter) {
      case "fastest":
        return result.sort(
          (a, b) =>
            a.deliveryTime - b.deliveryTime ||
            a.distance - b.distance
        );

      case "price":
        return result.sort(
          (a, b) =>
            b.cheaperProducts - a.cheaperProducts ||
            a.deliveryFee - b.deliveryFee ||
            b.rating - a.rating
        );

      case "rating":
        return result.sort(
          (a, b) =>
            b.rating - a.rating ||
            b.reviews - a.reviews
        );

      case "distance":
        return result.sort(
          (a, b) =>
            a.distance - b.distance ||
            a.deliveryTime - b.deliveryTime
        );

      case "recommended":
      default:
        return result.sort(
          (a, b) =>
            getRecommendationScore(b) -
            getRecommendationScore(a)
        );
    }
  }, [activeFilter]);


  /* =========================================================
     FILTER STATUS
  ========================================================= */

  const activeFilterLabel =
    filters.find(
      (filter) => filter.id === activeFilter
    )?.label || "Recommended";


  const getPositionBadge = (store, index) => {
    if (index !== 0) {
      return null;
    }

    switch (activeFilter) {
      case "fastest":
        return {
          icon: FiZap,
          text: "Fastest Delivery",
        };

      case "price":
        return {
          icon: FiTrendingDown,
          text: "Best Value",
        };

      case "rating":
        return {
          icon: FiStar,
          text: "Top Rated",
        };

      case "distance":
        return {
          icon: FiNavigation,
          text: "Closest Store",
        };

      default:
        return {
          icon: FiAward,
          text: "Best Match",
        };
    }
  };


  const fastestDelivery = Math.min(
    ...stores.map((store) => store.deliveryTime)
  );

  const maximumSavings = Math.max(
    ...stores.map((store) => store.cheaperProducts)
  );


  return (
    <section
      className="nearby-stores"
      id="nearby-stores"
    >
      <div className="nearby-stores-container">

        {/* =================================================
                           HERO
        ================================================== */}

        <div className="stores-hero">

          <div className="stores-hero-decoration stores-decoration-one" />
          <div className="stores-hero-decoration stores-decoration-two" />

          <div className="stores-hero-content">

            <div className="stores-eyebrow">
              <FiNavigation />
              <span>LOCALMART NEAR YOU</span>
            </div>

            <h2>
              Your neighbourhood,
              <span> delivered better.</span>
            </h2>

            <p>
              Discover trusted local stores around you.
              Compare delivery speed, prices and availability
              before you shop.
            </p>

            <div className="stores-location-pill">

              <div className="stores-location-icon">
                <FiMapPin />
              </div>

              <div className="stores-location-text">
                <span>SHOWING STORES NEAR</span>
                <strong>{locationLabel}</strong>
              </div>

              <button
                type="button"
                onClick={onChangeLocation}
              >
                Change
              </button>

            </div>

          </div>


          <div className="stores-hero-side">

            <div className="hero-stat-card">
              <span>NEARBY</span>

              <strong>{stores.length}</strong>

              <p>trusted stores</p>
            </div>

            <div className="hero-stat-card">
              <span>FASTEST</span>

              <strong>
                {fastestDelivery}
                <small> min</small>
              </strong>

              <p>delivery nearby</p>
            </div>

            <div className="hero-stat-card hero-stat-gold">
              <span>BEST VALUE</span>

              <strong>{maximumSavings}</strong>

              <p>better-priced items</p>
            </div>

          </div>

        </div>


        {/* =================================================
                           TOOLBAR
        ================================================== */}

        <div className="stores-toolbar">

          <div className="stores-result-count">

            <div className="result-icon">
              <FiShoppingBag />
            </div>

            <div>
              <strong>
                {stores.length} stores delivering nearby
              </strong>

              <span>
                Compare stores and choose what works best for you
              </span>
            </div>

          </div>


          <div className="stores-filter-wrapper">

            <div className="filter-title">
              <FiSliders />
              <span>Sort stores</span>
            </div>

            <div className="store-filters">

              {filters.map((filter) => {
                const FilterIcon = filter.icon;

                return (
                  <button
                    type="button"
                    key={filter.id}
                    className={
                      activeFilter === filter.id
                        ? "store-filter-active"
                        : ""
                    }
                    aria-pressed={
                      activeFilter === filter.id
                    }
                    onClick={() =>
                      setActiveFilter(filter.id)
                    }
                  >
                    <FilterIcon />
                    <span>{filter.label}</span>
                  </button>
                );
              })}

            </div>

          </div>

        </div>


        {/* ACTIVE SORT INFORMATION */}

        <div className="active-sort-bar">

          <div className="active-sort-dot" />

          <span>
            Showing stores by
          </span>

          <strong>
            {activeFilterLabel}
          </strong>

          <span className="active-sort-count">
            {sortedStores.length} results
          </span>

        </div>


        {/* =================================================
                           GRID
        ================================================== */}

        <div className="stores-grid">

          {sortedStores.map((store, index) => {
            const positionBadge =
              getPositionBadge(store, index);

            const PositionIcon =
              positionBadge?.icon;

            return (
              <article
                className={`premium-store-card ${
                  index === 0
                    ? "premium-store-card-featured"
                    : ""
                }`}
                key={store.id}
              >

                {/* IMAGE */}

                <div className="store-image-area">

                  <img
                    src={store.image}
                    alt={store.name}
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="store-image-shade" />

                  <div className="store-image-top">

                    {positionBadge && (
                      <span className="store-best-match">
                        <PositionIcon />
                        {positionBadge.text}
                      </span>
                    )}

                    {store.isOpen && (
                      <span className="store-open-badge">
                        <span className="open-dot" />
                        Open Now
                      </span>
                    )}

                  </div>


                  <div className="store-image-bottom">

                    <div>
                      <FiMapPin />
                      <span>
                        {store.distance} km away
                      </span>
                    </div>

                    <div>
                      <FiClock />
                      <span>
                        {store.deliveryLabel}
                      </span>
                    </div>

                  </div>

                </div>


                {/* CONTENT */}

                <div className="store-card-content">

                  <div className="store-title-row">

                    <div className="store-main-info">

                      <span className="store-category">
                        {store.type}
                      </span>

                      <h3>{store.name}</h3>

                      <p>
                        <FiMapPin />
                        {store.area}
                      </p>

                    </div>


                    <div className="store-rating">

                      <div>
                        <FiStar />
                        <strong>{store.rating}</strong>
                      </div>

                      <span>
                        {store.reviews} reviews
                      </span>

                    </div>

                  </div>


                  <div className="store-tags">

                    {store.tags.map((tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    ))}

                  </div>


                  <div className="store-benefits">

                    <div className="store-benefit">

                      <span className="benefit-icon">
                        <FiTruck />
                      </span>

                      <div>
                        <small>DELIVERY</small>

                        <strong>
                          {store.deliveryFee === 0
                            ? "Free"
                            : `₹${store.deliveryFee}`}
                        </strong>
                      </div>

                    </div>


                    <div className="store-benefit">

                      <span className="benefit-icon">
                        <FiClock />
                      </span>

                      <div>
                        <small>ARRIVES IN</small>
                        <strong>
                          {store.deliveryLabel}
                        </strong>
                      </div>

                    </div>


                    <div className="store-benefit store-saving-benefit">

                      <span className="benefit-icon">
                        ₹
                      </span>

                      <div>
                        <small>BETTER PRICES</small>

                        <strong>
                          {store.cheaperProducts} items
                        </strong>
                      </div>

                    </div>

                  </div>


                  <div className="store-price-insight">

                    <div className="price-insight-icon">
                      <FiCheckCircle />
                    </div>

                    <div>
                      <strong>
                        Smart price advantage
                      </strong>

                      <p>
                        {store.cheaperProducts} products
                        are priced better at this store.
                      </p>
                    </div>

                  </div>


                  <div className="store-card-footer">

                    <div className="store-distance-summary">
                      <span>FROM YOUR LOCATION</span>
                      <strong>
                        {store.distance} km
                      </strong>
                    </div>

                    <button
                      type="button"
                      className="explore-store-btn"
                      onClick={() =>
                        onStoreClick?.(store)
                      }
                    >
                      Explore Store
                      <FiArrowRight />
                    </button>

                  </div>

                </div>

              </article>
            );
          })}

        </div>


        <div className="stores-bottom-note">

          <FiCheckCircle />

          <div>
            <strong>
              Local stores. Smarter choices.
            </strong>

            <p>
              Compare nearby sellers by price,
              delivery speed, ratings and distance.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}


export default NearbyStores;