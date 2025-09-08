import React from "react";

function EventCardSkeleton() {
  return (
    <div className=" bg-white animate-pulse p-4 rounded flex flex-col gap-3">
      <div className="flex gap-3 items-center">
        <div className="rounded-full h-10 w-10 bg-gray-300"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-3 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
      </div>

      <div className="h-3 w-40 bg-gray-300 rounded"></div>
    </div>
  );
}

export default EventCardSkeleton;
