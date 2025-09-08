import React from "react";

function OrganizationDetailsCardSkeleton() {
  return (
    <div className="px-3 text-xs sm:text-sm sm:px-20 w-full mt-5 animate-pulse">
      <div className="bg-white rounded-md flex p-4 justify-between items-center">
        <div className="flex gap-4 items-center">
          {/* Circle Icon */}
          <div className="w-14 h-14">
            <div className="rounded-full h-full w-full bg-gray-300"></div>
          </div>

          {/* Text Section */}
          <div className="w-[90%] flex flex-col gap-2">
            <div className="h-5 w-40 bg-gray-300 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-3 w-32 bg-gray-300 rounded mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationDetailsCardSkeleton;
