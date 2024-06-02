import React, { memo } from "react";
import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

const SearchUser = () => {
  return (
    <div className="searchUser">
      <Avatar sx={{ width: 50, height: 50 }} />

      <div className="content">
        <div className="main">
          <h4 className="name">Rahul</h4>
          <p className="bio">Bio</p>
        </div>
        <Tooltip title="Send Friend Request" arrow>
          <IconButton color="primary">
            <FaPlus color="white" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default SearchUser;
