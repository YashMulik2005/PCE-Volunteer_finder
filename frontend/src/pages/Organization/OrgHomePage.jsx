import React from "react";
import {
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaClipboardList,
} from "react-icons/fa";

function OrgHomePage() {
  const stats = [
    {
      title: "Total Events",
      value: 12,
      icon: <FaCalendarAlt className="text-2xl text-[#047294]" />,
    },
    {
      title: "Total Volunteers",
      value: 230,
      icon: <FaUsers className="text-2xl text-[#047294]" />,
    },
    {
      title: "Upcoming Events",
      value: 3,
      icon: <FaClock className="text-2xl text-[#047294]" />,
    },
    {
      title: "Pending Approvals",
      value: 8,
      icon: <FaClipboardList className="text-2xl text-[#047294]" />,
    },
  ];

  const recentActivities = [
    {
      time: "2 hrs ago",
      action: "New volunteer registered for 'Beach Cleanup'",
    },
    { time: "1 day ago", action: "Event 'Tree Plantation' was added" },
    {
      time: "3 days ago",
      action: "5 volunteers approved for 'Awareness Drive'",
    },
  ];

  return (
    <div className="bg-[#f6f6f6] min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-2xl font-semibold text-[#047294]">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4"
          >
            <div className="bg-[#e3f4f8] p-3 rounded-full">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-xl font-bold text-[#003840]">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      {/* <div className="p-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-semibold mb-3 text-[#047294]">
            Recent Activity
          </h2>
          <ul className="space-y-2">
            {recentActivities.map((activity, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 flex justify-between border-b pb-2"
              >
                <span>{activity.action}</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  );
}

export default OrgHomePage;
