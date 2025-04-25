import React, { useState, useCallback } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  }, [onSearch]);

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search Symptoms, Doctors, Specialties, Clinics"
        value={searchTerm}
        onChange={handleSearch}
        data-testid="search-input"
      />
    </div>
  );
};

export default SearchBar; 