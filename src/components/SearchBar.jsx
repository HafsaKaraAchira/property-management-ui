import React, { useState } from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    // setSearchTerm(event.target.value);
    setSearchTerm(event.target.value.toLowerCase()); // Convert search term to lowercase for case-insensitive search
    onSearchChange(searchTerm); // Pass search term to parent
  };

  return (
    <div className="search-bar">
      <TextField
        label="Search Properties"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
