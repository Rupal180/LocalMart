const express = require("express");

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/:userId", getCart);

router.post("/add", addToCart);

router.put("/:userId/:productId", updateCartItem);

router.delete("/:userId/:productId", removeFromCart);

router.delete("/:userId", clearCart);

module.exports = router;