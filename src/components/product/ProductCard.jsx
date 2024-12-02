import React, { useState } from 'react';
import { addToCart } from '../../services/cartService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1); // Default quantity

  const handleAddToCart = async () => {
    try {
      if (quantity < 1) {
        toast.error('Quantity must be at least 1!', { position: "top-right" });
        return;
      }

      if (!product?.productName) { // Correctly check for product name
        toast.error('Product name is required!', { position: "top-right" });
        return;
      }

      const cartItem = { 
        ProductName: product.productName, // Use the actual product name from the product object
        ProductId: product.productId, // Use the actual product ID from the product object
        Quantity: quantity, // Use the quantity state
      };

      console.log('Submitting cart item:', cartItem);
      const response = await addToCart(cartItem);
      toast.success(response.message || 'Product added to cart successfully!', { position: "top-right" });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error(error.message || 'Failed to add product to cart.', { position: "top-right" });
    }
  };

  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <img 
        src={product.imageUrl} 
        className="card-img-top" 
        alt={product.productName || 'Product'} 
        style={{
          height: '200px', 
          objectFit: 'cover', 
          width: '100%', 
        }} 
      />
      <div className="card-body">
        <h5 className="card-title">{product.productName}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">
          <strong>Price:</strong> Rs.{product.price}
        </p>

        {/* Quantity Selector */}
        <div className="mb-2">
          <label htmlFor={`quantity-${product.productId}`} className="form-label">
            Quantity:
          </label>
          <input
            id={`quantity-${product.productId}`}
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="form-control"
            style={{ width: '80px' }}
          />
        </div>

        {/* Add to Cart Button */}
        <button onClick={handleAddToCart} className="btn btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
