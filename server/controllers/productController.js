const Product = require("../models/Product");
const User = require("../models/User");
const Store = require("../models/Store");

// ==================== FIND VENDOR ====================

const findVendor = async (vendorId, vendorEmail) => {
  // First try MongoDB ObjectId
  if (vendorId) {
    try {
      const vendor = await User.findById(vendorId);

      if (vendor) {
        return vendor;
      }
    } catch (error) {
      // Ignore invalid ObjectId and try email
    }
  }

  // If ID is old/local ID, find vendor using email
  if (vendorEmail) {
    const vendor = await User.findOne({
      email: vendorEmail.trim().toLowerCase(),
    });

    return vendor;
  }

  return null;
};

// ==================== ADD PRODUCT ====================

const addProduct = async (req, res) => {
  try {
    const {
      vendorId,
      vendorEmail,
      name,
      category,
      brand,
      description,
      price,
      originalPrice,
      unit,
      stock,
      image,
      tags,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !category ||
      price === undefined ||
      price === null
    ) {
      return res.status(400).json({
        message:
          "Product name, category and price are required",
      });
    }

    if (!vendorId && !vendorEmail) {
      return res.status(400).json({
        message: "Vendor information is required",
      });
    }

    // Find vendor
    const vendor = await findVendor(
      vendorId,
      vendorEmail
    );

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    // Check vendor role
    if (vendor.role !== "vendor") {
      return res.status(403).json({
        message: "Only vendors can add products",
      });
    }

    // Vendor must have a store
    if (!vendor.storeId) {
      return res.status(400).json({
        message: "Vendor does not have a store",
      });
    }

    // Check store
    const store = await Store.findById(
      vendor.storeId
    );

    if (!store) {
      return res.status(404).json({
        message: "Vendor store not found",
      });
    }

    // Convert stock
    const stockValue =
      stock !== undefined && stock !== null
        ? Number(stock)
        : 0;

    // Create product
    const product = await Product.create({
      name: name.trim(),

      category: category.trim(),

      brand: brand
        ? brand.trim()
        : "",

      description: description
        ? description.trim()
        : "",

      price: Number(price),

      originalPrice:
        originalPrice !== undefined &&
        originalPrice !== null &&
        originalPrice !== ""
          ? Number(originalPrice)
          : null,

      unit: unit
        ? unit.trim()
        : "",

      stock: stockValue,

      image: image || null,

      storeId: vendor.storeId,

      vendorId: vendor._id,

      isAvailable:
        stockValue > 0,

      tags:
        Array.isArray(tags)
          ? tags
          : [],
    });

    res.status(201).json({
      message:
        "Product added successfully",

      product,
    });
  } catch (error) {
    console.error(
      "Add product error:",
      error
    );

    res.status(500).json({
      message:
        "Server error while adding product",
    });
  }
};

// ==================== GET VENDOR PRODUCTS ====================

const getVendorProducts = async (req, res) => {
  try {
    const { vendorId } = req.params;

    let vendor = null;

    // Try MongoDB ObjectId
    try {
      vendor = await User.findById(
        vendorId
      );
    } catch (error) {
      // Invalid ObjectId
    }

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    if (vendor.role !== "vendor") {
      return res.status(403).json({
        message:
          "Only vendors can access vendor products",
      });
    }

    if (!vendor.storeId) {
      return res.status(400).json({
        message:
          "Vendor does not have a store",
      });
    }

    const products =
      await Product.find({
        storeId: vendor.storeId,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(
      "Get vendor products error:",
      error
    );

    res.status(500).json({
      message:
        "Server error while fetching vendor products",
    });
  }
};

// ==================== GET ALL PRODUCTS ====================

const getAllProducts = async (req, res) => {
  try {
    const products =
      await Product.find({
        isAvailable: true,
        stock: { $gt: 0 },
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(
      "Get all products error:",
      error
    );

    res.status(500).json({
      message:
        "Server error while fetching products",
    });
  }
};

module.exports = {
  addProduct,
  getVendorProducts,
  getAllProducts,
};