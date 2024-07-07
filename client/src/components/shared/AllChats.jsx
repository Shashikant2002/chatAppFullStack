import React, { useEffect } from "react";
import ChatItem from "./ChatItem";
import { useMyChatesQuery } from "../../global/api/api";
import Loading from "./Loading";
import useError from "../../hooks/error";

const AllChats = () => {
  const { isLoading, data, isError, error, refetch } = useMyChatesQuery();

  console.log(data);

  useError([{ isError, error }]);

  return (
    <>
      {isLoading ? <Loading /> : ""}
      <div className="chatList">
        {data?.chat?.map((data, i) => (
          <ChatItem key={i} index={i} data={data} />
        ))}
      </div>
    </>
  );
};

export default AllChats;
