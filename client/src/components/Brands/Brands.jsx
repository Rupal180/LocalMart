import "./Brands.css";

import brands from "../../data/brands";

const Brands = () => {

  return (

    <section className="brands">

      <div className="brands-heading">

        <span>Trusted Brands</span>

        <h2>
          Shop Your Favourite Brands
        </h2>

        <p>
          We partner with India's most loved grocery and FMCG brands.
        </p>

      </div>

      <div className="brand-slider">

        <div className="brand-track">

          {brands.map((brand) => (

            <div className="brand-card" key={brand.id}>

              <img
                src={brand.image}
                alt={brand.name}
              />

            </div>

          ))}

          {/* Duplicate for Infinite Scroll */}

          {brands.map((brand) => (

            <div
              className="brand-card"
              key={`copy-${brand.id}`}
            >

              <img
                src={brand.image}
                alt={brand.name}
              />

            </div>

          ))}

        </div>

      </div>

    </section>

  );

};

export default Brands;