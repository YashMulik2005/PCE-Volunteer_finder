import React from "react";
import { useNavigate } from "react-router";
// import { FaHandshakeSimple } from "react-icons/fa6";
import { GiShakingHands } from "react-icons/gi";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-between items-center bg-transparent px-4 py-1 h-full w-full">
      <section className=" font-semibold text-white flex gap-1 items-center">
        <GiShakingHands size={20} />
        <p>FindMyVolunteer</p>
      </section>

      <button
        onClick={() => navigate("/auth/type")}
        className="bg-[radial-gradient(circle_at_center,_#04687f,_#035466)] hover:brightness-110 hover:font-semibold text-white px-5 py-2 rounded text-xs transition-all duration-200 shadow-lg hover:shadow-xl"
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
