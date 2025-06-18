import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../assets/logo.png";

const Header = () => (
  <header className="main-header">
    <div className="header-content container">
      <Link to="/" className="logo">
        <img src={logo} alt="YASmovie" />
        <span>YASmovie</span>
      </Link>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/recherche">Recherche</Link>
        <Link to="/ajouter">Ajouter un film</Link>
      </nav>
    </div>
  </header>
);

export default Header;