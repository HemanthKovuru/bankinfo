import React from "react";
import "./../scss/ListCard.scss";
import { Link } from "react-router-dom";

const ListCard = ({ item, setItem }) => {
  const handleClick = () => {
    setItem(item);
  };

  return (
    <Link to={`/banks/${item.bank_name}`}>
      <div onClick={handleClick} className='list-card'>
        <div>Bank Name</div>
        <div>{item.bank_name}</div>
        <div>Branch</div>
        <div>{item.branch}</div>
        <div>Ifsc</div>
        <div>{item.ifsc}</div>
      </div>
    </Link>
  );
};

export default ListCard;
