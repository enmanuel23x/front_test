/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch, className }) => {
    const [search, setSearch] = useState("");
    return (
        <div className={`search-bar ${className}`}>
            <input
                name="search"
                className="search-input"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSearch(search);
                    }
                }}
            />
            <div onClick={() => onSearch(search)} className="search-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
            <button onClick={() => onSearch(search)} className="search-btn">SEARCH</button>
        </div>
    )
};

export default SearchBar;