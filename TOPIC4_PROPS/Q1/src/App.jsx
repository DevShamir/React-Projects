import React from 'react';
import ProductCard from '../components/ProductCard';
import './App.css';

function App() {
  const productData = {
    title: "Sleep 30 Dissolvable Wafers",
    price: "50.00",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop"
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">🟣 Aspirin</div>
        <div className="nav-links">
          <button className="nav-pill active">Products</button>
          <button className="nav-pill">Contact</button>
        </div>
        <div className="nav-icons">
          <span>👤</span>
          <span className="cart-icon">🛒<small>3</small></span>
        </div>
      </nav>
      
      <ProductCard 
        title={productData.title}
        price={productData.price}
        image={productData.image}
      />
    </div>
  );
}

export default App;