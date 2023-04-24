import React from "react";
// import styles from "./ProductList.module.css";
import Announcement from "../Announcement/Announcement";
import Products from "../Products/Products";

export default function ProductList() {
  return (
    <>
      <Announcement />
      <div className="container-fluid">
        <div className="row p-3">
          {/* <h1 className="mb-2">Dresess</h1> */}
          <div className="d-flex justify-content-between">
            <div className="col-md-3">
              <span className={`font18 fw-bold me-2`}>Filter Products:</span>
              <select className="me-2 p-md-2 p-1 ">
                <option disabled selected>
                  Color
                </option>
                <option> White</option>
                <option> Black</option>
                <option> Red</option>
                <option> Blue</option>
                <option> Green</option>
              </select>
              <select className="p-md-2 p-1">
                <option disabled selected>
                  Size
                </option>
                <option> XL</option>
                <option> L</option>
                <option> M</option>
                <option> S</option>
                <option> XS</option>
              </select>
            </div>
            <div className="col-md-3">
              <span className={`font18 fw-bold me-2`}>Sort Products:</span>
              <select className="p-md-2 p-1 ">
                <option selected>Newest</option>
                <option> Price (acs)</option>
                <option> Price (desc)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <Products />
    </>
  );
}
