import React from "react";
import styles from "./Register.module.css";

export default function Register() {
  return (
    <>
      <div
        className={`container-fluid d-flex align-items-center justify-content-center ${styles.container}`}
      >
        <div className="col-md-5 mx-auto bg-white p-3">
          <h4 className="fw-bold text-center">CREATE AN ACCOUNT</h4>
          <form className="text-center">
            <input
              className={`${styles.input}`}
              type="text"
              placeholder="Name"
              id="name"
            />
            <input
              className={`${styles.input}`}
              type="mail"
              placeholder="Email"
              id="mail"
            />
            <input
              className={`${styles.input}`}
              type="password"
              placeholder="Password"
              id="password"
            />
            <input
              className={`${styles.input}`}
              type="password"
              placeholder="Confirm Password"
              id="rePassword"
            />
            <button className={`${styles.button}`}>CREATE</button>
          </form>
        </div>
      </div>
    </>
  );
}
