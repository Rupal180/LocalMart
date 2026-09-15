const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Store = require("./models/Store");
const Product = require("./models/Product");

const products = [
  {
    legacyId: 1,
    name: "Fresh Red Apple",
    category: "Fruits",
    brand: "Fresh Produce",
    description:
      "Crisp and juicy red apples selected for freshness and everyday snacking.",
    price: 149,
    originalPrice: 179,
    unit: "1 kg",
    stock: 24,
    seller: "The Daily Basket",
    tags: ["Fresh", "Fruits", "Healthy"],
  },
  {
    legacyId: 2,
    name: "Fresh Banana",
    category: "Fruits",
    brand: "Fresh Produce",
    description:
      "Naturally sweet bananas that are perfect for breakfast, smoothies and snacks.",
    price: 69,
    originalPrice: 85,
    unit: "1 dozen",
    stock: 30,
    seller: "Urban Grocers",
    tags: ["Fresh", "Fruits", "Breakfast"],
  },
  {
    legacyId: 3,
    name: "Fresh Green Grapes",
    category: "Fruits",
    brand: "Fresh Produce",
    description:
      "Sweet and refreshing green grapes carefully selected for quality.",
    price: 99,
    originalPrice: 119,
    unit: "500 g",
    stock: 18,
    seller: "FreshLane Market",
    tags: ["Fresh", "Fruits"],
  },
  {
    legacyId: 4,
    name: "Fresh Guava",
    category: "Fruits",
    brand: "Fresh Produce",
    description:
      "Fresh guavas with a naturally sweet flavour and crisp texture.",
    price: 79,
    originalPrice: 79,
    unit: "1 kg",
    stock: 12,
    seller: "Green Basket Mart",
    tags: ["Fresh", "Fruits"],
  },
  {
    legacyId: 5,
    name: "Alphonso Mango",
    category: "Fruits",
    brand: "Fresh Produce",
    description:
      "Premium quality mangoes with rich flavour and naturally sweet pulp.",
    price: 249,
    originalPrice: 299,
    unit: "1 kg",
    stock: 9,
    seller: "Harvest & Co.",
    tags: ["Premium", "Fresh", "Seasonal"],
  },
  {
    legacyId: 6,
    name: "Fresh Orange",
    category: "Fruits",
    brand: "Fresh Produce",
    description:
      "Juicy fresh oranges packed with natural flavour and refreshing citrus.",
    price: 89,
    originalPrice: 99,
    unit: "1 kg",
    stock: 20,
    seller: "The Daily Basket",
    tags: ["Fresh", "Citrus", "Fruits"],
  },
  {
    legacyId: 7,
    name: "Fresh Pineapple",
    category: "Fruits",
    brand: "Fresh Produce",
    description:
      "Fresh tropical pineapple with a naturally sweet and tangy taste.",
    price: 89,
    originalPrice: 89,
    unit: "1 pc",
    stock: 14,
    seller: "Green Basket Mart",
    tags: ["Fresh", "Tropical", "Fruits"],
  },
  {
    legacyId: 8,
    name: "Fresh Watermelon",
    category: "Fruits",
    brand: "Fresh Produce",
    description:
      "Refreshing watermelon with high natural water content and sweet flavour.",
    price: 59,
    originalPrice: 69,
    unit: "1 kg",
    stock: 0,
    seller: "FreshLane Market",
    tags: ["Fresh", "Summer", "Fruits"],
  },

  {
    legacyId: 9,
    name: "Fresh Potato",
    category: "Vegetables",
    brand: "Fresh Produce",
    description:
      "Fresh everyday potatoes suitable for curries, fries and home cooking.",
    price: 39,
    originalPrice: 45,
    unit: "1 kg",
    stock: 45,
    seller: "Urban Grocers",
    tags: ["Fresh", "Vegetables", "Staples"],
  },
  {
    legacyId: 10,
    name: "Fresh Onion",
    category: "Vegetables",
    brand: "Fresh Produce",
    description:
      "Fresh onions with balanced flavour for everyday Indian cooking.",
    price: 42,
    originalPrice: 49,
    unit: "1 kg",
    stock: 40,
    seller: "The Daily Basket",
    tags: ["Fresh", "Vegetables"],
  },
  {
    legacyId: 11,
    name: "Fresh Tomato",
    category: "Vegetables",
    brand: "Fresh Produce",
    description:
      "Bright and juicy tomatoes selected for freshness and daily cooking.",
    price: 49,
    originalPrice: 55,
    unit: "1 kg",
    stock: 35,
    seller: "Green Basket Mart",
    tags: ["Fresh", "Vegetables"],
  },
  {
    legacyId: 12,
    name: "Fresh Carrot",
    category: "Vegetables",
    brand: "Fresh Produce",
    description:
      "Crunchy fresh carrots suitable for salads, cooking and healthy snacks.",
    price: 55,
    originalPrice: 65,
    unit: "500 g",
    stock: 22,
    seller: "FreshLane Market",
    tags: ["Fresh", "Healthy", "Vegetables"],
  },
  {
    legacyId: 13,
    name: "Fresh Cabbage",
    category: "Vegetables",
    brand: "Fresh Produce",
    description:
      "Fresh crisp cabbage ideal for salads, stir-fries and everyday cooking.",
    price: 35,
    originalPrice: 35,
    unit: "1 pc",
    stock: 16,
    seller: "Green Basket Mart",
    tags: ["Fresh", "Vegetables"],
  },
  {
    legacyId: 14,
    name: "Fresh Cauliflower",
    category: "Vegetables",
    brand: "Fresh Produce",
    description:
      "Fresh cauliflower with firm florets, perfect for curries and snacks.",
    price: 59,
    originalPrice: 69,
    unit: "1 pc",
    stock: 11,
    seller: "Harvest & Co.",
    tags: ["Fresh", "Vegetables"],
  },
  {
    legacyId: 15,
    name: "Fresh Spinach",
    category: "Vegetables",
    brand: "Fresh Produce",
    description:
      "Fresh leafy spinach harvested for everyday healthy meals.",
    price: 29,
    originalPrice: 35,
    unit: "250 g",
    stock: 8,
    seller: "Green Basket Mart",
    tags: ["Fresh", "Leafy Greens", "Healthy"],
  },
  {
    legacyId: 16,
    name: "Fresh Green Capsicum",
    category: "Vegetables",
    brand: "Fresh Produce",
    description:
      "Crisp green capsicum with a mild flavour for pizzas, curries and stir-fries.",
    price: 69,
    originalPrice: 79,
    unit: "500 g",
    stock: 0,
    seller: "FreshLane Market",
    tags: ["Fresh", "Vegetables"],
  },

  {
    legacyId: 17,
    name: "Amul Taaza Milk",
    category: "Dairy",
    brand: "Amul",
    description:
      "Fresh and wholesome milk from Amul for everyday family consumption.",
    price: 68,
    originalPrice: 75,
    unit: "1 L",
    stock: 18,
    seller: "The Daily Basket",
    tags: ["Amul", "Milk", "Dairy"],
  },
  {
    legacyId: 18,
    name: "Amul Butter",
    category: "Dairy",
    brand: "Amul",
    description:
      "Creamy Amul butter suitable for toast, cooking and baking.",
    price: 58,
    originalPrice: 60,
    unit: "100 g",
    stock: 25,
    seller: "Urban Grocers",
    tags: ["Amul", "Butter", "Dairy"],
  },
  {
    legacyId: 19,
    name: "Amul Cheese Cubes",
    category: "Dairy",
    brand: "Amul",
    description:
      "Smooth and creamy cheese cubes perfect for sandwiches and snacks.",
    price: 125,
    originalPrice: 135,
    unit: "200 g",
    stock: 14,
    seller: "Harvest & Co.",
    tags: ["Amul", "Cheese", "Dairy"],
  },
  {
    legacyId: 20,
    name: "Fresh Curd",
    category: "Dairy",
    brand: "Local Dairy",
    description:
      "Fresh creamy curd prepared for everyday meals and refreshing snacks.",
    price: 55,
    originalPrice: 55,
    unit: "400 g",
    stock: 20,
    seller: "Green Basket Mart",
    tags: ["Fresh", "Dairy"],
  },
  {
    legacyId: 21,
    name: "Fresh Paneer",
    category: "Dairy",
    brand: "Local Dairy",
    description:
      "Soft fresh paneer suitable for curries, wraps and homemade dishes.",
    price: 115,
    originalPrice: 125,
    unit: "200 g",
    stock: 10,
    seller: "FreshLane Market",
    tags: ["Fresh", "Paneer", "Dairy"],
  },
  {
    legacyId: 22,
    name: "Farm Fresh Eggs",
    category: "Dairy",
    brand: "Farm Fresh",
    description:
      "Farm fresh eggs carefully packed for safe and convenient delivery.",
    price: 95,
    originalPrice: 110,
    unit: "12 pcs",
    stock: 20,
    seller: "The Daily Basket",
    tags: ["Fresh", "Eggs", "Protein"],
  },

  {
    legacyId: 23,
    name: "Harvest Gold White Bread",
    category: "Bakery",
    brand: "Harvest Gold",
    description:
      "Soft and fresh white bread ideal for breakfast and quick snacks.",
    price: 55,
    originalPrice: 65,
    unit: "400 g",
    stock: 15,
    seller: "Urban Grocers",
    tags: ["Bread", "Bakery"],
  },
  {
    legacyId: 24,
    name: "Harvest Gold Brown Bread",
    category: "Bakery",
    brand: "Harvest Gold",
    description:
      "Soft brown bread made for wholesome everyday breakfasts and sandwiches.",
    price: 58,
    originalPrice: 65,
    unit: "400 g",
    stock: 12,
    seller: "The Daily Basket",
    tags: ["Bread", "Bakery", "Healthy"],
  },
  {
    legacyId: 25,
    name: "Fresh Burger Buns",
    category: "Bakery",
    brand: "Local Bakery",
    description:
      "Soft burger buns perfect for homemade burgers and sandwiches.",
    price: 45,
    originalPrice: 50,
    unit: "4 pcs",
    stock: 9,
    seller: "FreshLane Market",
    tags: ["Bakery", "Buns"],
  },
  {
    legacyId: 26,
    name: "Butter Cookies",
    category: "Bakery",
    brand: "Sunfeast",
    description:
      "Crispy buttery cookies perfect with tea, coffee or as an everyday snack.",
    price: 65,
    originalPrice: 70,
    unit: "150 g",
    stock: 25,
    seller: "Green Basket Mart",
    tags: ["Cookies", "Bakery", "Snacks"],
  },
  {
    legacyId: 27,
    name: "Fresh Pav",
    category: "Bakery",
    brand: "Local Bakery",
    description:
      "Soft fresh pav ideal for pav bhaji, sandwiches and evening snacks.",
    price: 35,
    originalPrice: 35,
    unit: "6 pcs",
    stock: 0,
    seller: "FreshLane Market",
    tags: ["Bakery", "Fresh"],
  },

  {
    legacyId: 28,
    name: "Lay's Classic Salted Chips",
    category: "Snacks",
    brand: "Lay's",
    description:
      "Classic crispy salted potato chips with a light and crunchy texture.",
    price: 20,
    originalPrice: 25,
    unit: "52 g",
    stock: 40,
    seller: "The Daily Basket",
    tags: ["Lay's", "Chips", "Snacks"],
  },
  {
    legacyId: 29,
    name: "Bingo Tedhe Medhe",
    category: "Snacks",
    brand: "Bingo",
    description:
      "Crunchy and flavourful snack perfect for movie nights and casual munching.",
    price: 20,
    originalPrice: 20,
    unit: "90 g",
    stock: 32,
    seller: "Urban Grocers",
    tags: ["Bingo", "Snacks"],
  },
  {
    legacyId: 30,
    name: "Kurkure Masala Munch",
    category: "Snacks",
    brand: "Kurkure",
    description:
      "Crunchy masala snack with a bold Indian flavour.",
    price: 20,
    originalPrice: 25,
    unit: "90 g",
    stock: 28,
    seller: "Green Basket Mart",
    tags: ["Kurkure", "Snacks"],
  },
  {
    legacyId: 31,
    name: "Doritos Nacho Cheese",
    category: "Snacks",
    brand: "Doritos",
    description:
      "Crunchy tortilla chips with a rich nacho cheese flavour.",
    price: 49,
    originalPrice: 55,
    unit: "100 g",
    stock: 18,
    seller: "Harvest & Co.",
    tags: ["Doritos", "Nachos", "Snacks"],
  },
  {
    legacyId: 32,
    name: "Classic Salted Popcorn",
    category: "Snacks",
    brand: "Local Snacks",
    description:
      "Light and crispy salted popcorn for quick snacking.",
    price: 45,
    originalPrice: 45,
    unit: "100 g",
    stock: 15,
    seller: "FreshLane Market",
    tags: ["Popcorn", "Snacks"],
  },

  {
    legacyId: 33,
    name: "Tropicana Orange Juice",
    category: "Beverages",
    brand: "Tropicana",
    description:
      "Refreshing orange juice with a delicious citrus flavour.",
    price: 135,
    originalPrice: 160,
    unit: "1 L",
    stock: 16,
    seller: "The Daily Basket",
    tags: ["Tropicana", "Juice", "Beverages"],
  },
  {
    legacyId: 34,
    name: "Coca-Cola Original Taste",
    category: "Beverages",
    brand: "Coca-Cola",
    description:
      "Classic chilled Coca-Cola soft drink for refreshing moments.",
    price: 45,
    originalPrice: 45,
    unit: "750 ml",
    stock: 25,
    seller: "Urban Grocers",
    tags: ["Coca-Cola", "Soft Drink"],
  },
  {
    legacyId: 35,
    name: "Pepsi",
    category: "Beverages",
    brand: "Pepsi",
    description:
      "Refreshing Pepsi soft drink with a bold cola flavour.",
    price: 45,
    originalPrice: 50,
    unit: "750 ml",
    stock: 30,
    seller: "Green Basket Mart",
    tags: ["Pepsi", "Soft Drink"],
  },
  {
    legacyId: 36,
    name: "Sprite",
    category: "Beverages",
    brand: "Sprite",
    description:
      "Crisp lemon-lime soft drink with a refreshing taste.",
    price: 45,
    originalPrice: 45,
    unit: "750 ml",
    stock: 22,
    seller: "FreshLane Market",
    tags: ["Sprite", "Soft Drink"],
  },
  {
    legacyId: 37,
    name: "Red Bull Energy Drink",
    category: "Beverages",
    brand: "Red Bull",
    description:
      "Chilled energy drink for convenient on-the-go refreshment.",
    price: 125,
    originalPrice: 125,
    unit: "250 ml",
    stock: 0,
    seller: "Harvest & Co.",
    tags: ["Red Bull", "Beverages"],
  },

  {
    legacyId: 38,
    name: "Dove Nourishing Shampoo",
    category: "Personal Care",
    brand: "Dove",
    description:
      "Nourishing shampoo designed for everyday hair care.",
    price: 249,
    originalPrice: 299,
    unit: "340 ml",
    stock: 12,
    seller: "The Daily Basket",
    tags: ["Dove", "Shampoo", "Personal Care"],
  },
  {
    legacyId: 39,
    name: "Dove Cream Beauty Bar",
    category: "Personal Care",
    brand: "Dove",
    description:
      "Gentle cleansing beauty bar suitable for everyday personal care.",
    price: 55,
    originalPrice: 65,
    unit: "100 g",
    stock: 24,
    seller: "Urban Grocers",
    tags: ["Dove", "Soap", "Personal Care"],
  },
  {
    legacyId: 40,
    name: "Colgate Strong Teeth Toothpaste",
    category: "Personal Care",
    brand: "Colgate",
    description:
      "Everyday fluoride toothpaste for complete family oral care.",
    price: 99,
    originalPrice: 110,
    unit: "200 g",
    stock: 31,
    seller: "Green Basket Mart",
    tags: ["Colgate", "Toothpaste"],
  },
  {
    legacyId: 41,
    name: "Gentle Daily Face Wash",
    category: "Personal Care",
    brand: "Everyday Care",
    description:
      "Gentle everyday face wash for a clean and refreshed feeling.",
    price: 159,
    originalPrice: 179,
    unit: "100 ml",
    stock: 15,
    seller: "FreshLane Market",
    tags: ["Face Care", "Personal Care"],
  },
  {
    legacyId: 42,
    name: "Dettol Hand Wash",
    category: "Personal Care",
    brand: "Dettol",
    description:
      "Daily hand wash designed for clean and hygienic hands.",
    price: 99,
    originalPrice: 110,
    unit: "250 ml",
    stock: 20,
    seller: "The Daily Basket",
    tags: ["Dettol", "Hand Wash", "Personal Care"],
  },

  {
    legacyId: 43,
    name: "Surf Excel Matic",
    category: "Household",
    brand: "Surf Excel",
    description:
      "Powerful laundry detergent for effective everyday cleaning.",
    price: 249,
    originalPrice: 279,
    unit: "1 kg",
    stock: 14,
    seller: "Urban Grocers",
    tags: ["Surf Excel", "Laundry", "Household"],
  },
  {
    legacyId: 44,
    name: "Ariel Matic Detergent",
    category: "Household",
    brand: "Ariel",
    description:
      "Powerful detergent designed to remove tough everyday stains.",
    price: 259,
    originalPrice: 289,
    unit: "1 kg",
    stock: 11,
    seller: "The Daily Basket",
    tags: ["Ariel", "Laundry", "Household"],
  },
  {
    legacyId: 45,
    name: "Harpic Bathroom Cleaner",
    category: "Household",
    brand: "Harpic",
    description:
      "Bathroom cleaning solution for maintaining a fresh and hygienic space.",
    price: 95,
    originalPrice: 105,
    unit: "500 ml",
    stock: 17,
    seller: "Green Basket Mart",
    tags: ["Harpic", "Cleaning", "Household"],
  },
  {
    legacyId: 46,
    name: "Lizol Floor Cleaner",
    category: "Household",
    brand: "Lizol",
    description:
      "Everyday floor cleaner for a clean and fresh home.",
    price: 129,
    originalPrice: 129,
    unit: "1 L",
    stock: 13,
    seller: "FreshLane Market",
    tags: ["Lizol", "Floor Cleaner", "Household"],
  },

  {
    legacyId: 47,
    name: "Aashirvaad Atta",
    category: "Staples",
    brand: "Aashirvaad",
    description:
      "Quality whole wheat flour suitable for soft everyday rotis and parathas.",
    price: 259,
    originalPrice: 285,
    unit: "5 kg",
    stock: 18,
    seller: "The Daily Basket",
    tags: ["Aashirvaad", "Atta", "Staples"],
  },
  {
    legacyId: 48,
    name: "Fortune Sunflower Oil",
    category: "Staples",
    brand: "Fortune",
    description:
      "Light cooking oil suitable for everyday Indian meals.",
    price: 149,
    originalPrice: 165,
    unit: "1 L",
    stock: 16,
    seller: "Urban Grocers",
    tags: ["Fortune", "Cooking Oil", "Staples"],
  },
  {
    legacyId: 49,
    name: "India Gate Basmati Rice",
    category: "Staples",
    brand: "India Gate",
    description:
      "Premium long-grain basmati rice suitable for everyday meals and special dishes.",
    price: 349,
    originalPrice: 399,
    unit: "5 kg",
    stock: 9,
    seller: "Harvest & Co.",
    tags: ["Rice", "Basmati", "Staples"],
  },
  {
    legacyId: 50,
    name: "Tata Salt",
    category: "Staples",
    brand: "Tata",
    description:
      "Everyday iodised salt from Tata for regular home cooking.",
    price: 28,
    originalPrice: 28,
    unit: "1 kg",
    stock: 35,
    seller: "Green Basket Mart",
    tags: ["Tata", "Salt", "Staples"],
  },
];

