import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Avatar, Button, IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const Home = () => {
  const userDetail = useSelector((state) => state.user);

  const { name, user_name, user_id, email, createdAt, avatar } =
    userDetail?.userDetail?.user;

  return (
    <div className="home">
      <div className="myData">
        <h2>{user_id}</h2>
        <h2>{user_name}</h2>
        <h1>{name}</h1>
        <h2>{email}</h2>
        <h2>{new Date(createdAt)?.toUTCString()}</h2>

        <Avatar src={avatar?.url} sx={{ width: 200, height: 200, my: 2 }} />
      </div>

      <h3 className="title">Select A Friend To Chat</h3>
    </div>
  );
};

export default AppLayout()(Home);
