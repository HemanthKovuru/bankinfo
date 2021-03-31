import axios from "axios";
import React, { useEffect, useState } from "react";
import ListCard from "../components/ListCard";
import Pagination from "../components/Pagination";
import "./../scss/ListPage.scss";
import { Link } from "react-router-dom";

const ListPage = ({ setItem }) => {
  // 1]. initialize data
  const [list, setList] = useState();
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [query, setQuery] = useState();

  // 2]. fetch results
  const fetchList = async (city) => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://vast-shore-74260.herokuapp.com/banks?city=${city}`
      );

      setList(data);
      localStorage.setItem(
        "favour",
        JSON.stringify([data[0], data[1], data[2], data[3], data[4], data[5]])
      );
    } catch (err) {
      alert(err.response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchList("MUMBAI");
  }, []);

  const handleChange = (evt) => {
    fetchList(evt.target.value);
    console.log(evt.target.value);
  };

  // if (loading) {
  //   return <div className='loading'>Loading...</div>;
  // }

  // 3]. filtering
  let newList;

  if (list) {
    console.log(list);
    newList = [...list];
    console.log(newList);
    newList = list.filter((item) => {
      item.favourite = false;
      let name = item.bank_name.toLowerCase();
      let branch = item.branch.toLowerCase();
      if (!query) {
        return newList;
      }
      if (name.includes(query)) return item;
      if (branch.includes(query)) return item;
      if (item.ifsc.includes(query)) return item;
    });
  }

  // 4]. implement pagination
  const indexOfLastItem = curPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;

  const curList = newList && newList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (num) => {
    setCurPage(num);
    window.scrollTo(0, 0);
  };

  return (
    <div className='home'>
      <div className='heading'>Bank Branches</div>
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
          placeholder='Search...'
        />
      </div>
      {loading && <div className='loading'>Loading...</div>}

      <div className='list-box'>
        {curList &&
          curList.map((item) => (
            <ListCard setItem={setItem} key={item.ifsc} item={item} />
          ))}
      </div>
      <Pagination
        perPage={perPage}
        totalitems={list && list.length}
        paginate={paginate}
      />
    </div>
  );
};

export default ListPage;
