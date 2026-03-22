import React, { useState, useMemo } from 'react';
import './App.css';
const PRODUCTS = [
  { id: 'p1', name: 'Wireless Noise-Cancelling Headphones', price: 299, emoji: '🎧', bg: '#e0e7ff' },
  { id: 'p2', name: 'Mechanical Keyboard (Cherry MX)', price: 129, emoji: '⌨️', bg: '#fce7f3' },
  { id: 'p3', name: 'Ergonomic Optical Mouse', price: 79, emoji: '🖱️', bg: '#dcfce7' },
  { id: 'p4', name: '4K Ultra HD Monitor', price: 399, emoji: '🖥️', bg: '#fef08a' },
  { id: 'p5', name: 'USB-C Fast Charging Hub', price: 45, emoji: '🔌', bg: '#ffedd5' },
  { id: 'p6', name: 'Adjustable Laptop Stand', price: 35, emoji: '💻', bg: '#f3f4f6' },
];
function App() {
  const [cart, setCart] = useState([]);
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);
  const totalItems = useMemo(() => {  
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const handleInlineQuantityChange = (id, event) => {
    const val = event.target.value;
    if (val === '') {
       updateQuantity(id, 0); 
       return;
    }
    
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) {
      updateQuantity(id, parsed);
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };
  const clearCart = () => setCart([]);
  return (
    <div className="app-root page-animate">
      <header className="app-header">
        <h1>TechStore 🛒</h1>
        <div className="header-cart-info">
          <span>{totalItems} items</span>
        </div>
      </header>
      <div className="store-layout">
        <div className="catalog-section">
          <h2>Available Products</h2>
          <div className="product-grid">
            {PRODUCTS.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-icon" style={{ backgroundColor: product.bg }}>
                  {product.emoji}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                </div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  + Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-section">
          <div className="cart-panel">
            <div className="cart-header">
              <h2>Your Cart</h2>
              {cart.length > 0 && (
                <button className="clear-cart-btn" onClick={clearCart}>Empty Cart</button>
              )}
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart-state">
                <span className="empty-icon">🛍️</span>
                <p>Your cart is empty.</p>
                <p className="empty-subtext">Add some items from the catalog to get started!</p>
              </div>
            ) : (
              <div className="cart-items-list">
                {cart.map(item => (
                  <div key={item.id} className="cart-item page-animate">
                    <div className="cart-item-icon" style={{ backgroundColor: item.bg }}>
                      {item.emoji}
                    </div>
                    
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">${item.price}</p>
                    </div>

                    <div className="quantity-controls">
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <input 
                        type="number" 
                        className="qty-input" 
                        value={item.quantity}
                        onChange={(e) => handleInlineQuantityChange(item.id, e)}
                        min="0"
                      />
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-item-total">
                      ${item.price * item.quantity}
                    </div>

                    <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {cart.length > 0 && (
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="summary-row">
                  <span>Taxes (8%)</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <hr />
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
export default App;