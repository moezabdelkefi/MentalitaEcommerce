import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import { client, urlFor } from "../lib/client";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchFormRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      const query = `*[_type == "product" && name match '${searchQuery}*']{
        _id,
        name,
        slug,
        price,
        image
      }`;
      const results = await client.fetch(query);
      setSearchResults(results);
    };

    fetchResults();
  }, [searchQuery]);

  const handleProductClick = () => {
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleClickOutside = (event) => {
    if (
      searchFormRef.current &&
      !searchFormRef.current.contains(event.target)
    ) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-top">
          <p className="logo">
            <Link href="/">
              <img
                src="/logoment.png"
                alt="Mentalita Logo"
                className="logo-image"
              />
            </Link>
          </p>
          <div className="center-container">
            <Link href="/products" legacyBehavior>
              <a className="custom-link">Products</a>
            </Link>
            <div className="search-bar-container">
              <form
                className="search-form"
                onSubmit={handleSearch}
                ref={searchFormRef}
              >
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchVisible(true);
                  }}
                  className="search-input"
                />
                {isSearchVisible && searchResults.length > 0 && (
                  <div className="search-results">
                    {searchResults.map((product) => (
                      <Link
                        key={product._id}
                        href={`/product/${product.slug.current}`}
                        legacyBehavior
                      >
                        <a
                          className="search-result-item"
                          onClick={handleProductClick}
                        >
                          <img
                            src={urlFor(product.image[0])}
                            alt={product.name}
                            className="imagesearch"
                          />
                          <div>
                            <p>{product.name}</p>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
              </form>
            </div>
          </div>
          <button
            type="button"
            className="button-custom"
            onClick={() => setShowCart(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="lucide lucide-shopping-bag"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" x2="21" y1="6" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>{totalQuantities}</span>
          </button>
        </div>

        {showCart && <Cart />}
      </div>
      <hr />
      <style jsx>{`
        .navbar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .imagesearch {
          object-fit: cover;
        }

        .navbar-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 10px;
        }

        .center-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          margin: 0 20px;
        }

        .search-bar-container {
          margin-left: 20px; /* Add space between product link and search bar */
        }

        .search-form {
          display: flex;
          align-items: center;
          position: relative;
        }

        .search-input {
          padding: 5px;
          margin-right: 5px;
          height: 36px;
        }

        .search-button {
          padding: 5px 10px;
          height: 36px;
        }

        .search-results {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid #ccc;
          width: 100%;
          max-height: 300px;
          overflow-y: auto;
          z-index: 1000;
        }

        .search-result-item {
          display: flex;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #ccc;
        }

        .search-result-item img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }

        .custom-link {
          font-size: 18px;
          color: #324d67;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .navbar-top {
            flex-direction: column;
            align-items: center;
          }

          .search-form {
            width: 100%;
          }

          .button-custom {
            margin-top: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
