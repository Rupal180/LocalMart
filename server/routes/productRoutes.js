const express = require("express");

const {
  addProduct,
  getVendorProducts,
  getAllProducts,
} = require("../controllers/productController");

const router = express.Router();

// Add product
router.post("/", addProduct);

// Get all available products
router.get("/", getAllProducts);

// Get products of a specific vendor/store
router.get("/vendor/:vendorId", getVendorProducts);

module.exports = router;