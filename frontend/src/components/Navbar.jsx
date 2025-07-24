import React from "react";
import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-between items-center  px-4  py-1 h-full w-full bg-[#f6f6f6] shadow-sm">
      <h1 className=" font-semibold">Site Name</h1>

      <button
        onClick={() => navigate("/auth/type")}
        className="bg-[#047294] text-white px-4 py-2 rounded text-xs transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Sign up
      </button>
      {/* #fafafa */}
      {/* #047294 */}
      {/* #45849b */}

      {/* #f6f6f6 */}
    </div>
  );
}

export default Navbar;
