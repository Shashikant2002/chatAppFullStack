import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Avatar, Button, IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const Home = () => {
  const userDetail = useSelector((state) => state.user);

  const { name, user_name, user_id, email, createdAt, avatar, bio } =
    userDetail?.userDetail?.user;

  return (
    <div className="home">
      <div className="myData">
        <h3>{user_id}</h3>
        <h3>{user_name}</h3>
        <h2>{name}</h2>
        <h3>{email}</h3>
        <h3>{new Date(createdAt)?.toUTCString()}</h3>

        <Avatar src={avatar?.url} sx={{ width: 200, height: 200, my: 2 }} />
        <h3>{bio}</h3>
      </div>

      <h3 className="title">Select A Friend To Chat</h3>
    </div>
  );
};

export default AppLayout()(Home);
