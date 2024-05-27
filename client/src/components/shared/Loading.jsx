import { CircularProgress } from "@mui/material";
import React from "react";
import { primary } from "../../../config";

const Loading = () => {
  return (
    <div className="loading">
      <CircularProgress color="primary" size={50} />

      <h2>Loading...</h2>
    </div>
  );
};

export default Loading;
