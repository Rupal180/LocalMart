const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ==================== GET CART ====================

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOne({
      userId,
    }).populate("items.productId");

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
      });
    }

    res.status(200).json({
      cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);

    res.status(500).json({
      message: "Server error while fetching cart",
    });
  }
};

// ==================== ADD TO CART ====================

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "User ID and product ID are required",
      });
    }

    // Find product using MongoDB _id OR old frontend legacyId
    let product;

    if (mongoose.Types.ObjectId.isValid(productId)) {
      product = await Product.findById(productId);
    } else if (!Number.isNaN(Number(productId))) {
      product = await Product.findOne({
        legacyId: Number(productId),
      });
    } else {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (!product.isAvailable || product.stock <= 0) {
      return res.status(400).json({
        message: "Product is out of stock",
      });
    }

    const addQuantity = Number(quantity) || 1;

    let cart = await Cart.findOne({
      userId,
    });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    // Always use MongoDB product _id inside cart
    const mongoProductId = product._id;

    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === mongoProductId.toString()
    );

    if (existingItem) {
      existingItem.quantity += addQuantity;
    } else {
      cart.items.push({
        productId: mongoProductId,
        quantity: addQuantity,
      });
    }

    await cart.save();

    cart = await cart.populate("items.productId");

    res.status(200).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    res.status(500).json({
      message: "Server error while adding product to cart",
    });
  }
};

// ==================== UPDATE CART ITEM ====================

const updateCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const newQuantity = Number(quantity);

    if (!newQuantity || newQuantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({
      userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) =>
        item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    item.quantity = newQuantity;

    await cart.save();

    const updatedCart = await cart.populate("items.productId");

    res.status(200).json({
      message: "Cart updated",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Update cart error:", error);

    res.status(500).json({
      message: "Server error while updating cart",
    });
  }
};

// ==================== REMOVE FROM CART ====================

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({
      userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.productId.toString() !== productId
    );

    await cart.save();

    const updatedCart = await cart.populate("items.productId");

    res.status(200).json({
      message: "Product removed from cart",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);

    res.status(500).json({
      message: "Server error while removing product from cart",
    });
  }
};

// ==================== CLEAR CART ====================

const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({
      userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      message: "Cart cleared",
      cart,
    });
  } catch (error) {
    console.error("Clear cart error:", error);

    res.status(500).json({
      message: "Server error while clearing cart",
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};