import React from 'react';
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
// import Dashboard from './pages/Dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
   
        <Route path="/Product" element={<ProductList />} />
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

      </Routes>
    </Router>
  );
}

export default App;
