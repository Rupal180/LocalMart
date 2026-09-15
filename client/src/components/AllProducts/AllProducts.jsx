import { useEffect, useMemo, useState } from "react";

import {
  FiArrowLeft,
  FiCheck,
  FiChevronDown,
  FiFilter,
  FiSearch,
  FiSliders,
  FiX,
} from "react-icons/fi";

import ProductCard from "../ProductCard/ProductCard";

import "./AllProducts.css";


function AllProducts({
  onBack,
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
  onProductClick,
  initialSearchTerm = "",
  onSearchChange,
}) {
  /* =========================================================
                           STATE
  ========================================================= */

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [searchTerm, setSearchTerm] = useState(
    initialSearchTerm || ""
  );

  /*
   * IMPORTANT:
   * Navbar search is controlled by App.jsx.
   * Whenever App.jsx changes searchQuery,
   * update AllProducts searchTerm as well.
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchTerm(initialSearchTerm || "");
  }, [initialSearchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch products"
          );
        }

        const backendProducts = (data.products || []).map(
          (product) => ({
            ...product,
            id: product.id || product._id,
          })
        );

        setProducts(backendProducts);
      } catch (error) {
        console.error("Fetch products error:", error);

        setLoadError(
          "Unable to load products. Please make sure the backend is running."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedAvailability, setSelectedAvailability] =
    useState("All");

  const [selectedRating, setSelectedRating] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("featured");

  const highestProductPrice = useMemo(() => {
    if (!products || products.length === 0) {
      return 1000;
    }

    const prices = products.map(
      (product) => Number(product.price) || 0
    );

    return Math.max(...prices);
  }, [products]);


  const [maxPrice, setMaxPrice] = useState(
    highestProductPrice
  );

  const [showFilters, setShowFilters] =
    useState(false);


  /*
   * Keep max price in sync with product data.
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMaxPrice(highestProductPrice);
  }, [highestProductPrice]);


  /* =========================================================
                         CATEGORIES
  ========================================================= */

  const categories = useMemo(() => {
    if (!products || products.length === 0) {
      return ["All"];
    }

    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return [
      "All",
      ...uniqueCategories,
    ];
  }, [products]);


  /* =========================================================
                       FILTER PRODUCTS
  ========================================================= */

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }

    let result = [...products];


    /* =====================================================
                            SEARCH
    ===================================================== */

    const search = String(searchTerm || "")
      .trim()
      .toLowerCase();


    if (search !== "") {
      result = result.filter((product) => {
        const name = String(
          product.name || ""
        ).toLowerCase();

        const category = String(
          product.category || ""
        ).toLowerCase();

        const brand = String(
          product.brand || ""
        ).toLowerCase();

        const unit = String(
          product.unit || ""
        ).toLowerCase();

        const description = String(
          product.description || ""
        ).toLowerCase();

        const tags = Array.isArray(product.tags)
          ? product.tags
              .join(" ")
              .toLowerCase()
          : "";


        return (
          name.includes(search) ||
          category.includes(search) ||
          brand.includes(search) ||
          unit.includes(search) ||
          description.includes(search) ||
          tags.includes(search)
        );
      });
    }


    /* =====================================================
                          CATEGORY
    ===================================================== */

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) =>
          product.category === selectedCategory
      );
    }


    /* =====================================================
                        AVAILABILITY
    ===================================================== */

    if (selectedAvailability === "In Stock") {
      result = result.filter((product) => {
        const stock = Number(product.stock);

        return (
          product.inStock !== false &&
          (
            product.stock === undefined ||
            stock > 0
          )
        );
      });
    }


    if (selectedAvailability === "Out of Stock") {
      result = result.filter((product) => {
        const stock = Number(product.stock);

        return (
          product.inStock === false ||
          (
            product.stock !== undefined &&
            stock <= 0
          )
        );
      });
    }


    /* =====================================================
                           RATING
    ===================================================== */

    if (selectedRating !== "All") {
      const minimumRating =
        Number(selectedRating);

      result = result.filter(
        (product) =>
          Number(product.rating) >= minimumRating
      );
    }


    /* =====================================================
                            PRICE
    ===================================================== */

    result = result.filter(
      (product) =>
        Number(product.price) <= maxPrice
    );


    /* =====================================================
                            SORT
    ===================================================== */

    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
    }


    if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );
    }


    if (sortBy === "rating") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }


    if (sortBy === "discount") {
      result.sort(
        (a, b) =>
          Number(b.discount || 0) -
          Number(a.discount || 0)
      );
    }


    if (sortBy === "name") {
      result.sort(
        (a, b) =>
          String(a.name || "").localeCompare(
            String(b.name || "")
          )
      );
    }


    /*
     * Featured:
     * Keep original product order.
     */

    return result;

  }, [
    searchTerm,
    selectedCategory,
    selectedAvailability,
    selectedRating,
    maxPrice,
    sortBy,
    products,
  ]);


  /* =========================================================
                       RESET FILTERS
  ========================================================= */

  const resetFilters = () => {
    setSearchTerm("");

    /*
     * Also clear the Navbar search.
     */
    onSearchChange?.("");

    setSelectedCategory("All");

    setSelectedAvailability("All");

    setSelectedRating("All");

    setSortBy("featured");

    setMaxPrice(highestProductPrice);
  };


  /* =========================================================
                    CLEAR SEARCH ONLY
  ========================================================= */

  const clearSearch = () => {
    setSearchTerm("");

    /*
     * Keep Navbar and AllProducts synchronized.
     */
    onSearchChange?.("");
  };


  /* =========================================================
                    ACTIVE FILTER CHECK
  ========================================================= */

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedAvailability !== "All" ||
    selectedRating !== "All" ||
    sortBy !== "featured" ||
    maxPrice < highestProductPrice;


  /* =========================================================
                          RENDER
  ========================================================= */

  return (
    <main className="all-products-page">

      {/* =====================================================
                           HEADER
      ===================================================== */}

      <section className="catalogue-header">

        <div className="catalogue-header-inner">

          {/* BACK BUTTON */}

          <button
            type="button"
            className="catalogue-back-btn"
            onClick={onBack}
          >
            <FiArrowLeft />

            <span>
              Back
            </span>
          </button>


          {/* TITLE */}

          <div className="catalogue-title">

            <span className="catalogue-kicker">
              LOCALMART • CATALOGUE
            </span>

            <h1>
              {searchTerm.trim()
                ? `Results for "${searchTerm.trim()}"`
                : "All Products"}
            </h1>

            <p>
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}{" "}
              available
            </p>

          </div>


          {/* PRODUCT COUNT */}

          <div className="catalogue-count">

            <strong>
              {products.length}+
            </strong>

            <span>
              items
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
                       CATEGORY STRIP
      ===================================================== */}

      <section className="category-strip">

        <div className="category-strip-inner">

          <div className="category-label">

            <FiSliders />

            <span>
              Shop by category
            </span>

          </div>


          <div className="category-chips">

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  selectedCategory === category
                    ? "category-chip category-chip-active"
                    : "category-chip"
                }
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                {category}
              </button>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
                         MAIN CONTENT
      ===================================================== */}

      <section className="all-products-content">

        {/* ===================================================
                            TOOLBAR
        =================================================== */}

        <div className="catalogue-toolbar">

          <div className="toolbar-left">

            {/* FILTER BUTTON */}

            <button
              type="button"
              className="mobile-filter-btn"
              onClick={() =>
                setShowFilters(true)
              }
            >
              <FiFilter />

              Filters

              {hasActiveFilters && (
                <span className="filter-dot" />
              )}
            </button>


            {/* RESULT COUNT */}

            <div className="result-summary">

              <span className="result-count">
                {filteredProducts.length} products
              </span>


              {searchTerm.trim() !== "" && (
                <span className="search-summary">

                  <FiSearch />

                  {searchTerm.trim()}

                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    <FiX />
                  </button>

                </span>
              )}

            </div>

          </div>


          {/* =================================================
                              SORT
          ================================================= */}

          <div className="toolbar-right">

            <span className="sort-label">
              Sort by
            </span>


            <div className="sort-select-wrapper">

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value
                  )
                }
                aria-label="Sort products"
              >
                <option value="featured">
                  Featured
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
                  Biggest Discount
                </option>

                <option value="name">
                  Name: A–Z
                </option>
              </select>

              <FiChevronDown />

            </div>

          </div>

        </div>


        {/* =====================================================
                       ACTIVE FILTERS
        ===================================================== */}

        {hasActiveFilters && (

          <div className="active-filters">

            {/* SEARCH FILTER */}

            {searchTerm.trim() !== "" && (
              <button
                type="button"
                onClick={clearSearch}
              >
                Search: {searchTerm}

                <FiX />
              </button>
            )}


            {/* CATEGORY FILTER */}

            {selectedCategory !== "All" && (
              <button
                type="button"
                onClick={() =>
                  setSelectedCategory("All")
                }
              >
                {selectedCategory}

                <FiX />
              </button>
            )}


            {/* RATING FILTER */}

            {selectedRating !== "All" && (
              <button
                type="button"
                onClick={() =>
                  setSelectedRating("All")
                }
              >
                {selectedRating}+ rating

                <FiX />
              </button>
            )}


            {/* AVAILABILITY FILTER */}

            {selectedAvailability !== "All" && (
              <button
                type="button"
                onClick={() =>
                  setSelectedAvailability("All")
                }
              >
                {selectedAvailability}

                <FiX />
              </button>
            )}


            {/* PRICE FILTER */}

            {maxPrice < highestProductPrice && (
              <button
                type="button"
                onClick={() =>
                  setMaxPrice(
                    highestProductPrice
                  )
                }
              >
                Under ₹{maxPrice}

                <FiX />
              </button>
            )}


            {/* CLEAR ALL */}

            <button
              type="button"
              className="clear-all-inline"
              onClick={resetFilters}
            >
              Clear all
            </button>

          </div>

        )}


        {/* =====================================================
                       CATALOGUE LAYOUT
        ===================================================== */}

        <div className="catalogue-layout">

          {/* ===================================================
                         FILTER SIDEBAR
          =================================================== */}

          <aside
            className={
              showFilters
                ? "filters-sidebar filters-sidebar-open"
                : "filters-sidebar"
            }
          >

            {/* FILTER HEADER */}

            <div className="filters-header">

              <div>

                <span>
                  Refine results
                </span>

                <h3>
                  Filters
                </h3>

              </div>


              <button
                type="button"
                className="close-mobile-filters"
                onClick={() =>
                  setShowFilters(false)
                }
                aria-label="Close filters"
              >
                <FiX />
              </button>

            </div>


            {/* =================================================
                              CATEGORY
            ================================================= */}

            <div className="filter-group">

              <h4>
                Category
              </h4>


              <div className="filter-category-list">

                {categories.map((category) => (

                  <button
                    type="button"
                    key={category}
                    className={
                      selectedCategory === category
                        ? "filter-category active"
                        : "filter-category"
                    }
                    onClick={() =>
                      setSelectedCategory(
                        category
                      )
                    }
                  >

                    <span>
                      {category}
                    </span>


                    {selectedCategory === category && (
                      <span className="filter-check">
                        <FiCheck />
                      </span>
                    )}

                  </button>

                ))}

              </div>

            </div>


            {/* =================================================
                              PRICE
            ================================================= */}

            <div className="filter-group">

              <div className="filter-group-heading">

                <h4>
                  Price
                </h4>

                <strong>
                  ₹{maxPrice}
                </strong>

              </div>


              <input
                type="range"
                min="0"
                max={highestProductPrice}
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(
                    Number(event.target.value)
                  )
                }
                className="price-range"
              />


              <div className="price-range-labels">

                <span>
                  ₹0
                </span>

                <span>
                  ₹{highestProductPrice}
                </span>

              </div>

            </div>


            {/* =================================================
                             RATING
            ================================================= */}

            <div className="filter-group">

              <h4>
                Customer Rating
              </h4>


              <div className="rating-filter-list">

                {[
                  {
                    value: "4",
                    label: "4.0 & above",
                  },
                  {
                    value: "4.5",
                    label: "4.5 & above",
                  },
                  {
                    value: "4.8",
                    label: "4.8 & above",
                  },
                ].map((rating) => (

                  <button
                    type="button"
                    key={rating.value}
                    className={
                      selectedRating === rating.value
                        ? "rating-filter active"
                        : "rating-filter"
                    }
                    onClick={() =>
                      setSelectedRating(
                        rating.value
                      )
                    }
                  >

                    <span className="rating-stars">
                      ★★★★★
                    </span>

                    <span>
                      {rating.label}
                    </span>

                  </button>

                ))}

              </div>

            </div>


            {/* =================================================
                         AVAILABILITY
            ================================================= */}

            <div className="filter-group">

              <h4>
                Availability
              </h4>


              <div className="availability-options">

                {[
                  "All",
                  "In Stock",
                  "Out of Stock",
                ].map((availability) => (

                  <label
                    key={availability}
                    className="availability-option"
                  >

                    <input
                      type="radio"
                      name="availability"
                      checked={
                        selectedAvailability ===
                        availability
                      }
                      onChange={() =>
                        setSelectedAvailability(
                          availability
                        )
                      }
                    />

                    <span className="custom-radio" />

                    <span>
                      {availability}
                    </span>

                  </label>

                ))}

              </div>

            </div>


            {/* =================================================
                         CLEAR FILTERS
            ================================================= */}

            {hasActiveFilters && (
              <button
                type="button"
                className="reset-filters-btn"
                onClick={resetFilters}
              >
                <FiX />

                Clear all filters
              </button>
            )}

          </aside>


          {/* ===================================================
                          PRODUCTS
          =================================================== */}

          <div className="catalogue-products">

            {isLoading ? (

              <div className="no-products-state">

                <h3>
                  Loading products...
                </h3>

                <p>
                  Please wait while we load products.
                </p>

              </div>

            ) : loadError ? (

              <div className="no-products-state">

                <h3>
                  Unable to load products
                </h3>

                <p>
                  {loadError}
                </p>

              </div>

            ) : filteredProducts.length > 0 ? (

              <div className="all-products-grid">

                {filteredProducts.map((product) => {

                  const isWishlisted =
                    wishlist.some(
                      (item) =>
                        item.id === product.id
                    );


                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                      onToggleWishlist={
                        onToggleWishlist
                      }
                      isWishlisted={
                        isWishlisted
                      }
                      onProductClick={
                        onProductClick
                      }
                    />
                  );

                })}

              </div>

            ) : (

              /* =================================================
                         NO PRODUCTS
              ================================================= */

              <div className="no-products-state">

                <div className="no-products-icon">
                  <FiSearch />
                </div>


                <h3>
                  No products found
                </h3>


                <p>
                  We couldn't find anything
                  matching your current
                  search or filters.
                </p>


                <button
                  type="button"
                  onClick={resetFilters}
                >
                  Clear Filters
                </button>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
                       MOBILE BACKDROP
      ===================================================== */}

      {showFilters && (
        <button
          type="button"
          className="filter-backdrop"
          onClick={() =>
            setShowFilters(false)
          }
          aria-label="Close filters"
        />
      )}

    </main>
  );
}


export default AllProducts;