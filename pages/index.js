import React from 'react';
import { client } from '../sanity/lib/client';
import HeroBanner from '../components/HeroBanner';
import Product from '../components/Product';
import QuickView from '../components/QuickView';
import TextVideoSection from '../components/TextVideoSection';
import { Advantages } from '@/components';

export async function getStaticProps() {
  const bannerQuery = `*[_type == "banner"]`;
  const productsQuery = `*[_type == "product"]`;
  const textVideoSectionQuery = `*[_type == "textVideoSection"]{
    title,
    text,
    "videoUrl": video.asset->url
  }`;

  const bannerData = await client.fetch(bannerQuery);
  const products = await client.fetch(productsQuery);
  const textVideoSectionData = await client.fetch(textVideoSectionQuery);

  return {
    props: {
      bannerData,
      products,
      textVideoSectionData: textVideoSectionData[0],
    },
  };
}

const HomePage = ({ bannerData, products, textVideoSectionData }) => {
  const [quickViewProduct, setQuickViewProduct] = React.useState(null);

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
      <TextVideoSection sectionData={textVideoSectionData} />
      <Advantages />
    </div>
  );
};

export default HomePage;