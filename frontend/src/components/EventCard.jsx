import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ImOffice } from "react-icons/im";
import moment from "moment";

function EventCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/event/${data?._id}`)}
      className="bg-[radial-gradient(circle_at_top_left,_#e8f4f8,_#ffffff)] hover:scale-[1.01] transition-transform duration-200 ease-in-out p-4 rounded hover:shadow-md cursor-pointer flex flex-col gap-3"
    >
      <div className="flex gap-3 items-center">
        <div className="rounded-full h-10 w-10 bg-[#047294] flex justify-center items-center">
          <ImOffice color="white" size={20} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-[#02404e] leading-tight">
            {data?.title}
          </h1>
          <p className="text-[#047294] leading-none font-semibold">
            {data?.organization?.org_name}
          </p>
        </div>
      </div>

      <p className="text-gray-700 text-sm line-clamp-3">{data?.description}</p>

      <p className="text-sm text-gray-700">
        <span className="font-bold text-[#45849b]">Event Date:</span>{" "}
        {moment(data?.eventDate).format("MMMM Do YYYY")}
      </p>
    </div>
  );
}

export default EventCard;
