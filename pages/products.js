import React, { useState, useEffect, useRef } from "react";
import { client } from "../lib/client";
import Product from "../components/Product";
import QuickView from "../components/QuickView";

const ProductsPage = ({ products }) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);

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

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const filteredProducts = products.filter((product) => {
    const matchesColor =
      selectedColors.length === 0 ||
      product.colors.some((color) => selectedColors.includes(color.hex));
    const matchesSize =
      selectedSizes.length === 0 ||
      product.sizes.some((sizeObj) => selectedSizes.includes(sizeObj.size));
    return matchesColor && matchesSize;
  });

  const uniqueSizes = [
    ...new Set(
      products.flatMap((product) =>
        product.sizes.map((sizeObj) => sizeObj.size)
      )
    ),
  ];

  const uniqueColors = [
    ...new Set(
      products.flatMap((product) => product.colors.map((color) => color.hex))
    ),
  ];

  return (
    <div className="page-container">
      <button className="filter-toggle-button" onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <>
            Filters
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon-plus"
            >
              <line x1="12" x2="12" y1="5" y2="19"></line>
              <line x1="5" x2="19" y1="12" y2="12"></line>
            </svg>
          </>
        ) : (
          <>
            Filters
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon-plus"
            >
              <line x1="12" x2="12" y1="5" y2="19"></line>
              <line x1="5" x2="19" y1="12" y2="12"></line>
            </svg>
          </>
        )}
      </button>

      <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
  <div className="close-button-container">
    <button className="close-button" onClick={toggleSidebar}>
      &times;
    </button>
  </div>
  <div className="filter-section">
    <h3 className="filter-title">Sizes</h3>
    <hr className="separator" />
    <div className="filter-options">
      {uniqueSizes.map((size, index) => (
        <button
          key={index}
          type="button"
          className={`filter-button ${selectedSizes.includes(size) ? "selected" : ""}`}
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
          className={`filter-button color-button ${selectedColors.includes(color) ? "selected" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorChange(color)}
        />
      ))}
    </div>
  </div>
</div>


      <div className="products-container">
        {filteredProducts.map((product) => (
          <Product
            key={product._id}
            product={product}
            onQuickView={handleQuickView}
          />
        ))}
      </div>

      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      <style jsx>{`
        .products-container {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          width: 80%;
          margin: 0 auto;
          justify-content: center;
        }
        .filter-button.selected {
          border: 2px solid #000;
        }
      `}</style>
    </div>
  );
};

export const getStaticProps = async () => {
  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  return {
    props: { products },
  };
};

export default ProductsPage;
