import React, { useState } from 'react';
import './App.css';
const PRODUCTS = [
  { id: 1, name: 'Parda', price: 350, category: 'Aviators', bg: '#e6fcf5', img: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Ray-Ban Classic', price: 210, category: 'Wayfarers', bg: '#ebfbee', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Michael Kors', price: 189, category: 'Round Frames', bg: '#fffbeb', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281501f?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'Oakley Sport', price: 150, category: 'Aviators', bg: '#fef2f2', img: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=400&q=80' },
  { id: 5, name: 'Tom Ford', price: 420, category: 'Wayfarers', bg: '#f3e8ff', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80' },
];
const CATEGORIES = ['All', 'Aviators', 'Wayfarers', 'Round Frames'];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Aviators');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="web-app-wrapper">
      <div className="web-app-container">
        
        <header className="app-header">
          {!isSearchActive ? (
            <>
              <h1 className="logo">GLASSES</h1>
              <button className="icon-btn" onClick={() => setIsSearchActive(true)}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </>
          ) : (
            <div className="search-bar-container page-animate">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search glasses..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button className="close-btn" onClick={() => { setIsSearchActive(false); setSearchQuery(''); }}>×</button>
            </div>
          )}
        </header>
        <div className="hero-banner">
          <div className="hero-content">
            <h2>Find Your Perfect Shades</h2>
            <p>The latest collection, crafted for every style and season.</p>
            <button className="shop-now-btn">Shop Now →</button>
          </div>
        </div>
        <div className="categories-container">
          {CATEGORIES.map(category => (
            <button 
              key={category}
              className={`category-pill ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <div className="empty-state">No glasses found. Try adjusting your search.</div>
          ) : (
            filteredProducts.map(product => (
              <div key={product.id} className="product-card page-animate">
                <div className="product-image-container" style={{ backgroundColor: product.bg }}>
                  <img src={product.img} alt={product.name} className="product-image" />
                </div>
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${product.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="floating-cart-banner">
          <div className="cart-icon-mini">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="15" r="4"></circle>
              <circle cx="18" cy="15" r="4"></circle>
              <line x1="14" y1="15" x2="10" y2="15"></line>
              <line x1="6" y1="11" x2="18" y2="11"></line>
            </svg>
          </div>
          <div className="cart-text">
            <strong>Shopping Now</strong>
            <span>On Orders Over $350</span>
          </div>
          <button className="arrow-btn">»</button>
        </div>

      </div>
    </div>
  );
}
export default App;