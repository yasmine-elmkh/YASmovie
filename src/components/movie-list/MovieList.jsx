import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import "./movie-list.css";

import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import MovieCard from "../movie-card/MovieCard";

import tmdbApi, { category } from "./../../api/tmdbApi";

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = { page: 1 };

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }
      setItems(response.results);
      console.log("Films récupérés :", response.results);
      console.log("Réponse API complète :", response);
    };
    getList();
  }, [props.category, props.id, props.type]);

  return (
    <div className="movie-list">
      <div className="movie-list__wrapper">
        <div className="movie-list__nav">
          <button className="movie-list__nav-btn prev" onClick={() => swiperRef.current?.slidePrev()}>&lt;</button>
          <button className="movie-list__nav-btn next" onClick={() => swiperRef.current?.slideNext()}>&gt;</button>
        </div>
        <Swiper
          modules={[Navigation]}
          onSwiper={swiper => (swiperRef.current = swiper)}
          grabCursor={true}
          spaceBetween={32}
          slidesPerView={3}
          centeredSlides={false}
          breakpoints={{
            1200: { slidesPerView: 3 },
            900: { slidesPerView: 2 },
            600: { slidesPerView: 1 },
            0: { slidesPerView: 1 }
          }}
          navigation={{
            prevEl: '.movie-list__nav-btn.prev',
            nextEl: '.movie-list__nav-btn.next',
          }}
        >
          {items.slice(0, 9).map((item, index) => (
            <SwiperSlide key={index}>
              <MovieCard item={item} category={props.category} />
            </SwiperSlide>
          ))}
        </Swiper>
        {props.seeMore && props.seeMore}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  seeMore: PropTypes.node
};

export default MovieList;