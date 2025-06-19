import React from "react";
import { Navigate, Outlet } from "react-router";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Layout = () => {
  const userInfo = useSelector((state) => state.userData.user);

  if (!userInfo) {
    return <Navigate to="/signin" />;
  }
  return (
    <div className="flex">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
