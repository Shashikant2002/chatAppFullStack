import React, { memo } from "react";
import { Avatar } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";

const ChatItem = ({ index }) => {
  return (
    <div className={`${index == 5 ? "active" : ""} chatCard`}>
      <AvatarGroup total={1} max={2}>
        <Avatar src="" sx={{ width: 50, height: 50 }} />
      </AvatarGroup>

      <div className="content">
        <div className="main">
          <h4 className="name">Rahul</h4>
          <p className="lastMessage">Message</p>
        </div>
        <p className="time">5:00am</p>
      </div>
    </div>
  );
};

export default memo(ChatItem);
