import React, { useEffect, useState } from "react";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../global/api/api";
import useError from "../../hooks/error";
import Loading from "../shared/Loading";
import SearchUser from "../shared/SearchUser";
import useAsyncMutation from "../../hooks/asyncMutation";

const Search = ({ isSearch, setIsSearch }) => {
  const [searchUser] = useLazySearchUserQuery();
  const [loading, setLoading] = useState(false);
  const [paginationDetail, setPaginationDetail] = useState({
    page: 1,
    limit: 5,
  });
  const [search, setSearch] = useState("");
  const [mainData, setMainData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  const searchUserCustom = (page = 1) => {
    setLoading(true);
    searchUser({
      search: search,
      limit: paginationDetail.limit,
      page: page,
    })
      .then(({ data, isError, error }) => {
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
      searchUserCustom();
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search]);

  const loadmoreUsers = async () => {
    await setPaginationDetail((prev) => ({ ...prev, page: prev.page + 1 }));
    await searchUserCustom(paginationDetail.page + 1);
  };

  const [sendFriendRequestApiFunction, isLoading] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const sendFriendRequest = async (id) => {
    try {
      await sendFriendRequestApiFunction("Sanding Friend Request !!!", {
        receiver: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return isSearch ? (
    <div className="search">
      {loading || isLoading ? <Loading /> : ""}
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
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPaginationDetail((prev) => ({ ...prev, page: 1 }));
                setMainData([]);
              }}
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
              setMainData([]);
              setPaginationDetail((prev) => ({ ...prev, page: 1 }));
              searchUserCustom();
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
          {mainData?.map((user, i) => (
            <SearchUser
              key={i}
              user={user}
              sendFriendRequest={sendFriendRequest}
            />
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
