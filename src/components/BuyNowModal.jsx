import React from 'react';
import '../styles/BuyNowModal.css';

const BuyNowModal = ({ product, onClose, onConfirm }) => {
  if (!product) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>Buy Product</h2>
        <img src={product.image} alt={product.name} className="modal-image" />
        <h3>{product.name}</h3>
        <p>Price: ₹{product.price}</p>

        <label>Select Payment Method:</label>
        <select className="Select">
          <option>UPI</option>
          <option>Cash on Delivery</option>
          <option>PhonePe</option>
          <option>Google Pay</option>
        </select>

        <div className="modal-buttons">
          <button onClick={onConfirm}>Confirm Payment</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;