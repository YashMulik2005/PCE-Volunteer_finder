import React, { useEffect, useState } from "react";
// import EventCard from "../../components/EventCard";
import axios from "axios";
import authHook from "../../context/AuthContext";
import OrgEventCard from "../../components/OrgEventCard";
import EventCardSkeleton from "../../skeleton/EventCardSkeleton";

function OrgEvents() {
  const [events, setEvents] = useState([]);
  const { userdata, token } = authHook();
  const [loading, setloading] = useState(false);
  // console.log(userdata);

  const fetchEvents = async () => {
    setloading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}events/organization/${userdata.id}`
      );
      const result = res.data;
      console.log(result?.data, "response");
      setEvents(result?.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setloading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [token]);

  return (
    <div className=" bg-[#f6f6f6] h-screen">
      <div className=" bg-white p-2 border-b h-[8%]">
        <h1 className="text-xl font-semibold text-[#047294]">
          Organization Event
        </h1>
      </div>

      <div className=" h-[92%] overflow-y-auto">
        <div className=" flex justify-end my-2 p-4 overflow-y-auto">
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
          {loading ? (
            <>
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </>
          ) : (
            events?.map((item, index) => {
              return <OrgEventCard key={index} data={item} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default OrgEvents;
