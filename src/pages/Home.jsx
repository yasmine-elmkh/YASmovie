import React from "react";
import { Link } from "react-router-dom";
import { OutlineButton } from "../components/button/button";
import MovieList from "../components/movie-list/MovieList";
import { category, movieType } from "../api/tmdbApi";
import * as Config from "./../constants/Config";
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="page-content">
      <div className="common-page-wrapper">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Films Populaires</h2>
          </div>
          <MovieList category={category.movie} type={movieType.popular} seeMore={
            <div className="see-more-btn-wrap">
              <Link to={`/${Config.HOME_PAGE}/movie`}>
                <OutlineButton className="small">Voir plus</OutlineButton>
              </Link>
            </div>
          } />
        </div>
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Films les mieux notés</h2>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} seeMore={
            <div className="see-more-btn-wrap">
              <Link to={`/${Config.HOME_PAGE}/movie`}>
                <OutlineButton className="small">Voir plus</OutlineButton>
              </Link>
            </div>
          } />
        </div>
      </div>
    </div>
  );
};

export default Home;
