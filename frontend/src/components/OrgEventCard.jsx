import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ImOffice } from "react-icons/im";
import moment from "moment";

function OrgEventCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/organization/events/${data?._id}/volunteers`);
      }}
      className=" bg-white shadow p-4 rounded flex flex-col gap-2 cursor-pointer"
    >
      <div className=" flex gap-3 items-center">
        <div className="">
          <div className="rounded-full h-10 w-10 bg-[#047294] flex justify-center items-center">
            <ImOffice color="white" size={20} />
          </div>
        </div>
        <div className="">
          <h1 className="text-lg font-bold leading-tight">{data?.title}</h1>
          <p className="text-[#047294] leading-none font-semibold">
            {data?.organization?.org_name}
          </p>
        </div>
      </div>
      <div>
        <p className=" text-gray-600 text-sm">{data?.description}</p>
      </div>
      <div>
        <p className=" text-gray-600 text-sm">
          <span className=" font-bold text-[#45849b]">Date:</span>{" "}
          {moment(data?.eventDate).format("MMMM Do YYYY")}
        </p>
      </div>
    </div>
  );
}

export default OrgEventCard;
