/* =========================================================
   LOCALMART — STORE INVENTORY
   Temporary frontend data

   Later this data will come from:
   - MongoDB
   - Seller inventory
   - Product catalogue
========================================================= */


/* =========================================================
                    PRODUCT IMAGES
========================================================= */

import appleImg from "../assets/images/products/fruits/apple.jpg";
import bananaImg from "../assets/images/products/fruits/banana.jpg";

import breadImg from "../assets/images/products/bakery/bread.jpg";

import chipsImg from "../assets/images/products/snacks/chips.jpg";

import eggsImg from "../assets/images/products/dairy/eggs.jpg";
import milkImg from "../assets/images/products/dairy/milk.jpg";

import orangeJuiceImg from "../assets/images/products/beverages/orange-juice.jpg";

import shampooImg from "../assets/images/products/personal-care/shampoo.jpg";


/* =========================================================
                    STORE PRODUCTS
========================================================= */

export const storeProducts = [

  /* =======================================================
               STORE 1 — THE DAILY BASKET
  ======================================================= */

  {
    id: "daily-banana",
    productId: "banana",
    storeId: 1,

    name: "Fresh Banana",
    brand: "Local Fresh",
    category: "Fruits",
    unit: "1 kg",

    image: bananaImg,

    price: 58,
    originalPrice: 70,

    stock: 24,
    rating: 4.7,
    popular: true,
  },

  {
    id: "daily-apple",
    productId: "apple",
    storeId: 1,

    name: "Fresh Red Apples",
    brand: "Local Fresh",
    category: "Fruits",
    unit: "1 kg",

    image: appleImg,

    price: 145,
    originalPrice: 170,

    stock: 16,
    rating: 4.8,
    popular: true,
  },

  {
    id: "daily-milk",
    productId: "amul-milk",
    storeId: 1,

    name: "Amul Taaza Milk",
    brand: "Amul",
    category: "Dairy",
    unit: "1 L",

    image: milkImg,

    price: 67,
    originalPrice: 70,

    stock: 18,
    rating: 4.8,
    popular: true,
  },

  {
    id: "daily-bread",
    productId: "bread",
    storeId: 1,

    name: "Fresh Milk Bread",
    brand: "Harvest Gold",
    category: "Bakery",
    unit: "400 g",

    image: breadImg,

    price: 45,
    originalPrice: 50,

    stock: 12,
    rating: 4.5,
    popular: false,
  },

  {
    id: "daily-eggs",
    productId: "eggs",
    storeId: 1,

    name: "Farm Fresh Eggs",
    brand: "Local Farm",
    category: "Dairy",
    unit: "6 pcs",

    image: eggsImg,

    price: 62,
    originalPrice: 70,

    stock: 20,
    rating: 4.6,
    popular: false,
  },

  {
    id: "daily-chips",
    productId: "chips",
    storeId: 1,

    name: "Classic Salted Chips",
    brand: "Lay's",
    category: "Snacks",
    unit: "52 g",

    image: chipsImg,

    price: 20,
    originalPrice: 20,

    stock: 35,
    rating: 4.5,
    popular: false,
  },


  /* =======================================================
                  STORE 2 — URBAN GROCERS
  ======================================================= */

  {
    id: "urban-banana",
    productId: "banana",
    storeId: 2,

    name: "Fresh Banana",
    brand: "Local Fresh",
    category: "Fruits",
    unit: "1 kg",

    image: bananaImg,

    price: 55,
    originalPrice: 70,

    stock: 19,
    rating: 4.6,
    popular: true,
  },

  {
    id: "urban-apple",
    productId: "apple",
    storeId: 2,

    name: "Fresh Red Apples",
    brand: "Local Fresh",
    category: "Fruits",
    unit: "1 kg",

    image: appleImg,

    price: 138,
    originalPrice: 170,

    stock: 22,
    rating: 4.7,
    popular: true,
  },

  {
    id: "urban-milk",
    productId: "amul-milk",
    storeId: 2,

    name: "Amul Taaza Milk",
    brand: "Amul",
    category: "Dairy",
    unit: "1 L",

    image: milkImg,

    price: 65,
    originalPrice: 70,

    stock: 27,
    rating: 4.8,
    popular: true,
  },

  {
    id: "urban-bread",
    productId: "bread",
    storeId: 2,

    name: "Fresh Milk Bread",
    brand: "Harvest Gold",
    category: "Bakery",
    unit: "400 g",

    image: breadImg,

    price: 47,
    originalPrice: 50,

    stock: 15,
    rating: 4.4,
    popular: false,
  },

  {
    id: "urban-orange-juice",
    productId: "orange-juice",
    storeId: 2,

    name: "Orange Fruit Juice",
    brand: "Real",
    category: "Beverages",
    unit: "1 L",

    image: orangeJuiceImg,

    price: 108,
    originalPrice: 120,

    stock: 14,
    rating: 4.6,
    popular: true,
  },

  {
    id: "urban-chips",
    productId: "chips",
    storeId: 2,

    name: "Classic Salted Chips",
    brand: "Lay's",
    category: "Snacks",
    unit: "52 g",

    image: chipsImg,

    price: 18,
    originalPrice: 20,

    stock: 36,
    rating: 4.7,
    popular: true,
  },


  /* =======================================================
                 STORE 3 — FRESHLANE MARKET
  ======================================================= */

  {
    id: "freshlane-banana",
    productId: "banana",
    storeId: 3,

    name: "Fresh Banana",
    brand: "Local Fresh",
    category: "Fruits",
    unit: "1 kg",

    image: bananaImg,

    price: 60,
    originalPrice: 70,

    stock: 14,
    rating: 4.5,
    popular: false,
  },

  {
    id: "freshlane-apple",
    productId: "apple",
    storeId: 3,

    name: "Fresh Red Apples",
    brand: "Local Fresh",
    category: "Fruits",
    unit: "1 kg",

    image: appleImg,

    price: 150,
    originalPrice: 170,

    stock: 12,
    rating: 4.6,
    popular: false,
  },

  {
    id: "freshlane-milk",
    productId: "amul-milk",
    storeId: 3,

    name: "Amul Taaza Milk",
    brand: "Amul",
    category: "Dairy",
    unit: "1 L",

    image: milkImg,

    price: 66,
    originalPrice: 70,

    stock: 12,
    rating: 4.7,
    popular: true,
  },

  {
    id: "freshlane-eggs",
    productId: "eggs",
    storeId: 3,

    name: "Farm Fresh Eggs",
    brand: "Local Farm",
    category: "Dairy",
    unit: "6 pcs",

    image: eggsImg,

    price: 58,
    originalPrice: 70,

    stock: 18,
    rating: 4.7,
    popular: true,
  },

  {
    id: "freshlane-shampoo",
    productId: "shampoo",
    storeId: 3,

    name: "Daily Care Shampoo",
    brand: "Dove",
    category: "Personal Care",
    unit: "180 ml",

    image: shampooImg,

    price: 185,
    originalPrice: 210,

    stock: 9,
    rating: 4.6,
    popular: false,
  },


  /* =======================================================
                   STORE 4 — HARVEST & CO.
  ======================================================= */

  {
    id: "harvest-banana",
    productId: "banana",
    storeId: 4,

    name: "Fresh Banana",
    brand: "Local Fresh",
    category: "Fruits",
    unit: "1 kg",

    image: bananaImg,

    price: 52,
    originalPrice: 70,

    stock: 42,
    rating: 4.9,
    popular: true,
  },

  {
    id: "harvest-apple",
    productId: "apple",
    storeId: 4,

    name: "Fresh Red Apples",
    brand: "Local Fresh",
    category: "Fruits",
    unit: "1 kg",

    image: appleImg,

    price: 132,
    originalPrice: 170,

    stock: 28,
    rating: 4.9,
    popular: true,
  },

  {
    id: "harvest-milk",
    productId: "amul-milk",
    storeId: 4,

    name: "Amul Taaza Milk",
    brand: "Amul",
    category: "Dairy",
    unit: "1 L",

    image: milkImg,

    price: 68,
    originalPrice: 70,

    stock: 20,
    rating: 4.8,
    popular: true,
  },

  {
    id: "harvest-bread",
    productId: "bread",
    storeId: 4,

    name: "Fresh Milk Bread",
    brand: "Harvest Gold",
    category: "Bakery",
    unit: "400 g",

    image: breadImg,

    price: 44,
    originalPrice: 50,

    stock: 18,
    rating: 4.6,
    popular: false,
  },

  {
    id: "harvest-eggs",
    productId: "eggs",
    storeId: 4,

    name: "Farm Fresh Eggs",
    brand: "Local Farm",
    category: "Dairy",
    unit: "6 pcs",

    image: eggsImg,

    price: 55,
    originalPrice: 70,

    stock: 26,
    rating: 4.8,
    popular: true,
  },

  {
    id: "harvest-orange-juice",
    productId: "orange-juice",
    storeId: 4,

    name: "Orange Fruit Juice",
    brand: "Real",
    category: "Beverages",
    unit: "1 L",

    image: orangeJuiceImg,

    price: 102,
    originalPrice: 120,

    stock: 17,
    rating: 4.7,
    popular: false,
  },


  /* =======================================================
                  STORE 5 — EVERYDAY MARKET
  ======================================================= */

  {
    id: "everyday-banana",
    productId: "banana",
    storeId: 5,

    name: "Fresh Banana",
    brand: "Local Fresh",
    category: "Fruits",
    unit: "1 kg",

    image: bananaImg,

    price: 54,
    originalPrice: 70,

    stock: 30,
    rating: 4.7,
    popular: true,
  },

  {
    id: "everyday-milk",
    productId: "amul-milk",
    storeId: 5,

    name: "Amul Taaza Milk",
    brand: "Amul",
    category: "Dairy",
    unit: "1 L",

    image: milkImg,

    price: 64,
    originalPrice: 70,

    stock: 35,
    rating: 4.7,
    popular: true,
  },

  {
    id: "everyday-bread",
    productId: "bread",
    storeId: 5,

    name: "Fresh Milk Bread",
    brand: "Harvest Gold",
    category: "Bakery",
    unit: "400 g",

    image: breadImg,

    price: 46,
    originalPrice: 50,

    stock: 20,
    rating: 4.5,
    popular: false,
  },

  {
    id: "everyday-chips",
    productId: "chips",
    storeId: 5,

    name: "Classic Salted Chips",
    brand: "Lay's",
    category: "Snacks",
    unit: "52 g",

    image: chipsImg,

    price: 17,
    originalPrice: 20,

    stock: 40,
    rating: 4.8,
    popular: true,
  },

  {
    id: "everyday-orange-juice",
    productId: "orange-juice",
    storeId: 5,

    name: "Orange Fruit Juice",
    brand: "Real",
    category: "Beverages",
    unit: "1 L",

    image: orangeJuiceImg,

    price: 105,
    originalPrice: 120,

    stock: 21,
    rating: 4.7,
    popular: true,
  },

  {
    id: "everyday-shampoo",
    productId: "shampoo",
    storeId: 5,

    name: "Daily Care Shampoo",
    brand: "Dove",
    category: "Personal Care",
    unit: "180 ml",

    image: shampooImg,

    price: 178,
    originalPrice: 210,

    stock: 15,
    rating: 4.7,
    popular: false,
  },


  /* =======================================================
                STORE 6 — GREEN BASKET MART
  ======================================================= */

  {
    id: "green-banana",
    productId: "banana",
    storeId: 6,

    name: "Fresh Banana",
    brand: "Local Fresh",
    category: "Fruits",
    unit: "1 kg",

    image: bananaImg,

    price: 56,
    originalPrice: 70,

    stock: 28,
    rating: 4.8,
    popular: true,
  },

  {
    id: "green-apple",
    productId: "apple",
    storeId: 6,

    name: "Fresh Red Apples",
    brand: "Local Fresh",
    category: "Fruits",
    unit: "1 kg",

    image: appleImg,

    price: 140,
    originalPrice: 170,

    stock: 21,
    rating: 4.7,
    popular: true,
  },

  {
    id: "green-milk",
    productId: "amul-milk",
    storeId: 6,

    name: "Amul Taaza Milk",
    brand: "Amul",
    category: "Dairy",
    unit: "1 L",

    image: milkImg,

    price: 65,
    originalPrice: 70,

    stock: 31,
    rating: 4.8,
    popular: true,
  },

  {
    id: "green-bread",
    productId: "bread",
    storeId: 6,

    name: "Fresh Milk Bread",
    brand: "Harvest Gold",
    category: "Bakery",
    unit: "400 g",

    image: breadImg,

    price: 43,
    originalPrice: 50,

    stock: 18,
    rating: 4.6,
    popular: false,
  },

  {
    id: "green-eggs",
    productId: "eggs",
    storeId: 6,

    name: "Farm Fresh Eggs",
    brand: "Local Farm",
    category: "Dairy",
    unit: "6 pcs",

    image: eggsImg,

    price: 59,
    originalPrice: 70,

    stock: 24,
    rating: 4.7,
    popular: true,
  },

  {
    id: "green-chips",
    productId: "chips",
    storeId: 6,

    name: "Classic Salted Chips",
    brand: "Lay's",
    category: "Snacks",
    unit: "52 g",

    image: chipsImg,

    price: 19,
    originalPrice: 20,

    stock: 38,
    rating: 4.6,
    popular: false,
  },

  {
    id: "green-orange-juice",
    productId: "orange-juice",
    storeId: 6,

    name: "Orange Fruit Juice",
    brand: "Real",
    category: "Beverages",
    unit: "1 L",

    image: orangeJuiceImg,

    price: 104,
    originalPrice: 120,

    stock: 16,
    rating: 4.7,
    popular: true,
  },

  {
    id: "green-shampoo",
    productId: "shampoo",
    storeId: 6,

    name: "Daily Care Shampoo",
    brand: "Dove",
    category: "Personal Care",
    unit: "180 ml",

    image: shampooImg,

    price: 182,
    originalPrice: 210,

    stock: 13,
    rating: 4.6,
    popular: false,
  },

];


/* =========================================================
              GET PRODUCTS OF ONE STORE
========================================================= */

export const getProductsByStore = (storeId) => {
  return storeProducts.filter(
    (product) =>
      Number(product.storeId) === Number(storeId)
  );
};


/* =========================================================
                 PRODUCT PRICE COMPARISON
========================================================= */

export const getProductPriceComparison = (
  productId
) => {

  return storeProducts
    .filter(
      (product) =>
        product.productId === productId &&
        product.stock > 0
    )
    .sort(
      (a, b) => a.price - b.price
    );
};


/* =========================================================
                     CHECK STOCK
========================================================= */

export const isProductAvailable = (
  storeId,
  productId
) => {

  return storeProducts.some(
    (product) =>
      Number(product.storeId) === Number(storeId) &&
      product.productId === productId &&
      product.stock > 0
  );

};