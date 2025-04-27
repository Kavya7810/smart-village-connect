import React, { useState, useEffect } from 'react';
import '../styles/Marketplace.css';
import BuyNowModal from '../components/BuyNowModal';
import axios from 'axios';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8080/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        showPopup('❌ Failed to load products');
      }
    };

    fetchProducts();

    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const showPopup = (message) => {
    const popup = document.createElement("div");
    popup.className = "popup-message";
    popup.innerText = message;
    document.body.appendChild(popup);
    setTimeout(() => {
      popup.classList.add("visible");
    }, 100);
    setTimeout(() => {
      popup.classList.remove("visible");
      setTimeout(() => document.body.removeChild(popup), 500);
    }, 3000);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const confirmPurchase = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      showPopup("⚠️ Email not found. Please login again.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8080/orders/villager?email=${email}`);
      const villagerName = res.data.name;

      await axios.post("http://localhost:8080/orders", {
        villagerName,
        productName: selectedProduct.name,
        price: selectedProduct.price,
        paymentType: "Cash",
      });

      const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
      orderHistory.push(selectedProduct);
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

      showPopup('✅ Order placed successfully!');
    } catch (error) {
      console.error("Order saving error:", error);
      showPopup("❌ Failed to place order");
    }

    setSelectedProduct(null);
  };

  return (
    <div className="marketplace-container">
      <h1 className="para1">MARKETPLACE</h1>
      <h1 className="para2">Support local businesses by exploring rural products.</h1>

      <div className="product-grid">
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          products.map((item, idx) => (
            <div className="product-card" key={idx}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <button onClick={() => openModal(item)}>Buy Now</button>
            </div>
          ))
        )}
      </div>

      <BuyNowModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onConfirm={confirmPurchase}
      />
    </div>
  );
};

export default Marketplace;
