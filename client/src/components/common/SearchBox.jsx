<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> 680029d46f7b287de917d552307f3717419347ee
import TextField from "@mui/material/TextField";
import SearchUser from "../shared/SearchUser";
import { useLazySearchUserQuery } from "../../global/api/api";
import useError from "../../hooks/error";
import Loading from "../shared/Loading";

const Search = ({ isSearch, setIsSearch }) => {
<<<<<<< HEAD
  const [searchUser] = useLazySearchUserQuery();
  const [loading, setLoading] = useState(false);
  const [paginationDetail, setPaginationDetail] = useState({
    page: 1,
    limit: 2,
  });
  const [search, setSearch] = useState("");
  const [mainData, setMainData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  const searchUserCustom = () => {
    setLoading(true);
    searchUser({
      search: search,
      limit: paginationDetail.limit,
      page: paginationDetail.page,
    })
      .then(({ data, isError, error }) => {
        console.log(data);
        setMainData([...mainData, ...data.user]);
        setTotalPage(data.pages);
        setLoading(false);

        if (isError) {
          setLoading(false);
          useError([{ isError, error }]);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      console.log(search);
      searchUserCustom();
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search]);

  const loadmoreUsers = () => {
    setPaginationDetail((prev) => ({ ...prev, page: prev.page + 1 }));
    searchUserCustom();
  };

  console.log(paginationDetail);
=======
  const [inputSearch, setInputSearch] = useState("");
  const searchNewFriends = () => {};
>>>>>>> 680029d46f7b287de917d552307f3717419347ee

  return isSearch ? (
    <div className="search">
      {loading ? <Loading /> : ""}
      <div className="mainPopup">
        <h3 className="title">Search Here</h3>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, odit
          delectus.
        </p>

        <div className="searchMain">
          <div className="input">
            <label htmlFor="search">Search Your Friend</label>
            <input
              id="search"
              type="text"
              placeholder="Search Here........."
<<<<<<< HEAD
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPaginationDetail((prev) => ({ ...prev, page: 1 }));
                setMainData([]);
              }}
              />
=======
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
>>>>>>> 680029d46f7b287de917d552307f3717419347ee
          </div>
        </div>

        <div className="controll">
          <button
            className="fill_btn calcle_btn"
            onClick={() => {
              setIsSearch(false);
            }}
            >
            Close
          </button>
          <button
            className="fill_btn"
            onClick={() => {
<<<<<<< HEAD
              setMainData([]);
              setPaginationDetail((prev) => ({ ...prev, page: 1 }));
              searchUserCustom();
=======
              searchNewFriends();
>>>>>>> 680029d46f7b287de917d552307f3717419347ee
            }}
          >
            Search
          </button>
        </div>

        <div className="users">
          {mainData?.length <= 0 && (
            <div className="searchNot">
              <h3 className="notFound">Searching User Not Found</h3>
            </div>
          )}

<<<<<<< HEAD
          {mainData?.map((user, i) => (
            <SearchUser key={i} user={user} />
=======
          {new Array(10)?.fill({})?.map((_, i) => (
            <SearchUser  key={i}/>
>>>>>>> 680029d46f7b287de917d552307f3717419347ee
          ))}
        </div>

        {totalPage > paginationDetail.page ? (
          <div className="conroll">
            <button
              className="fill_btn"
              onClick={() => {
                loadmoreUsers();
              }}
            >
              Load More
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Search;
