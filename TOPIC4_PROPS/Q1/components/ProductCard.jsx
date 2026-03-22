import React from 'react';

const ProductCard = ({ title, price, image, mg = "250 mg" }) => {
  return (
    <div className="product-card">
      <div className="card-content">
        <div className="text-section">
          <span className="back-btn">‹ Back</span>
          <h1 className="product-title">{title}</h1>
          <p className="product-mg">{mg}</p>
        </div>

        <div className="image-section">
          <img src={image} alt={title} className="product-image" />
        </div>

        <div className="action-section">
          <div className="quantity-selector">
            <span className="qty-dot active">30</span>
            <span className="qty-dot">60</span>
            <span className="qty-dot">90</span>
          </div>
          <p className="info-link">ⓘ Overview, Dosage and Side effect</p>
        </div>
      </div>

      <div className="card-footer">
        <div className="footer-left">
          <p>We work in close partnership with our clients including the NHS, 
             the military, and major private healthcare providers.</p>
        </div>
        <div className="footer-center">
          <h2 className="price">{price} PKR.</h2>
        </div>
        <div className="footer-right">
          <div className="counter">
            <button>−</button>
            <span>1</span>
            <button>+</button>
          </div>
          <button className="buy-btn">🛒 Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;