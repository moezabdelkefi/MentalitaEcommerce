import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import styled from "styled-components";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 30px; 
  height: 30px;
  padding: 0;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 12px;
  }
`;

const InputContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 15px;
    margin: 15px 0;
  }

  @media (max-width: 480px) {
    padding: 10px;
    margin: 10px 0;
  }
`;
const CartWrapper = styled.div`
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  transition: all 1s ease-in-out;
`;

const CartContainer = styled.div`
  height: 100vh;
  width: 600px;
  background-color: white;
  float: right;
  padding: 20px 10px;
  position: relative;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(${(props) => (props.isVisible ? 1 : 0.9)});
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  background: white;
  padding: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 200;
  transition: opacity 0.3s ease, transform 0.3s ease;

  @media (max-width: 768px) {
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    width: 90%;
  }
`;


const Cart = () => {
  const cartRef = useRef();
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false); // New state for animation

  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCart]);

  const handleCheckout = () => {
    setIsAnimating(true); // Start the animation
    setIsModalOpen(true); // Open the modal
  };
  const handleCloseModal = () => {
    setIsAnimating(false); // Start the closing animation
    setTimeout(() => {
      setIsModalOpen(false); // Close the modal after animation
    }, 300); // Match this timeout with the duration of the transition
  };

  const handleContinue = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    if (!phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }

    const orderDetails = cartItems
      .map(
        (item) => `
      Name: ${item.name}
      Size: ${item.size}
      Quantity: ${item.quantity}
      Price: ${item.price}DT
      Image: ${urlFor(item.image[0])}
      Phone Number: ${phoneNumber}
    `
      )
      .join("\n");

    const clientMessage = `
      Order Confirmation
      Thank you for your order we will send you a confirmation email shortly.
    `;

    const ownerMessage = `
      New order
  
      Order Details:
      ${orderDetails}
  
      Total Price: ${totalPrice}DT
    `;

    try {
      const clientResponse = await axios.post("/api/sendEmail", {
        email: email,
        subject: "Order Confirmation",
        message: clientMessage,
      });

      const ownerResponse = await axios.post("/api/sendEmail", {
        email: "moezabdelkefi17@gmail.com",
        subject: "New Order Received",
        message: `Client Email: ${email}\n\n${ownerMessage}`,
      });

      if (clientResponse.status === 200 && ownerResponse.status === 200) {
        toast.success("Email sent successfully");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(
        "Error during checkout:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to send email");
    }
  };

  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <CartWrapper ref={cartRef}>
      <CartContainer>
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={`${item._id}-${item.size}`}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>{item.price}DT</h4>
                  </div>
                  <h4>Size: {item.size}</h4>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, item.size, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, item.size, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>{totalPrice}DT</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </CartContainer>

      {isModalOpen && (
        <Modal isVisible={isAnimating}>
          <CloseButton
            type="button"
            onClick={handleCloseModal}
          >
            X
          </CloseButton>
          <h2>Enter your email and phone number</h2>
          <InputContainer>

          <StyledInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="phone-number-input">

            <StyledInput
              type="text"
              id="phoneNumber"
              placeholder="Your Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          </InputContainer>

          <button type="button" className="btn" onClick={handleContinue}>
            Continue
          </button>
        </Modal>
)}

    </CartWrapper>
  );
};

export default Cart;
