// src/components/payment/PaymentsByOrder.jsx
import React, { useState } from 'react';
import { getPaymentsByOrderId } from '../../services/paymentService';

const PaymentsByOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [payments, setPayments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getPaymentsByOrderId(orderId);
      setPayments(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Payments By Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Order ID</label>
          <input
            type="number"
            className="form-control"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Get Payments
        </button>
      </form>

      {payments.length > 0 && (
        <div className="mt-4">
          <h3>Payments</h3>
          <ul className="list-group">
            {payments.map((payment) => (
              <li className="list-group-item" key={payment.paymentId}>
                {payment.paymentMethod} - {payment.amount} ({payment.paymentStatus})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PaymentsByOrder;
