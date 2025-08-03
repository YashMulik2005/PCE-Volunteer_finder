import React from "react";
import Navbar from "../../components/Navbar";
import volunteer1 from "../../assets/volunteer1.png";
import volunteer2 from "../../assets/volunteer2.png";
import org1 from "../../assets/org1.png";
import org2 from "../../assets/org2.png";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { BsCheckSquareFill } from "react-icons/bs";
import homeVideo from "../../assets/homePageVideo.mp4";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  return (
    <div className=" min-h-screen flex flex-col">
      <div className="relative h-screen w-full">
        <video
          src={homeVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover border-none opacity-100"
        />
        <div className="flex flex-col items-center bg-black bg-opacity-40 justify-center gap-3 px-6 h-full relative z-10">
          <div className="w-full flex items-center h-[10%]">
            <Navbar />
          </div>
          <div className=" w-full h-[90%] flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl sm:text-5xl sm:w-[70%] font-bold text-center leading-tight text-white">
              Giving is the only true acquisition, we get only as we give.
            </h1>
            <p className=" text-white text-center max-w-lg font-semibold">
              Charity refers to the act of giving or providing assistance to
              those in need, often in the form of financial or material support.
              Charitable giving is typically motivated by compassion.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <button className="bg-[radial-gradient(circle_at_center,_#04687f,_#035466)] hover:brightness-110 hover:font-semibold text-white px-5 py-2 rounded text-sm transition-all duration-200 shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 px-6 sm:px-16 py-12 sm:py-20 items-center">
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          <div className="relative w-60 h-96 rounded-lg overflow-hidden shadow-md">
            <img
              src={volunteer1}
              alt="donate"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-60 h-96 rounded-lg overflow-hidden shadow-md">
            <img
              src={volunteer2}
              alt="teamwork"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[#45849b] font-semibold flex gap-2 items-center">
            <span>
              <FaPersonCircleCheck size={25} />
            </span>
            For Volunteers
          </p>
          <h2 className="text-3xl font-bold text-[#047294]">
            Be the Change You Wish to See
          </h2>
          <p className="text-gray-600 font-semibold">
            Volunteers are the heartbeat of change. Whether it's feeding the
            hungry, organizing drives, or supporting disaster relief — your
            contribution matters.
          </p>
          <ul className="text-gray-700 grid grid-cols-2 gap-x-6 gap-y-2">
            <li>
              <BsCheckSquareFill className="text-[#047294] inline-block mr-2" />
              Discover nearby volunteering opportunities.
            </li>
            <li>
              <BsCheckSquareFill className="text-[#047294] inline-block mr-2" />
              Apply with a single click.
            </li>
            <li>
              <BsCheckSquareFill className="text-[#047294] inline-block mr-2" />
              Track your application status.
            </li>
            <li>
              <BsCheckSquareFill className="text-[#047294] inline-block mr-2" />
              Receive selection updates via email.
            </li>
          </ul>

          <button
            onClick={() => navigate("/auth/volunteerlogin")}
            className="bg-[radial-gradient(circle_at_center,_#04687f,_#035466)] hover:brightness-110 hover:font-semibold text-white px-5 py-2 rounded text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Become a Volunteer
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10 px-6 sm:px-16 py-12 sm:py-20 items-center bg-[radial-gradient(circle_at_center,_#04687f,_#035466)]">
        <div className="space-y-3">
          <p className="text-white font-semibold flex gap-2 items-center">
            <span>
              <FaBuildingCircleArrowRight size={25} />
            </span>
            For Organizations
          </p>
          <h2 className="text-3xl font-bold text-white">
            Find the Right People for the Right Cause
          </h2>
          <p className="text-white font-semibold">
            We empower organizations to reach motivated individuals ready to
            make a difference. Seamlessly create events, manage applications,
            and build a strong community of support.
          </p>
          <ul className="text-white grid grid-cols-2 gap-x-6 gap-y-2">
            <li>
              <BsCheckSquareFill className="text-white inline-block mr-2" />
              Create and manage events easily.
            </li>
            <li>
              <BsCheckSquareFill className="text-white inline-block mr-2" />
              View and review volunteer applications.
            </li>
            <li>
              <BsCheckSquareFill className="text-white inline-block mr-2" />
              Select candidates and notify them instantly
            </li>
            <li>
              <BsCheckSquareFill className="text-white inline-block mr-2" />
              Focus more on impact, not logistics .{" "}
            </li>
          </ul>

          <button
            onClick={() => {
              navigate("/auth/organizationlogin");
            }}
            className=" bg-white hover:brightness-110 font-semibold hover:font-bold text-[#047294] px-5 py-2 rounded text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Register Your Organization
          </button>
        </div>
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          <div className="relative w-60 h-96 rounded-lg overflow-hidden shadow-md">
            <img
              src={org1}
              alt="donate"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-60 h-96 rounded-lg overflow-hidden shadow-md">
            <img
              src={org2}
              alt="teamwork"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className=" flex flex-col items-center justify-center gap-2 p-5 h-72">
        <h2 className="text-2xl font-bold text-[#047294]">
          Join Our Community
        </h2>
        <p className=" text-gray-600 font-semibold">
          Be a part of a growing network of volunteers and organizations working
          together for a better tomorrow.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
