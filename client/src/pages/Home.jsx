import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Button, IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home">
      <h1 className="title">Select A Friend To Chat</h1>
    </div>
  );
};

export default AppLayout()(Home);
