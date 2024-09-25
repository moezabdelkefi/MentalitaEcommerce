import React, { useState, useEffect } from 'react';
import { client } from '../sanity/lib/client';
import HeroBanner from '../components/HeroBanner';
import Product from '../components/Product';
import QuickView from '../components/QuickView';
import TextVideoSection from '../components/TextVideoSection';
import { Advantages } from '@/components';
import AboutUs from '../components/AboutUs';

export async function getStaticProps() {
  const bannerQuery = `*[_type == "banner"]`;
  const productsQuery = `*[_type == "product"] | order(_createdAt desc)`;
  const textVideoSectionQuery = `*[_type == "textVideoSection"]{
    title,
    text,
    "videoUrl": video.asset->url
  }`;
  const aboutUsQuery = `*[_type == "aboutUs"]{title, description, image}`;

  const bannerData = await client.fetch(bannerQuery);
  const products = await client.fetch(productsQuery);
  const textVideoSectionData = await client.fetch(textVideoSectionQuery);
  const aboutUsData = await client.fetch(aboutUsQuery);

  return {
    props: {
      bannerData,
      products,
      textVideoSectionData,
      aboutUsData: aboutUsData[0] || null, // Assuming there's only one "About Us" document
    },
  };
}

const HomePage = ({ bannerData, products, textVideoSectionData, aboutUsData }) => {
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
        {products?.slice(0, 4).map((product) => (
          <Product key={product._id} product={product} onQuickView={handleQuickView} />
        ))}
      </div>

      {quickViewProduct && <QuickView product={quickViewProduct} onClose={closeQuickView} />}
      <TextVideoSection sectionData={textVideoSectionData} />
      {aboutUsData && <AboutUs {...aboutUsData} />}
      <Advantages />
    </div>
  );
};

export default HomePage;