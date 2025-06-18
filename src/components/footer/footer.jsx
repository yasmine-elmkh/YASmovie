import React from "react";
import "./footer.css";

const Footer = () => (
  <footer className="main-footer">
    <div className="container">
      <p>© {new Date().getFullYear()} YASmovie. Tous droits réservés.</p>
    </div>
  </footer>
);

export default Footer;