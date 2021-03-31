import React from "react";
import { Link } from "react-router-dom";
import "./../scss/SingleListPage.scss";

const SingleListPage = ({ item }) => {
  return (
    <div className='container'>
      <Link className='btn' to='/'>
        &larr; back to home
      </Link>
      <div className='container-item'>
        <div className='list-card rm-bs'>
          <div>Bank Name</div>
          <div>{item.bank_name}</div>
          <div>State</div>
          <div>{item.state}</div>
          <div>District</div>
          <div>district</div>
          <div>City</div>
          <div>{item.city}</div>
          <div>Address</div>
          <div>{item.address}</div>
          <div>Branch</div>
          <div>{item.branch}</div>
          <div>Ifsc</div>
          <div>{item.ifsc}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleListPage;
