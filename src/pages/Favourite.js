import React from "react";
import { Link } from "react-router-dom";
import ListCard from "../components/ListCard";

const Favourite = ({ setItem }) => {
  const favourites = JSON.parse(localStorage.getItem("favour"));
  return (
    <div>
      <Link className='btn' to='/'>
        &larr; back to home
      </Link>
      <div className='heading'>Favourite Branches</div>
      <div className='list-box'>
        {favourites &&
          favourites.map((item) => (
            <ListCard setItem={setItem} key={item.ifsc} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Favourite;
