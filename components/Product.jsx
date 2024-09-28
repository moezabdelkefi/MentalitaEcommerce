import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({ product, onQuickView }) => {
  const { image, name, slug, price } = product;

  return (
    <div className="product-card">
      <Link href={`/product/${slug.current}`}>
        <img 
          src={urlFor(image && image[0])}
          width={250}
          height={250}
          className="product-image"
          loading="lazy"
        />
      </Link>
      <button onClick={() => onQuickView(product)} className="quick-view-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
          <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path>
          <path d="M3 16.2V21m0 0h4.8M3 21l6-6"></path>
          <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"></path>
          <path d="M3 7.8V3m0 0h4.8M3 3l6 6"></path>
        </svg>
      </button>
      <p className="product-name">{name}</p>
      <p className="product-price">{price}DT</p>
    </div>
  );
};

export default Product;