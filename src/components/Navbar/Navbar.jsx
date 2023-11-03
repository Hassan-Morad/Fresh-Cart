import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/images/freshcart-logo.svg";
import { tokenContext } from "../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";
// import './Navbar.css'; // Import the CSS file for Navbar styles

export default function Navbar() {
  let { token, setToken } = useContext(tokenContext);
  let { numOfCartItems } = useContext(CartContext);
  const { wishlistCount } = useContext(wishlistContext);
  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
  }

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <nav className="px-3 navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            <img src={Logo} alt="Fresh Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                     
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/products"
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/categories"
                  >
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/brands"
                  >
                    Brands
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
             
              
              {token ? (
                <>
                 <li className="nav-item me-3">
                <Link className="nav-link" to="/wishlist">
                  <i className="fa-regular fa-heart text-danger fs-3 position-relative">
                    <span className="position-absolute fs-badge badge bg-danger">
                      {wishlistCount}
                    </span>
                  </i>{" "}
                </Link>
              </li>
              <li className="nav-item mt-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/cart"
                >
                  <i className="fa me-4 text-main fa-shopping-cart position-relative">
                    <span className="position-absolute fs-badge start-100 translate-middle badge rounded-2 bg-main">
                      {numOfCartItems != null ? numOfCartItems : 0}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </i>
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
              </li>
              <li className="nav-item nav-item d-flex align-items-center">
                  <div className="dropdown">
                    <i
                      className="fa-regular fa-circle-user px-3 dropdown-icon"
                      onClick={toggleDropdown}
                    ></i>
                    {isOpen && (
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/allorders"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            My Orders
                          </Link>
                        </li>
                        <li>
                        <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/forgotpassword"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            Forgot Password
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/updatepassword"
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            Update Password
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    onClick={logOut}
                    to="/login"
                  >
                    Logout
                  </Link>
                </li>
              </>
                
              ) : (
                <>
                <li className="nav-item d-flex align-items-center">
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
              </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
