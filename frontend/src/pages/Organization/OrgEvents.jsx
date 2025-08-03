import React, { useEffect, useState } from "react";
// import EventCard from "../../components/EventCard";
import axios from "axios";
import authHook from "../../context/AuthContext";
import OrgEventCard from "../../components/OrgEventCard";

function OrgEvents() {
  const [events, setEvents] = useState([]);
  const { userdata, token } = authHook();
  console.log(userdata);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}events/organization/${userdata.id}`
      );
      const result = res.data;
      console.log(result?.data, "response");
      setEvents(result?.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [token]);

  return (
    <div className=" bg-[#f6f6f6] h-screen">
      <div className=" bg-white p-2 border-b">
        <h1 className="text-xl font-semibold text-[#047294]">
          Organization Event
        </h1>
      </div>

      <div className=" flex justify-end my-2 p-4">
        <div className=" flex ">
          <input
            className=" sm:w-96 py-2 px-2 bg-white rounded focus:outline-none"
            placeholder="search"
          />
          <button className=" bg-[#047294] text-white px-4 py-2 rounded text-xs transition-all duration-200 shadow-lg hover:shadow-xl ml-2">
            Search
          </button>
        </div>
      </div>
      <div className=" grid grid-cols-1 gap-3 p-4">
        {events?.map((item, index) => {
          return <OrgEventCard key={index} data={item} />;
        })}
      </div>
    </div>
  );
}

export default OrgEvents;
