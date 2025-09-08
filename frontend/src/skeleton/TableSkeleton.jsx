import React from "react";

function TableSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <table className="w-full text-left border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="py-2">#</th>
            <th className="py-2">Event Name</th>
            <th className="py-2">Event Date</th>
            <th className="py-2">Date Applied</th>
            <th className="py-2">Your Mobile</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>

        {/* Table Body Skeleton */}
        <tbody>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <tr key={i} className="border-b text-sm">
                <td className="py-3">
                  <div className="h-4 w-4 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3">
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3">
                  <div className="h-4 w-28 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3">
                  <div className="h-4 w-28 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3">
                  <div className="h-5 w-16 bg-gray-400 rounded-full"></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSkeleton;
