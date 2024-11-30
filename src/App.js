import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import NotFoundPage from './pages/NotFoundPage';  // If you have a NotFound page
import ProductList from './components/product/ProductList';
import ProductDetails from './components/product/ProductDetails';
import AddProduct from './components/product/AddProduct';
import EditProduct from './components/product/EditProduct';
import ProtectedRoute from './components/authentication/ProtectedRoute';
import Cart from './components/cart/Cart';
import useAuth from './hooks/useAuth';
// import Dashboard from './pages/Dashboard';
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import Navbar from "./components/navigation/Navbar";
import Sidebar from "./components/navigation/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { auth } = useAuth();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
   
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetails />} />

        <Route path="/AddProduct"  element={
            <ProtectedRoute allowedRoles={['seller']}>
              <AddProduct />
              </ProtectedRoute>} />
    
         <Route path="/edit-product/:productId"
          element={
            <ProtectedRoute allowedRoles={['seller', 'admin']}>
              <EditProduct />
            </ProtectedRoute>
          }
        /> 
         <Route path="/cart" element={<ProtectedRoute allowedRoles={['customer']}>
          <Cart userId={auth?.userId} /></ProtectedRoute>} />

      </Routes>
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
          {/* Navbar */}
          <Navbar toggleSidebar={toggleSidebar} />

          {/* Main content */}
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/CategoryPage" element={<CategoryPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
