import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';

const PRODUCTS = [
  { id: 1, name: 'Parda Aviator', price: 350, category: 'Aviators', bg: '#e6fcf5', img: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=400&q=80', description: 'Classic aviator style with modern premium materials. 100% UV protection.' },
  { id: 2, name: 'Ray-Ban Classic', price: 210, category: 'Wayfarers', bg: '#ebfbee', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80', description: 'The timeless wayfarer look that never goes out of style. Durable and iconic.' },
  { id: 3, name: 'Michael Kors', price: 189, category: 'Round Frames', bg: '#fffbeb', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281501f?auto=format&fit=crop&w=400&q=80', description: 'Elegant round frames perfect for a sophisticated, everyday look.' },
  { id: 4, name: 'Oakley Sport', price: 150, category: 'Aviators', bg: '#fef2f2', img: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=400&q=80', description: 'Durable and lightweight, designed specifically for active lifestyles and sports.' },
  { id: 5, name: 'Tom Ford Edge', price: 420, category: 'Wayfarers', bg: '#f3e8ff', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80', description: 'Premium designer frames to make a bold statement.' },
];

const CATEGORIES = ['All', 'Aviators', 'Wayfarers', 'Round Frames'];


function Navbar({ cartCount }) {
  return (
    <header className="navbar-wrapper">
      <nav className="store-navbar">
        <Link to="/" className="nav-logo">GLASSES.</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Store</Link>
          <Link to="/cart" className="nav-cart">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Catalog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="page-container page-animate">
      <div className="hero-banner">
        <div className="hero-content">
          <h2>Find Your Perfect Shades</h2>
          <p>The latest collection, crafted for every style.</p>
        </div>
        <div className="hero-search">
          <input 
            type="text" 
            placeholder="Search for glasses..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="categories-scroll">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">No products found matching your criteria.</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <div className="product-image-container" style={{ backgroundColor: product.bg }}>
                <img src={product.img} alt={product.name} className="product-image" />
              </div>
              <div className="product-details">
                <span className="product-category-sm">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) return <div className="page-container"><h2 className="empty-state">Product not found</h2></div>;

  return (
    <div className="page-container page-animate">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to Store</button>
      
      <div className="details-layout">
        <div className="details-image-box" style={{ backgroundColor: product.bg }}>
          <img src={product.img} alt={product.name} />
        </div>
        <div className="details-info">
          <span className="details-category">{product.category}</span>
          <h1 className="details-title">{product.name}</h1>
          <p className="details-price">${product.price}</p>
          <p className="details-desc">{product.description}</p>
          
          <div className="details-actions">
            <button className="add-cart-btn" onClick={() => addToCart(product)}>
              Add to Cart - ${product.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cart({ cartItems, updateQuantity, removeFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="page-container page-animate">
      <h2 className="page-title">Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p>Your cart is looking a little empty.</p>
          <Link to="/" className="continue-shopping">Browse Products</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img" style={{ backgroundColor: item.bg }}>
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">${item.price}</p>
                </div>
                
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <div className="cart-item-total">
                  ${item.price * item.quantity}
                </div>

                <button className="remove-btn" onClick={() => removeFromCart(item.id)} title="Remove Item">×</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
              <span>${total}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-text">Free</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}


function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('glasses-cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('glasses-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setToastMessage(`Added ${product.name} to cart`);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart => prevCart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const cartBadgeCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="app-root">
        <Navbar cartCount={cartBadgeCount} />
        <div className={`toast-notification ${toastMessage ? 'show' : ''}`}>
          ✅ {toastMessage}
        </div>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;