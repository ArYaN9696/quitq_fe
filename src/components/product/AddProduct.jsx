import React, { useState } from 'react';
import { createProduct } from '../../services/productService';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const productData = {
      ProductName: product.name,  
      Description: product.description,
      Price: parseFloat(product.price),   
      Stock: parseInt(product.stock),     
      SubcategoryId: parseInt(product.categoryId),  
      ImageUrl: product.imageUrl
    };
  
    if (!productData.ProductName || !productData.Description || productData.Price <= 0 || productData.Stock <= 0 || !productData.SubcategoryId) {
      alert('Please fill out all required fields with valid data.');
      return;
    }
  
    try {
      console.log('Submitting product data:', productData);  
      const response = await createProduct(productData);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error creating product:', error.message);  
      alert(error.message || 'There was an error adding the product.');
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="product-form">
        <h2 className="text-center mb-4">Add Product</h2>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Product Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            placeholder="Enter product description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            placeholder="Enter price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Stock Quantity</label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="form-control"
            placeholder="Enter stock quantity"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="form-control"
            placeholder="Enter image URL (optional)"
            value={product.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">Category ID</label>
          <input
            type="number"
            id="categoryId"
            name="categoryId"
            className="form-control"
            placeholder="Enter category ID"
            value={product.categoryId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