const storeDetails = {
  "The Daily Basket": {
    area: "Local Market",
    type: "Grocery & Essentials",
    rating: 4.8,
    reviews: 428,
    deliveryTime: 18,
    deliveryLabel: "15–20 min",
    deliveryFee: 0,
    featured: true,
    tags: ["Daily Essentials", "Dairy", "Snacks"],
  },

  "Urban Grocers": {
    area: "Main Market",
    type: "Groceries & Household",
    rating: 4.7,
    reviews: 312,
    deliveryTime: 22,
    deliveryLabel: "20–25 min",
    deliveryFee: 0,
    featured: false,
    tags: ["Groceries", "Household", "Beverages"],
  },

  "FreshLane Market": {
    area: "Neighbourhood Market",
    type: "Everyday Grocery",
    rating: 4.6,
    reviews: 267,
    deliveryTime: 26,
    deliveryLabel: "25–30 min",
    deliveryFee: 20,
    featured: false,
    tags: ["Staples", "Personal Care", "Snacks"],
  },

  "Harvest & Co.": {
    area: "Central Market",
    type: "Fresh Produce & Grocery",
    rating: 4.9,
    reviews: 521,
    deliveryTime: 24,
    deliveryLabel: "20–30 min",
    deliveryFee: 0,
    featured: false,
    tags: ["Fruits", "Vegetables", "Groceries"],
  },

  "Everyday Market": {
    area: "City Centre",
    type: "Supermarket & Essentials",
    rating: 4.5,
    reviews: 194,
    deliveryTime: 32,
    deliveryLabel: "30–35 min",
    deliveryFee: 25,
    featured: false,
    tags: ["Grocery", "Home Care", "Personal Care"],
  },

  "Green Basket Mart": {
    area: "Model Town",
    type: "Fresh Grocery & Essentials",
    rating: 4.7,
    reviews: 356,
    deliveryTime: 16,
    deliveryLabel: "15–20 min",
    deliveryFee: 10,
    featured: false,
    tags: ["Fresh Produce", "Dairy", "Essentials"],
  },
};

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function getOrCreateVendor(storeName) {
  const email = `seed-${slugify(storeName)}@localmart.dev`;

  let vendor = await User.findOne({ email });

  if (!vendor) {
    const hashedPassword = await bcrypt.hash(
      "LocalMartSeed@123",
      10
    );

    vendor = await User.create({
      name: `${storeName} Vendor`,
      email,
      password: hashedPassword,
      role: "vendor",
      phone: null,
      storeId: null,
    });
  }

  let store = await Store.findOne({
    name: storeName,
  });

  if (!store) {
    const details = storeDetails[storeName];

    store = await Store.create({
      name: storeName,
      area: details.area,
      type: details.type,
      ownerId: vendor._id,
      rating: details.rating,
      reviews: details.reviews,
      deliveryTime: details.deliveryTime,
      deliveryLabel: details.deliveryLabel,
      deliveryFee: details.deliveryFee,
      isOpen: true,
      featured: details.featured,
      tags: details.tags,
    });
  }

  vendor.storeId = store._id;
  await vendor.save();

  return {
    vendor,
    store,
  };
}

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    const sellerNames = [
      ...new Set(
        products.map((product) => product.seller)
      ),
    ];

    const sellerMap = {};

    for (const seller of sellerNames) {
      sellerMap[seller] =
        await getOrCreateVendor(seller);
    }

    let created = 0;
    let updated = 0;

    for (const productData of products) {
      const {
        seller,
        ...product
      } = productData;

      const {
        vendor,
        store,
      } = sellerMap[seller];

      const existingProduct =
        await Product.findOne({
          legacyId: product.legacyId,
        });

      if (existingProduct) {
        await Product.updateOne(
          {
            legacyId: product.legacyId,
          },
          {
            ...product,
            storeId: store._id,
            vendorId: vendor._id,
            image: null,
            isAvailable:
              product.stock > 0,
          }
        );

        updated++;
      } else {
        await Product.create({
          ...product,
          storeId: store._id,
          vendorId: vendor._id,
          image: null,
          isAvailable:
            product.stock > 0,
        });

        created++;
      }
    }

    console.log(
      `Products processed: ${products.length}`
    );

    console.log(
      `Created: ${created}`
    );

    console.log(
      `Updated: ${updated}`
    );

    console.log(
      "Product seeding completed successfully!"
    );
  } catch (error) {
    console.error(
      "Product seeding failed:",
      error
    );
  } finally {
    await mongoose.connection.close();
  }
}

seedProducts();