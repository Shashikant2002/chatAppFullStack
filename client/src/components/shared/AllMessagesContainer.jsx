import React from "react";
import { sampleMessage } from "../../data/data";
import MessageCard from "./MessageCard";

const AllMessagesContainer = () => {
  return (
    <div className="allMessages">
      {sampleMessage?.map((message, ind) => (
        <MessageCard key={ind} message={message} />
      ))}
    </div>
  );
};

export default AllMessagesContainer;
