import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import './App.css';

// Mock data using placeholder images (replace with your transparent PNGs)
const PRODUCTS = [
  { id: 1, name: 'Tiffany', price: 360, image: 'https://cdn-icons-png.flaticon.com/512/3144/3144819.png', bgColorClass: 'bg-light-blue', badge: null },
  { id: 2, name: 'Michael Kors', price: 189, image: 'https://cdn-icons-png.flaticon.com/512/3144/3144819.png', bgColorClass: 'bg-light-yellow', badge: '20%' },
  { id: 3, name: 'Parda', price: 350, image: 'https://cdn-icons-png.flaticon.com/512/3144/3144819.png', bgColorClass: 'bg-light-green', badge: null },
  { id: 4, name: 'Ray-Ban Aviator', price: 250, image: 'https://cdn-icons-png.flaticon.com/512/3144/3144819.png', bgColorClass: 'bg-light-gray', badge: null },
  { id: 5, name: 'Gucci Oversized', price: 420, image: 'https://cdn-icons-png.flaticon.com/512/3144/3144819.png', bgColorClass: 'bg-light-purple', badge: 'New' },
  { id: 6, name: 'Oakley Sport', price: 180, image: 'https://cdn-icons-png.flaticon.com/512/3144/3144819.png', bgColorClass: 'bg-light-pink', badge: null },
];

const CATEGORIES = ['Aviators', 'Wayfarers', 'Round Frames', 'Sports', 'Designer'];

function App() {
  const [activeCategory, setActiveCategory] = useState('Aviators');

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1 className="logo">GLASSES</h1>
        <button className="icon-btn search-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h2>Find Your Perfect Shades</h2>
          <p>Latest collection, crafted every style.</p>
          <a href="#shop" className="shop-now-link">Shop Now &rarr;</a>
        </div>
        <div className="hero-image-wrapper">
          {/* Placeholder for the large purple glasses in the banner */}
          <img src="https://cdn-icons-png.flaticon.com/512/3144/3144819.png" alt="Featured Glasses" className="hero-img" style={{ filter: 'hue-rotate(250deg)' }} />
        </div>
      </section>

      {/* Categories */}
      <nav className="category-nav">
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`category-pill ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      {/* Product Grid */}
      <main className="product-grid">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}

export default App;