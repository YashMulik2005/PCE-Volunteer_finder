import React, { useEffect, useRef, useState } from "react";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaUser, FaPhone } from "react-icons/fa";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { useParams } from "react-router";
import axios from "axios";
import moment from "moment";
import { ImOffice } from "react-icons/im";
import Footer from "../../components/Footer";
import authHook from "../../context/AuthContext";
import toast from "react-hot-toast";

function EventDeatils() {
  const modalRef = useRef(null);
  const { id } = useParams();
  const [data, setdata] = useState();
  const { token } = authHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}applications/add`,
      {
        event_id: id,
        name: data?.name,
        mail: data?.email,
        mobile: data?.mobile,
      },
      {
        headers: {
          authentication: `Bearer ${token}`,
        },
      }
    );

    if (res?.data?.status) {
      toast.success("Applied suceesfully.");
      modalRef.current.close();
      reset();
    }
  };

  const getData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}events/${id}`
    );
    const result = res.data;
    console.log(result?.data);

    setdata(result?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-[#f6f6f6] w-full h-screen flex flex-col">
      <div className="h-12 shadow-md">
        <VolunteerNavbar />
      </div>

      <div className="w-full flex-grow overflow-y-auto flex flex-col items-center bg-[#f6f6f6]">
        <div className=" px-3 text-xs sm:text-sm sm:px-24 w-full mt-5">
          <div className="bg-white bg-[radial-gradient(circle_at_top_left,_#e8f4f8,_#ffffff)] rounded-md flex p-4 justify-between items-center">
            <div className="flex gap-4">
              <div className="w-14 h-14">
                <div className="rounded-full h-full w-full bg-[#047294] flex justify-center items-center">
                  <ImOffice color="white" size={25} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#047294]">
                  {data?.organization?.org_name}
                </h1>
                <section className="flex gap-3">
                  <p className="text-gray-600">
                    <span className="text-[#45849b] font-bold">Mail:</span>{" "}
                    {data?.organization?.mail}
                  </p>
                  <p className="text-gray-600">
                    <span className="text-[#45849b] font-bold">Mobile:</span>{" "}
                    {data?.organization?.mobile_no}
                  </p>
                </section>
              </div>
            </div>

            <button
              onClick={() => modalRef.current.showModal()}
              className="bg-[#047294] px-4 py-2 h-8 flex items-center text-sm font-bold text-white rounded"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="bg-white  w-full flex p-7 rounded gap-6 mt-5">
          <div className="w-[70%] flex flex-col gap-4">
            <div>
              <h1 className="text-lg font-bold">Title</h1>
              <p className="text-gray-600 mt-1">{data?.title}</p>
            </div>
            <div>
              <h1 className="text-lg font-bold">Description</h1>
              <p className="text-gray-600 mt-1">{data?.description}</p>
            </div>
            <div>
              <h1 className="text-lg font-bold">Type</h1>
              <p className="text-gray-600 mt-1">{data?.type}</p>
            </div>
            <div>
              <h1 className="text-lg font-bold">Event Date</h1>
              <p className="text-gray-600 mt-1">
                {moment(data?.eventDate).format("MMMM Do YYYY")}
              </p>
            </div>
            <div>
              <h1 className="text-lg font-bold">Event Time</h1>
              <p className="bg-gray-100 inline rounded-3xl mt-1 px-4 text-sm font-semibold py-1 text-[#047294]">
                {data?.eventTime}
              </p>
            </div>
            <div>
              <h1 className="text-lg font-bold">Registration Deadline</h1>
              <p className="text-gray-600 mt-1">
                {moment(data?.registrationDeadline).format("MMMM Do YYYY")}
              </p>
            </div>
            <div>
              <h1 className="text-lg font-bold">Duration</h1>
              <p className="bg-gray-100 inline rounded-3xl px-4 text-sm font-semibold py-1 text-[#047294]">
                {data?.duration}
              </p>
            </div>
            <div>
              <h1 className="text-lg font-bold">Volunteers Required</h1>
              <p className="text-gray-600 mt-1">{data?.volunteersRequired}</p>
            </div>
          </div>

          <div className="w-[30%] border-l-[1px] border-gray-300 p-3">
            <section className="pb-4 border-b-[1px] border-gray-300">
              <h1 className="font-bold">Address :</h1>
              <p className="text-gray-600">{data?.location?.address}</p>
              <p className="text-gray-600">
                <span className="font-bold text-[#45849b] text-sm">City:</span>{" "}
                {data?.location?.city}
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-[#45849b]">State:</span>{" "}
                {data?.location?.state}
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-[#45849b]">Pincode:</span>{" "}
                {data?.location?.pincode}
              </p>
            </section>
            <section className="my-2 pb-4 border-b-[1px] border-gray-300">
              <h1 className="font-bold mb-2">Contact :</h1>
              <p className="text-gray-600">
                <span className="font-bold text-[#45849b]">Name:</span>{" "}
                {data?.contact?.name}
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-[#45849b]">Email:</span>{" "}
                {data?.contact?.email}
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-[#45849b]">Phone:</span>{" "}
                {data?.contact?.phone}
              </p>
            </section>
            <section className="my-2">
              <h1 className="font-bold mb-2">Posted On :</h1>
              <p className="bg-gray-100 inline rounded-3xl px-4 text-sm font-semibold py-1 text-[#047294]">
                {moment(data?.createdAt).format("MMMM Do YYYY")}
              </p>
            </section>
          </div>
        </div>
        <div className=" w-full">
          <Footer />
        </div>
      </div>

      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <button
              type="button"
              onClick={() => {
                reset();
                modalRef.current.close();
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            <div className=" flex gap-2 items-center">
              <BsDatabaseFillCheck size={20} color="#047294" />
              <h3 className="font-bold text-lg">Enter Details</h3>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Name
              </label>
              <div
                className={`flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ${
                  errors.name
                    ? "border-red-500 ring-red-300"
                    : "focus-within:ring-[#003840]"
                }`}
              >
                <FaUser className="text-[#047294] mr-2" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="outline-none w-full text-sm bg-transparent"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Email
              </label>
              <div
                className={`flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ${
                  errors.email
                    ? "border-red-500 ring-red-300"
                    : "focus-within:ring-[#003840]"
                }`}
              >
                <FaEnvelope className=" text-[#047294] mr-2" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="outline-none w-full text-sm bg-transparent"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Mobile Number
              </label>
              <div
                className={`flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ${
                  errors.mobile
                    ? "border-red-500 ring-red-300"
                    : "focus-within:ring-[#003840]"
                }`}
              >
                <FaPhone className="text-[#047294] mr-2" />
                <input
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="outline-none w-full text-sm bg-transparent"
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Mobile number must be 10 digits",
                    },
                  })}
                />
              </div>
              {errors.mobile && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            <div className=" flex justify-end">
              <button
                type="submit"
                className=" bg-[#047294] py-1.5 px-4 text-white rounded text-sm font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default EventDeatils;
