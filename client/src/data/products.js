import apple from "../assets/images/products/fruits/apple.jpg";
import banana from "../assets/images/products/fruits/banana.jpg";
import grapes from "../assets/images/products/fruits/grapes.jpg";
import guava from "../assets/images/products/fruits/guava.jpg";
import mango from "../assets/images/products/fruits/mango.jpg";
import orange from "../assets/images/products/fruits/orange.jpg";
import pineapple from "../assets/images/products/fruits/pineapple.jpg";
import watermelon from "../assets/images/products/fruits/watermelon.jpg";

import cabbage from "../assets/images/products/vegetables/cabbage.jpg";
import capsicum from "../assets/images/products/vegetables/capsicum.jpg";
import carrot from "../assets/images/products/vegetables/carrot.jpg";
import cauliflower from "../assets/images/products/vegetables/cauliflower.jpg";
import onion from "../assets/images/products/vegetables/onion.jpg";
import potato from "../assets/images/products/vegetables/potato.jpg";
import spinach from "../assets/images/products/vegetables/spinach.jpg";
import tomato from "../assets/images/products/vegetables/tomato.jpg";

import butter from "../assets/images/products/dairy/butter.jpg";
import cheese from "../assets/images/products/dairy/cheese.jpg";
import curd from "../assets/images/products/dairy/curd.jpg";
import eggs from "../assets/images/products/dairy/eggs.jpg";
import milk from "../assets/images/products/dairy/milk.jpg";
import paneer from "../assets/images/products/dairy/paneer.jpg";

import bread from "../assets/images/products/bakery/bread.jpg";
import brownBread from "../assets/images/products/bakery/brown-bread.jpg";
import burgerBun from "../assets/images/products/bakery/burger-bun.jpg";
import cookies from "../assets/images/products/bakery/cookies.jpg";
import pav from "../assets/images/products/bakery/pav.jpg";

import bingo from "../assets/images/products/snacks/bingo.jpg";
import chips from "../assets/images/products/snacks/chips.jpg";
import doritos from "../assets/images/products/snacks/doritos.jpg";
import kurkure from "../assets/images/products/snacks/kurkure.jpg";
import popcorn from "../assets/images/products/snacks/popcorn.jpg";

import cocaCola from "../assets/images/products/beverages/coca-cola.jpg";
import orangeJuice from "../assets/images/products/beverages/orange-juice.jpg";
import pepsi from "../assets/images/products/beverages/pepsi.jpg";
import redbull from "../assets/images/products/beverages/redbull.jpg";
import sprite from "../assets/images/products/beverages/sprite.jpg";

import facewash from "../assets/images/products/personal-care/facewash.jpg";
import handwash from "../assets/images/products/personal-care/handwash.jpg";
import shampoo from "../assets/images/products/personal-care/shampoo.jpg";
import soap from "../assets/images/products/personal-care/soap.jpg";
import toothpaste from "../assets/images/products/personal-care/toothpaste.jpg";

import ariel from "../assets/images/products/household/ariel.jpg";
import harpic from "../assets/images/products/household/harpic.jpg";
import lizol from "../assets/images/products/household/lizol.jpg";
import surfExcel from "../assets/images/products/household/surf-excel.jpg";

import atta from "../assets/images/products/staples/atta.jpg";
import oil from "../assets/images/products/staples/oil.jpg";
import rice from "../assets/images/products/staples/rice.jpg";
import salt from "../assets/images/products/staples/salt.jpg";


