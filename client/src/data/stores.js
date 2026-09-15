import store01 from "../assets/images/stores/store-01.jpg";
import store02 from "../assets/images/stores/store-02.jpg";
import store03 from "../assets/images/stores/store-03.jpg";
import store04 from "../assets/images/stores/store-04.jpg";
import store05 from "../assets/images/stores/store-05.jpg";
import store06 from "../assets/images/stores/store-06.jpg";

export const stores = [
  {
    id: 1,
    name: "The Daily Basket",
    area: "Local Market",
    image: store01,
    rating: 4.8,
    reviews: 428,
    distance: 1.2,
    deliveryTime: 18,
    deliveryLabel: "15–20 min",
    deliveryFee: 0,
    cheaperProducts: 14,
    type: "Grocery & Essentials",
    isOpen: true,
    featured: true,
    tags: ["Daily Essentials", "Dairy", "Snacks"],
  },

  {
    id: 2,
    name: "Urban Grocers",
    area: "Main Market",
    image: store02,
    rating: 4.7,
    reviews: 312,
    distance: 1.8,
    deliveryTime: 22,
    deliveryLabel: "20–25 min",
    deliveryFee: 0,
    cheaperProducts: 19,
    type: "Groceries & Household",
    isOpen: true,
    featured: false,
    tags: ["Groceries", "Household", "Beverages"],
  },

  {
    id: 3,
    name: "FreshLane Market",
    area: "Neighbourhood Market",
    image: store03,
    rating: 4.6,
    reviews: 267,
    distance: 2.3,
    deliveryTime: 26,
    deliveryLabel: "25–30 min",
    deliveryFee: 20,
    cheaperProducts: 11,
    type: "Everyday Grocery",
    isOpen: true,
    featured: false,
    tags: ["Staples", "Personal Care", "Snacks"],
  },

  {
    id: 4,
    name: "Harvest & Co.",
    area: "Central Market",
    image: store04,
    rating: 4.9,
    reviews: 521,
    distance: 2.7,
    deliveryTime: 24,
    deliveryLabel: "20–30 min",
    deliveryFee: 0,
    cheaperProducts: 16,
    type: "Fresh Produce & Grocery",
    isOpen: true,
    featured: false,
    tags: ["Fruits", "Vegetables", "Groceries"],
  },

  {
    id: 5,
    name: "Everyday Market",
    area: "City Centre",
    image: store05,
    rating: 4.5,
    reviews: 194,
    distance: 3.4,
    deliveryTime: 32,
    deliveryLabel: "30–35 min",
    deliveryFee: 25,
    cheaperProducts: 9,
    type: "Supermarket & Essentials",
    isOpen: true,
    featured: false,
    tags: ["Grocery", "Home Care", "Personal Care"],
  },

  {
    id: 6,
    name: "Green Basket Mart",
    area: "Model Town",
    image: store06,
    rating: 4.7,
    reviews: 356,
    distance: 1.5,
    deliveryTime: 16,
    deliveryLabel: "15–20 min",
    deliveryFee: 10,
    cheaperProducts: 17,
    type: "Fresh Grocery & Essentials",
    isOpen: true,
    featured: false,
    tags: ["Fresh Produce", "Dairy", "Essentials"],
  },
];

export const getStoreById = (storeId) => {
  return stores.find(
    (store) => Number(store.id) === Number(storeId)
  );
};