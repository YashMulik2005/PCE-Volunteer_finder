import React from "react";
import { Outlet } from "react-router";
import OrganizationNavbar from "../../components/OrganizationNavbar";

function OrgLayout() {
  return (
    <div className=" flex h-screen">
      <div className=" w-[15%] border">
        <OrganizationNavbar />
      </div>
      <div className=" w-[85%] border">
        <Outlet />
      </div>
    </div>
  );
}

export default OrgLayout;
