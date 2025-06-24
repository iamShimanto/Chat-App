import React from "react";
import { Navigate, Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex">
      <Outlet />
    </div>
  );
};

export default Layout;
