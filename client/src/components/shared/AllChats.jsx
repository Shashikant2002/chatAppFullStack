import React from "react";
import ChatItem from "./ChatItem";

const AllChats = () => {
  return (
    <div className="chatList">
      {new Array(100)?.fill({})?.map((_, i) => (
        <ChatItem key={i} index={i} />
      ))}
    </div>
  );
};

export default AllChats;
