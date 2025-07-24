import React from "react";
import { Outlet } from "react-router";
import authgif from "../../assets/auth_img.gif";

function AuthLayout() {
  return (
    <div className="h-screen min-w-full flex sm:flex-row flex-col">
      <div className="w-1/2 hidden sm:block h-full bg-gradient-to-b from-[#003840] to-[#012b34]">
        <img
          src={authgif}
          alt="auth background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" w-full sm:w-1/2 h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
