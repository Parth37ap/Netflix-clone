// SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWNkMzNmMDkzYjM5MWNlNmNiNWMxNDgwOTQ4NWUxYiIsInN1YiI6IjY2MzViMmYzOTU5MGUzMDEyOWJjMGM2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IzxbMbAcVYGnz-japfSoDkR8IrnByrOyV4ZiFEkEXgc',
        },
      };
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-results-page">
      <h1>Results for "{query}"</h1>
      <div className="search-results-grid">
        {searchResults.map((movie) => (
          <div className="search-result-item" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
