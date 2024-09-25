import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { urlFor } from "../lib/client";
import styled from "styled-components";

const QuickView = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].size);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!product) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <Overlay isVisible={isVisible}>
      <Container ref={containerRef} isVisible={isVisible}>
        <CloseButton onClick={handleClose}>
          <AiOutlineClose />
        </CloseButton>
        <Content>
          <ImageSection>
            <BigImageContainer>
              <BigImage
                src={urlFor(product.image && product.image[index])}
                alt={product.name}
              />
            </BigImageContainer>
            <SmallImagesContainer>
              {product.image?.map((item, i) => (
                <SmallImage
                  key={i}
                  src={urlFor(item)}
                  className={i === index ? "selected" : ""}
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
            </SmallImagesContainer>
          </ImageSection>
          <Details>
            <Title>{product.name}</Title>
            <Description>{product.details}</Description>
            <hr />
            <Sizes>
              <h4>Sizes:</h4>
              <SizeList>
                {product.sizes.map((sizeObj, index) => (
                  <SizeItem
                    key={index}
                    className={selectedSize === sizeObj.size ? "selected" : ""}
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
                  </SizeItem>
                ))}
              </SizeList>
            </Sizes>
            <Colors>
              <ColorLabel>Colors:</ColorLabel>
              <ColorOptions>
                {product.colors.map((color, index) => (
                  <ColorOption
                    key={index}
                    title={color.hex}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </ColorOptions>
            </Colors>
            <Price>{product.price}DT</Price>
            <Features>
              {product.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </Features>
          </Details>
        </Content>
      </Container>
    </Overlay>
  );
};

export default QuickView;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const Container = styled.div`
  background: white;
  padding: 20px 10px 10px 10px; /* Added top padding */
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  position: relative;
  max-height: 80%;
  overflow-y: auto;
  transform: ${({ isVisible }) => (isVisible ? "scale(1)" : "scale(0.9)")};
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 90%;
    padding: 30px 20px 20px 20px; /* Adjusted top padding */
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 25px 20px 20px 20px; /* Adjusted top padding */
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    display: block;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BigImageContainer = styled.div`
  width: 100%;
  padding-top: 100%; /* Aspect ratio 4:3 */
  position: relative;

  @media (max-width: 480px) {
    padding-top: 100%;
  }
`;

const BigImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const SmallImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SmallImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s;
  border-radius: 10px;
  &.selected {
    border: 2px solid #000;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Description = styled.p`
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Sizes = styled.div`
  margin-bottom: 10px;

  h4 {
    margin-bottom: 10px;

    @media (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

const SizeList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 5px;
`;

const SizeItem = styled.li`
  cursor: pointer;
  padding: 3px 5px;
  border: 1px solid #000;
  border-radius: 5px;
  transition: background-color 0.3s;

  &.selected {
    background-color: #000;
    color: #fff;
  }

  @media (max-width: 480px) {
    padding: 2px 4px;
  }
`;

const Colors = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ColorLabel = styled.h4`
  margin-right: 10px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 5px;
`;

const ColorOption = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #000;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 12px;
    height: 12px;
  }
`;

const Features = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
