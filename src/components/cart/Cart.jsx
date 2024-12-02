import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, addToCartThunk, updateCartItemThunk, removeFromCartThunk, clearCartThunk } from '../../store/cartSlice';
import useAuth from '../../hooks/useAuth';

const Cart = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [productName, setProductName] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        await dispatch(getCartItems());
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Failed to fetch cart items.');
      } finally {
        setLoading(false);
      }
    };
    if (auth.token) fetchCartItems();
  }, [auth.token, dispatch]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const cartItem = {
        ProductName: productName,
        ProductId: parseInt(productId, 10),
        Quantity: parseInt(quantity, 10),
      };
      const response = await dispatch(addToCartThunk(cartItem));
      alert(response.payload.message); // Assuming the response has a message property
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const response = await dispatch(updateCartItemThunk({ ProductId: productId, Quantity: newQuantity }));
      alert(response.payload.message); // Assuming the response has a message property
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await dispatch(removeFromCartThunk(productId));
      alert(response.payload.message); // Assuming the response has a message property
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await dispatch(clearCartThunk());
      alert(response.payload.message); // Assuming the response has a message property
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading cart items...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      {/* Add to Cart Form */}
      <form onSubmit={handleAddToCart} className="mt-4">
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
      </form>

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
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(item.productId)}>
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
        <button className="btn btn-warning mt-3" onClick={handleClearCart}>
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default Cart;
