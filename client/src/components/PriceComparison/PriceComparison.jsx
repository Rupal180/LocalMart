import "./PriceComparison.css";

import {
  FiX,
  FiTrendingDown,
  FiMapPin,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiShoppingCart,
  FiArrowRight,
} from "react-icons/fi";

import {
  getProductPriceComparison,
} from "../../data/storeProducts";


/* =========================================================
                STORE NAME FALLBACK MAP

   Backend/store data available hone par actual store.name
   use hoga. Ye map frontend demo ke fallback ke liye hai.
========================================================= */

const STORE_NAMES = {
  1: "The Daily Basket",
  2: "Urban Grocers",
  3: "FreshLane Market",
  4: "Harvest & Co.",
  5: "Everyday Market",
  6: "Green Basket Mart",
};


function PriceComparison({
  product,
  stores = [],
  onClose,
  onViewStore,
  onAddToCart,
}) {

  if (!product) {
    return null;
  }


  /* =========================================================
              GET PRODUCT FROM ALL STORES
  ========================================================= */

  const comparison =
    getProductPriceComparison(
      product.productId
    );


  /* =========================================================
                    STORE INFORMATION
  ========================================================= */

  const comparisonWithStores =
    comparison.map((item) => {

      const store =
        stores.find(
          (storeItem) =>
            Number(storeItem.id) ===
            Number(item.storeId)
        );


      /* -------------------------------------------------------
         Store name priority:

         1. Actual store object name
         2. LocalMart fallback name
         3. Generic fallback (only as safety)
      ------------------------------------------------------- */

      const storeName =
        store?.name ||
        STORE_NAMES[Number(item.storeId)] ||
        "LocalMart Store";


      return {
        ...item,

        storeName,

        distance:
          store?.distance ||
          "Nearby",

        deliveryTime:
          store?.deliveryTime ||
          store?.eta ||
          "20–30 min",

        deliveryFee:
          store?.deliveryFee ??
          "Free",

        storeData:
          store || {
            id: item.storeId,
            name: storeName,
          },
      };
    });


  /* =========================================================
                        BEST PRICE
  ========================================================= */

  const bestOption =
    comparisonWithStores[0];


  const highestPrice =
    comparisonWithStores.length
      ? Math.max(
          ...comparisonWithStores.map(
            (item) => item.price
          )
        )
      : product.price;


  const maximumSaving =
    bestOption
      ? highestPrice -
        bestOption.price
      : 0;


  return (

    <div
      className="price-comparison-overlay"
      onClick={onClose}
    >

      <section
        className="price-comparison-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >


        {/* =====================================================
                              HEADER
        ===================================================== */}

        <header className="comparison-header">

          <div className="comparison-heading">

            <div className="comparison-heading-icon">
              <FiTrendingDown />
            </div>


            <div>

              <span className="comparison-eyebrow">
                LOCAL PRICE CHECK
              </span>

              <h2>
                Compare nearby prices
              </h2>

              <p>
                Find the best available price
                before you order.
              </p>

            </div>

          </div>


          <button
            type="button"
            className="comparison-close-btn"
            onClick={onClose}
            aria-label="Close price comparison"
          >
            <FiX />
          </button>

        </header>


        {/* =====================================================
                        PRODUCT SUMMARY
        ===================================================== */}

        <div className="comparison-product">

          <div className="comparison-product-image">

            <img
              src={product.image}
              alt={product.name}
            />

          </div>


          <div className="comparison-product-info">

            <span>
              {product.brand}
            </span>

            <h3>
              {product.name}
            </h3>

            <p>
              {product.unit}
            </p>

          </div>


          <div className="comparison-result-count">

            <strong>
              {comparisonWithStores.length}
            </strong>

            <span>
              nearby options
            </span>

          </div>

        </div>


        {/* =====================================================
                         SAVINGS BANNER
        ===================================================== */}

        {bestOption && (

          <div className="comparison-saving-banner">

            <div className="saving-banner-icon">
              <FiCheckCircle />
            </div>


            <div>

              <span>
                BEST LOCAL PRICE FOUND
              </span>

              <strong>
                ₹{bestOption.price} at{" "}
                {bestOption.storeName}
              </strong>


              {maximumSaving > 0 && (

                <p>
                  Save up to ₹{maximumSaving} compared
                  with the highest nearby price.
                </p>

              )}

            </div>

          </div>

        )}


        {/* =====================================================
                        COMPARISON LIST
        ===================================================== */}

        <div className="comparison-list">

          {comparisonWithStores.map(
            (item, index) => {

              const isBest =
                index === 0;


              return (

                <article
                  key={item.id}
                  className={
                    isBest
                      ? "comparison-store-card best-price-card"
                      : "comparison-store-card"
                  }
                >


                  {/* =========================
                           RANK
                  ========================= */}

                  <div className="comparison-rank">

                    {isBest ? (

                      <FiCheckCircle />

                    ) : (

                      <span>
                        {index + 1}
                      </span>

                    )}

                  </div>


                  {/* =========================
                           STORE
                  ========================= */}

                  <div className="comparison-store-main">

                    <div className="comparison-store-name-row">

                      <h4>
                        {item.storeName}
                      </h4>


                      {isBest && (

                        <span className="best-price-badge">
                          Best Price
                        </span>

                      )}

                    </div>


                    <div className="comparison-store-meta">

                      <span>
                        <FiMapPin />
                        {item.distance}
                      </span>


                      <span>
                        <FiClock />
                        {item.deliveryTime}
                      </span>


                      <span>

                        <FiTruck />

                        {item.deliveryFee === 0 ||
                        item.deliveryFee === "Free"
                          ? "Free delivery"
                          : `₹${item.deliveryFee} delivery`}

                      </span>

                    </div>

                  </div>


                  {/* =========================
                           PRICE
                  ========================= */}

                  <div className="comparison-price">

                    <small>
                      PRICE
                    </small>

                    <strong>
                      ₹{item.price}
                    </strong>


                    {item.originalPrice >
                      item.price && (

                      <span>
                        ₹{item.originalPrice}
                      </span>

                    )}

                  </div>


                  {/* =========================
                           ACTIONS
                  ========================= */}

                  <div className="comparison-actions">

                    <button
                      type="button"
                      className="comparison-cart-btn"
                      onClick={() =>
                        onAddToCart?.(
                          {
                            ...item,

                            storeId:
                              item.storeId,

                            storeName:
                              item.storeName,
                          },
                          1
                        )
                      }
                    >

                      <FiShoppingCart />

                      Add

                    </button>


                    <button
                      type="button"
                      className="comparison-view-btn"
                      onClick={() => {

                        onViewStore?.(
                          item.storeData
                        );

                        onClose?.();

                      }}
                    >

                      View Store

                      <FiArrowRight />

                    </button>

                  </div>

                </article>

              );

            }
          )}

        </div>


        {/* =====================================================
                        NO COMPARISON
        ===================================================== */}

        {comparisonWithStores.length ===
          0 && (

          <div className="comparison-empty">

            <FiTrendingDown />

            <h3>
              No nearby comparison available
            </h3>

            <p>
              This product is currently
              available from only this seller.
            </p>

          </div>

        )}


        {/* =====================================================
                              FOOTER
        ===================================================== */}

        <footer className="comparison-footer">

          <FiCheckCircle />

          <p>
            Prices shown are based on
            currently available LocalMart
            store inventory.
          </p>

        </footer>

      </section>

    </div>

  );
}


export default PriceComparison;