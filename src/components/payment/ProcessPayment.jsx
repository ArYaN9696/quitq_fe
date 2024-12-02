import React, { useState } from 'react';
import { processPayment } from '../../services/paymentService';

const ProcessPayment = () => {
  const [paymentData, setPaymentData] = useState({
    orderId: '',
    paymentMethod: '',
    amount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure proper formatting of the payload
    const formattedData = {
      orderId: parseInt(paymentData.orderId, 10), // Ensure orderId is an integer
      paymentMethod: paymentData.paymentMethod,
      amount: parseFloat(paymentData.amount), // Ensure amount is a decimal
    };

    try {
      console.log("Submitting payment:", formattedData);
      const response = await processPayment(formattedData);
      alert(`Payment processed successfully: ${response.message}`);
    } catch (error) {
      console.error("Error processing payment:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to process payment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Process Payment</h2>
      <div className="mb-3">
        <label>Order ID</label>
        <input
          type="number"
          name="orderId"
          className="form-control"
          value={paymentData.orderId}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Payment Method</label>
        <select
          name="paymentMethod"
          className="form-control"
          value={paymentData.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="">Select Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="UPI">UPI</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Amount</label>
        <input
          type="number"
          step="0.01"
          name="amount"
          className="form-control"
          value={paymentData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Process Payment
      </button>
    </form>
  );
};

export default ProcessPayment;
