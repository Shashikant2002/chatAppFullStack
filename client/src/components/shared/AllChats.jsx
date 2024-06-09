import React, { useEffect } from "react";
import ChatItem from "./ChatItem";
import { useMyChatesQuery } from "../../global/api/api";
import Loading from "./Loading";
import { toast } from "react-toastify";
import useError from "../../hooks/error";

const AllChats = () => {
  const { isLoading, data, isError, error, refetch } = useMyChatesQuery();

<<<<<<< HEAD
=======
  console.log(data);

>>>>>>> 680029d46f7b287de917d552307f3717419347ee
  useError([{ isError, error }]);

  return (
    <>
<<<<<<< HEAD
      <div className="chatList">
        {isLoading ? <Loading /> : ""}
=======
      {isLoading ? <Loading /> : ""}
      <div className="chatList">
        {/* {new Array(100)?.fill({})?.map((_, i) => ( */}
>>>>>>> 680029d46f7b287de917d552307f3717419347ee
        {data?.chat?.map((data, i) => (
          <ChatItem key={i} index={i} data={data} />
        ))}
      </div>
    </>
  );
};

export default AllChats;
