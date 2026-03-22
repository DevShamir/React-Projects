import React from 'react';

const Contact = () => {
  return (
    <div className="page-animate">
      <section className="action-banner">
        <div className="banner-content">
          <h2>Contact Administration</h2>
          <p>Send a message to the school admin for support.</p>
        </div>
        <form className="add-student-form" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="form-group" style={{ width: '100%' }}>
            <input type="text" placeholder="Your Name" />
          </div>
          <div className="form-group" style={{ width: '100%' }}>
            <input type="email" placeholder="Your Email" />
          </div>
          <div className="form-group" style={{ width: '100%' }}>
            <textarea placeholder="Your Message" rows="4" style={{ width: '100%', padding: '15px 20px', borderRadius: '16px', border: '1px solid #fff', outline: 'none', 
                fontFamily: 'inherit' }}></textarea>
          </div>
          <button type="button" className="primary-btn" onClick={() => alert('Message Sent!')}>Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;