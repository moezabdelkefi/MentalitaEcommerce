import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { client, urlFor } from "../../lib/client";
import { Product, QuickView } from "../../components";
import { useStateContext } from "../../context/StateContext";
import Link from "next/link";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, sizes, colors, category } = product; 
  const [index, setIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(sizes[0].size);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const handleBuyNow = () => {
    onAdd(product, qty, selectedSize);
    setShowCart(true);
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
          </div>
          <p style={{ fontSize: "18px" }}>{details}</p>
          <hr className="hr" />
          <div className="sizes">
            <h4>Sizes:</h4>
            <ul>
              {sizes.map((sizeObj, index) => (
                <li
                  key={index}
                  className={
                    selectedSize === sizeObj.size ? "selected-size" : ""
                  }
                  onClick={() =>
                    !sizeObj.outOfStock && setSelectedSize(sizeObj.size)
                  }
                  style={{
                    position: "relative",
                    cursor: sizeObj.outOfStock ? "not-allowed" : "pointer",
                  }}
                >
                  {sizeObj.size}
                  {sizeObj.outOfStock && (
                    <span style={{ color: "red", marginLeft: "5px" }}>X</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="colors">
            <div className="color-options">
              <h4>Colors</h4>
              {colors.map((color, index) => (
                <span
                  key={index}
                  className="color-option"
                  title={color.hex}
                  style={{ backgroundColor: color.hex }}
                ></span>
              ))}
            </div>
          </div>
          <div className="category">
            <p><Link href={`/products?category=${category}`}>{category}</Link></p>
          </div>
          <div className="quantity">
            <p className="price">{price}DT</p>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty, selectedSize)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Order Now
            </button>
          </div>
        </div>
      </div>

      {quickViewProduct && (
        <QuickView product={quickViewProduct} onClose={closeQuickView} />
      )}
      <div className="maylike-products-wrapper">
        <h2>Related Items </h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product
                key={item._id}
                product={item}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]{
    _id,
    name,
    details,
    price,
    sizes,
    colors,
    category,
    image
  }`;
  const productsQuery = `*[_type == "product"]`;
  const categoriesQuery = `*[_type == "product"]{category}`;

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  const categoriesData = await client.fetch(categoriesQuery);
  const categories = [...new Set(categoriesData.map((item) => item.category))];

  return {
    props: { products, product, categories },
  };
};

export default ProductDetails;
