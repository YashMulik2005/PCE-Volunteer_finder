import React from "react";

function ProfileSkeleton() {
  return (
    <div className="overflow-y-auto w-[85%] h-full px-5 bg-[#f6f6f6] p-4 animate-pulse">
      {/* Profile Section */}
      <div className="relative bg-white flex gap-5 p-5 px-8">
        {/* Profile Image */}
        <div className="relative w-44 h-44">
          <div className="w-44 h-44 bg-gray-300 rounded-md"></div>
          <div className="absolute bottom-1 right-1 bg-gray-200 rounded-full p-3"></div>
        </div>

        {/* User Info */}
        <div className="flex flex-col gap-3 justify-center flex-1">
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
          <div className="h-4 w-48 bg-gray-300 rounded"></div>
          <div className="h-4 w-56 bg-gray-300 rounded"></div>
          <div className="h-4 w-52 bg-gray-300 rounded"></div>
          <div className="h-8 w-20 bg-gray-400 rounded-3xl mt-2"></div>
        </div>

        {/* Edit Profile Button */}
        <div className="absolute top-4 right-4">
          <div className="h-7 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-white mt-4 p-5 px-8">
        <div className="h-5 w-40 bg-gray-400 rounded mb-4"></div>
        <div className="flex flex-col gap-3">
          <div className="h-4 w-48 bg-gray-300 rounded"></div>
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
          <div className="h-4 w-52 bg-gray-300 rounded"></div>
          <div className="h-4 w-60 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton;
