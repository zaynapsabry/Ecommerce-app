import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ userData, logout }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid px-4">
          <Link className="navbar-brand fw-bolder" to="home">
            E-commerce
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userData === null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      REGISTER
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      SIGN IN
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ">
                    <Link className="nav-link " to="cart">
                      <i className="fas fa-shopping-cart position-relative">
                        <span
                          className={`font8 badge rounded-circle translate-middle position-absolute top-0 start-100 bg-danger`}
                        >
                          3
                        </span>
                      </i>
                    </Link>
                  </li>
                  <li className="nav-item ms-md-3 position-relative">
                    <Link onClick={logout} className="nav-link" to="login">
                      SIGN OUT
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
