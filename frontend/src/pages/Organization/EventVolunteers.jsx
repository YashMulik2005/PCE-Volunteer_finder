import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router";
import { ImOffice } from "react-icons/im";
import authHook from "../../context/AuthContext";

function EventVolunteers() {
  const [data, setdata] = useState([]);
  const [applicationData, setapplicationData] = useState([]);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const { id } = useParams();
  const { token } = authHook();

  const getData = async () => {
    const res = await axios.get(`http://localhost:3000/api/events/${id}`);
    const result = res.data;

    setdata(result?.data);
  };

  const getApplicationData = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/applications/event/${id}`
    );
    const result = res.data;
    setapplicationData(result);
  };

  const handleStatusChange = async (status, id) => {
    try {
      console.log(token, "token");

      const res = await axios.put(
        `http://localhost:3000/api/applications/status/${id}`,
        { status },
        {
          headers: {
            authentication: `Bearer ${token}`,
          },
        }
      );

      setapplicationData((prevData) =>
        prevData.map((app) =>
          app._id === id ? { ...app, status: res.data.status } : app
        )
      );
      document.getElementById("my_modal_3").close();
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getData();
    getApplicationData();
  }, []);

  return (
    <div className=" bg-[#f6f6f6] h-screen">
      <div className=" bg-white p-2 border-b">
        <h1 className="text-xl font-semibold text-[#047294]">
          Organization Event
        </h1>
      </div>
      <div className="w-full flex-grow overflow-y-auto flex flex-col items-center p-3 ">
        <div className=" px-3 text-xs sm:text-sm sm:px-20 w-full mt-5">
          <div className=" bg-white rounded-md flex p-4 justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14">
                <div className="rounded-full h-full w-full bg-[#047294] flex justify-center items-center">
                  <ImOffice color="white" size={25} />
                </div>
              </div>
              <div className=" w-[90%]">
                <h1 className=" text-lg font-semibold text-[#047294]">
                  {data?.title}
                </h1>
                <p className=" line-clamp-2">{data?.description}</p>
                <p className=" text-sm text-gray-500">
                  {moment(data?.eventDate).format("MMMM Do YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full ">
          <div className="overflow-x-auto rounded-md shadow-md bg-white">
            <div className=" flex justify-end border-b">
              <div className=" bg-white p-2 flex items-center ">
                <input
                  className=" sm:w-80 py-2 px-3 text-gray-600 text-sm bg-[#f6f6f6] rounded-lg focus:outline-none"
                  placeholder="search"
                />
                <button className=" bg-[#047294] text-white px-4 py-2 rounded text-xs transition-all duration-200 shadow-lg hover:shadow-xl ml-2">
                  Search
                </button>
              </div>
            </div>
            <table className="min-w-full text-sm text-left border-collapse bg-white">
              <tbody className=" text-gray-500">
                <tr>
                  <td className="py-2 px-4">Name</td>
                  <td className="py-2 px-4">Applied On</td>
                  <td className="py-2 px-4">Email</td>
                  <td className="py-2 px-4">Mobile No</td>
                  <td className="py-2 px-4">Status</td>
                  <td className="py-2 px-4">Actions</td>
                </tr>
              </tbody>
              <tbody className="text-gray-600 font-semibold">
                {applicationData?.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">
                      {moment(item.createdAt).format("MMMM Do YYYY")}
                    </td>
                    <td className="py-3 px-4">{item.mail}</td>
                    <td className="py-3 px-4">{item.mobile}</td>
                    <td className="py-3 px-4 capitalize">
                      {item.status === "approved" ? (
                        <p className=" bg-green-100 inline rounded-3xl px-4 text-sm font-semibold py-1 text-green-600">
                          {item.status}
                        </p>
                      ) : item.status === "rejected" ? (
                        <p className="bg-red-100 inline rounded-3xl px-4 text-sm font-semibold py-1 text-red-600">
                          {item.status}
                        </p>
                      ) : (
                        <p className="bg-gray-100 inline rounded-3xl px-4 text-sm font-semibold py-1 text-[#047294]">
                          {item.status}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          setSelectedAppId(item._id);
                          document.getElementById("my_modal_3").showModal();
                        }}
                        className=" bg-[#047294] text-white px-3 py-1 rounded text-xs transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">Manage Application</h3>
          <p className="py-4">
            Would you like to approve or reject this application?
          </p>

          <div className="flex justify-end gap-3 mt-4">
            <button
              className=" bg-green-600 font-semibold text-white px-4 py-1.5 rounded text-sm"
              onClick={() => handleStatusChange("approved", selectedAppId)}
            >
              Approve
            </button>
            <button
              className=" bg-red-600 font-semibold text-white px-4 py-1.5 rounded text-sm"
              onClick={() => handleStatusChange("rejected", selectedAppId)}
            >
              Reject
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default EventVolunteers;
