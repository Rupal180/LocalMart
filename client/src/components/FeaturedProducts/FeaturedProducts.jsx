import "./FeaturedProducts.css";

import products from "../../data/products";
import ProductCard from "../ProductCard/ProductCard";


function FeaturedProducts({
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
  onProductClick,
  onViewAll,
}) {

  /* =========================================================
                    FEATURED PRODUCTS
  ========================================================= */

  const featuredProducts = products.slice(0, 8);


  return (

    <section
      className="featured-products"
      id="featured-products"
    >

      {/* =====================================================
                          SECTION HEADER
      ===================================================== */}

      <div className="section-header">

        <div>

          <span className="section-tag">
            Featured Products
          </span>


          <h2>
            Fresh Picks For You
          </h2>


          <p>
            Handpicked products from trusted
            nearby stores with great prices
            and quality.
          </p>

        </div>


        {/* =================================================
                            VIEW ALL
        ================================================= */}

        <button
          type="button"
          className="view-all-btn"
          onClick={onViewAll}
        >
          View All
        </button>

      </div>


      {/* =====================================================
                         PRODUCT GRID
      ===================================================== */}

      <div className="products-grid">

        {featuredProducts.map((product) => {

          const isWishlisted =
            wishlist.some(
              (item) =>
                item.id === product.id
            );


          return (

            <ProductCard
              key={product.id}

              product={product}

              onAddToCart={
                onAddToCart
              }

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

    </section>

  );

}


export default FeaturedProducts;