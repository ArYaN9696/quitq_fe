import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductById,updateProduct } from "../../services/productService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const handleFetchProduct = async () => {
    if (!productId) {
      toast.error("Please enter a valid Product ID.", { position: "top-right" });
      return;
    }

    try {
      setIsFetching(true);
      const fetchedProduct = await getProductById(productId);
      setProduct(fetchedProduct);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error(error.message || "Failed to fetch product details.", { position: "top-right" });
      setIsFetching(false);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (!product) {
      toast.error("No product loaded to update.", { position: "top-right" });
      return;
    }

    try {
      await updateProduct(productId, product);
      toast.success("Product updated successfully!", { position: "top-right" });
      navigate("/products"); // Navigate back to products page
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.message || "Failed to update product.", { position: "top-right" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Product</h2>

      {/* Fetch Product Section */}
      {!product && (
        <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <div className="mb-3">
            <label htmlFor="productId" className="form-label">
              Product ID
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
            {isFetching ? "Fetching..." : "Fetch Product"}
          </button>
        </div>
      )}

      {/* Edit Product Section */}
      {product && (
        <form onSubmit={handleUpdateProduct} className="card p-4 shadow-lg mt-4">
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="form-control"
              value={product.productName || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={product.description || ""}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="form-control"
              value={product.price || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="stock" className="form-label">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              className="form-control"
              value={product.stock || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              className="form-control"
              value={product.imageUrl || ""}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Update Product
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
