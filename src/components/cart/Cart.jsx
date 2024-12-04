import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCartItems,
  addToCartThunk,
  updateCartItemThunk,
  removeFromCartThunk,
  clearCartThunk,
} from '../../store/cartSlice';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../cust_CSS/cart.css'

const Cart = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const status = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);

  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (auth.token) {
      dispatch(getCartItems());
    }
  }, [auth.token, dispatch]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const cartItem = {
        ProductName: productName,
        ProductId: parseInt(productId, 10),
        Quantity: parseInt(quantity, 10),
      };
      await dispatch(addToCartThunk(cartItem));
      alert('Product added to cart!');
      setProductName('');
      setProductId('');
      setQuantity(1);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await dispatch(updateCartItemThunk({ ProductId: productId, Quantity: newQuantity }));
      alert('Cart item updated!');
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(removeFromCartThunk(productId));
      alert('Item removed from cart!');
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await dispatch(clearCartThunk());
      alert('Cart cleared!');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (status === 'loading') return <div className="text-center mt-4">Loading cart items...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>

      {/* Add to Cart Form */}
      {/* <form onSubmit={handleAddToCart} className="mt-4">
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              Add to Cart
            </button>
          </div>
        </div>
      </form> */}

      {/* Cart Items Table */}
      {cartItems.length === 0 ? (
        <div className="alert alert-info mt-3">Your cart is empty.</div>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productName || 'Unknown Product'}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value))}
                      className="form-control"
                      min="1"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-warning" onClick={handleClearCart}>
            Clear Cart
          </button>
          <button className="btn btn-success" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
