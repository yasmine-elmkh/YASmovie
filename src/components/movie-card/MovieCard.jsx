
import React from "react";

import "./movie-card.css";

import { Link } from "react-router-dom";

import Button from "../button/button";

import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import * as Config from "./../../constants/Config";

const MovieCard = (props) => {
  const item = props.item;

  const link =
    "/" + Config.HOME_PAGE + "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;
