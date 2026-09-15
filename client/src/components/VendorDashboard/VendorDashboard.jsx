import { useState } from "react";
import "./VendorDashboard.css";

function VendorDashboard({
  currentUser,
  onLogout,
  products,
  setProducts,
}) {
  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [isProfileMenuOpen, setIsProfileMenuOpen] =
    useState(false);

  /* =====================================================
                    VENDOR INFO
  ===================================================== */

  const [isEditingVendorInfo, setIsEditingVendorInfo] =
    useState(false);

  const [vendorInfoMessage, setVendorInfoMessage] =
    useState("");

  /* =====================================================
                    ADD PRODUCT FORM
  ===================================================== */

  const [productName, setProductName] =
    useState("");

  const [productPrice, setProductPrice] =
    useState("");

  const [productCategory, setProductCategory] =
    useState("");

  const [productStock, setProductStock] =
    useState("");

  const [productAvailable, setProductAvailable] =
    useState(true);

  const [productImage, setProductImage] =
    useState("");

  /* =====================================================
                    EDIT PRODUCT
  ===================================================== */

  const [editingProductId, setEditingProductId] =
    useState(null);

  /* =====================================================
                    VENDOR FORM
  ===================================================== */

  const [vendorForm, setVendorForm] = useState({
    name: "",
    email: "",
    phone: "",

    storeName: "",
    storeArea: "",
    storeType: "",

    deliveryTime: "",
    deliveryLabel: "",
    deliveryFee: "",

    isOpen: true,
  });

  /* =====================================================
                    CATEGORIES
  ===================================================== */

  const categories = [
    "Fruits",
    "Vegetables",
    "Dairy",
    "Bakery",
    "Beverages",
    "Personal Care",
  ];

  /* =====================================================
              LOAD VENDOR + STORE INFORMATION
  ===================================================== */

  let vendorRecord = currentUser;
  let savedVendorStore = null;

  try {
    const savedUsers =
      JSON.parse(
        localStorage.getItem("localMartUsers")
      ) || [];

    const matchedUser = savedUsers.find(
      (user) =>
        String(user.id) ===
          String(currentUser?.id) ||
        user.email?.toLowerCase() ===
          currentUser?.email?.toLowerCase()
    );

    if (matchedUser) {
      vendorRecord = {
        ...currentUser,
        ...matchedUser,
      };
    }

    const savedStores =
      JSON.parse(
        localStorage.getItem(
          "localMartVendorStores"
        )
      ) || [];

    savedVendorStore = savedStores.find(
      (store) =>
        Number(store.id) ===
          Number(vendorRecord?.storeId) ||
        Number(store.ownerId) ===
          Number(vendorRecord?.id)
    );
  } catch (error) {
    console.error(
      "Unable to load vendor/store information:",
      error
    );
  }

  /* =====================================================
                    OPEN VENDOR INFO
  ===================================================== */

  const openVendorInfo = () => {
    setIsProfileMenuOpen(false);

    setVendorForm({
      name:
        vendorRecord?.name || "",

      email:
        vendorRecord?.email || "",

      phone:
        vendorRecord?.phone || "",

      storeName:
        savedVendorStore?.name || "",

      storeArea:
        savedVendorStore?.area || "",

      storeType:
        savedVendorStore?.type || "",

      deliveryTime:
        savedVendorStore?.deliveryTime ?? "",

      deliveryLabel:
        savedVendorStore?.deliveryLabel || "",

      deliveryFee:
        savedVendorStore?.deliveryFee ?? "",

      isOpen:
        savedVendorStore?.isOpen !== false,
    });

    setIsEditingVendorInfo(false);
    setVendorInfoMessage("");

    setActiveTab("vendor-info");
  };

  /* =====================================================
              VENDOR FORM CHANGE
  ===================================================== */

  const handleVendorFormChange = (
    field,
    value
  ) => {
    setVendorForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setVendorInfoMessage("");
  };

  /* =====================================================
              EDIT VENDOR INFORMATION
  ===================================================== */

  const startEditingVendorInfo = () => {
    setVendorForm({
      name:
        vendorRecord?.name || "",

      email:
        vendorRecord?.email || "",

      phone:
        vendorRecord?.phone || "",

      storeName:
        savedVendorStore?.name || "",

      storeArea:
        savedVendorStore?.area || "",

      storeType:
        savedVendorStore?.type || "",

      deliveryTime:
        savedVendorStore?.deliveryTime ?? "",

      deliveryLabel:
        savedVendorStore?.deliveryLabel || "",

      deliveryFee:
        savedVendorStore?.deliveryFee ?? "",

      isOpen:
        savedVendorStore?.isOpen !== false,
    });

    setVendorInfoMessage("");
    setIsEditingVendorInfo(true);
  };

  /* =====================================================
              CANCEL VENDOR EDIT
  ===================================================== */

  const cancelVendorInfoEdit = () => {
    setVendorForm({
      name:
        vendorRecord?.name || "",

      email:
        vendorRecord?.email || "",

      phone:
        vendorRecord?.phone || "",

      storeName:
        savedVendorStore?.name || "",

      storeArea:
        savedVendorStore?.area || "",

      storeType:
        savedVendorStore?.type || "",

      deliveryTime:
        savedVendorStore?.deliveryTime ?? "",

      deliveryLabel:
        savedVendorStore?.deliveryLabel || "",

      deliveryFee:
        savedVendorStore?.deliveryFee ?? "",

      isOpen:
        savedVendorStore?.isOpen !== false,
    });

    setIsEditingVendorInfo(false);
    setVendorInfoMessage("");
  };

  /* =====================================================
              SAVE VENDOR INFORMATION
  ===================================================== */

  const handleSaveVendorInfo = () => {
    if (!vendorForm.name.trim()) {
      setVendorInfoMessage(
        "Please enter your full name."
      );

      return;
    }

    if (!vendorForm.storeName.trim()) {
      setVendorInfoMessage(
        "Please enter your store name."
      );

      return;
    }

    if (!vendorForm.storeArea.trim()) {
      setVendorInfoMessage(
        "Please enter your store area."
      );

      return;
    }

    if (!vendorForm.storeType.trim()) {
      setVendorInfoMessage(
        "Please enter your store type."
      );

      return;
    }

    try {
      const savedUsers =
        JSON.parse(
          localStorage.getItem(
            "localMartUsers"
          )
        ) || [];

      const savedStores =
        JSON.parse(
          localStorage.getItem(
            "localMartVendorStores"
          )
        ) || [];

      /* =============================================
                UPDATE USER
      ============================================= */

      const updatedUsers =
        savedUsers.map((user) => {
          const sameUser =
            String(user.id) ===
              String(vendorRecord?.id) ||
            user.email?.toLowerCase() ===
              vendorRecord?.email?.toLowerCase();

          if (!sameUser) {
            return user;
          }

          return {
            ...user,

            name:
              vendorForm.name.trim(),

            phone:
              vendorForm.phone.trim(),

            storeId:
              user.storeId ??
              vendorRecord?.storeId ??
              savedVendorStore?.id ??
              null,
          };
        });

      localStorage.setItem(
        "localMartUsers",
        JSON.stringify(updatedUsers)
      );

      /* =============================================
                UPDATE STORE
      ============================================= */

      const updatedStores =
        savedStores.map((store) => {
          const sameStore =
            Number(store.id) ===
              Number(
                vendorRecord?.storeId
              ) ||
            Number(store.ownerId) ===
              Number(
                vendorRecord?.id
              );

          if (!sameStore) {
            return store;
          }

          const deliveryTime =
            Number(
              vendorForm.deliveryTime
            ) || 30;

          return {
            ...store,

            name:
              vendorForm.storeName.trim(),

            area:
              vendorForm.storeArea.trim(),

            type:
              vendorForm.storeType.trim(),

            deliveryTime:
              deliveryTime,

            deliveryLabel:
              vendorForm.deliveryLabel.trim() ||
              `${deliveryTime}–${
                deliveryTime + 10
              } min`,

            deliveryFee:
              Number(
                vendorForm.deliveryFee
              ) || 0,

            isOpen:
              vendorForm.isOpen,
          };
        });

      localStorage.setItem(
        "localMartVendorStores",
        JSON.stringify(updatedStores)
      );

      /* =============================================
                UPDATE CURRENT USER
      ============================================= */

      const updatedCurrentUser = {
        ...currentUser,

        name:
          vendorForm.name.trim(),

        phone:
          vendorForm.phone.trim(),

        storeId:
          vendorRecord?.storeId ??
          savedVendorStore?.id ??
          null,
      };

      localStorage.setItem(
        "localMartCurrentUser",
        JSON.stringify(
          updatedCurrentUser
        )
      );

      /* =============================================
                SUCCESS
      ============================================= */

      setVendorInfoMessage(
        "Your information has been saved successfully."
      );

      setIsEditingVendorInfo(false);

    } catch (error) {
      console.error(
        "Unable to save vendor information:",
        error
      );

      setVendorInfoMessage(
        "Something went wrong while saving your information."
      );
    }
  };

  /* =====================================================
                    ADD PRODUCT
  ===================================================== */

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      !productName.trim() ||
      !productPrice ||
      !productCategory ||
      productStock === ""
    ) {
      alert("Please fill all required product details.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vendorId: currentUser?.id,
            vendorEmail:
              vendorRecord?.email ||
              currentUser?.email,
            name: productName.trim(),
            category: productCategory,
            price: Number(productPrice),
            stock: Number(productStock),
            image: productImage.trim() || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add product.");
        return;
      }

      const savedProduct = {
        ...data.product,
        id: data.product._id,
        available: data.product.isAvailable,
      };

      setProducts((prevProducts) => [
        ...prevProducts,
        savedProduct,
      ]);

      resetForm();

      alert("Product added successfully!");

      setActiveTab("products");
    } catch (error) {
      console.error("Add product error:", error);
      alert("Unable to connect to server.");
    }
  };

  /* =====================================================
                    RESET PRODUCT FORM
  ===================================================== */

  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProductCategory("");
    setProductStock("");
    setProductImage("");
    setProductAvailable(true);
    setEditingProductId(null);
  };

  /* =====================================================
                    DELETE PRODUCT
  ===================================================== */

  const handleDeleteProduct = (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (confirmDelete) {
      setProducts(
        (prevProducts) =>
          prevProducts.filter(
            (product) =>
              product.id !== id
          )
      );
    }
  };

  /* =====================================================
                    UPDATE PRICE
  ===================================================== */

  const handlePriceChange = (
    id,
    newPrice
  ) => {
    setProducts(
      (prevProducts) =>
        prevProducts.map(
          (product) =>
            product.id === id
              ? {
                  ...product,
                  price:
                    Number(
                      newPrice
                    ),
                }
              : product
        )
    );
  };

  /* =====================================================
                    UPDATE STOCK
  ===================================================== */

  const handleStockChange = (
    id,
    newStock
  ) => {
    setProducts(
      (prevProducts) =>
        prevProducts.map(
          (product) => {
            if (
              product.id === id
            ) {
              const stockValue =
                Number(
                  newStock
                );

              return {
                ...product,

                stock:
                  stockValue,

                available:
                  stockValue > 0
                    ? product.available
                    : false,
              };
            }

            return product;
          }
        )
    );
  };

  /* =====================================================
                    AVAILABILITY
  ===================================================== */

  const handleAvailabilityChange = (
    id
  ) => {
    setProducts(
      (prevProducts) =>
        prevProducts.map(
          (product) => {
            if (
              product.id === id
            ) {
              if (
                product.stock <= 0
              ) {
                alert(
                  "Please add stock before making this product available."
                );

                return product;
              }

              return {
                ...product,

                available:
                  !product.available,
              };
            }

            return product;
          }
        )
    );
  };

  /* =====================================================
                    EDIT PRODUCT
  ===================================================== */

  const handleEditProduct = (
    product
  ) => {
    setEditingProductId(
      product.id
    );

    setProductName(
      product.name || ""
    );

    setProductPrice(
      product.price || ""
    );

    setProductCategory(
      product.category || ""
    );

    setProductStock(
      product.stock ?? ""
    );

    setProductImage(
      product.image ||
        product.imageUrl ||
        product.img ||
        ""
    );

    setProductAvailable(
      product.available !== false
    );

    setActiveTab(
      "add-product"
    );
  };

  /* =====================================================
                    UPDATE PRODUCT
  ===================================================== */

  const handleUpdateProduct = (
    e
  ) => {
    e.preventDefault();

    if (
      !productName.trim() ||
      !productPrice ||
      !productCategory ||
      productStock === ""
    ) {
      alert(
        "Please fill all required product details."
      );

      return;
    }

    setProducts(
      (prevProducts) =>
        prevProducts.map(
          (product) =>
            product.id ===
            editingProductId
              ? {
                  ...product,

                  name:
                    productName.trim(),

                  price:
                    Number(
                      productPrice
                    ),

                  category:
                    productCategory,

                  stock:
                    Number(
                      productStock
                    ),

                  available:
                    productAvailable &&
                    Number(
                      productStock
                    ) > 0,

                  image:
                    productImage.trim(),

                  storeId:
                    product.storeId ??
                    currentUser?.storeId ??
                    null,
                }
              : product
        )
    );

    alert(
      "Product updated successfully!"
    );

    resetForm();

    setActiveTab(
      "products"
    );
  };

  /* =====================================================
                    OPEN ADD PRODUCT
  ===================================================== */

  const openAddProduct = () => {
    resetForm();

    setActiveTab(
      "add-product"
    );
  };

  /* =====================================================
                    DASHBOARD STATS
  ===================================================== */

  const totalProducts =
    products.length;

  const availableProducts =
    products.filter(
      (product) =>
        product.available !== false &&
        Number(
          product.stock || 0
        ) > 0
    ).length;

  const outOfStockProducts =
    products.filter(
      (product) =>
        product.available ===
          false ||
        Number(
          product.stock || 0
        ) === 0
    ).length;

  return (
    <div className="vendor-dashboard">

      {/* =================================================
                        SIDEBAR
      ================================================= */}

      <aside className="vendor-sidebar">

        <div className="vendor-brand">
          <span>🛒</span>

          <h2>
            LocalMart
          </h2>
        </div>

        <p className="vendor-panel-title">
          VENDOR PANEL
        </p>

        <div className="vendor-menu">

          {/* DASHBOARD */}

          <button
            className={
              activeTab ===
              "dashboard"
                ? "vendor-menu-btn active"
                : "vendor-menu-btn"
            }
            onClick={() =>
              setActiveTab(
                "dashboard"
              )
            }
          >
            <span>▦</span>

            Dashboard
          </button>


          {/* MY PRODUCTS */}

          <button
            className={
              activeTab ===
              "products"
                ? "vendor-menu-btn active"
                : "vendor-menu-btn"
            }
            onClick={() =>
              setActiveTab(
                "products"
              )
            }
          >
            <span>◫</span>

            My Products
          </button>


          {/* ADD PRODUCT */}

          <button
            className={
              activeTab ===
              "add-product"
                ? "vendor-menu-btn active"
                : "vendor-menu-btn"
            }
            onClick={
              openAddProduct
            }
          >
            <span>＋</span>

            Add Product
          </button>


          {/* ORDERS */}

          <button
            className={
              activeTab ===
              "orders"
                ? "vendor-menu-btn active"
                : "vendor-menu-btn"
            }
            onClick={() =>
              setActiveTab(
                "orders"
              )
            }
          >
            <span>◷</span>

            Orders
          </button>

        </div>


        {/* LOGOUT */}

        <button
          className="vendor-logout"
          onClick={onLogout}
        >
          Logout
        </button>

      </aside>


      {/* =================================================
                        MAIN CONTENT
      ================================================= */}

      <main className="vendor-content">

        {/* =================================================
                          HEADER
        ================================================= */}

        <header className="vendor-header">

          <div>

            <p>
              Vendor Dashboard
            </p>

            <h1>
              Welcome,{" "}
              {currentUser?.name ||
                "Vendor"} 👋
            </h1>

          </div>


          {/* PROFILE */}

          <div className="vendor-profile-wrapper">

            <button
              type="button"
              className="vendor-user vendor-user-button"
              onClick={() =>
                setIsProfileMenuOpen(
                  (previous) =>
                    !previous
                )
              }
              aria-expanded={
                isProfileMenuOpen
              }
            >

              <div className="vendor-user-avatar">

                {currentUser?.name
                  ?.charAt(0)
                  .toUpperCase() ||
                  "V"}

              </div>

              <span>
                {currentUser?.name ||
                  "Vendor"}
              </span>

              <span className="vendor-profile-chevron">
                {isProfileMenuOpen
                  ? "▴"
                  : "▾"}
              </span>

            </button>


            {/* PROFILE DROPDOWN */}

            {isProfileMenuOpen && (

              <div className="vendor-profile-menu">

                <button
                  type="button"
                  onClick={
                    openVendorInfo
                  }
                  className="vendor-profile-menu-item"
                >

                  <span>
                    👤
                  </span>

                  <div>

                    <strong>
                      Vendor Info
                    </strong>

                    <small>
                      View and edit your profile
                    </small>

                  </div>

                </button>


                <div className="vendor-profile-divider" />


                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(
                      false
                    );

                    onLogout();
                  }}
                  className="vendor-profile-menu-item logout-item"
                >

                  <span>
                    ↪
                  </span>

                  <div>

                    <strong>
                      Logout
                    </strong>

                    <small>
                      Sign out of your vendor account
                    </small>

                  </div>

                </button>

              </div>

            )}

          </div>

        </header>


        {/* =================================================
                    VENDOR INFORMATION
        ================================================= */}

        {activeTab ===
          "vendor-info" && (

          <section className="vendor-page vendor-info-page">

            {/* PAGE HEADER */}

            <div className="vendor-page-heading">

              <div>

                <p className="vendor-info-eyebrow">
                  ACCOUNT SETTINGS
                </p>

                <h2>
                  Vendor Information
                </h2>

                <p>
                  Manage your personal information
                  and store details.
                </p>

              </div>


              <button
                type="button"
                className="secondary-vendor-btn"
                onClick={() =>
                  setActiveTab(
                    "dashboard"
                  )
                }
              >
                ← Back to Dashboard
              </button>

            </div>


            {/* MESSAGE */}

            {vendorInfoMessage && (

              <div className="vendor-info-message">

                <span>
                  ✓
                </span>

                {vendorInfoMessage}

              </div>

            )}


            {/* PROFILE HEADER */}

            <div className="vendor-info-profile">

              <div className="vendor-info-profile-left">

                <div className="vendor-info-large-avatar">

                  {vendorRecord?.name
                    ?.charAt(0)
                    .toUpperCase() ||
                    "V"}

                </div>


                <div>

                  <h3>
                    {vendorRecord?.name ||
                      "Vendor"}
                  </h3>

                  <p>
                    {vendorRecord?.email ||
                      "No email available"}
                  </p>

                  <span className="vendor-role-pill">
                    Vendor Account
                  </span>

                </div>

              </div>


              {!isEditingVendorInfo && (

                <button
                  type="button"
                  className="edit-vendor-info-btn"
                  onClick={
                    startEditingVendorInfo
                  }
                >
                  ✎ Edit Information
                </button>

              )}

            </div>


            {/* INFORMATION SECTIONS */}

            <div className="vendor-info-sections">

              {/* =========================================
                    PERSONAL INFORMATION
              ========================================= */}

              <div className="vendor-info-section-card">

                <div className="vendor-info-section-header">

                  <div className="vendor-info-section-icon">
                    👤
                  </div>

                  <div>

                    <h3>
                      Personal Information
                    </h3>

                    <p>
                      Your account and contact details
                    </p>

                  </div>

                </div>


                <div className="vendor-info-fields">

                  {/* FULL NAME */}

                  <div className="vendor-info-field">

                    <span>
                      Full Name
                    </span>

                    {isEditingVendorInfo ? (

                      <input
                        type="text"
                        value={
                          vendorForm.name
                        }
                        onChange={(e) =>
                          handleVendorFormChange(
                            "name",
                            e.target.value
                          )
                        }
                      />

                    ) : (

                      <strong>
                        {vendorRecord?.name ||
                          "N/A"}
                      </strong>

                    )}

                  </div>


                  {/* EMAIL */}

                  <div className="vendor-info-field">

                    <span>
                      Email Address
                    </span>

                    <strong>
                      {vendorRecord?.email ||
                        "N/A"}
                    </strong>

                  </div>


                  {/* PHONE */}

                  <div className="vendor-info-field">

                    <span>
                      Phone Number
                    </span>

                    {isEditingVendorInfo ? (

                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={
                          vendorForm.phone
                        }
                        onChange={(e) =>
                          handleVendorFormChange(
                            "phone",
                            e.target.value
                          )
                        }
                      />

                    ) : (

                      <strong>
                        {vendorRecord?.phone ||
                          "Not added"}
                      </strong>

                    )}

                  </div>


                  {/* VENDOR ID */}

                  <div className="vendor-info-field">

                    <span>
                      Vendor ID
                    </span>

                    <strong>
                      {vendorRecord?.id ||
                        "N/A"}
                    </strong>

                  </div>


                  {/* ROLE */}

                  <div className="vendor-info-field">

                    <span>
                      Account Role
                    </span>

                    <span className="vendor-role-pill small">
                      {vendorRecord?.role ||
                        "vendor"}
                    </span>

                  </div>


                  {/* CREATED */}

                  <div className="vendor-info-field">

                    <span>
                      Account Created
                    </span>

                    <strong>

                      {vendorRecord?.createdAt
                        ? new Date(
                            vendorRecord.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "N/A"}

                    </strong>

                  </div>

                </div>

              </div>


              {/* =========================================
                      STORE INFORMATION
              ========================================= */}

              <div className="vendor-info-section-card">

                <div className="vendor-info-section-header">

                  <div className="vendor-info-section-icon">
                    🏪
                  </div>

                  <div>

                    <h3>
                      Store Information
                    </h3>

                    <p>
                      Information customers see about your store
                    </p>

                  </div>

                </div>


                <div className="vendor-info-fields">

                  {/* STORE NAME */}

                  <div className="vendor-info-field">

                    <span>
                      Store Name
                    </span>

                    {isEditingVendorInfo ? (

                      <input
                        type="text"
                        value={
                          vendorForm.storeName
                        }
                        onChange={(e) =>
                          handleVendorFormChange(
                            "storeName",
                            e.target.value
                          )
                        }
                      />

                    ) : (

                      <strong>
                        {savedVendorStore?.name ||
                          "N/A"}
                      </strong>

                    )}

                  </div>


                  {/* STORE ID */}

                  <div className="vendor-info-field">

                    <span>
                      Store ID
                    </span>

                    <strong>
                      {savedVendorStore?.id ??
                        vendorRecord?.storeId ??
                        "N/A"}
                    </strong>

                  </div>


                  {/* STORE AREA */}

                  <div className="vendor-info-field">

                    <span>
                      Store Area
                    </span>

                    {isEditingVendorInfo ? (

                      <input
                        type="text"
                        value={
                          vendorForm.storeArea
                        }
                        onChange={(e) =>
                          handleVendorFormChange(
                            "storeArea",
                            e.target.value
                          )
                        }
                      />

                    ) : (

                      <strong>
                        {savedVendorStore?.area ||
                          "N/A"}
                      </strong>

                    )}

                  </div>


                  {/* STORE TYPE */}

                  <div className="vendor-info-field">

                    <span>
                      Store Type
                    </span>

                    {isEditingVendorInfo ? (

                      <input
                        type="text"
                        value={
                          vendorForm.storeType
                        }
                        onChange={(e) =>
                          handleVendorFormChange(
                            "storeType",
                            e.target.value
                          )
                        }
                      />

                    ) : (

                      <strong>
                        {savedVendorStore?.type ||
                          "N/A"}
                      </strong>

                    )}

                  </div>


                  {/* STORE STATUS */}

                  <div className="vendor-info-field">

                    <span>
                      Store Status
                    </span>

                    {isEditingVendorInfo ? (

                      <select
                        value={
                          vendorForm.isOpen
                            ? "open"
                            : "closed"
                        }
                        onChange={(e) =>
                          handleVendorFormChange(
                            "isOpen",
                            e.target.value ===
                              "open"
                          )
                        }
                      >

                        <option value="open">
                          Open
                        </option>

                        <option value="closed">
                          Closed
                        </option>

                      </select>

                    ) : (

                      <span
                        className={
                          savedVendorStore?.isOpen ===
                          false
                            ? "store-status closed"
                            : "store-status open"
                        }
                      >

                        {savedVendorStore?.isOpen ===
                        false
                          ? "Closed"
                          : "Open"}

                      </span>

                    )}

                  </div>


                  {/* DELIVERY TIME */}

                  <div className="vendor-info-field">

                    <span>
                      Delivery Time
                    </span>

                    {isEditingVendorInfo ? (

                      <div className="vendor-delivery-time-input">

                        <input
                          type="number"
                          min="1"
                          value={
                            vendorForm.deliveryTime
                          }
                          onChange={(e) =>
                            handleVendorFormChange(
                              "deliveryTime",
                              e.target.value
                            )
                          }
                        />

                        <span>
                          min
                        </span>

                      </div>

                    ) : (

                      <strong>
                        {savedVendorStore?.deliveryLabel ||
                          (savedVendorStore?.deliveryTime
                            ? `${savedVendorStore.deliveryTime} min`
                            : "N/A")}
                      </strong>

                    )}

                  </div>


                  {/* DELIVERY FEE */}

                  <div className="vendor-info-field">

                    <span>
                      Delivery Fee
                    </span>

                    {isEditingVendorInfo ? (

                      <div className="vendor-money-input">

                        <span>
                          ₹
                        </span>

                        <input
                          type="number"
                          min="0"
                          value={
                            vendorForm.deliveryFee
                          }
                          onChange={(e) =>
                            handleVendorFormChange(
                              "deliveryFee",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    ) : (

                      <strong>
                        {savedVendorStore?.deliveryFee !==
                        undefined
                          ? `₹${savedVendorStore.deliveryFee}`
                          : "N/A"}
                      </strong>

                    )}

                  </div>


                  {/* RATING */}

                  <div className="vendor-info-field">

                    <span>
                      Rating
                    </span>

                    <strong>
                      ⭐{" "}
                      {savedVendorStore?.rating ??
                        0}
                    </strong>

                  </div>


                  {/* REVIEWS */}

                  <div className="vendor-info-field">

                    <span>
                      Reviews
                    </span>

                    <strong>
                      {savedVendorStore?.reviews ??
                        0}
                    </strong>

                  </div>

                </div>

              </div>

            </div>


            {/* SAVE BAR */}

            {isEditingVendorInfo && (

              <div className="vendor-info-save-bar">

                <div>

                  <strong>
                    Unsaved changes
                  </strong>

                  <p>
                    Save your changes to update your vendor profile.
                  </p>

                </div>


                <div className="vendor-info-save-actions">

                  <button
                    type="button"
                    className="cancel-vendor-btn"
                    onClick={
                      cancelVendorInfoEdit
                    }
                  >
                    Cancel
                  </button>


                  <button
                    type="button"
                    className="primary-vendor-btn"
                    onClick={
                      handleSaveVendorInfo
                    }
                  >
                    Save Changes
                  </button>

                </div>

              </div>

            )}

          </section>

        )}


        {/* =================================================
                        DASHBOARD
        ================================================= */}

        {activeTab ===
          "dashboard" && (

          <section>

            {/* STATS */}

            <div className="vendor-stats">

              <div className="vendor-stat-card">

                <div className="stat-icon">
                  📦
                </div>

                <div>

                  <p>
                    Total Products
                  </p>

                  <h2>
                    {totalProducts}
                  </h2>

                </div>

              </div>


              <div className="vendor-stat-card">

                <div className="stat-icon">
                  ✓
                </div>

                <div>

                  <p>
                    Available
                  </p>

                  <h2>
                    {availableProducts}
                  </h2>

                </div>

              </div>


              <div className="vendor-stat-card">

                <div className="stat-icon">
                  !
                </div>

                <div>

                  <p>
                    Out of Stock
                  </p>

                  <h2>
                    {outOfStockProducts}
                  </h2>

                </div>

              </div>


              <div className="vendor-stat-card">

                <div className="stat-icon">
                  🛍
                </div>

                <div>

                  <p>
                    Orders
                  </p>

                  <h2>
                    0
                  </h2>

                </div>

              </div>

            </div>


            {/* WELCOME */}

            <div className="vendor-welcome-card">

              <div>

                <p className="welcome-small-text">
                  YOUR STORE
                </p>

                <h2>
                  Manage your store from one place
                </h2>

                <p>
                  Add products, update prices,
                  manage inventory and control
                  product availability easily.
                </p>

                <button
                  onClick={
                    openAddProduct
                  }
                >
                  + Add New Product
                </button>

              </div>


              <div className="welcome-card-icon">
                🛒
              </div>

            </div>


            {/* RECENT PRODUCTS */}

            {products.length > 0 && (

              <div className="recent-products-section">

                <div className="section-title-row">

                  <div>

                    <h2>
                      Recent Products
                    </h2>

                    <p>
                      Quickly manage your latest products
                    </p>

                  </div>


                  <button
                    className="text-btn"
                    onClick={() =>
                      setActiveTab(
                        "products"
                      )
                    }
                  >
                    View All →
                  </button>

                </div>


                <div className="dashboard-product-grid">

                  {products
                    .slice(-3)
                    .reverse()
                    .map(
                      (product) => (

                        <div
                          className="dashboard-product-card"
                          key={
                            product.id
                          }
                        >

                          <div className="dashboard-product-image">

                            {product.image ||
                            product.imageUrl ||
                            product.img ? (

                              <img
                                src={
                                  product.image ||
                                  product.imageUrl ||
                                  product.img
                                }
                                alt={
                                  product.name
                                }
                              />

                            ) : (

                              <div className="no-image">
                                📦
                              </div>

                            )}

                          </div>


                          <div className="dashboard-product-details">

                            <h3>
                              {
                                product.name
                              }
                            </h3>

                            <p>
                              ₹
                              {
                                product.price
                              }
                            </p>

                            <span
                              className={
                                product.available !==
                                  false &&
                                Number(
                                  product.stock ||
                                    0
                                ) > 0
                                  ? "status-badge in-stock"
                                  : "status-badge out-stock"
                              }
                            >

                              {product.available !==
                                false &&
                              Number(
                                product.stock ||
                                  0
                              ) > 0
                                ? "Available"
                                : "Out of Stock"}

                            </span>

                          </div>

                        </div>

                      )
                    )}

                </div>

              </div>

            )}

          </section>

        )}


        {/* =================================================
                        MY PRODUCTS
        ================================================= */}

        {activeTab ===
          "products" && (

          <section className="vendor-page">

            <div className="vendor-page-heading">

              <div>

                <h2>
                  My Products
                </h2>

                <p>
                  Manage product details, prices,
                  stock and availability.
                </p>

              </div>


              <button
                className="primary-vendor-btn"
                onClick={
                  openAddProduct
                }
              >
                + Add Product
              </button>

            </div>


            {products.length === 0 ? (

              <div className="empty-vendor-state">

                <div className="empty-icon">
                  📦
                </div>

                <h3>
                  No products added yet
                </h3>

                <p>
                  Start building your store by
                  adding your first product.
                </p>

                <button
                  className="primary-vendor-btn"
                  onClick={
                    openAddProduct
                  }
                >
                  + Add Product
                </button>

              </div>

            ) : (

              <div className="vendor-products-grid">

                {products.map(
                  (product) => (

                    <div
                      className="vendor-product-card"
                      key={
                        product.id
                      }
                    >

                      <div className="product-image-wrapper">

                        {product.image ||
                        product.imageUrl ||
                        product.img ? (

                          <img
                            src={
                              product.image ||
                              product.imageUrl ||
                              product.img
                            }
                            alt={
                              product.name
                            }
                            className="vendor-product-image"
                          />

                        ) : (

                          <div className="vendor-product-placeholder">
                            📦
                          </div>

                        )}


                        <span
                          className={
                            product.available !==
                              false &&
                            Number(
                              product.stock ||
                                0
                            ) > 0
                              ? "product-status available-status"
                              : "product-status unavailable-status"
                          }
                        >

                          {product.available !==
                            false &&
                          Number(
                            product.stock ||
                              0
                          ) > 0
                            ? "Available"
                            : "Unavailable"}

                        </span>

                      </div>


                      <div className="vendor-product-info">

                        <div className="product-title-row">

                          <div>

                            <h3>
                              {
                                product.name
                              }
                            </h3>

                            <p className="product-category">
                              {
                                product.category
                              }
                            </p>

                          </div>


                          <button
                            className="edit-product-btn"
                            onClick={() =>
                              handleEditProduct(
                                product
                              )
                            }
                          >
                            Edit
                          </button>

                        </div>


                        <div className="product-edit-field">

                          <label>
                            Price
                          </label>

                          <div className="input-with-prefix">

                            <span>
                              ₹
                            </span>

                            <input
                              type="number"
                              value={
                                product.price
                              }
                              min="0"
                              onChange={(e) =>
                                handlePriceChange(
                                  product.id,
                                  e.target.value
                                )
                              }
                            />

                          </div>

                        </div>


                        <div className="product-edit-field">

                          <label>
                            Stock Quantity
                          </label>

                          <input
                            type="number"
                            value={
                              product.stock ??
                              0
                            }
                            min="0"
                            onChange={(e) =>
                              handleStockChange(
                                product.id,
                                e.target.value
                              )
                            }
                          />

                        </div>


                        <div className="product-availability-row">

                          <div>

                            <strong>
                              Availability
                            </strong>

                            <p>
                              {Number(
                                product.stock ||
                                  0
                              )}{" "}
                              items in stock
                            </p>

                          </div>


                          <button
                            className={
                              product.available !==
                                false &&
                              Number(
                                product.stock ||
                                  0
                              ) > 0
                                ? "availability-toggle on"
                                : "availability-toggle off"
                            }
                            onClick={() =>
                              handleAvailabilityChange(
                                product.id
                              )
                            }
                          >

                            <span />

                          </button>

                        </div>


                        <button
                          className="delete-product-btn"
                          onClick={() =>
                            handleDeleteProduct(
                              product.id
                            )
                          }
                        >
                          🗑 Delete Product
                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </section>

        )}


        {/* =================================================
                    ADD / EDIT PRODUCT
        ================================================= */}

        {activeTab ===
          "add-product" && (

          <section className="vendor-page">

            <div className="vendor-page-heading">

              <div>

                <h2>
                  {editingProductId
                    ? "Edit Product"
                    : "Add New Product"}
                </h2>

                <p>
                  {editingProductId
                    ? "Update your product details below."
                    : "Add a new product to your store."}
                </p>

              </div>

            </div>


            <div className="add-product-layout">

              <form
                className="add-product-form"
                onSubmit={
                  editingProductId
                    ? handleUpdateProduct
                    : handleAddProduct
                }
              >

                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Product Name *
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Fresh Apples"
                      value={
                        productName
                      }
                      onChange={(e) =>
                        setProductName(
                          e.target.value
                        )
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Category *
                    </label>

                    <select
                      value={
                        productCategory
                      }
                      onChange={(e) =>
                        setProductCategory(
                          e.target.value
                        )
                      }
                    >

                      <option value="">
                        Select category
                      </option>

                      {categories.map(
                        (category) => (

                          <option
                            key={
                              category
                            }
                            value={
                              category
                            }
                          >
                            {category}
                          </option>

                        )
                      )}

                    </select>

                  </div>

                </div>


                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Price (₹) *
                    </label>

                    <input
                      type="number"
                      placeholder="Enter price"
                      min="0"
                      value={
                        productPrice
                      }
                      onChange={(e) =>
                        setProductPrice(
                          e.target.value
                        )
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Stock Quantity *
                    </label>

                    <input
                      type="number"
                      placeholder="Enter quantity"
                      min="0"
                      value={
                        productStock
                      }
                      onChange={(e) =>
                        setProductStock(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>


                <div className="form-group full-width">

                  <label>
                    Product Image URL
                  </label>

                  <input
                    type="text"
                    placeholder="Paste product image URL here"
                    value={
                      productImage
                    }
                    onChange={(e) =>
                      setProductImage(
                        e.target.value
                      )
                    }
                  />

                  <small>
                    Add an image URL to display the
                    product photo.
                  </small>

                </div>


                <label className="availability-checkbox">

                  <input
                    type="checkbox"
                    checked={
                      productAvailable
                    }
                    onChange={(e) =>
                      setProductAvailable(
                        e.target.checked
                      )
                    }
                  />

                  <div>

                    <strong>
                      Available for customers
                    </strong>

                    <p>
                      Customers can see and purchase
                      this product.
                    </p>

                  </div>

                </label>


                <div className="form-actions">

                  <button
                    type="button"
                    className="cancel-vendor-btn"
                    onClick={() => {

                      resetForm();

                      setActiveTab(
                        "products"
                      );

                    }}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="primary-vendor-btn"
                  >

                    {editingProductId
                      ? "Save Changes"
                      : "Add Product"}

                  </button>

                </div>

              </form>


              <div className="product-preview-card">

                <p className="preview-title">
                  PRODUCT PREVIEW
                </p>


                <div className="preview-image">

                  {productImage ? (

                    <img
                      src={
                        productImage
                      }
                      alt="Product preview"
                      onError={(e) => {
                        e.target.style.display =
                          "none";
                      }}
                    />

                  ) : (

                    <span>
                      📦
                    </span>

                  )}

                </div>


                <h3>
                  {productName ||
                    "Product Name"}
                </h3>


                <p className="preview-category">
                  {productCategory ||
                    "Product Category"}
                </p>


                <h2>
                  ₹
                  {productPrice ||
                    "0"}
                </h2>


                <p className="preview-stock">
                  Stock:{" "}
                  {productStock ||
                    "0"}{" "}
                  units
                </p>

              </div>

            </div>

          </section>

        )}


        {/* =================================================
                          ORDERS
        ================================================= */}

        {activeTab ===
          "orders" && (

          <section className="vendor-page">

            <div className="vendor-page-heading">

              <div>

                <h2>
                  Orders
                </h2>

                <p>
                  Manage customer orders from here.
                </p>

              </div>

            </div>


            <div className="empty-vendor-state">

              <div className="empty-icon">
                🛍
              </div>

              <h3>
                No orders yet
              </h3>

              <p>
                Customer orders will appear here
                once your store starts receiving them.
              </p>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default VendorDashboard;

