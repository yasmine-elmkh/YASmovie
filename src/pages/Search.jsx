import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tmdbApi from '../api/tmdbApi';
import { category } from '../api/tmdbApi';
import MovieCard from '../components/movie-card/MovieCard';
import './Search.css';
import 'swiper/css';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setLoading(true);
      setError('');
      try {
        const response = await tmdbApi.search(category.movie, { query: keyword });
        setResults(response.results);
        if (response.results.length === 0) {
          setError('Aucun résultat trouvé pour cette recherche.');
        }
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        setError('Une erreur est survenue lors de la recherche.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Veuillez entrer un terme de recherche.');
    }
  };

  return (
    <div className="page-content">
      <div className="common-page-wrapper">
        <div className="search-form">
          <h2>Rechercher un film</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Entrez le titre d'un film..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={error ? 'error' : ''}
              />
              {error && <span className="error-message">{error}</span>}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Recherche en cours...' : 'Rechercher'}
            </button>
          </form>
        </div>

        <div className="search-results">
          {results.length > 0 && (
            <h3>Résultats de la recherche pour "{keyword}"</h3>
          )}
          <div className="movie-grid">
            {results.map((movie) => (
              <MovieCard
                key={movie.id}
                item={movie}
                category={category.movie}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search; 