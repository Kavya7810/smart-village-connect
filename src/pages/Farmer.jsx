import React, { useState, useEffect } from 'react';
import '../styles/Farmer.css';
import AddProduct from '../pages/AddProduct';

const Farmer = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  const showPopup = (message) => {
    const popup = document.createElement("div");
    popup.className = "popup-message";
    popup.innerText = message;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add("visible"), 100);
    setTimeout(() => {
      popup.classList.remove("visible");
      setTimeout(() => document.body.removeChild(popup), 500);
    }, 3000);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      showPopup("❌ Failed to fetch products from server.");
    }
  };

  const updatePrice = async (id, updatedPrice) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${id}/price`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: updatedPrice }),
      });

      const data = await response.json();

      if (response.ok) {
        showPopup("💰 Price updated!");
        fetchProducts();
        setEditId(null);
      } else {
        showPopup("❌ Failed to update price: " + data.message);
      }
    } catch (err) {
      console.error(err);
      showPopup("❌ Error updating price");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        showPopup("🗑️ Product deleted!");
        fetchProducts();
      } else {
        showPopup("❌ Failed to delete product: " + data.message);
      }
    } catch (err) {
      console.error(err);
      showPopup("❌ Error deleting product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await fetch("http://localhost:8080/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      if (response.ok) {
        showPopup("✅ Product added successfully!");
        fetchProducts();
      } else {
        showPopup("❌ Failed to add product: " + data.message);
      }
    } catch (err) {
      console.error(err);
      showPopup("❌ Error connecting to backend");
    }
  };

  return (
    <div className="marketplace-container">
      <h1>MARKETPLACE</h1>
      <p>Support local businesses by exploring rural products.</p>

      <AddProduct onAdd={addProduct} />

      <div className="product-grid">
        {products.map((item, idx) => (
          <div className="product-card" key={item._id || idx}>
            {item.image && <img src={item.image} alt={item.name} />}
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            {editId === item._id ? (
              <>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="New Price"
                  className="price_update"
                />
                <button onClick={() => updatePrice(item._id, newPrice)}>Update</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <button onClick={() => {
                setEditId(item._id);
                setNewPrice(item.price);
              }}>Edit Price</button>
            )}

            <button onClick={() => deleteProduct(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Farmer;



