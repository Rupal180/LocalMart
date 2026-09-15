import "./Categories.css";

import fruits from "../../assets/images/categories/fruits.jpg";
import vegetables from "../../assets/images/categories/vegetables.jpg";
import dairy from "../../assets/images/categories/dairy.jpg";
import bakery from "../../assets/images/categories/bakery.jpg";
import beverages from "../../assets/images/categories/beverages.jpg";
import personal from "../../assets/images/categories/personal-care.jpg";

const categories = [
  {
    title: "Fruits",
    image: fruits,
  },
  {
    title: "Vegetables",
    image: vegetables,
  },
  {
    title: "Dairy",
    image: dairy,
  },
  {
    title: "Bakery",
    image: bakery,
  },
  {
    title: "Beverages",
    image: beverages,
  },
  {
    title: "Personal Care",
    image: personal,
  },
];

function Categories() {
  return (
    <section
      className="categories"
      id="categories"
    >

      <div className="section-title">
        <h2>Shop By Category</h2>
        <p>Everything you need, delivered fresh.</p>
      </div>

      <div className="category-grid">

        {categories.map((item, index) => (
          <div
            className="category-card"
            key={index}
          >

            <img
              src={item.image}
              alt={item.title}
            />

            <h3>{item.title}</h3>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Categories;