import React from "react";

function EventDetailsSkeleton() {
  return (
    <div className="w-full flex-grow overflow-y-auto flex flex-col items-center bg-[#f6f6f6] animate-pulse">
      {/* Organization Card */}
      <div className="px-3 text-xs sm:text-sm sm:px-24 w-full mt-5">
        <div className="bg-white rounded-md flex flex-col sm:flex-row gap-2 p-4 justify-between sm:items-center">
          <div className="flex gap-4 items-center">
            <div className="sm:w-14 sm:h-14 w-10 h-10 rounded-full bg-gray-300" />
            <div className="flex flex-col gap-2">
              <div className="h-5 w-40 bg-gray-300 rounded" />
              <div className="flex gap-3">
                <div className="h-4 w-28 bg-gray-300 rounded" />
                <div className="h-4 w-28 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
          <div className="h-8 w-20 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Event Details */}
      <div className="bg-white w-full flex flex-col sm:flex-row p-7 rounded gap-6 mt-5">
        {/* Left side details */}
        <div className="w-full sm:w-[70%] flex flex-col gap-4 border-b sm:border-b-0 pb-3 sm:pb-0">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i}>
                <div className="h-5 w-32 bg-gray-300 rounded mb-2" />
                <div className="h-4 w-60 bg-gray-200 rounded" />
              </div>
            ))}
        </div>

        {/* Right side details */}
        <div className="w-full sm:w-[30%] sm:border-l-[1px] border-gray-300 sm:p-3 flex flex-col gap-5">
          {/* Address */}
          <section className="flex flex-col gap-2 pb-4 border-b">
            <div className="h-5 w-24 bg-gray-300 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </section>

          {/* Contact */}
          <section className="flex flex-col gap-2 pb-4 border-b">
            <div className="h-5 w-24 bg-gray-300 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-36 bg-gray-200 rounded" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </section>

          {/* Posted On */}
          <section className="flex flex-col gap-2">
            <div className="h-5 w-28 bg-gray-300 rounded" />
            <div className="h-6 w-32 bg-gray-200 rounded-full" />
          </section>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="w-full mt-5">
        <div className="h-10 bg-gray-300 w-full" />
      </div>
    </div>
  );
}

export default EventDetailsSkeleton;
