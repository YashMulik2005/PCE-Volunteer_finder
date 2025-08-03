import React, { useState } from "react";
import authHook from "../context/AuthContext";
import { RiDashboardFill } from "react-icons/ri";
import { BsCalendarEventFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router";

function OrganizationNavbar() {
  const { userdata, logout } = authHook();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className=" flex flex-col h-screen justify-between p-3">
      <div className=" flex flex-col space-y-1">
        <h1 className=" text-xl font-bold text-[#047294] my-3">SITE NAME</h1>
        <section
          onClick={() => {
            navigate("/organization");
          }}
          className=" text-gray-600 text-sm flex gap-1 items-center font-semibold hover:bg-[#047294] hover:text-white p-1.5 rounded"
        >
          <RiDashboardFill /> <p>Dashboard</p>
        </section>
        <section
          onClick={() => {
            navigate("/organization/events");
          }}
          className=" text-gray-600 text-sm flex gap-1 items-center font-semibold hover:bg-[#047294] hover:text-white p-1.5 rounded"
        >
          <BsCalendarEventFill />
          <p>Events</p>
        </section>
        <section
          onClick={() => navigate("/organization/events/add")}
          className=" text-gray-600 text-sm flex gap-1 items-baseline font-semibold hover:bg-[#047294] hover:text-white p-1.5 rounded"
        >
          <IoMdAddCircle />
          <p>Add events</p>
        </section>
      </div>
      <div className="relative">
        <div
          className="border-t -mx-[12px] px-2 flex gap-2 justify-start items-center pt-2 cursor-pointer"
          onClick={() => setShowLogout(!showLogout)}
        >
          <div>
            <section className="w-8 h-8 bg-[#047294] rounded-full"></section>
          </div>
          <p className="text-sm font-semibold capitalize">
            {userdata?.org_name}
          </p>
        </div>

        {showLogout && (
          <div className="absolute -top-10 left-2 w-24 flex justify-center bg-white shadow-lg border px-4 py-2 rounded text-sm z-50">
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrganizationNavbar;
