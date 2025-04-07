import React, { useState } from 'react';
import '../styles/Marketplace.css';
import AddProduct from '../pages/AddProduct';
import BuyNowModal from '../components/BuyNowModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Get previously added products
const savedProducts = JSON.parse(localStorage.getItem('newProducts')) || [];

const defaultProducts = [
  { name: 'rice', price: 250, image: 'src/assets/rice.jpg' },
  { name: 'tomato', price: 500, image: 'src/assets/tomato.jpg' },
  { name: 'wheat', price: 150, image: 'src/assets/wheat.jpg' },
];

const initialProducts = [...defaultProducts, ...savedProducts];

const Marketplace = () => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const addProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);

    const addedOnly = updatedProducts.slice(defaultProducts.length);
    localStorage.setItem('newProducts', JSON.stringify(addedOnly));
  };

  const openModal = (product, index) => {
    setSelectedProduct(product);
    setSelectedIndex(index);
  };

  const confirmPurchase = () => {
    const updated = products.filter((_, i) => i !== selectedIndex);
    setProducts(updated);
  
    const newSaved = updated.filter(
      p => !defaultProducts.some(dp => dp.name === p.name && dp.price === p.price)
    );
    localStorage.setItem('newProducts', JSON.stringify(newSaved));
  
    // Add to order history
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orderHistory.push(selectedProduct);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  
    setSelectedProduct(null);
    setSelectedIndex(null);
  
    toast.success('✅ Order placed successfully!');
  };
  

  return (
    <div className="marketplace-container">
      <h1>MARKETPLACE</h1>
      <p>Support local businesses by exploring rural products.</p>

      <AddProduct onAdd={addProduct} />

      <div className="product-grid">
        {products.map((item, idx) => (
          <div className="product-card" key={idx}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => openModal(item, idx)}>Buy Now</button>
          </div>
        ))}
      </div>

      <BuyNowModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onConfirm={confirmPurchase}
      />
    </div>
  );
};

export default Marketplace;