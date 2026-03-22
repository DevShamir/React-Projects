import React from 'react';

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    // Logs the product to the console as requested
    console.log('Added to cart:', product);
    alert(`${product.name} added to cart! (Check console)`);
  };

  return (
    <div className={`product-card ${product.bgColorClass}`}>
      {product.badge && <span className="product-badge">{product.badge}</span>}
      
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
      </div>

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;