import React, { useEffect, useRef } from "react";
import MessageCard from "./MessageCard";
import ScrollableFeed from "react-scrollable-feed";

const AllMessagesContainer = ({ messages }) => {
  const messageContainerRef = useRef(null);

  return (
    // <div
    //   className="allMessages"
    //   ref={messageContainerRef}
    //   onScroll={() => {
    //     let scrollTop = messageContainerRef.current.scrollTop;
    //   }}
    // >
    <ScrollableFeed className="allMessages">
      {messages?.map((message, ind) => (
        <MessageCard key={ind} message={message} />
      ))}
    </ScrollableFeed>
    // </div>
  );
};

export default AllMessagesContainer;
