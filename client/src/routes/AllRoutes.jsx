import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "../components/shared/Loading";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { SocketProvider } from "../socket/Socket";

// Page Importing Start ========================>>>>>>>>>>>>>>>>>>>>>>>>
const Login_register = lazy(() => import("../pages/Login_register"));
// Page Importing End ========================>>>>>>>>>>>>>>>>>>>>>>>>

const AllRoutes = () => {
  const userDetail = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {userDetail.auth ? (
          <SocketProvider>
            <ProtectedRoute />
          </SocketProvider>
        ) : (
          <Routes>
            <Route path="/" element={<Login_register />} />
            <Route path="*" element={<Login_register />} />
          </Routes>
        )}
      </Suspense>
    </BrowserRouter>
  );
};

export default AllRoutes;
