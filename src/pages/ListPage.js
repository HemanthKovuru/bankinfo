import axios from "axios";
import React, { useEffect, useState } from "react";
import ListCard from "../components/ListCard";
import Pagination from "../components/Pagination";
import "./../scss/ListPage.scss";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

const ListPage = ({ setItem }) => {
  // 1]. initialize data
  const [list, setList] = useState();
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [perPage, setPerPage] = useState(100);
  const [query, setQuery] = useState();
  const [favour, setFavour] = useState(false);

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
      setLoading(false);
      return data;
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    cacheData("MUMBAI");
  }, []);

  const cacheData = async (city) => {
    const now = new Date().getTime();
    const list = JSON.parse(localStorage.getItem(city));
    if (!list || !list[city] || !(list.cacheTimer > now)) {
      let list = {
        [city]: await fetchList(city),
        cacheTimer: now + 1000 * 120,
      };
      localStorage.setItem(city, JSON.stringify(list));
    } else {
      const list = JSON.parse(localStorage.getItem(city));
      setList(list[city]);
    }
  };

  const handleChange = async (evt) => {
    let city = evt.target.value;
    cacheData(city);
  };

  // 3]. filtering
  let newList;

  if (list) {
    newList = [...list];
    newList = newList.filter((item) => {
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

  const handleFavour = () => {
    setFavour(!favour);
  };

  const favourites = JSON.parse(localStorage.getItem("favour"));

  return (
    <div className='home'>
      <div className='heading'>Bank Branches</div>

      <button onClick={handleFavour} className='btn-favour'>
        Favourites
      </button>
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
          placeholder='Search by bank name, branch, ifsc '
        />
      </div>

      {favour && (
        <div className='home'>
          <button onClick={handleFavour} className='btn-favour'>
            Bank Branches
          </button>
          <div className='heading'>Favourite Branches</div>
          <div className='list-box'>
            {favourites &&
              favourites.map((item) => (
                <ListCard setItem={setItem} key={item.ifsc} item={item} />
              ))}
          </div>
        </div>
      )}

      {loading && <div className='loading'>Loading...</div>}

      {!favour && (
        <>
          <div className='list-box'>
            {curList && !query
              ? curList.map((item) => (
                  <ListCard setItem={setItem} key={item.ifsc} item={item} />
                ))
              : ""}

            {query &&
              curList.map((item) => (
                <ListCard setItem={setItem} key={item.ifsc} item={item} />
              ))}
          </div>
          {!query ? (
            <Pagination
              perPage={perPage}
              totalitems={list && list.length}
              paginate={paginate}
            />
          ) : (
            <Pagination
              perPage={perPage}
              totalitems={newList && newList.length}
              paginate={paginate}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ListPage;
