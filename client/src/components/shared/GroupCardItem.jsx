import React, { memo } from "react";
import { Avatar } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";

const GroupCardItem = ({ index }) => {
  return (
    <div className={`${index == 5 ? "active" : ""} GroupchatCard`}>
      <AvatarGroup total={50} max={2}>
        <Avatar sx={{ width: 50, height: 50 }} />
        <Avatar sx={{ width: 50, height: 50 }} />
        <Avatar sx={{ width: 50, height: 50 }} />
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

export default memo(GroupCardItem);
