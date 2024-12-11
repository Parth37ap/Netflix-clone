import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const searchRef = useRef();
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    });
  }, []);

  // Handle search by calling this async function
  const fetchSearchResults = async () => {
    if (!query.trim()) return;

    try {
      const options = {
        method: 'GET',
      };

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

  const handleSearch = () => {
    fetchSearchResults();
    navigate(`/search/${query}`);
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        {searchActive ? (
          <div className="search-container" ref={searchRef}>
            <div className="search-input-wrapper">
              <img src={search_icon} alt="Search Icon" className="search-icon" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Title, people, genres"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
        ) : (
          <img
            src={search_icon}
            alt="Search"
            className="icons"
            onClick={() => setSearchActive(true)}
          />
        )}
        <p className='nav-text37'>Children</p>
        <img src={bell_icon} alt="" className="icons34" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p onClick={() => logout()}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((movie) => (
            <div className="search-item" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
