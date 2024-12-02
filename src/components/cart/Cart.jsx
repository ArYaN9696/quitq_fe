import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateItemQuantity,
  removeFromCart,
  clearCart,
  setCartItems,
} from "../../store/cartSlice";
import { getCartItems } from "../../services/cartService";
import useAuth from "../../hooks/useAuth";

const Cart = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!auth.token) {
        setError("Please login to view cart.");
        return;
      }
      try {
        setLoading(true);
        const response = await getCartItems({
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        dispatch(setCartItems(response || []));
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [auth.token, dispatch]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    const cartItem = {
      product: {
        name: productName,
        id: parseInt(productId, 10),
        price: 100,
      },
      quantity: parseInt(quantity, 10),
    };

    dispatch(addToCart(cartItem));
    alert("Product added to cart");
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateItemQuantity({ id: productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (loading)
    return <div className="text-center mt-4">Loading cart items...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
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
                <tr key={item.id}>
                  <td>{item.name || "Unknown Product"}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="form-control"
                      min="1"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveItem(item.id)}
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

      <div className="mt-3">
        <h4>Total: ₹{total}</h4>
      </div>

      {cartItems.length > 0 && (
        <button className="btn btn-warning mt-3" onClick={handleClearCart}>
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default Cart;
