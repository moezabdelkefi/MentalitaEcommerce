import React from 'react';
import { FaTshirt, FaTruck, FaShieldAlt } from 'react-icons/fa';

const Advantages = () => {
  return (
    <section className="section">
      <h2 className="title">Why Choose Mentalita?</h2>
      <div className="card-container">
        <div className="card">
          <div className="icon-wrapper">
            <FaTshirt />
          </div>
          <div className="text-wrapper">
            <h3 className="subtitle">Oversized Fashion, Perfect Fit</h3>
            <p className="description">At Mentalita, we specialize in oversized shirts that combine comfort with style. Our pieces are designed for those who want to make a statement while feeling at ease.</p>
          </div>
        </div>
        <div className="card">
          <div className="icon-wrapper">
            <FaTruck />
          </div>
          <div className="text-wrapper">
            <h3 className="subtitle">Fast & Reliable Delivery</h3>
            <p className="description">We offer fast and reliable door-to-door delivery, ensuring that your favorite oversized shirts reach you quickly and without hassle.</p>
          </div>
        </div>
        <div className="card">
          <div className="icon-wrapper">
            <FaShieldAlt />
          </div>
          <div className="text-wrapper">
            <h3 className="subtitle">Secure Payments & Easy Returns</h3>
            <p className="description">Enjoy peace of mind with our secure payment options and hassle-free return policy. If the fit isn’t perfect, we've got you covered!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
