import React, { useState } from 'react';
import { client } from '../lib/client';
import Product from '../components/Product';
import QuickView from '../components/QuickView';

const ProductsPage = ({ products }) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleColorChange = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredProducts = products.filter((product) => {
    const matchesColor =
      selectedColors.length === 0 ||
      product.colors.some((color) => selectedColors.includes(color.hex));
    const matchesSize =
      selectedSizes.length === 0 ||
      product.sizes.some((sizeObj) => selectedSizes.includes(sizeObj.size));
    return matchesColor && matchesSize;
  });

  // Get unique sizes
  const uniqueSizes = [
    ...new Set(products.flatMap((product) => product.sizes.map((sizeObj) => sizeObj.size))),
  ];

  // Get unique colors
  const uniqueColors = [
    ...new Set(products.flatMap((product) => product.colors.map((color) => color.hex))),
  ];

  return (
    <div className="page-container">
      {/* Filter Toggle Button for Mobile */}
      <button className="filter-toggle-button" onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close Filters' : 'Open Filters'}
      </button>

      {/* Sidebar for filters */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleSidebar}>&times;</button> {/* Close button */}
        <div className="filter-section">
          <h3 className="filter-title">Sizes</h3>
          <hr className="separator" />
          <div className="filter-options">
            {uniqueSizes.map((size, index) => (
              <button
                key={index}
                type="button"
                className={`filter-button ${selectedSizes.includes(size) ? 'selected' : ''}`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <h3 className="filter-title">Colors</h3>
          <hr className="separator" />
          <div className="filter-options">
            {uniqueColors.map((color, index) => (
              <button
                key={index}
                type="button"
                className={`filter-button color-button ${selectedColors.includes(color) ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Products Container */}
      <div className="products-container">
        {filteredProducts.map((product) => (
          <Product key={product._id} product={product} onQuickView={handleQuickView} />
        ))}
      </div>

      {/* QuickView Modal */}
      {quickViewProduct && (
        <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}

      <style jsx>{`
        .products-container {
          display: flex;
          flex-wrap: wrap; /* Allows wrapping to the next line */
          gap: 16px;
          padding-left: 20px;
          width: 80%;
          margin: 0 auto; /* Centers the container */
          justify-content: center; /* Centers the items within the container */
        }
        .filter-button.selected {
          border: 2px solid #000; /* Highlight selected filter buttons */
        }
      `}</style>
    </div>
  );
};

// Fetch products data (example)
export const getStaticProps = async () => {
  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  return {
    props: { products },
  };
};

export default ProductsPage;