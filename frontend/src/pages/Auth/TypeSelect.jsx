import React from "react";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";

function TypeSelect() {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col items-center justify-center h-screen bg-[#fafafa]">
      <div className=" w-full h-[8%]">
        <Navbar />
      </div>
      <div className=" flex flex-col sm:flex-row justify-between items-center w-full h-[92%] py-2">
        <div className=" flex flex-col items-center justify-between h-full w-full sm:w-1/2 p-3 border-b sm:border-b-0">
          <section>
            <h1 className=" text-center text-3xl font-bold mb-2">
              For Organization
            </h1>
            <p className=" text-center text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              velit cum vitae ipsam aliquam fugiat perspiciatis, dignissimos,
              sint placeat voluptate similique.
            </p>
          </section>
          <button
            onClick={() => navigate("/auth/organizationlogin")}
            className=" rounded bg-[#45849b]  text-white py-3 px-6 font-semibold hover:bg-dark_blue cursor-pointer hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
          >
            Login
          </button>
          <section>
            <p className=" text-center">Don't have an account?</p>
            <p
              onClick={() => navigate("/auth/organizationsignup")}
              className=" text-center text-main_blue font-semibold cursor-pointer"
            >
              Sign up
            </p>
          </section>
        </div>
        <div className=" flex flex-col items-center justify-between h-full w-full sm:w-1/2 p-3 sm:border-l-[1px] border-gray-200">
          <section>
            <h1 className=" text-center text-3xl font-bold mb-2 ">
              For Volunteer
            </h1>
            <p className=" text-center text-lg">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
              cupiditate voluptates doloribus consequuntur, officia architecto
              temporibus.
            </p>
          </section>
          <button
            onClick={() => navigate("/auth/volunteerlogin")}
            className=" rounded bg-[#45849b]  text-white py-3 px-6 font-semibold hover:bg-dark_blue cursor-pointer hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
          >
            Login
          </button>
          <section>
            <p className=" text-center">Don't have an account?</p>
            <p
              onClick={() => navigate("/auth/volunteersignup")}
              className=" text-center text-main_blue font-semibold cursor-pointer"
            >
              Sign up
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TypeSelect;
