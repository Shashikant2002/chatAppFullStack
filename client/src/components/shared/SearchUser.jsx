import React, { memo } from "react";
import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

const SearchUser = ({ user, sendFriendRequest }) => {
  return (
    <div className="searchUser">
      <Avatar src={user?.avatar} sx={{ width: 50, height: 50 }} />

      <div className="content">
        <div className="main">
          <h4 className="name">{user?.name}</h4>
          <p className="bio">{user?.bio}</p>
        </div>
        <Tooltip title="Send Friend Request" arrow>
          <IconButton
            color="primary"
            onClick={() => sendFriendRequest(user?._id)}
          >
            <FaPlus color="white" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default SearchUser;
