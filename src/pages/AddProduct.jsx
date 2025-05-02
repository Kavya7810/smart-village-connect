import React, { useState } from 'react';
import '../styles/AddProduct.css';

const AddProduct = ({ onAdd }) => {
  const [product, setProduct] = useState({ name: "", price: "", image: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.image) {
      return;
    }

    onAdd(product);
    setProduct({ name: "", price: "", image: "" });
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
        />

        {product.image && (
          <img
            src={product.image}
            alt="Preview"
            className="preview-img"
          />
        )}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
