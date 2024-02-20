import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="footer border-top px-sm-2 py-2">
      <Container
        fluid
        className="align-items-center flex-column flex-md-row d-flex justify-content-between"
      >
        <div>
          <a className="text-decoration-none" href="https://coreui.io">
            Tailors App{" "}
          </a>
          {/* <a className="text-decoration-none" href="https://coreui.io">
            Bootstrap Admin
            Template
          </a> */}{" "}
          © 2023 Aahil Shahzad by White Technologies.
        </div>
        <div className="ms-md-auto">
          Contact# 03000435410
          <a
            className="text-decoration-none"
            href="@layout/AdminLayout/AdminLayout"
          >
            {" "} Purchase Software!
          </a>
        </div>
      </Container>
    </footer>
  );
}

// 2023 © Aahil Shahzad by White Technologies. Contact# 03000435410 Purchase Software!
