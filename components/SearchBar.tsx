import React from 'react';
import './SearchBar.css';

interface Props {
  value: string;
  onChange(value: string): void;
  placeholder?: string;
}


const SearchBar: React.FC<Props> = ({value, onChange, placeholder = 'search'}) => {
  return <div className="search">
      <input value={value} onChange={ e => onChange(e.target.value)} type="text" className="searchTerm" placeholder={placeholder} />
      <button type="submit" className="searchButton">
        <i className="fa fa-search"></i>
     </button>
   </div>
};

export default SearchBar;