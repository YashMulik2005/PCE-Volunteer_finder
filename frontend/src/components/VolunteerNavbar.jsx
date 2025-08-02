import React, { useState } from "react";
import { useNavigate } from "react-router";
import authHook from "../context/AuthContext";
import { LuLogOut } from "react-icons/lu";

function VolunteerNavbar() {
  const { userdata, logout } = authHook();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logout(); // Assuming your context has a logout function
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="w-full h-12 flex justify-between items-center bg-white px-6 shadow-md relative">
      <h1 className="font-semibold text-lg">Website Name</h1>
      <section className="flex items-center gap-2 cursor-pointer relative">
        <div className="rounded-full h-7 w-7 bg-[#047294]"></div>
        <p className="font-semibold" onClick={() => setShowModal(!showModal)}>
          {userdata?.name || "Yash Mulik"}
        </p>

        {/* Modal */}
        {showModal && (
          <div className="absolute top-12 w-24 h-10 flex justify-center items-center right-0 bg-white border rounded-md shadow-lg p-3 z-10">
            <section
              onClick={handleLogout}
              className=" flex justify-center items-center gap-1"
            >
              <LuLogOut size={15} color="red" />
              <button className="text-red-600 font-medium text-sm hover:underline">
                Logout
              </button>
            </section>
          </div>
        )}
      </section>
    </div>
  );
}

export default VolunteerNavbar;
