import React, { useEffect, useState } from "react";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import { IoDocumentText } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import authHook from "../../context/AuthContext";
import moment from "moment";
import { MdEventNote } from "react-icons/md";
import { FaRegCalendarAlt, FaMobileAlt } from "react-icons/fa";
import { MdOutlineSettingsApplications } from "react-icons/md";

function MyApplication() {
  const [userdata, setuserdata] = useState();
  const navigate = useNavigate();
  const [selectedState, setselectedState] = useState("all");
  const { token } = authHook();

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }applications/myApplication?status=${selectedState}`,
        {
          headers: {
            authentication: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.status) {
        console.log(res?.data?.data);
        setuserdata(res?.data?.data);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, [token, selectedState]);

  return (
    <div className="bg-[#f6f6f6] w-full min-h-screen h-screen flex flex-col">
      <div className="h-[7%] shadow-md ">
        <VolunteerNavbar />
      </div>

      <div className="flex w-full flex-grow h-[93%] overflow-hidden">
        {/* Sidebar */}
        <div className="w-[15%] bg-white h-full flex-shrink-0">
          <ul className="flex flex-col">
            <li
              onClick={() => {
                navigate("/volunteer");
              }}
              className="px-4 py-3 flex gap-2 items-center cursor-pointer hover:bg-[#047294] hover:text-white transition-colors"
            >
              <section>
                <MdEventNote size={18} />
              </section>
              <p>Events</p>
            </li>
            <li
              onClick={() => {
                navigate("/volunteer/my-application");
              }}
              className="px-4 py-3 flex gap-2 font-bold items-center cursor-pointer hover:bg-[#047294] hover:text-white transition-colors"
            >
              <section>
                <IoDocumentText size={18} className=" font-bold" />
              </section>
              <p>My Application</p>
            </li>
            <li
              onClick={() => {
                navigate("/volunteer/profile");
              }}
              className="px-4 py-2 flex gap-2 items-center cursor-pointer hover:bg-[#047294] hover:text-white transition-colors"
            >
              <section>
                <ImProfile size={17} />
              </section>
              <p>Profile</p>
            </li>
          </ul>
        </div>

        <div className="overflow-y-auto w-[85%] h-full bg-[#f6f6f6] p-4">
          <div className="w-full h-full bg-white rounded-xl shadow-sm p-6 overflow-y-auto">
            <div className=" flex gap-3">
              <section>
                <MdOutlineSettingsApplications
                  size={70}
                  className="text-[#047294]"
                />
              </section>
              <section className="">
                <h1 className="text-2xl font-bold mb-2">My Applications</h1>
                <p className="text-gray-500 mb-6">
                  Here is you all applications.
                </p>
              </section>
            </div>
            <div className="flex items-center gap-6 border-b border-gray-200 mb-4">
              <button
                onClick={() => setselectedState("all")}
                className={`pb-2 ${
                  selectedState === "all"
                    ? "border-b-2 border-black font-semibold"
                    : "text-gray-500"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setselectedState("Under Review")}
                className={`pb-2 ${
                  selectedState === "Under Review"
                    ? "border-b-2 border-black font-semibold"
                    : "text-gray-500"
                }`}
              >
                In Review
              </button>
              <button
                onClick={() => setselectedState("approved")}
                className={`pb-2 ${
                  selectedState === "approved"
                    ? "border-b-2 border-black font-semibold"
                    : "text-gray-500"
                }`}
              >
                Accepted
              </button>
              <button
                onClick={() => setselectedState("rejected")}
                className={`pb-2 ${
                  selectedState === "rejected"
                    ? "border-b-2 border-black font-semibold"
                    : "text-gray-500"
                }`}
              >
                Rejected
              </button>
            </div>
            {/* Search + Filter */}
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border border-gray-300 rounded-lg py-2 px-10 text-sm"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm">
                <FiFilter /> Filter
              </button>
            </div>
            {/* Applications Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
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
                <tbody>
                  {userdata?.map((app) => (
                    <tr key={app.id} className="border-b text-sm">
                      <td className="py-3">{app.id}</td>
                      <td className="py-3 font-medium text-md">
                        {app?.event_id?.title}
                      </td>
                      <td className="py-3">
                        <section className="flex items-center gap-2">
                          <FaRegCalendarAlt className="text-[#047294]" />
                          <span>
                            {moment(app?.event_id?.eventDate).format(
                              "MMMM Do YYYY"
                            )}
                          </span>
                        </section>
                      </td>

                      <td className="py-3">
                        <section className="flex items-center gap-2">
                          <FaRegCalendarAlt className="text-[#047294]" />
                          <span>
                            {moment(app.updatedAt).format("MMMM Do YYYY")}
                          </span>
                        </section>
                      </td>

                      <td className="py-3">
                        <section className="flex items-center gap-2">
                          <FaMobileAlt className="text-[#047294]" />
                          <span>{app.mobile}</span>
                        </section>
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-3 py-1 capitalize rounded-full text-xs font-medium 
                              ${
                                app.status === "approved"
                                  ? "bg-green-100 text-green-700"
                                  : app.status === "rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination
            <div className="flex justify-center gap-2 mt-6">
              <button className="px-3 py-1 bg-[#047294] text-white rounded">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded">
                3
              </button>
              <span className="px-3 py-1">...</span>
              <button className="px-3 py-1 border border-gray-300 rounded">
                33
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyApplication;
