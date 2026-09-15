const User = require("../models/User");
const Store = require("../models/Store");
const bcrypt = require("bcryptjs");

// ==================== SIGNUP ====================

const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      storeName,
      storeArea,
      storeType,
    } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    // If vendor, store information is required
    if (role === "vendor") {
      if (!storeName || !storeArea || !storeType) {
        return res.status(400).json({
          message:
            "Store name, store area and store type are required for vendors",
        });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user first
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: role === "vendor" ? "vendor" : "customer",
      phone: phone || null,
      storeId: null,
    });

    // Create store for vendor
    let newStore = null;

    if (role === "vendor") {
        console.log("VENDOR STORE CREATION STARTED");
      newStore = await Store.create({
        name: storeName.trim(),
        area: storeArea.trim(),
        type: storeType.trim(),
        ownerId: newUser._id,
      });

      // Connect store with vendor
      newUser.storeId = newStore._id;
      await newUser.save();
    }

    // Safe response
    res.status(201).json({
      message: "User registered successfully",

      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        storeId: newUser.storeId,
        createdAt: newUser.createdAt,
      },

      store: newStore
        ? {
            id: newStore._id,
            name: newStore.name,
            area: newStore.area,
            type: newStore.type,
            ownerId: newStore.ownerId,
          }
        : null,
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Server error during signup",
    });
  }
};

// ==================== LOGIN ====================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Safe response
    res.status(200).json({
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        storeId: user.storeId,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error during login",
    });
  }
};

module.exports = {
  signup,
  login,
};