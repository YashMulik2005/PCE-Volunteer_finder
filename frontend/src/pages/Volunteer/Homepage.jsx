import React, { useEffect, useState } from "react";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import EventCard from "../../components/EventCard";
import Footer from "../../components/Footer";
import axios from "axios";

function Homepage() {
  const [data, setdata] = useState([]);

  const getdata = async () => {
    const res = await axios.get("http://localhost:3000/api/events");
    const result = res.data;
    console.log(result?.data);

    setdata(result?.data);
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="bg-[#fafafa] w-full h-screen flex flex-col">
      <div className="h-12 shadow-md">
        <VolunteerNavbar />
      </div>
      <div className="flex-grow overflow-y-auto px-4 sm:px-24 bg-[#fafafa] p-4">
        <div className="flex gap-4">
          <input
            className="  px-3 py-2.5 text-sm rounded w-full focus:outline-none"
            placeholder="Search..."
          />
          <button className="bg-[#047294] text-white px-5 py-2 rounded text-xs transition-all duration-200 shadow-lg hover:shadow-xl">
            Search
          </button>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4  mt-4">
          {data?.map((item, index) => {
            return <EventCard key={index} data={item} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
