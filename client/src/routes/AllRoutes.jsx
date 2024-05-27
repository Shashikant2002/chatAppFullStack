import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "../components/shared/Loading";
import ProtectedRoute from "./ProtectedRoute";

// Page Importing Start ========================>>>>>>>>>>>>>>>>>>>>>>>>
const Login_register = lazy(() => import("../pages/Login_register"));
// Page Importing End ========================>>>>>>>>>>>>>>>>>>>>>>>>

const AllRoutes = () => {
  const [isAuth, setIsAuth] = useState(true);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {isAuth ? (
          <ProtectedRoute />
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
