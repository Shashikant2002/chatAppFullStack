import React, { memo } from "react";
import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";

const NotificationItem = () => {
  return (
    <div className="notificationItem">
      <Avatar sx={{ width: 50, height: 50 }} />

      <div className="content">
        <div className="main">
          <h4 className="name">Rahul</h4>
          <p className="bio">Bio</p>
        </div>
        <div className="control">
          <Tooltip title="Send Friend Request" arrow>
            <IconButton color="primary">
              <FaXmark color="white" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Send Friend Request" arrow>
            <IconButton color="primary" varient={"contained"}>
              <IoMdCheckmark color="white" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
