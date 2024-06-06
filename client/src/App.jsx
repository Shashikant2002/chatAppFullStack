import React, { useEffect, useState } from "react";
import AllRoutes from "./routes/AllRoutes";
import Loading from "./components/shared/Loading";
import axios from "axios";
import { baseUrl } from "../config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./global/asyncThung/userAsync";

const App = () => {
  const userDetail = useSelector((state) => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchMe({}));
  }, []);

  useEffect(() => {
    if (userDetail.error) {
      toast.error(userDetail.error.message);
    }
    if (userDetail?.userDetail?.success) {
      toast.success(userDetail?.userDetail?.message);
    }
  }, [userDetail.error, userDetail?.userDetail?.success]);

  return (
    <>
      {userDetail.loading ? <Loading /> : ""}
      <AllRoutes />
    </>
  );
};

export default App;
