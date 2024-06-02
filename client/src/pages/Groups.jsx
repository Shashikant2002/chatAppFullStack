import React from "react";
import ChatItem from "../components/shared/ChatItem";
import { IconButton } from "@mui/material";
import { IoArrowBack } from "react-icons/io5";
import { primary } from "../../config";

import { useNavigate } from "react-router-dom";

const Groups = () => {
  const navigate = useNavigate();

  return (
    <div className="manageGroup">
      <div className="allGroups">
        <div className="heading">
          <IconButton color="primary" onClick={() => navigate(-1)}>
            <IoArrowBack color={primary} />
          </IconButton>
          <h3 className="title">All Groups</h3>
        </div>

        <div className="groupsWrapper">
          {new Array(10)?.fill({})?.map((_, i) => (
            <ChatItem key={i} index={i} />
          ))}
        </div>
      </div>
      <div className="contentWrapper">asdfsadf</div>
    </div>
  );
};

export default Groups;
