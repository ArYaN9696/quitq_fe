import React, { useState } from "react";
import { getProductById } from "../../services/productService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../cust_CSS/productsDetails.css"

const ProductDetails = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const handleFetchProduct = async () => {
    if (!productId) {
      alert("Please enter a valid Product ID.");
      return;
    }

    setIsFetching(true);
    setError("");

    try {
      const fetchedProduct = await getProductById(productId);
      setProduct(fetchedProduct);
    } catch (err) {
      console.error("Failed to fetch product details:", err);
      setError(err.message || "Failed to fetch product details.");
      setProduct(null);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Product Details</h2>

      {/* Product ID Input */}
      {!product && (
        <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <div className="mb-3">
            <label htmlFor="productId" className="form-label">
              Enter Product ID
            </label>
            <input
              type="number"
              id="productId"
              className="form-control"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter the Product ID"
              required
            />
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={handleFetchProduct}
            disabled={isFetching}
          >
            {isFetching ? "Fetching..." : "Get Product Details"}
          </button>
        </div>
      )}

      {/* Product Details Display */}
      {product && (
        <div className="card p-4 shadow-lg mt-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h3 className="text-center mb-4">Product Information</h3>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <strong>Product ID:</strong> {product.productId}
          </div>
          <div className="mb-3">
            <strong>Product Name:</strong> {product.productName}
          </div>
          <div className="mb-3">
            <strong>Description:</strong> {product.description}
          </div>
          <div className="mb-3">
            <strong>Price:</strong> ₹{product.price.toFixed(2)}
          </div>
          <div className="mb-3">
            <strong>Stock:</strong> {product.stock}
          </div>
          <div className="mb-3">
            <strong>Image URL:</strong> {product.imageUrl}
          </div>
          <div className="mb-3">
            <strong>Subcategory ID:</strong> {product.subcategoryId}
          </div>
          <div className="mb-3">
            <strong>Seller ID:</strong> {product.sellerId}
          </div>

          <button
            className="btn btn-secondary mt-3 w-100"
            onClick={() => setProduct(null)}
          >
            Back to Search
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;