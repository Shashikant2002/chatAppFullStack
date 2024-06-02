import React from "react";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RanderAttachment from "./RanderAttachment";

const MessageCard = ({ message }) => {
  const timeAgo = moment(message?.createdAt).fromNow();

  return (
    <div className="messageCardItem">
      <div
        className="content"
        style={{
          alignSelf:
            message?.sender?._id == "hello" ? "flex-end" : "flex-start",
        }}
      >
        {message?.sender?._id !== "hello" && (
          <p className="userName">
            <span>Sander: </span>
            {message?.sender?.name} ({timeAgo})
          </p>
        )}
        {message?.sender?._id == "hello" && (
          <p className="userName" style={{ textAlign: "right" }}>
            <span>Sander: </span>
            You ({timeAgo})
          </p>
        )}
        <p className="message">{message?.content}</p>

        {message?.attachment?.length > 0 ? (
          <div className="attechment" style={{float:`${message?.sender?._id == "hello" ? "right" : "left"}`}}>
            <p className="title">Your Attechment</p>
            {message?.attachment?.map((file, ind) => {
              const format = fileFormat(file?.url);

              console.log(format);

              return (
                <a key={ind} href={file?.url} target="_blank" download={true}>
                  {RanderAttachment(format, file?.url)}
                </a>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MessageCard;
