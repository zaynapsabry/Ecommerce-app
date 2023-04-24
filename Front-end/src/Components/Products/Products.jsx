import React from "react";
import styles from "./Products.module.css";
import { popularProducts } from "../../data";

export default function Products() {
  return (
    <>
      <div className="container-fluid">
        <div className="row px-3">
          {popularProducts.map((product) => {
            return (
              <>
                <div key={product.id} className={`col-md-3 px-2 py-3`}>
                  <div className={`position-relative ${styles.item}`}>
                    <div className={`${styles.circle}`}></div>
                    <div className={`position-relative py-4`}>
                      <img
                        className={`${styles.img} w-100`}
                        src={product.img}
                        alt=""
                      />
                      <div className={`${styles.layer} `}>
                        <div className={`${styles.icon}`}>
                          <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                        <div className={`${styles.icon}  mx-3`}>
                          <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className={`${styles.icon}`}>
                          <i class="fa-regular fa-heart"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
