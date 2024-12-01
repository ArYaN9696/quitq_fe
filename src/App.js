import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductList from "./components/product/ProductList";
import ProductDetails from "./components/product/ProductDetails";
import AddProduct from "./components/product/AddProduct";
import EditProduct from "./components/product/EditProduct";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import Cart from "./components/cart/Cart";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import OrderDetails from "./components/order/OrderDetails.jsx";
import OrderHistory from "./components/order/OrderHistory";
import Checkout from "./components/order/Checkout";
import Navbar from "./components/navigation/Navbar";
import Sidebar from "./components/navigation/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import useAuth from "./hooks/useAuth";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { auth } = useAuth();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="d-flex" style={{ position: "relative", height: "100vh" }}>
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div
          className="main-content"
          style={{
            flex: 1,
            paddingTop: "56px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Navbar toggleSidebar={toggleSidebar} />

          <div className="container mt-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<ProductDetails />} />

              {/* Protected Routes */}
              <Route
                path="/add-product"
                element={
                  <ProtectedRoute allowedRoles={["seller"]}>
                    <AddProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-product/:productId"
                element={
                  <ProtectedRoute allowedRoles={["seller", "admin"]}>
                    <EditProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute allowedRoles={["customer"]}>
                    <Cart userId={auth?.userId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:orderId"
                element={
                  <ProtectedRoute allowedRoles={["customer", "seller", "admin"]}>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-history"
                element={
                  <ProtectedRoute allowedRoles={["customer","admin"]}>
                    <OrderHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute allowedRoles={["customer"]}>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route path="/category-page" element={<CategoryPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
