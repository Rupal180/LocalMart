import { useMemo, useState } from "react";

import "./StoreDetails.css";

import {
  FiArrowLeft,
  FiSearch,
  FiStar,
  FiMapPin,
  FiClock,
  FiTruck,
  FiShoppingBag,
  FiPlus,
  FiMinus,
  FiCheck,
  FiArrowRight,
  FiSliders,
  FiRefreshCw,
  FiShield,
  FiPackage,
  FiTrendingDown,
} from "react-icons/fi";

import {
  getProductsByStore,
} from "../../data/storeProducts";


function StoreDetails({
  store,
  onBack,
  onAddToCart,
  onComparePrice,
  onDecrease,
  cart = [],
}) {

  /* =========================================================
                          STATE
  ========================================================= */

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("recommended");


  /* =========================================================
                    GET STORE PRODUCTS
  ========================================================= */

  const products = useMemo(() => {

    if (!store) {
      return [];
    }

    return getProductsByStore(store.id);

  }, [store]);


  /* =========================================================
                        CATEGORIES
  ========================================================= */

  const categories = useMemo(() => {

    const productCategories =
      products.map(
        (product) =>
          product.category
      );

    return [
      "All",
      ...new Set(productCategories),
    ];

  }, [products]);


  /* =========================================================
                    FILTER + SEARCH + SORT
  ========================================================= */

  const filteredProducts = useMemo(() => {

    let result = [...products];


    /* CATEGORY FILTER */

    if (
      selectedCategory !== "All"
    ) {

      result = result.filter(
        (product) =>
          product.category ===
          selectedCategory
      );

    }


    /* SEARCH */

    const normalizedSearch =
      searchTerm
        .trim()
        .toLowerCase();


    if (normalizedSearch) {

      result = result.filter(
        (product) => {

          const searchableText = `
            ${product.name}
            ${product.brand}
            ${product.category}
            ${product.unit}
          `.toLowerCase();


          return searchableText.includes(
            normalizedSearch
          );

        }
      );

    }


    /* SORTING */

    if (sortBy === "price-low") {

      result.sort(
        (a, b) =>
          a.price - b.price
      );

    }


    if (sortBy === "price-high") {

      result.sort(
        (a, b) =>
          b.price - a.price
      );

    }


    if (sortBy === "rating") {

      result.sort(
        (a, b) =>
          b.rating - a.rating
      );

    }


    if (sortBy === "discount") {

      result.sort(
        (a, b) => {

          const discountA =
            a.originalPrice -
            a.price;

          const discountB =
            b.originalPrice -
            b.price;


          return (
            discountB -
            discountA
          );

        }
      );

    }


    if (sortBy === "recommended") {

      result.sort(
        (a, b) => {

          if (
            a.popular !==
            b.popular
          ) {

            return a.popular
              ? -1
              : 1;

          }


          return (
            b.rating -
            a.rating
          );

        }
      );

    }


    return result;

  }, [
    products,
    selectedCategory,
    searchTerm,
    sortBy,
  ]);


  /* =========================================================
                       CART QUANTITY
  ========================================================= */

  const getCartQuantity = (
    product
  ) => {

    const cartItem =
      cart.find(
        (item) =>
          item.id ===
          product.id
      );


    return (
      cartItem?.quantity || 0
    );

  };


  /* =========================================================
                       DISCOUNT %
  ========================================================= */

  const getDiscountPercentage = (
    product
  ) => {

    if (
      !product.originalPrice ||
      product.originalPrice <=
        product.price
    ) {

      return 0;

    }


    return Math.round(
      (
        (
          product.originalPrice -
          product.price
        ) /
        product.originalPrice
      ) * 100
    );

  };


  /* =========================================================
                     STORE NOT FOUND
  ========================================================= */

  if (!store) {

    return (

      <main className="store-details-page">

        <div className="store-not-found">

          <FiShoppingBag />

          <h2>
            Store unavailable
          </h2>

          <p>
            We couldn't find this
            LocalMart store.
          </p>

          <button
            type="button"
            onClick={onBack}
          >

            <FiArrowLeft />

            Back to stores

          </button>

        </div>

      </main>

    );

  }


  /* =========================================================
                   STORE FALLBACK VALUES
  ========================================================= */

  const storeName =
    store.name ||
    "LocalMart Store";

  const storeCategory =
    store.category ||
    "Grocery & Essentials";

  const storeLocation =
    store.location ||
    store.area ||
    "Local Market";

  const storeRating =
    store.rating || 4.8;

  const storeReviews =
    store.reviews || 250;

  const storeDistance =
    store.distance ||
    "1.2 km";

  const storeEta =
    store.eta ||
    store.deliveryTime ||
    "15–20 min";

  const deliveryFee =
    store.deliveryFee ??
    "Free";


  /* =========================================================
                           UI
  ========================================================= */

  return (

    <main className="store-details-page">


      {/* =====================================================
                          TOP NAVIGATION
      ====================================================== */}

      <section className="store-details-topbar">

        <button
          type="button"
          className="store-back-btn"
          onClick={onBack}
        >

          <FiArrowLeft />

          <span>
            Nearby Stores
          </span>

        </button>


        <div className="store-secure-badge">

          <FiShield />

          <span>
            Trusted LocalMart Seller
          </span>

        </div>

      </section>


      {/* =====================================================
                           STORE HERO
      ====================================================== */}

      <section className="store-profile-hero">


        {/* STORE IMAGE */}

        <div className="store-profile-image">

          {store.image ? (

            <img
              src={store.image}
              alt={storeName}
            />

          ) : (

            <div className="store-image-placeholder">

              <FiShoppingBag />

            </div>

          )}


          <div className="store-image-overlay" />


          <div className="store-open-pill">

            <span />

            Open now

          </div>


          <div className="store-image-location">

            <FiMapPin />

            {storeDistance} away

          </div>

        </div>


        {/* STORE INFORMATION */}

        <div className="store-profile-content">


          <div className="store-profile-heading">

            <div>

              <span className="store-profile-eyebrow">

                {storeCategory}

              </span>


              <h1>
                {storeName}
              </h1>


              <p className="store-profile-location">

                <FiMapPin />

                {storeLocation}

              </p>

            </div>


            <div className="store-profile-rating">

              <div>

                <FiStar />

                <strong>
                  {storeRating}
                </strong>

              </div>

              <span>
                {storeReviews} reviews
              </span>

            </div>

          </div>


          <p className="store-profile-description">

            Shop fresh groceries and
            everyday essentials from a
            trusted local store near you.
            Check live availability,
            compare prices and get your
            order delivered locally.

          </p>


          {/* STORE BENEFITS */}

          <div className="store-profile-benefits">


            <div className="profile-benefit-card">

              <span className="profile-benefit-icon">

                <FiTruck />

              </span>

              <div>

                <small>
                  DELIVERY
                </small>

                <strong>
                  {deliveryFee}
                </strong>

              </div>

            </div>


            <div className="profile-benefit-card">

              <span className="profile-benefit-icon">

                <FiClock />

              </span>

              <div>

                <small>
                  ARRIVES IN
                </small>

                <strong>
                  {storeEta}
                </strong>

              </div>

            </div>


            <div className="profile-benefit-card">

              <span className="profile-benefit-icon">

                <FiPackage />

              </span>

              <div>

                <small>
                  AVAILABLE
                </small>

                <strong>
                  {products.length} products
                </strong>

              </div>

            </div>

          </div>


          {/* VERIFIED STORE */}

          <div className="store-trust-strip">

            <FiCheck />

            <div>

              <strong>
                LocalMart verified
              </strong>

              <span>
                Store information,
                inventory and prices are
                monitored for a reliable
                shopping experience.
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
                      PRODUCT DISCOVERY
      ====================================================== */}

      <section className="store-shopping-section">


        <div className="store-shopping-heading">

          <div>

            <span>
              SHOP THIS STORE
            </span>

            <h2>
              What are you looking for?
            </h2>

            <p>
              Search products available at{" "}
              {storeName}.
            </p>

          </div>


          <div className="store-product-count">

            <FiShoppingBag />

            <div>

              <strong>
                {filteredProducts.length}
              </strong>

              <span>
                products shown
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
                           SEARCH
        ================================================== */}

        <div className="store-product-search-row">

          <div className="store-product-search">

            <FiSearch />

            <input
              type="text"
              value={searchTerm}
              placeholder={`Search in ${storeName}...`}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />


            {searchTerm && (

              <button
                type="button"
                onClick={() =>
                  setSearchTerm("")
                }
              >
                Clear
              </button>

            )}

          </div>


          {/* SORT */}

          <div className="store-sort-box">

            <FiSliders />

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value
                )
              }
            >

              <option value="recommended">
                Recommended
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>

              <option value="discount">
                Best Discount
              </option>

            </select>

          </div>

        </div>


        {/* =================================================
                        CATEGORY FILTER
        ================================================== */}

        <div className="store-category-tabs">

          {categories.map(
            (category) => (

              <button
                type="button"
                key={category}
                className={
                  selectedCategory ===
                  category
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
              >

                {category}

              </button>

            )
          )}

        </div>


        {/* =================================================
                         PRODUCT GRID
        ================================================== */}

        {filteredProducts.length > 0 ? (

          <div className="store-products-grid">

            {filteredProducts.map(
              (product) => {

                const quantity =
                  getCartQuantity(
                    product
                  );

                const discount =
                  getDiscountPercentage(
                    product
                  );

                const lowStock =
                  product.stock > 0 &&
                  product.stock <= 5;

                const outOfStock =
                  product.stock <= 0;


                return (

                  <article
                    className="store-product-card"
                    key={product.id}
                  >


                    {/* PRODUCT IMAGE */}

                    <div className="store-product-image">


                      {product.popular && (

                        <span className="product-popular-badge">

                          Popular

                        </span>

                      )}


                      {discount > 0 && (

                        <span className="product-discount-badge">

                          {discount}% OFF

                        </span>

                      )}


                      <img
                        src={product.image}
                        alt={product.name}
                      />

                    </div>


                    {/* PRODUCT CONTENT */}

                    <div className="store-product-content">


                      <span className="store-product-brand">

                        {product.brand}

                      </span>


                      <h3>
                        {product.name}
                      </h3>


                      <div className="store-product-unit">

                        {product.unit}

                      </div>


                      {/* RATING + STOCK */}

                      <div className="store-product-meta">


                        <div className="product-rating">

                          <FiStar />

                          <strong>
                            {product.rating}
                          </strong>

                        </div>


                        <span
                          className={
                            outOfStock
                              ? "stock-status out"
                              : lowStock
                              ? "stock-status low"
                              : "stock-status"
                          }
                        >

                          {outOfStock
                            ? "Out of stock"
                            : lowStock
                            ? `Only ${product.stock} left`
                            : "In stock"}

                        </span>

                      </div>


                      {/* PRICE */}

                      <div className="store-product-price-row">


                        <div className="store-product-price">

                          <strong>
                            ₹{product.price}
                          </strong>


                          {product.originalPrice >
                            product.price && (

                            <span>

                              ₹
                              {
                                product.originalPrice
                              }

                            </span>

                          )}

                        </div>


                        {discount > 0 && (

                          <span className="product-saving">

                            Save ₹
                            {
                              product.originalPrice -
                              product.price
                            }

                          </span>

                        )}

                      </div>


                      {/* =================================================
                              COMPARE PRICE
                      ================================================== */}

                      <button
                        type="button"
                        className="compare-price-btn"
                        onClick={() =>
                          onComparePrice?.(
                            product,
                            store
                          )
                        }
                      >

                        <FiTrendingDown />

                        <span>
                          Compare nearby prices
                        </span>

                        <FiArrowRight />

                      </button>


                      {/* =================================================
                              ADD / QUANTITY
                      ================================================== */}

                      <div className="store-product-actions">


                        {quantity > 0 ? (

                          <div className="store-product-quantity">


                            {/* DECREASE */}

                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                onDecrease?.(
                                  product.id
                                )
                              }
                            >

                              <FiMinus />

                            </button>


                            {/* QUANTITY */}

                            <strong>
                              {quantity}
                            </strong>


                            {/* INCREASE */}

                            <button
                              type="button"
                              aria-label="Increase quantity"
                              disabled={
                                product.stock !==
                                  undefined &&
                                quantity >=
                                  product.stock
                              }
                              onClick={() =>
                                onAddToCart?.(
                                  {
                                    ...product,

                                    storeId:
                                      store.id,

                                    storeName:
                                      storeName,
                                  },
                                  1
                                )
                              }
                            >

                              <FiPlus />

                            </button>

                          </div>

                        ) : (

                          <button
                            type="button"
                            className="store-add-btn"
                            disabled={
                              outOfStock
                            }
                            onClick={() =>
                              onAddToCart?.(
                                {
                                  ...product,

                                  storeId:
                                    store.id,

                                  storeName:
                                    storeName,
                                },
                                1
                              )
                            }
                          >

                            {outOfStock ? (

                              "Unavailable"

                            ) : (

                              <>

                                <FiPlus />

                                Add to Cart

                              </>

                            )}

                          </button>

                        )}

                      </div>

                    </div>

                  </article>

                );

              }
            )}

          </div>

        ) : (

          /* =================================================
                          EMPTY STATE
          ================================================== */

          <div className="store-products-empty">


            <div className="empty-product-icon">

              <FiSearch />

            </div>


            <h3>
              No matching products
            </h3>


            <p>
              We couldn't find a product
              matching your current search
              or category.
            </p>


            <button
              type="button"
              onClick={() => {

                setSearchTerm("");

                setSelectedCategory(
                  "All"
                );

                setSortBy(
                  "recommended"
                );

              }}
            >

              <FiRefreshCw />

              Reset filters

            </button>

          </div>

        )}

      </section>


      {/* =====================================================
                     WHY ORDER HERE
      ====================================================== */}

      <section className="store-information-section">


        <div className="store-info-heading">

          <span>
            SHOP WITH CONFIDENCE
          </span>

          <h2>
            Why order from this store?
          </h2>

        </div>


        <div className="store-info-grid">


          <article>

            <div>
              <FiShield />
            </div>

            <h3>
              Verified seller
            </h3>

            <p>
              Store details are verified
              before sellers become visible
              to LocalMart customers.
            </p>

          </article>


          <article>

            <div>
              <FiPackage />
            </div>

            <h3>
              Local inventory
            </h3>

            <p>
              Browse products offered by
              this nearby store instead of
              ordering from a distant
              warehouse.
            </p>

          </article>


          <article>

            <div>
              <FiTrendingDown />
            </div>

            <h3>
              Compare before buying
            </h3>

            <p>
              LocalMart helps you compare
              the same product across
              nearby stores before placing
              your order.
            </p>

          </article>


          <article>

            <div>
              <FiTruck />
            </div>

            <h3>
              Nearby delivery
            </h3>

            <p>
              Distance and delivery
              availability help you choose
              a convenient local seller.
            </p>

          </article>

        </div>

      </section>


      {/* =====================================================
                         BOTTOM CTA
      ====================================================== */}

      <section className="store-details-bottom">


        <div>

          <span>
            LOCAL SHOPPING, MADE SMARTER
          </span>

          <h2>
            Not finding what you need?
          </h2>

          <p>
            Compare other nearby LocalMart
            stores serving your location.
          </p>

        </div>


        <button
          type="button"
          onClick={onBack}
        >

          View Nearby Stores

          <FiArrowRight />

        </button>

      </section>

    </main>

  );

}


export default StoreDetails;