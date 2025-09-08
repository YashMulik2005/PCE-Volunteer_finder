import React from "react";

export default function OrganizationTableSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <table className="min-w-full text-sm text-left border-collapse bg-white">
        {/* Table Header */}
        <tbody className="text-gray-500">
          <tr>
            <td className="py-2 px-4">Name</td>
            <td className="py-2 px-4">Applied On</td>
            <td className="py-2 px-4">Email</td>
            <td className="py-2 px-4">Mobile No</td>
            <td className="py-2 px-4">Status</td>
            <td className="py-2 px-4">Actions</td>
          </tr>
        </tbody>

        {/* Skeleton Rows */}
        <tbody className="text-gray-600 font-semibold">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <tr key={i} className="border-t">
                <td className="py-3 px-4">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 w-28 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-5 w-16 bg-gray-400 rounded-full"></div>
                </td>
                <td className="py-3 px-4">
                  <div className="h-6 w-14 bg-gray-400 rounded"></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
