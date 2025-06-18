// import React, { useEffect, useState, useRef } from "react";
// import { Autoplay } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import tmdbApi, { movieType } from "../../api/tmdbApi"; // chemin relatif à adapter

// import './hero-slide.css';
// import 'swiper/css';

// const HeroSlide = () => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await tmdbApi.getMoviesList(movieType.popular, { params: { page: 1 } });
//         setMovies(response.results.slice(0, 4));
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();

//     return () => {
//       if (swiperRef.current) {
//         swiperRef.current.destroy(true, true);
//       }
//     };
//   }, []);

//   if (loading) return <div className="loading-spinner">Loading...</div>;
//   if (!movies.length) return <div>No movies available</div>;

//   return (
//     <div className="hero-slide-container">
//       <Swiper
//         ref={swiperRef}
//         modules={[Autoplay]}
//         autoplay={{ delay: 4000, disableOnInteraction: false }}
//         loop={true}
//         speed={800}
//       >
//         {movies.map((movie) => (
//           <SwiperSlide key={movie.id}>
//             <HeroSlide movie={movie} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default HeroSlide;


import React, { useEffect, useState, useRef } from "react";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbApi, { movieType } from "../../api/tmdbApi";

import './hero-slide.css';
import 'swiper/css';

const HeroSlide = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, { params: { page: 1 } });
        setMovies(response.results.slice(0, 4));
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
      }
    };
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!movies.length) return <div>No movies available</div>;

  return (
    <div className="hero-slide-container">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        speed={800}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <HeroSlideItem movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const HeroSlideItem = ({ movie }) => {
  return (
    <div className="hero-slide-item">
      <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
      <div className="hero-slide-content">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default HeroSlide;
