import React from "react";
import "./../scss/Pagination.scss";

const Pagination = ({ perPage, totalitems, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalitems / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='page-box'>
      {pageNumbers.map((num) => (
        <span
          onClick={(evt) => {
            paginate(num);
          }}
          key={num}
          className='page-num'>
          {num}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
