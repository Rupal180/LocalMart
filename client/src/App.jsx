import { useEffect, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import Categories from "./components/Categories/Categories";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import AllProducts from "./components/AllProducts/AllProducts";

import NearbyStores from "./components/NearbyStores/NearbyStores";
import StoreDetails from "./components/StoreDetails/StoreDetails";
import PriceComparison from "./components/PriceComparison/PriceComparison";

import { stores, getStoreById } from "./data/stores";
import productsData from "./data/products";

import OfferBanner from "./components/OfferBanner/OfferBanner";
import Brands from "./components/Brands/Brands";
import WhyChoose from "./components/WhyChoose/WhyChoose";
import Reviews from "./components/Reviews/Reviews";
import MobileApp from "./components/MobileApp/MobileApp";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer/WishlistDrawer";
import Toast from "./components/Toast/Toast";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import LocationSelector from "./components/LocationSelector/LocationSelector";
import Checkout from "./components/Checkout/Checkout";
import OrderSuccess from "./components/OrderSuccess/OrderSuccess";
import MyOrders from "./components/MyOrders/MyOrders";
import OrderTracking from "./components/OrderTracking/OrderTracking";
import OrderDetails from "./components/OrderDetails/OrderDetails";

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import VendorDashboard from "./components/VendorDashboard/VendorDashboard";


function App() {

  /* =========================================
              CURRENT USER
========================================= */

const [currentUser, setCurrentUser] = useState(() => {
  try {
    const savedUser = localStorage.getItem(
      "localMartCurrentUser"
    );

    return savedUser
      ? JSON.parse(savedUser)
      : null;

  } catch (error) {
    console.error(
      "Could not load logged in user:",
      error
    );

    return null;
  }
});


/* =========================================
              PRODUCTS
========================================= */

const [products, setProducts] = useState(() => {
  try {
    const savedProducts = localStorage.getItem(
      "localMartProducts"
    );

    return savedProducts
      ? JSON.parse(savedProducts)
      : productsData;

  } catch (error) {
    console.error(
      "Could not load products:",
      error
    );

    return productsData;
  }
});

useEffect(() => {
    localStorage.setItem(
      "localMartProducts",
      JSON.stringify(products)
    );
  }, [products]);

  /* =========================================
                    CART
  ========================================= */

  const [cart, setCart] = useState([]);

  const currentUserId = currentUser?.id;

  /* =========================================
                LOAD CART FROM BACKEND
  ========================================= */

  useEffect(() => {
    const fetchCart = async () => {
      if (!currentUserId) {
        setCart([]);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/cart/${currentUserId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch cart");
        }

        const formattedCart = (data.cart?.items || [])
          .filter((item) => item.productId)
          .map((item) => {
            const mongoProduct = item.productId;

            // MongoDB products have no Vite image URL.
            // Recover the original frontend image using legacyId/name.
            const matchingProduct = productsData.find(
              (product) =>
                (
                  mongoProduct.legacyId !== undefined &&
                  Number(product.id) === Number(mongoProduct.legacyId)
                ) ||
                product.name === mongoProduct.name
            );

            return {
              ...mongoProduct,
              id: mongoProduct._id,
              quantity: item.quantity,
              image:
                mongoProduct.image ||
                matchingProduct?.image ||
                null,
            };
          });

        setCart(formattedCart);
      } catch (error) {
        console.error("Fetch cart error:", error);
      }
    };

    fetchCart();
  }, [currentUserId]);


  /* =========================================
                  WISHLIST
  ========================================= */

  const [wishlist, setWishlist] = useState([]);


  /* =========================================
                    ORDERS
  ========================================= */

  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders =
        localStorage.getItem("localmart-orders");

      if (!savedOrders) {
        return [];
      }

      const savedOrdersData = JSON.parse(savedOrders);

      return savedOrdersData.map((order) => ({
        ...order,
        items: (order.items || []).map((item) => {
          const matchingProduct = productsData.find(
            (product) =>
              product.name === item.name ||
              (
                item.id !== undefined &&
                !Number.isNaN(Number(item.id)) &&
                Number(product.id) === Number(item.id)
              )
          );

          return {
            ...item,
            image:
              item.image ||
              matchingProduct?.image ||
              null,
          };
        }),
      }));
    } catch (error) {
      console.error(
        "Could not load LocalMart orders:",
        error
      );

      return [];
    }
  });


  /* =========================================
                    LOCATION
  ========================================= */

  const [selectedLocation, setSelectedLocation] =
    useState(() => {

      try {

        const savedLocation =
          localStorage.getItem(
            "localmart-location"
          );

        return savedLocation
          ? JSON.parse(savedLocation)
          : null;

      } catch (error) {

        console.error(
          "Could not load saved location:",
          error
        );

        return null;

      }

    });


  const [isLocationOpen, setIsLocationOpen] =
    useState(false);


  /* =========================================
                  SELECTED ORDER
  ========================================= */

  const [latestOrder, setLatestOrder] =
    useState(null);


  /* =========================================
                  CURRENT PAGE
  ========================================= */

  const [currentPage, setCurrentPage] =
    useState(() => {
      try {
        const savedUser = localStorage.getItem(
          "localMartCurrentUser"
        );

        if (savedUser) {
          const user = JSON.parse(savedUser);

          if (user?.role === "vendor") {
            return "vendor-dashboard";
          }
        }

        return "home";
      } catch (error) {
        console.error(
          "Could not determine initial page:",
          error
        );

        return "home";
      }
    });


  /* =========================================
                    SEARCH
  ========================================= */

  const [searchQuery, setSearchQuery] =
    useState("");


  /* =========================================
                ALL PRODUCTS PAGE
  ========================================= */

  const handleOpenAllProducts = () => {

    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsProductOpen(false);
    setIsLocationOpen(false);
    setIsPriceComparisonOpen(false);

    setCurrentPage("all-products");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
                    SEARCH
  ========================================= */

  const handleNavbarSearch = (value) => {

    setSearchQuery(value);

    if (!value.trim()) {
      return;
    }

    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsProductOpen(false);
    setIsLocationOpen(false);
    setIsPriceComparisonOpen(false);

    if (currentPage !== "all-products") {

      setCurrentPage("all-products");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }

  };


  const handleClearNavbarSearch = () => {

    setSearchQuery("");
    setCurrentPage("home");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
                  SELECTED STORE
  ========================================= */

  const [selectedStore, setSelectedStore] =
    useState(null);


  /* =========================================
                PRICE COMPARISON
  ========================================= */

  const [
    comparisonProduct,
    setComparisonProduct,
  ] = useState(null);

  const [
    isPriceComparisonOpen,
    setIsPriceComparisonOpen,
  ] = useState(false);


  /* =========================================
                    DRAWERS
  ========================================= */

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const [isWishlistOpen, setIsWishlistOpen] =
    useState(false);


  /* =========================================
                PRODUCT DETAILS
  ========================================= */

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [isProductOpen, setIsProductOpen] =
    useState(false);

  const [productQuantity, setProductQuantity] =
    useState(1);


  /* =========================================
                    TOAST
  ========================================= */

  const [toast, setToast] = useState({
    show: false,
    message: "",
    description: "",
    type: "success",
  });


  /* =========================================
                  SAVE ORDERS
  ========================================= */

  useEffect(() => {

    try {

      localStorage.setItem(
        "localmart-orders",
        JSON.stringify(orders)
      );

    } catch (error) {

      console.error(
        "Could not save LocalMart orders:",
        error
      );

    }

  }, [orders]);


  /* =========================================
                SAVE LOCATION
  ========================================= */

  useEffect(() => {

    try {

      if (selectedLocation) {

        localStorage.setItem(
          "localmart-location",
          JSON.stringify(selectedLocation)
        );

      } else {

        localStorage.removeItem(
          "localmart-location"
        );

      }

    } catch (error) {

      console.error(
        "Could not save LocalMart location:",
        error
      );

    }

  }, [selectedLocation]);


  /* =========================================
                  SHOW TOAST
  ========================================= */

  const showToast = (
    message,
    description,
    type = "success"
  ) => {

    setToast({
      show: true,
      message,
      description,
      type,
    });

  };


  /* =========================================
                AUTO HIDE TOAST
  ========================================= */

  useEffect(() => {

    if (!toast.show) {
      return;
    }

    const timer =
      setTimeout(() => {

        setToast(
          (previousToast) => ({
            ...previousToast,
            show: false,
          })
        );

      }, 2800);

    return () =>
      clearTimeout(timer);

  }, [toast]);

  /* =========================================
              OPEN LOGIN PAGE
  ========================================= */

  const handleOpenLogin = () => {

    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsProductOpen(false);
    setIsLocationOpen(false);
    setIsPriceComparisonOpen(false);

    setCurrentPage("login");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
              BACK FROM LOGIN
  ========================================= */

  const handleBackFromLogin = () => {

    setCurrentPage("home");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  const handleLoginSuccess = (user) => {

    setCurrentUser(user);

    localStorage.setItem(
      "localMartCurrentUser",
      JSON.stringify(user)
    );

    if (user.role === "vendor") {
      setCurrentPage("vendor-dashboard");
    } else {
      setCurrentPage("home");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
                LOGOUT
  ========================================= */

  const handleLogout = () => {

    localStorage.removeItem(
      "localMartCurrentUser"
    );

    setCurrentUser(null);

    setCurrentPage("home");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
              OPEN SIGNUP PAGE
  ========================================= */

  const handleOpenSignup = () => {

    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsProductOpen(false);
    setIsLocationOpen(false);
    setIsPriceComparisonOpen(false);

    setCurrentPage("signup");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
              BACK FROM SIGNUP
  ========================================= */

  const handleBackFromSignup = () => {

    setCurrentPage("home");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
              BACK TO LOGIN
  ========================================= */

  const handleBackToLogin = () => {

    setCurrentPage("login");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
              OPEN LOCATION SELECTOR
  ========================================= */

  const handleOpenLocation = () => {

    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsProductOpen(false);
    setIsPriceComparisonOpen(false);

    setIsLocationOpen(true);

  };


  /* =========================================
              CLOSE LOCATION SELECTOR
  ========================================= */

  const handleCloseLocation = () => {

    setIsLocationOpen(false);

  };


  /* =========================================
                SELECT LOCATION
  ========================================= */

  const handleLocationSelect = (
    location
  ) => {

    setSelectedLocation(location);

    setIsLocationOpen(false);

    if (
      location.type === "pincode"
    ) {

      showToast(
        "Delivery location updated",
        `Finding LocalMart stores near ${location.pincode}.`,
        "success"
      );

    } else {

      showToast(
        "Location detected",
        "Finding LocalMart stores near your current location.",
        "success"
      );

    }

    setCurrentPage("home");

    setTimeout(() => {

      const nearbySection =
        document.getElementById(
          "nearby-stores"
        );

      if (nearbySection) {

        nearbySection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      }

    }, 350);

  };


  /* =========================================
                    OPEN STORE
  ========================================= */

  const handleOpenStore = (store) => {

    if (!store) {
      return;
    }

    const storeId =
      typeof store === "object"
        ? store.id
        : store;

    const completeStore =
      getStoreById(storeId);

    if (!completeStore) {

      console.error(
        "LocalMart store not found:",
        storeId
      );

      return;

    }

    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsProductOpen(false);
    setIsLocationOpen(false);
    setIsPriceComparisonOpen(false);
    setComparisonProduct(null);

    setSelectedStore(completeStore);
    setCurrentPage("store-details");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
            BACK TO NEARBY STORES
  ========================================= */

  const handleBackToNearbyStores = () => {

    setIsPriceComparisonOpen(false);
    setComparisonProduct(null);

    setCurrentPage("home");

    setTimeout(() => {

      const nearbySection =
        document.getElementById(
          "nearby-stores"
        );

      if (nearbySection) {

        nearbySection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      } else {

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      }

    }, 100);

  };


  /* =========================================
              OPEN PRICE COMPARISON
  ========================================= */

  const handleComparePrice = (
    product
  ) => {

    if (!product) {
      return;
    }

    setComparisonProduct(product);
    setIsPriceComparisonOpen(true);

  };


  /* =========================================
              CLOSE PRICE COMPARISON
  ========================================= */

  const handleClosePriceComparison =
    () => {

      setIsPriceComparisonOpen(false);
      setComparisonProduct(null);

    };


  /* =========================================
       VIEW STORE FROM PRICE COMPARISON
  ========================================= */

  const handleViewComparisonStore = (
    store
  ) => {

    if (!store) {
      return;
    }

    const storeId =
      typeof store === "object"
        ? store.id
        : store;

    const completeStore =
      getStoreById(storeId);

    if (!completeStore) {

      console.error(
        "LocalMart comparison store not found:",
        storeId
      );

      return;

    }

    setIsPriceComparisonOpen(false);
    setComparisonProduct(null);
    setSelectedStore(completeStore);
    setCurrentPage("store-details");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
              OPEN PRODUCT DETAILS
  ========================================= */

  const handleOpenProduct = (
    product
  ) => {

    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsLocationOpen(false);
    setIsPriceComparisonOpen(false);

    setSelectedProduct(product);
    setProductQuantity(1);
    setIsProductOpen(true);

  };


  /* =========================================
            CLOSE PRODUCT DETAILS
  ========================================= */

  const handleCloseProduct = () => {

    setIsProductOpen(false);

  };


  /* =========================================
                  ADD TO CART
  ========================================= */

  const handleAddToCart = async (
    product,
    quantity = 1
  ) => {
    if (!product) {
      return;
    }

    if (
      product.stock !== undefined &&
      product.stock <= 0
    ) {
      showToast(
        "Currently unavailable",
        `${product.name} is out of stock.`,
        "remove"
      );
      return;
    }

    if (!currentUserId) {
      showToast(
        "Please login first",
        "You need to login before adding products to your cart.",
        "remove"
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUserId,
            productId: product.id || product._id,
            quantity,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to add product to cart"
        );
      }

      const formattedCart = (data.cart?.items || [])
        .filter((item) => item.productId)
        .map((item) => ({
          ...item.productId,
          id: item.productId._id,
          quantity: item.quantity,
        }));

      setCart(formattedCart);

      showToast(
        quantity > 1
          ? `${quantity} items added to cart`
          : "Added to your cart",
        quantity > 1
          ? `${quantity} × ${product.name} added successfully.`
          : `${product.name} from ${
              product.storeName || "LocalMart"
            } is ready to order.`,
        "cart"
      );
    } catch (error) {
      console.error("Add to cart error:", error);
      showToast(
        "Unable to add to cart",
        error.message || "Please try again.",
        "remove"
      );
    }
  };


  /* =========================================
          INCREASE CART QUANTITY
  ========================================= */

  const handleIncreaseQuantity = async (
    productId
  ) => {
    if (!currentUserId) {
      return;
    }

    const item = cart.find(
      (cartItem) => cartItem.id === productId
    );

    if (!item) {
      return;
    }

    if (
      item.stock !== undefined &&
      item.quantity >= item.stock
    ) {
      showToast(
        "Stock limit reached",
        `Only ${item.stock} units of ${item.name} are available.`,
        "remove"
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${currentUserId}/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: item.quantity + 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update cart");
      }

      const formattedCart = (data.cart?.items || [])
        .filter((cartItem) => cartItem.productId)
        .map((cartItem) => ({
          ...cartItem.productId,
          id: cartItem.productId._id,
          quantity: cartItem.quantity,
        }));

      setCart(formattedCart);
    } catch (error) {
      console.error("Increase cart quantity error:", error);
      showToast(
        "Unable to update cart",
        error.message || "Please try again.",
        "remove"
      );
    }
  };


  /* =========================================
          DECREASE CART QUANTITY
  ========================================= */

  const handleDecreaseQuantity = async (
    productId
  ) => {
    if (!currentUserId) {
      return;
    }

    const item = cart.find(
      (cartItem) => cartItem.id === productId
    );

    if (!item) {
      return;
    }

    const newQuantity = item.quantity - 1;

    if (newQuantity <= 0) {
      await handleRemoveFromCart(productId);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${currentUserId}/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: newQuantity,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update cart");
      }

      const formattedCart = (data.cart?.items || [])
        .filter((cartItem) => cartItem.productId)
        .map((cartItem) => ({
          ...cartItem.productId,
          id: cartItem.productId._id,
          quantity: cartItem.quantity,
        }));

      setCart(formattedCart);
    } catch (error) {
      console.error("Decrease cart quantity error:", error);
      showToast(
        "Unable to update cart",
        error.message || "Please try again.",
        "remove"
      );
    }
  };


  /* =========================================
              REMOVE FROM CART
  ========================================= */

  const handleRemoveFromCart = async (
    productId
  ) => {
    if (!currentUserId) {
      return;
    }

    const removedProduct = cart.find(
      (item) => item.id === productId
    );

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/${currentUserId}/${productId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to remove product");
      }

      const formattedCart = (data.cart?.items || [])
        .filter((cartItem) => cartItem.productId)
        .map((cartItem) => ({
          ...cartItem.productId,
          id: cartItem.productId._id,
          quantity: cartItem.quantity,
        }));

      setCart(formattedCart);

      if (removedProduct) {
        showToast(
          "Removed from cart",
          `${removedProduct.name} was removed.`,
          "remove"
        );
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
      showToast(
        "Unable to remove product",
        error.message || "Please try again.",
        "remove"
      );
    }
  };


  /* =========================================
                TOGGLE WISHLIST
  ========================================= */

  const handleToggleWishlist = (
    product
  ) => {

    const alreadyWishlisted =
      wishlist.some(
        (item) =>
          item.id === product.id
      );

    setWishlist(
      (previousWishlist) => {

        if (alreadyWishlisted) {

          return previousWishlist.filter(
            (item) =>
              item.id !== product.id
          );

        }

        return [
          ...previousWishlist,
          product,
        ];

      }
    );

    if (alreadyWishlisted) {

      showToast(
        "Removed from wishlist",
        `${product.name} was removed from your favourites.`,
        "remove"
      );

    } else {

      showToast(
        "Saved to wishlist",
        `${product.name} was added to your favourites.`,
        "wishlist"
      );

    }

  };


  /* =========================================
        PRODUCT MODAL QUANTITY +
  ========================================= */

  const handleIncreaseProductQuantity =
    () => {

      setProductQuantity(
        (previousQuantity) =>
          previousQuantity + 1
      );

    };


  /* =========================================
        PRODUCT MODAL QUANTITY -
  ========================================= */

  const handleDecreaseProductQuantity =
    () => {

      setProductQuantity(
        (previousQuantity) =>
          Math.max(
            1,
            previousQuantity - 1
          )
      );

    };


  /* =========================================
                OPEN CHECKOUT
  ========================================= */

  const handleOpenCheckout = () => {

    if (cart.length === 0) {
      return;
    }

    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsProductOpen(false);
    setIsLocationOpen(false);
    setIsPriceComparisonOpen(false);

    setCurrentPage("checkout");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
                BACK TO STORE
  ========================================= */

  const handleBackToStore = () => {

    setIsPriceComparisonOpen(false);

    if (selectedStore) {

      setCurrentPage(
        "store-details"
      );

    } else {

      setCurrentPage("home");

    }

    setTimeout(() => {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }, 0);

  };


  /* =========================================
              GENERATE ORDER ID
  ========================================= */

  const generateOrderId = () => {

    const timestamp =
      Date.now()
        .toString()
        .slice(-8);

    const random =
      Math.floor(
        100 +
        Math.random() * 900
      );

    return `LM${timestamp}${random}`;

  };


  /* =========================================
                  PLACE ORDER
  ========================================= */

  const handlePlaceOrder = async (
    orderDetails
  ) => {

    const newOrder = {

      id: generateOrderId(),

      items: cart.map(
        (item) => {
          const matchingProduct = productsData.find(
            (product) =>
              product.name === item.name ||
              (
                item.id !== undefined &&
                !Number.isNaN(Number(item.id)) &&
                Number(product.id) === Number(item.id)
              )
          );

          return {
            ...item,
            image:
              item.image ||
              matchingProduct?.image ||
              null,
          };
        }
      ),

      subtotal:
        orderDetails.subtotal ?? 0,

      productSavings:
        orderDetails.productSavings ?? 0,

      couponDiscount:
        orderDetails.couponDiscount ?? 0,

      deliveryFee:
        orderDetails.deliveryFee ?? 0,

      finalTotal:
        orderDetails.finalTotal ?? 0,

      coupon:
        orderDetails.coupon ?? null,

      paymentMethod:
        orderDetails.paymentMethod ??
        "Not specified",

      address:
        orderDetails.deliveryAddress ??
        orderDetails.address ??
        null,

      customerLocation:
        selectedLocation ?? null,

      store:
        selectedStore
          ? {
              id:
                selectedStore.id,
              name:
                selectedStore.name,
            }
          : null,

      status:
        "Order Confirmed",

      orderedAt:
        new Date().toISOString(),

      estimatedDelivery:
        selectedStore?.eta ||
        selectedStore?.deliveryTime ||
        "10–20 minutes",

      tracking: [

        {
          title:
            "Order Confirmed",
          completed: true,
        },

        {
          title:
            "Packed",
          completed: false,
        },

        {
          title:
            "Out for Delivery",
          completed: false,
        },

        {
          title:
            "Delivered",
          completed: false,
        },

      ],

    };


    setOrders(
      (previousOrders) => [
        newOrder,
        ...previousOrders,
      ]
    );

    setLatestOrder(newOrder);

    if (currentUserId) {
      try {
        await fetch(
          `http://localhost:5000/api/cart/${currentUserId}`,
          {
            method: "DELETE",
          }
        );
      } catch (error) {
        console.error("Clear cart error:", error);
      }
    }

    setCart([]);

    setCurrentPage(
      "order-success"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
            CONTINUE SHOPPING
  ========================================= */

  const handleContinueShopping = () => {

    setSearchQuery("");
    setSelectedStore(null);

    setIsPriceComparisonOpen(false);
    setComparisonProduct(null);

    setCurrentPage("home");

    setTimeout(() => {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }, 0);

  };


  /* =========================================
              VIEW MY ORDERS
  ========================================= */

  const handleViewOrders = () => {
    const ordersWithImages = orders.map((order) => ({
      ...order,
      items: (order.items || []).map((item) => {
        const matchingProduct = productsData.find(
          (product) =>
            product.name === item.name ||
            (
              item.id !== undefined &&
              !Number.isNaN(Number(item.id)) &&
              Number(product.id) === Number(item.id)
            )
        );

        return {
          ...item,
          image:
            item.image ||
            matchingProduct?.image ||
            null,
        };
      }),
    }));

    setOrders(ordersWithImages);


    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsProductOpen(false);
    setIsLocationOpen(false);
    setIsPriceComparisonOpen(false);

    setCurrentPage("orders");

    setTimeout(() => {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }, 0);

  };


  /* =========================================
                    REORDER
  ========================================= */

  const handleReorder = (
    order
  ) => {

    if (
      !order ||
      !order.items
    ) {
      return;
    }

    setCart(
      (previousCart) => {

        const updatedCart =
          previousCart.map(
            (item) => ({
              ...item,
            })
          );

        order.items.forEach(
          (product) => {

            const existingProduct =
              updatedCart.find(
                (item) =>
                  item.id ===
                  product.id
              );

            if (existingProduct) {

              existingProduct.quantity +=
                product.quantity || 1;

            } else {

              updatedCart.push({
                ...product,
                quantity:
                  product.quantity || 1,
              });

            }

          }
        );

        return updatedCart;

      }
    );

    showToast(
      "Order added to cart",
      "All products from this order were added to your cart.",
      "cart"
    );

    setCurrentPage("home");

    setTimeout(() => {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setIsCartOpen(true);

    }, 100);

  };


  /* =========================================
                TRACK ORDER
  ========================================= */

  const handleTrackSelectedOrder = (
    order
  ) => {

    if (!order) {
      return;
    }

    setLatestOrder(order);

    setCurrentPage(
      "tracking"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
              TRACK LATEST ORDER
  ========================================= */

  const handleTrackOrder = () => {

    if (!latestOrder) {
      return;
    }

    setCurrentPage(
      "tracking"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
            VIEW ORDER DETAILS
  ========================================= */

  const handleViewOrderDetails = (
    order
  ) => {

    if (!order) {
      return;
    }

    setLatestOrder(order);

    setCurrentPage(
      "order-details"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  /* =========================================
              WISHLIST STATUS
  ========================================= */

  const selectedProductIsWishlisted =
    selectedProduct
      ? wishlist.some(
          (item) =>
            item.id ===
            selectedProduct.id
        )
      : false;


  /* =========================================
                CART COUNT
  ========================================= */

  const cartCount =
    cart.reduce(
      (total, item) =>
        total +
        (item.quantity || 1),
      0
    );


  /* =========================================
            VENDOR DASHBOARD
  ========================================= */

  if (currentPage === "vendor-dashboard") {

  return (
    <VendorDashboard
      currentUser={currentUser}
      onLogout={handleLogout}
      products={products}
      setProducts={setProducts}
      orders={orders}
      setOrders={setOrders}
    />
  );

}


  /* =========================================
                  LOGIN PAGE
========================================= */

if (
  currentPage === "login"
) {

  return (

    <Login

      onBack={
        handleBackFromLogin
      }

      onSignup={
        handleOpenSignup
      }

      onLoginSuccess={
        handleLoginSuccess
      }

    />

  );

}

  /* =========================================
                SIGNUP PAGE
  ========================================= */

  if (
    currentPage === "signup"
  ) {

    return (
      <Signup
        onBack={
          handleBackFromSignup
        }
        onLogin={
          handleBackToLogin
        }
      />
    );

  }


  /* =========================================
                ALL PRODUCTS PAGE
  ========================================= */

  if (
    currentPage === "all-products"
  ) {

    return (
      <>

        <Navbar
          cartCount={cartCount}
          wishlistCount={wishlist.length}
          selectedLocation={selectedLocation}
          onLocationClick={handleOpenLocation}
          onOrdersClick={handleViewOrders}
          onLoginClick={handleOpenLogin}
          onLogout={handleLogout}
          searchQuery={searchQuery}
          onSearchChange={handleNavbarSearch}
          onClearSearch={handleClearNavbarSearch}
          currentUser={currentUser}

          onCartClick={() => {
            setIsWishlistOpen(false);
            setIsProductOpen(false);
            setIsLocationOpen(false);
            setIsPriceComparisonOpen(false);
            setIsCartOpen(true);
          }}

          onWishlistClick={() => {
            setIsCartOpen(false);
            setIsProductOpen(false);
            setIsLocationOpen(false);
            setIsPriceComparisonOpen(false);
            setIsWishlistOpen(true);
          }}
        />

        <AllProducts
            onBack={handleContinueShopping}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onProductClick={handleOpenProduct}
            initialSearchTerm={searchQuery}
            onSearchChange={handleNavbarSearch}
        />

        <ProductDetails
          product={selectedProduct}
          isOpen={isProductOpen}
          onClose={handleCloseProduct}
          quantity={productQuantity}
          onIncreaseQuantity={
            handleIncreaseProductQuantity
          }
          onDecreaseQuantity={
            handleDecreaseProductQuantity
          }
          onAddToCart={handleAddToCart}
          onToggleWishlist={
            handleToggleWishlist
          }
          isWishlisted={
            selectedProductIsWishlisted
          }
          onComparePrices={
            handleComparePrice
          }
          onViewStore={
            handleOpenStore
          }
        />

        <Toast
          show={toast.show}
          message={toast.message}
          description={toast.description}
          type={toast.type}
          onClose={() =>
            setToast(
              (previousToast) => ({
                ...previousToast,
                show: false,
              })
            )
          }
        />

      </>
    );

  }


  /* =========================================
                  CHECKOUT PAGE
  ========================================= */

  if (
    currentPage === "checkout"
  ) {

    return (
      <>

        <Checkout
          cart={cart}
          onBack={
            handleBackToStore
          }
          onPlaceOrder={
            handlePlaceOrder
          }
        />

        <Toast
          show={toast.show}
          message={toast.message}
          description={
            toast.description
          }
          type={toast.type}
          onClose={() =>
            setToast(
              (previousToast) => ({
                ...previousToast,
                show: false,
              })
            )
          }
        />

      </>
    );

  }


  /* =========================================
              ORDER SUCCESS PAGE
  ========================================= */

  if (
    currentPage ===
      "order-success" &&
    latestOrder
  ) {

    return (
      <>

        <OrderSuccess
          order={latestOrder}
          onContinueShopping={
            handleContinueShopping
          }
          onViewOrders={
            handleViewOrders
          }
          onTrackOrder={
            handleTrackOrder
          }
        />

        <Toast
          show={toast.show}
          message={toast.message}
          description={
            toast.description
          }
          type={toast.type}
          onClose={() =>
            setToast(
              (previousToast) => ({
                ...previousToast,
                show: false,
              })
            )
          }
        />

      </>
    );

  }


  /* =========================================
              ORDER DETAILS PAGE
  ========================================= */

  if (
    currentPage ===
      "order-details" &&
    latestOrder
  ) {

    return (
      <>

        <OrderDetails
          order={
            latestOrder
          }
          onBack={
            handleViewOrders
          }
          onTrackOrder={
            handleTrackSelectedOrder
          }
          onReorder={
            handleReorder
          }
          onContinueShopping={
            handleContinueShopping
          }
        />

        <Toast
          show={toast.show}
          message={toast.message}
          description={
            toast.description
          }
          type={toast.type}
          onClose={() =>
            setToast(
              (previousToast) => ({
                ...previousToast,
                show: false,
              })
            )
          }
        />

      </>
    );

  }


  /* =========================================
              ORDER TRACKING PAGE
  ========================================= */

  if (
    currentPage === "tracking" &&
    latestOrder
  ) {

    return (
      <>

        <OrderTracking
          order={
            latestOrder
          }
          onBack={
            handleViewOrders
          }
          onContinueShopping={
            handleContinueShopping
          }
        />

        <Toast
          show={toast.show}
          message={toast.message}
          description={
            toast.description
          }
          type={toast.type}
          onClose={() =>
            setToast(
              (previousToast) => ({
                ...previousToast,
                show: false,
              })
            )
          }
        />

      </>
    );

  }


  /* =========================================
                MY ORDERS PAGE
  ========================================= */

  if (
    currentPage === "orders"
  ) {

    return (
      <>

        <MyOrders
          orders={
            orders
          }
          onBack={
            handleBackToStore
          }
          onTrackOrder={
            handleTrackSelectedOrder
          }
          onViewOrder={
            handleViewOrderDetails
          }
          onReorder={
            handleReorder
          }
        />

        <Toast
          show={toast.show}
          message={toast.message}
          description={
            toast.description
          }
          type={toast.type}
          onClose={() =>
            setToast(
              (previousToast) => ({
                ...previousToast,
                show: false,
              })
            )
          }
        />

      </>
    );

  }


  /* =========================================
              STORE DETAILS PAGE
  ========================================= */

  if (
    currentPage ===
      "store-details" &&
    selectedStore
  ) {

    return (
      <>

        <StoreDetails
          store={
            selectedStore
          }
          cart={
            cart
          }
          onBack={
            handleBackToNearbyStores
          }
          onAddToCart={
            handleAddToCart
          }
          onIncrease={
            handleIncreaseQuantity
          }
          onDecrease={
            handleDecreaseQuantity
          }
          onComparePrice={
            handleComparePrice
          }
        />

        {isPriceComparisonOpen &&
          comparisonProduct && (

            <PriceComparison
              product={
                comparisonProduct
              }
              stores={stores}
              onClose={
                handleClosePriceComparison
              }
              onViewStore={
                handleViewComparisonStore
              }
              onAddToCart={
                handleAddToCart
              }
            />

          )}

        <Toast
          show={toast.show}
          message={toast.message}
          description={
            toast.description
          }
          type={toast.type}
          onClose={() =>
            setToast(
              (previousToast) => ({
                ...previousToast,
                show: false,
              })
            )
          }
        />

      </>
    );

  }


  /* =========================================
                    HOME PAGE
  ========================================= */

  return (
    <>

      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        selectedLocation={selectedLocation}
        onLocationClick={handleOpenLocation}
        onOrdersClick={handleViewOrders}
        onLoginClick={handleOpenLogin}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={handleNavbarSearch}
        onClearSearch={handleClearNavbarSearch}
        currentUser={currentUser}

        onCartClick={() => {

          setIsWishlistOpen(false);
          setIsProductOpen(false);
          setIsLocationOpen(false);
          setIsPriceComparisonOpen(false);

          setIsCartOpen(true);

        }}

        onWishlistClick={() => {

          setIsCartOpen(false);
          setIsProductOpen(false);
          setIsLocationOpen(false);
          setIsPriceComparisonOpen(false);

          setIsWishlistOpen(true);

        }}
      />


      <Hero />

      <Features />

      <Categories />


      {selectedLocation && (

        <NearbyStores
          selectedLocation={
            selectedLocation
          }
          onChangeLocation={
            handleOpenLocation
          }
          onStoreClick={
            handleOpenStore
          }
        />

      )}


      <FeaturedProducts
        onAddToCart={
          handleAddToCart
        }
        onToggleWishlist={
          handleToggleWishlist
        }
        wishlist={
          wishlist
        }
        onProductClick={
          handleOpenProduct
        }
        onViewAll={
          handleOpenAllProducts
        }
      />


      <OfferBanner />

      <Brands />

      <WhyChoose />

      <Reviews />

      <MobileApp />

      <Newsletter />

      <Footer />


      <LocationSelector
        isOpen={
          isLocationOpen
        }
        onClose={
          handleCloseLocation
        }
        onLocationSelect={
          handleLocationSelect
        }
      />


      <CartDrawer
        isOpen={
          isCartOpen
        }
        cart={
          cart
        }
        onClose={() =>
          setIsCartOpen(false)
        }
        onIncrease={
          handleIncreaseQuantity
        }
        onDecrease={
          handleDecreaseQuantity
        }
        onRemove={
          handleRemoveFromCart
        }
        onProductClick={
          handleOpenProduct
        }
        onCheckout={
          handleOpenCheckout
        }
      />


      <WishlistDrawer
        isOpen={
          isWishlistOpen
        }
        wishlist={
          wishlist
        }
        onClose={() =>
          setIsWishlistOpen(
            false
          )
        }
        onRemove={
          handleToggleWishlist
        }
        onAddToCart={
          handleAddToCart
        }
        onProductClick={
          handleOpenProduct
        }
      />


      <ProductDetails
        product={
          selectedProduct
        }
        isOpen={
          isProductOpen
        }
        onClose={
          handleCloseProduct
        }
        quantity={
          productQuantity
        }
        onIncreaseQuantity={
          handleIncreaseProductQuantity
        }
        onDecreaseQuantity={
          handleDecreaseProductQuantity
        }
        onAddToCart={
          handleAddToCart
        }
        onToggleWishlist={
          handleToggleWishlist
        }
        isWishlisted={
          selectedProductIsWishlisted
        }
        onComparePrices={
          handleComparePrice
        }
        onViewStore={
          handleOpenStore
        }
      />


      <Toast
        show={
          toast.show
        }
        message={
          toast.message
        }
        description={
          toast.description
        }
        type={
          toast.type
        }
        onClose={() =>
          setToast(
            (previousToast) => ({
              ...previousToast,
              show: false,
            })
          )
        }
      />

    </>
  );

}

export default App;