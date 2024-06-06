import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchUser from "../shared/SearchUser";

const Search = ({ isSearch, setIsSearch }) => {
  const [inputSearch, setInputSearch] = useState("");
  const searchNewFriends = () => {};

  return isSearch ? (
    <div className="search">
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
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
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
              searchNewFriends();
            }}
          >
            Search
          </button>
        </div>

        <div className="users">
          <div className="searchNot">
            <h3 className="notFound">Please Search User</h3>
            <h3 className="notFound">OR</h3>
            <h3 className="notFound">User Not Found</h3>
          </div>

          {new Array(10)?.fill({})?.map((_, i) => (
            <SearchUser  key={i}/>
          ))}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Search;
