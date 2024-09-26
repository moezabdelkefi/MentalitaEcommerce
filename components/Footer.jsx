import React from "react";
import { AiFillInstagram, AiOutlineFacebook } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-container">
      <hr className="footer-divider" />
      <div className="footer-content">
        <p className="phone-number">Phone: 216+ 94 511 654</p>

        <p className="icons">
          <a
            href="https://www.facebook.com/profile.php?id=61562866830917"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineFacebook />
          </a>
          <a
            href="https://www.instagram.com/mentalita.tn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillInstagram />
          </a>
        </p>

        <p className="footer-copyright">
          {currentYear} MENTALITA All rights reserved
        </p>
      </div>

      <style jsx>{`
        .footer-container {
          padding: 10px 20px;
          text-align: center;
        }

        .footer-content {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .phone-number,
        .footer-copyright {
          font-size: 1rem;
          color: #324d67;
        }

        .icons a {
          margin-left: 10px;
          font-size: 1.5rem;
          color: #000;
        }

        .footer-copyright {
          color: #555;
        }

        @media (max-width: 600px) {
          .footer-content {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;
