import React, { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// Page Importing Start ========================>>>>>>>>>>>>>>>>>>>>>>>>
const Home = lazy(() => import("../pages/Home"));
const Chat = lazy(() => import("../pages/Chat"));
const Group = lazy(() => import("../pages/Groups"));
// Page Importing End ========================>>>>>>>>>>>>>>>>>>>>>>>>

const ProtectedRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:chat_id" element={<Chat />} />
        <Route path="/group" element={<Group />} />
      </Routes>
    </>
  );
};

export default ProtectedRoute;
