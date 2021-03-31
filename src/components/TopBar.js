import React from "react";
import { Link } from "react-router-dom";

const TopBar = ({ handleChange, setQuery }) => {
  return (
    <>
      <Link to='/favourites'>
        <button className='btn-favour'>Favourites</button>
      </Link>
      <div className='search-box'>
        <select onChange={handleChange} id='category'>
          <option value='MUMBAI'>MUMBAI</option>
          <option value='HYDERABAD'>HYDERABAD</option>
          <option value='BANGLORE'>BANGLORE</option>
          <option value='CHENNAI'>CHENNAI</option>
          <option value='NEW DELHI'>NEW DELHI</option>
        </select>
        <input
          onChange={(evt) => setQuery(evt.target.value)}
          className='search'
          type='text'
          placeholder='search for your favourite character'
        />
      </div>
    </>
  );
};

export default TopBar;
