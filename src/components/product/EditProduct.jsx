import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../../services/productService';

const EditProduct = () => {
  const { productId } = useParams(); // Extract productId from the route
  const [product, setProduct] = useState(null); // Product state starts as null
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Fetch product details when component loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data); // Set fetched product data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching product for edit:', error);
        setError('Failed to fetch product data.');
        setLoading(false); // Set loading to false even on error
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ProductName: product.name,
      Description: product.description,
      Price: parseFloat(product.price),
      Stock: parseInt(product.stock, 10),
      ImageUrl: product.imageUrl || '',
      SubcategoryId: parseInt(product.subcategoryId, 10),
    };

    try {
      console.log('Submitting updated product:', productData);
      const response = await updateProduct(productId, productData);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert(error.message || 'Failed to update product. Please try again.');
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Name"
              value={product?.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={product?.description || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              className="form-control"
              placeholder="Price"
              value={product?.price || 0}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input
              type="number"
              name="stock"
              id="stock"
              className="form-control"
              placeholder="Stock"
              value={product?.stock || 0}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subcategoryId" className="form-label">Subcategory ID</label>
            <input
              type="number"
              name="subcategoryId"
              id="subcategoryId"
              className="form-control"
              placeholder="Subcategory ID"
              value={product?.subcategoryId || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              className="form-control"
              placeholder="Image URL"
              value={product?.imageUrl || ''}
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Update Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