const products = [

  // =====================================================
  // FRUITS
  // =====================================================

  {
    id: 1,
    name: "Fresh Red Apple",
    brand: "Fresh Produce",
    category: "Fruits",
    image: apple,
    price: 149,
    originalPrice: 179,
    rating: 4.8,
    reviews: 428,
    discount: 17,
    unit: "1 kg",
    stock: 24,
    inStock: true,
    badge: "Best Seller",
    seller: "The Daily Basket",
    description:
      "Crisp and juicy red apples selected for freshness and everyday snacking.",
    tags: ["Fresh", "Fruits", "Healthy"],
  },

  {
    id: 2,
    name: "Fresh Banana",
    brand: "Fresh Produce",
    category: "Fruits",
    image: banana,
    price: 69,
    originalPrice: 85,
    rating: 4.7,
    reviews: 356,
    discount: 19,
    unit: "1 dozen",
    stock: 30,
    inStock: true,
    badge: "Fresh Today",
    seller: "Urban Grocers",
    description:
      "Naturally sweet bananas that are perfect for breakfast, smoothies and snacks.",
    tags: ["Fresh", "Fruits", "Breakfast"],
  },

  {
    id: 3,
    name: "Fresh Green Grapes",
    brand: "Fresh Produce",
    category: "Fruits",
    image: grapes,
    price: 99,
    originalPrice: 119,
    rating: 4.6,
    reviews: 214,
    discount: 17,
    unit: "500 g",
    stock: 18,
    inStock: true,
    badge: "Fresh",
    seller: "FreshLane Market",
    description:
      "Sweet and refreshing green grapes carefully selected for quality.",
    tags: ["Fresh", "Fruits"],
  },

  {
    id: 4,
    name: "Fresh Guava",
    brand: "Fresh Produce",
    category: "Fruits",
    image: guava,
    price: 79,
    originalPrice: 79,
    rating: 4.5,
    reviews: 167,
    discount: 0,
    unit: "1 kg",
    stock: 12,
    inStock: true,
    badge: "",
    seller: "Green Basket Mart",
    description:
      "Fresh guavas with a naturally sweet flavour and crisp texture.",
    tags: ["Fresh", "Fruits"],
  },

  {
    id: 5,
    name: "Alphonso Mango",
    brand: "Fresh Produce",
    category: "Fruits",
    image: mango,
    price: 249,
    originalPrice: 299,
    rating: 4.9,
    reviews: 512,
    discount: 17,
    unit: "1 kg",
    stock: 9,
    inStock: true,
    badge: "Premium",
    seller: "Harvest & Co.",
    description:
      "Premium quality mangoes with rich flavour and naturally sweet pulp.",
    tags: ["Premium", "Fresh", "Seasonal"],
  },

  {
    id: 6,
    name: "Fresh Orange",
    brand: "Fresh Produce",
    category: "Fruits",
    image: orange,
    price: 89,
    originalPrice: 99,
    rating: 4.7,
    reviews: 289,
    discount: 10,
    unit: "1 kg",
    stock: 20,
    inStock: true,
    badge: "Fresh",
    seller: "The Daily Basket",
    description:
      "Juicy fresh oranges packed with natural flavour and refreshing citrus.",
    tags: ["Fresh", "Citrus", "Fruits"],
  },

  {
    id: 7,
    name: "Fresh Pineapple",
    brand: "Fresh Produce",
    category: "Fruits",
    image: pineapple,
    price: 89,
    originalPrice: 89,
    rating: 4.5,
    reviews: 143,
    discount: 0,
    unit: "1 pc",
    stock: 14,
    inStock: true,
    badge: "",
    seller: "Green Basket Mart",
    description:
      "Fresh tropical pineapple with a naturally sweet and tangy taste.",
    tags: ["Fresh", "Tropical", "Fruits"],
  },

  {
    id: 8,
    name: "Fresh Watermelon",
    brand: "Fresh Produce",
    category: "Fruits",
    image: watermelon,
    price: 59,
    originalPrice: 69,
    rating: 4.6,
    reviews: 198,
    discount: 14,
    unit: "1 kg",
    stock: 0,
    inStock: false,
    badge: "Sold Out",
    seller: "FreshLane Market",
    description:
      "Refreshing watermelon with high natural water content and sweet flavour.",
    tags: ["Fresh", "Summer", "Fruits"],
  },


  // =====================================================
  // VEGETABLES
  // =====================================================

  {
    id: 9,
    name: "Fresh Potato",
    brand: "Fresh Produce",
    category: "Vegetables",
    image: potato,
    price: 39,
    originalPrice: 45,
    rating: 4.6,
    reviews: 341,
    discount: 13,
    unit: "1 kg",
    stock: 45,
    inStock: true,
    badge: "",
    seller: "Urban Grocers",
    description:
      "Fresh everyday potatoes suitable for curries, fries and home cooking.",
    tags: ["Fresh", "Vegetables", "Staples"],
  },

  {
    id: 10,
    name: "Fresh Onion",
    brand: "Fresh Produce",
    category: "Vegetables",
    image: onion,
    price: 42,
    originalPrice: 49,
    rating: 4.5,
    reviews: 278,
    discount: 14,
    unit: "1 kg",
    stock: 40,
    inStock: true,
    badge: "",
    seller: "The Daily Basket",
    description:
      "Fresh onions with balanced flavour for everyday Indian cooking.",
    tags: ["Fresh", "Vegetables"],
  },

  {
    id: 11,
    name: "Fresh Tomato",
    brand: "Fresh Produce",
    category: "Vegetables",
    image: tomato,
    price: 49,
    originalPrice: 55,
    rating: 4.7,
    reviews: 325,
    discount: 11,
    unit: "1 kg",
    stock: 35,
    inStock: true,
    badge: "Fresh Today",
    seller: "Green Basket Mart",
    description:
      "Bright and juicy tomatoes selected for freshness and daily cooking.",
    tags: ["Fresh", "Vegetables"],
  },

  {
    id: 12,
    name: "Fresh Carrot",
    brand: "Fresh Produce",
    category: "Vegetables",
    image: carrot,
    price: 55,
    originalPrice: 65,
    rating: 4.6,
    reviews: 189,
    discount: 15,
    unit: "500 g",
    stock: 22,
    inStock: true,
    badge: "",
    seller: "FreshLane Market",
    description:
      "Crunchy fresh carrots suitable for salads, cooking and healthy snacks.",
    tags: ["Fresh", "Healthy", "Vegetables"],
  },

  {
    id: 13,
    name: "Fresh Cabbage",
    brand: "Fresh Produce",
    category: "Vegetables",
    image: cabbage,
    price: 35,
    originalPrice: 35,
    rating: 4.4,
    reviews: 126,
    discount: 0,
    unit: "1 pc",
    stock: 16,
    inStock: true,
    badge: "",
    seller: "Green Basket Mart",
    description:
      "Fresh crisp cabbage ideal for salads, stir-fries and everyday cooking.",
    tags: ["Fresh", "Vegetables"],
  },

  {
    id: 14,
    name: "Fresh Cauliflower",
    brand: "Fresh Produce",
    category: "Vegetables",
    image: cauliflower,
    price: 59,
    originalPrice: 69,
    rating: 4.5,
    reviews: 154,
    discount: 14,
    unit: "1 pc",
    stock: 11,
    inStock: true,
    badge: "",
    seller: "Harvest & Co.",
    description:
      "Fresh cauliflower with firm florets, perfect for curries and snacks.",
    tags: ["Fresh", "Vegetables"],
  },

  {
    id: 15,
    name: "Fresh Spinach",
    brand: "Fresh Produce",
    category: "Vegetables",
    image: spinach,
    price: 29,
    originalPrice: 35,
    rating: 4.7,
    reviews: 205,
    discount: 17,
    unit: "250 g",
    stock: 8,
    inStock: true,
    badge: "Fresh Today",
    seller: "Green Basket Mart",
    description:
      "Fresh leafy spinach harvested for everyday healthy meals.",
    tags: ["Fresh", "Leafy Greens", "Healthy"],
  },

  {
    id: 16,
    name: "Fresh Green Capsicum",
    brand: "Fresh Produce",
    category: "Vegetables",
    image: capsicum,
    price: 69,
    originalPrice: 79,
    rating: 4.6,
    reviews: 174,
    discount: 13,
    unit: "500 g",
    stock: 0,
    inStock: false,
    badge: "Sold Out",
    seller: "FreshLane Market",
    description:
      "Crisp green capsicum with a mild flavour for pizzas, curries and stir-fries.",
    tags: ["Fresh", "Vegetables"],
  },


  // =====================================================
  // DAIRY
  // =====================================================

  {
    id: 17,
    name: "Amul Taaza Milk",
    brand: "Amul",
    category: "Dairy",
    image: milk,
    price: 68,
    originalPrice: 75,
    rating: 4.9,
    reviews: 1248,
    discount: 9,
    unit: "1 L",
    stock: 18,
    inStock: true,
    badge: "Best Seller",
    seller: "The Daily Basket",
    description:
      "Fresh and wholesome milk from Amul for everyday family consumption.",
    tags: ["Amul", "Milk", "Dairy"],
  },

  {
    id: 18,
    name: "Amul Butter",
    brand: "Amul",
    category: "Dairy",
    image: butter,
    price: 58,
    originalPrice: 60,
    rating: 4.8,
    reviews: 842,
    discount: 3,
    unit: "100 g",
    stock: 25,
    inStock: true,
    badge: "Popular",
    seller: "Urban Grocers",
    description:
      "Creamy Amul butter suitable for toast, cooking and baking.",
    tags: ["Amul", "Butter", "Dairy"],
  },

  {
    id: 19,
    name: "Amul Cheese Cubes",
    brand: "Amul",
    category: "Dairy",
    image: cheese,
    price: 125,
    originalPrice: 135,
    rating: 4.7,
    reviews: 516,
    discount: 7,
    unit: "200 g",
    stock: 14,
    inStock: true,
    badge: "",
    seller: "Harvest & Co.",
    description:
      "Smooth and creamy cheese cubes perfect for sandwiches and snacks.",
    tags: ["Amul", "Cheese", "Dairy"],
  },

  {
    id: 20,
    name: "Fresh Curd",
    brand: "Local Dairy",
    category: "Dairy",
    image: curd,
    price: 55,
    originalPrice: 55,
    rating: 4.6,
    reviews: 294,
    discount: 0,
    unit: "400 g",
    stock: 20,
    inStock: true,
    badge: "Fresh",
    seller: "Green Basket Mart",
    description:
      "Fresh creamy curd prepared for everyday meals and refreshing snacks.",
    tags: ["Fresh", "Dairy"],
  },

  {
    id: 21,
    name: "Fresh Paneer",
    brand: "Local Dairy",
    category: "Dairy",
    image: paneer,
    price: 115,
    originalPrice: 125,
    rating: 4.8,
    reviews: 437,
    discount: 8,
    unit: "200 g",
    stock: 10,
    inStock: true,
    badge: "Fresh Today",
    seller: "FreshLane Market",
    description:
      "Soft fresh paneer suitable for curries, wraps and homemade dishes.",
    tags: ["Fresh", "Paneer", "Dairy"],
  },

  {
    id: 22,
    name: "Farm Fresh Eggs",
    brand: "Farm Fresh",
    category: "Dairy",
    image: eggs,
    price: 95,
    originalPrice: 110,
    rating: 4.8,
    reviews: 768,
    discount: 14,
    unit: "12 pcs",
    stock: 20,
    inStock: true,
    badge: "Best Seller",
    seller: "The Daily Basket",
    description:
      "Farm fresh eggs carefully packed for safe and convenient delivery.",
    tags: ["Fresh", "Eggs", "Protein"],
  },


  // =====================================================
  // BAKERY
  // =====================================================

  {
    id: 23,
    name: "Harvest Gold White Bread",
    brand: "Harvest Gold",
    category: "Bakery",
    image: bread,
    price: 55,
    originalPrice: 65,
    rating: 4.6,
    reviews: 654,
    discount: 15,
    unit: "400 g",
    stock: 15,
    inStock: true,
    badge: "Popular",
    seller: "Urban Grocers",
    description:
      "Soft and fresh white bread ideal for breakfast and quick snacks.",
    tags: ["Bread", "Bakery"],
  },

  {
    id: 24,
    name: "Harvest Gold Brown Bread",
    brand: "Harvest Gold",
    category: "Bakery",
    image: brownBread,
    price: 58,
    originalPrice: 65,
    rating: 4.6,
    reviews: 341,
    discount: 11,
    unit: "400 g",
    stock: 12,
    inStock: true,
    badge: "",
    seller: "The Daily Basket",
    description:
      "Soft brown bread made for wholesome everyday breakfasts and sandwiches.",
    tags: ["Bread", "Bakery", "Healthy"],
  },

  {
    id: 25,
    name: "Fresh Burger Buns",
    brand: "Local Bakery",
    category: "Bakery",
    image: burgerBun,
    price: 45,
    originalPrice: 50,
    rating: 4.5,
    reviews: 186,
    discount: 10,
    unit: "4 pcs",
    stock: 9,
    inStock: true,
    badge: "",
    seller: "FreshLane Market",
    description:
      "Soft burger buns perfect for homemade burgers and sandwiches.",
    tags: ["Bakery", "Buns"],
  },

  {
    id: 26,
    name: "Butter Cookies",
    brand: "Sunfeast",
    category: "Bakery",
    image: cookies,
    price: 65,
    originalPrice: 70,
    rating: 4.7,
    reviews: 392,
    discount: 7,
    unit: "150 g",
    stock: 25,
    inStock: true,
    badge: "Popular",
    seller: "Green Basket Mart",
    description:
      "Crispy buttery cookies perfect with tea, coffee or as an everyday snack.",
    tags: ["Cookies", "Bakery", "Snacks"],
  },

  {
    id: 27,
    name: "Fresh Pav",
    brand: "Local Bakery",
    category: "Bakery",
    image: pav,
    price: 35,
    originalPrice: 35,
    rating: 4.5,
    reviews: 143,
    discount: 0,
    unit: "6 pcs",
    stock: 0,
    inStock: false,
    badge: "Sold Out",
    seller: "FreshLane Market",
    description:
      "Soft fresh pav ideal for pav bhaji, sandwiches and evening snacks.",
    tags: ["Bakery", "Fresh"],
  },


  // =====================================================
  // SNACKS
  // =====================================================

  {
    id: 28,
    name: "Lay's Classic Salted Chips",
    brand: "Lay's",
    category: "Snacks",
    image: chips,
    price: 20,
    originalPrice: 25,
    rating: 4.5,
    reviews: 924,
    discount: 20,
    unit: "52 g",
    stock: 40,
    inStock: true,
    badge: "Best Seller",
    seller: "The Daily Basket",
    description:
      "Classic crispy salted potato chips with a light and crunchy texture.",
    tags: ["Lay's", "Chips", "Snacks"],
  },

  {
    id: 29,
    name: "Bingo Tedhe Medhe",
    brand: "Bingo",
    category: "Snacks",
    image: bingo,
    price: 20,
    originalPrice: 20,
    rating: 4.5,
    reviews: 512,
    discount: 0,
    unit: "90 g",
    stock: 32,
    inStock: true,
    badge: "",
    seller: "Urban Grocers",
    description:
      "Crunchy and flavourful snack perfect for movie nights and casual munching.",
    tags: ["Bingo", "Snacks"],
  },

  {
    id: 30,
    name: "Kurkure Masala Munch",
    brand: "Kurkure",
    category: "Snacks",
    image: kurkure,
    price: 20,
    originalPrice: 25,
    rating: 4.6,
    reviews: 678,
    discount: 20,
    unit: "90 g",
    stock: 28,
    inStock: true,
    badge: "Popular",
    seller: "Green Basket Mart",
    description:
      "Crunchy masala snack with a bold Indian flavour.",
    tags: ["Kurkure", "Snacks"],
  },

  {
    id: 31,
    name: "Doritos Nacho Cheese",
    brand: "Doritos",
    category: "Snacks",
    image: doritos,
    price: 49,
    originalPrice: 55,
    rating: 4.7,
    reviews: 286,
    discount: 11,
    unit: "100 g",
    stock: 18,
    inStock: true,
    badge: "",
    seller: "Harvest & Co.",
    description:
      "Crunchy tortilla chips with a rich nacho cheese flavour.",
    tags: ["Doritos", "Nachos", "Snacks"],
  },

  {
    id: 32,
    name: "Classic Salted Popcorn",
    brand: "Local Snacks",
    category: "Snacks",
    image: popcorn,
    price: 45,
    originalPrice: 45,
    rating: 4.4,
    reviews: 132,
    discount: 0,
    unit: "100 g",
    stock: 15,
    inStock: true,
    badge: "",
    seller: "FreshLane Market",
    description:
      "Light and crispy salted popcorn for quick snacking.",
    tags: ["Popcorn", "Snacks"],
  },


  // =====================================================
  // BEVERAGES
  // =====================================================

  {
    id: 33,
    name: "Tropicana Orange Juice",
    brand: "Tropicana",
    category: "Beverages",
    image: orangeJuice,
    price: 135,
    originalPrice: 160,
    rating: 4.7,
    reviews: 724,
    discount: 16,
    unit: "1 L",
    stock: 16,
    inStock: true,
    badge: "Popular",
    seller: "The Daily Basket",
    description:
      "Refreshing orange juice with a delicious citrus flavour.",
    tags: ["Tropicana", "Juice", "Beverages"],
  },

  {
    id: 34,
    name: "Coca-Cola Original Taste",
    brand: "Coca-Cola",
    category: "Beverages",
    image: cocaCola,
    price: 45,
    originalPrice: 45,
    rating: 4.6,
    reviews: 913,
    discount: 0,
    unit: "750 ml",
    stock: 25,
    inStock: true,
    badge: "Popular",
    seller: "Urban Grocers",
    description:
      "Classic chilled Coca-Cola soft drink for refreshing moments.",
    tags: ["Coca-Cola", "Soft Drink"],
  },

  {
    id: 35,
    name: "Pepsi",
    brand: "Pepsi",
    category: "Beverages",
    image: pepsi,
    price: 45,
    originalPrice: 50,
    rating: 4.5,
    reviews: 621,
    discount: 10,
    unit: "750 ml",
    stock: 30,
    inStock: true,
    badge: "",
    seller: "Green Basket Mart",
    description:
      "Refreshing Pepsi soft drink with a bold cola flavour.",
    tags: ["Pepsi", "Soft Drink"],
  },

  {
    id: 36,
    name: "Sprite",
    brand: "Sprite",
    category: "Beverages",
    image: sprite,
    price: 45,
    originalPrice: 45,
    rating: 4.6,
    reviews: 548,
    discount: 0,
    unit: "750 ml",
    stock: 22,
    inStock: true,
    badge: "",
    seller: "FreshLane Market",
    description:
      "Crisp lemon-lime soft drink with a refreshing taste.",
    tags: ["Sprite", "Soft Drink"],
  },

  {
    id: 37,
    name: "Red Bull Energy Drink",
    brand: "Red Bull",
    category: "Beverages",
    image: redbull,
    price: 125,
    originalPrice: 125,
    rating: 4.7,
    reviews: 317,
    discount: 0,
    unit: "250 ml",
    stock: 0,
    inStock: false,
    badge: "Sold Out",
    seller: "Harvest & Co.",
    description:
      "Chilled energy drink for convenient on-the-go refreshment.",
    tags: ["Red Bull", "Beverages"],
  },


  // =====================================================
  // PERSONAL CARE
  // =====================================================

  {
    id: 38,
    name: "Dove Nourishing Shampoo",
    brand: "Dove",
    category: "Personal Care",
    image: shampoo,
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    reviews: 834,
    discount: 17,
    unit: "340 ml",
    stock: 12,
    inStock: true,
    badge: "Best Seller",
    seller: "The Daily Basket",
    description:
      "Nourishing shampoo designed for everyday hair care.",
    tags: ["Dove", "Shampoo", "Personal Care"],
  },

  {
    id: 39,
    name: "Dove Cream Beauty Bar",
    brand: "Dove",
    category: "Personal Care",
    image: soap,
    price: 55,
    originalPrice: 65,
    rating: 4.7,
    reviews: 623,
    discount: 15,
    unit: "100 g",
    stock: 24,
    inStock: true,
    badge: "Popular",
    seller: "Urban Grocers",
    description:
      "Gentle cleansing beauty bar suitable for everyday personal care.",
    tags: ["Dove", "Soap", "Personal Care"],
  },

  {
    id: 40,
    name: "Colgate Strong Teeth Toothpaste",
    brand: "Colgate",
    category: "Personal Care",
    image: toothpaste,
    price: 99,
    originalPrice: 110,
    rating: 4.8,
    reviews: 1056,
    discount: 10,
    unit: "200 g",
    stock: 31,
    inStock: true,
    badge: "Best Seller",
    seller: "Green Basket Mart",
    description:
      "Everyday fluoride toothpaste for complete family oral care.",
    tags: ["Colgate", "Toothpaste"],
  },

  {
    id: 41,
    name: "Gentle Daily Face Wash",
    brand: "Everyday Care",
    category: "Personal Care",
    image: facewash,
    price: 159,
    originalPrice: 179,
    rating: 4.5,
    reviews: 287,
    discount: 11,
    unit: "100 ml",
    stock: 15,
    inStock: true,
    badge: "",
    seller: "FreshLane Market",
    description:
      "Gentle everyday face wash for a clean and refreshed feeling.",
    tags: ["Face Care", "Personal Care"],
  },

  {
    id: 42,
    name: "Dettol Hand Wash",
    brand: "Dettol",
    category: "Personal Care",
    image: handwash,
    price: 99,
    originalPrice: 110,
    rating: 4.7,
    reviews: 712,
    discount: 10,
    unit: "250 ml",
    stock: 20,
    inStock: true,
    badge: "Popular",
    seller: "The Daily Basket",
    description:
      "Daily hand wash designed for clean and hygienic hands.",
    tags: ["Dettol", "Hand Wash", "Personal Care"],
  },


  // =====================================================
  // HOUSEHOLD
  // =====================================================

  {
    id: 43,
    name: "Surf Excel Matic",
    brand: "Surf Excel",
    category: "Household",
    image: surfExcel,
    price: 249,
    originalPrice: 279,
    rating: 4.7,
    reviews: 682,
    discount: 11,
    unit: "1 kg",
    stock: 14,
    inStock: true,
    badge: "Popular",
    seller: "Urban Grocers",
    description:
      "Powerful laundry detergent for effective everyday cleaning.",
    tags: ["Surf Excel", "Laundry", "Household"],
  },

  {
    id: 44,
    name: "Ariel Matic Detergent",
    brand: "Ariel",
    category: "Household",
    image: ariel,
    price: 259,
    originalPrice: 289,
    rating: 4.8,
    reviews: 593,
    discount: 10,
    unit: "1 kg",
    stock: 11,
    inStock: true,
    badge: "Best Seller",
    seller: "The Daily Basket",
    description:
      "Powerful detergent designed to remove tough everyday stains.",
    tags: ["Ariel", "Laundry", "Household"],
  },

  {
    id: 45,
    name: "Harpic Bathroom Cleaner",
    brand: "Harpic",
    category: "Household",
    image: harpic,
    price: 95,
    originalPrice: 105,
    rating: 4.7,
    reviews: 478,
    discount: 10,
    unit: "500 ml",
    stock: 17,
    inStock: true,
    badge: "",
    seller: "Green Basket Mart",
    description:
      "Bathroom cleaning solution for maintaining a fresh and hygienic space.",
    tags: ["Harpic", "Cleaning", "Household"],
  },

  {
    id: 46,
    name: "Lizol Floor Cleaner",
    brand: "Lizol",
    category: "Household",
    image: lizol,
    price: 129,
    originalPrice: 129,
    rating: 4.6,
    reviews: 365,
    discount: 0,
    unit: "1 L",
    stock: 13,
    inStock: true,
    badge: "",
    seller: "FreshLane Market",
    description:
      "Everyday floor cleaner for a clean and fresh home.",
    tags: ["Lizol", "Floor Cleaner", "Household"],
  },


  // =====================================================
  // STAPLES
  // =====================================================

  {
    id: 47,
    name: "Aashirvaad Atta",
    brand: "Aashirvaad",
    category: "Staples",
    image: atta,
    price: 259,
    originalPrice: 285,
    rating: 4.8,
    reviews: 1194,
    discount: 9,
    unit: "5 kg",
    stock: 18,
    inStock: true,
    badge: "Best Seller",
    seller: "The Daily Basket",
    description:
      "Quality whole wheat flour suitable for soft everyday rotis and parathas.",
    tags: ["Aashirvaad", "Atta", "Staples"],
  },

  {
    id: 48,
    name: "Fortune Sunflower Oil",
    brand: "Fortune",
    category: "Staples",
    image: oil,
    price: 149,
    originalPrice: 165,
    rating: 4.7,
    reviews: 734,
    discount: 10,
    unit: "1 L",
    stock: 16,
    inStock: true,
    badge: "Popular",
    seller: "Urban Grocers",
    description:
      "Light cooking oil suitable for everyday Indian meals.",
    tags: ["Fortune", "Cooking Oil", "Staples"],
  },

  {
    id: 49,
    name: "India Gate Basmati Rice",
    brand: "India Gate",
    category: "Staples",
    image: rice,
    price: 349,
    originalPrice: 399,
    rating: 4.8,
    reviews: 618,
    discount: 13,
    unit: "5 kg",
    stock: 9,
    inStock: true,
    badge: "Premium",
    seller: "Harvest & Co.",
    description:
      "Premium long-grain basmati rice suitable for everyday meals and special dishes.",
    tags: ["Rice", "Basmati", "Staples"],
  },

  {
    id: 50,
    name: "Tata Salt",
    brand: "Tata",
    category: "Staples",
    image: salt,
    price: 28,
    originalPrice: 28,
    rating: 4.8,
    reviews: 1325,
    discount: 0,
    unit: "1 kg",
    stock: 35,
    inStock: true,
    badge: "Best Seller",
    seller: "Green Basket Mart",
    description:
      "Everyday iodised salt from Tata for regular home cooking.",
    tags: ["Tata", "Salt", "Staples"],
  },

];

export default products;