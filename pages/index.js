import React, { useState } from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner, QuickView, Advantages, TextVideoSection } from '../components';

const Home = ({ products, bannerData }) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Latest Products</h2>
        <p>Discover our latest collection of products, carefully curated to meet your needs and preferences.</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} onQuickView={handleQuickView} />
        ))}
      </div>

      {quickViewProduct && <QuickView product={quickViewProduct} onClose={closeQuickView} />}
      <TextVideoSection />
      <Advantages />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"][0...4]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;