// src/components/payment/ValidatePayment.jsx
import React, { useState } from 'react';
import { validatePayment } from '../../services/paymentService';

const ValidatePayment = () => {
  const [transactionId, setTransactionId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await validatePayment(transactionId);
      alert('Payment validated successfully: ' + response.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Validate Payment</h2>
      <div className="mb-3">
        <label>Transaction ID</label>
        <input
          type="text"
          className="form-control"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Validate Payment
      </button>
    </form>
  );
};

export default ValidatePayment;
