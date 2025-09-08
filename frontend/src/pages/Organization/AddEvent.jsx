import React from "react";
import { useForm } from "react-hook-form";
import {
  FaHeading,
  FaMapMarkerAlt,
  FaCity,
  FaClock,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaUser,
  FaHashtag,
} from "react-icons/fa";
import Footer from "../../components/Footer";
import authHook from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

function AddEvent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const { token } = authHook();
  const navigate = useNavigate();

  const fetchCoordinates = async () => {
    try {
      const address = getValues("address") || "";
      const city = getValues("city") || "";
      const state = getValues("state") || "";
      const pincode = getValues("pincode") || "";

      const fullAddress = `${address}, ${city}, ${state}, ${pincode}, India`;
      if (!fullAddress.trim()) {
        toast.error("Please enter address details first.");
        return;
      }

      const apiKey = "95902c715dc643b0889465bcf24d0775";
      const res = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          fullAddress
        )}&key=${apiKey}&countrycode=in&limit=1`
      );

      if (res.data.results.length > 0) {
        const { lat, lng } = res.data.results[0].geometry;
        setValue("lat", lat);
        setValue("lng", lng);
        toast.success("Coordinates fetched successfully!");
      } else {
        toast.error("No coordinates found for the given address.");
      }
    } catch (err) {
      toast.error("Error fetching coordinates");
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}events/add`,
        {
          title: data.title,
          description: data.description,
          location: {
            address: data.address,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            coordinates: {
              lat: parseFloat(data.lat),
              lng: parseFloat(data.lng),
            },
          },
          eventDate: data.eventDate,
          eventTime: data.eventTime,
          duration: data.duration,
          volunteersRequired: parseInt(data.volunteersRequired),
          registrationDeadline: data.registrationDeadline,
          contact: {
            name: data.contactName,
            email: data.contactEmail,
            phone: data.contactPhone,
          },
          type: data.type,
        },
        {
          headers: {
            authentication: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.status) {
        toast.success("Applied successfully.");
        navigate("/organization/events");
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login failed. Please try again.";

      toast.error(errorMessage);
      console.error("Login error:", err);
    }

    console.log(formattedData);
  };

  const inputField = ({
    name,
    label,
    icon,
    placeholder,
    type = "text",
    validation,
  }) => (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">
        {label}
      </label>
      <div
        className={`flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ${
          errors[name]
            ? "border-red-500 ring-red-300"
            : "focus-within:ring-[#003840]"
        }`}
      >
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          className="outline-none w-full text-sm bg-transparent"
          {...register(name, validation)}
        />
      </div>
      {errors[name] && (
        <p className="text-sm text-red-600 mt-1">{errors[name].message}</p>
      )}
    </div>
  );

  return (
    <div className="bg-[#f6f6f6] h-screen">
      <div className="bg-white p-2 border-b">
        <h1 className="text-xl font-semibold text-[#047294]">New Event</h1>
      </div>

      <div className="overflow-y-auto h-[87%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-5 bg-white m-4 rounded shadow"
        >
          {inputField({
            name: "title",
            label: "Event Title",
            icon: <FaHeading className="text-gray-500 mr-2" />,
            placeholder: "Enter event title",
            validation: { required: "Title is required" },
          })}

          {inputField({
            name: "description",
            label: "Description",
            icon: <FaHashtag className="text-gray-500 mr-2" />,
            placeholder: "Enter description",
            validation: { required: "Description is required" },
          })}

          {inputField({
            name: "address",
            label: "Address",
            icon: <FaMapMarkerAlt className="text-gray-500 mr-2" />,
            placeholder: "Enter address",
            validation: { required: "Address is required" },
          })}

          <div className="grid grid-cols-3 gap-3">
            {inputField({
              name: "city",
              label: "City",
              icon: <FaCity className="text-gray-500 mr-2" />,
              placeholder: "Enter city",
            })}
            {inputField({
              name: "state",
              label: "State",
              icon: <FaCity className="text-gray-500 mr-2" />,
              placeholder: "Enter state",
            })}
            {inputField({
              name: "pincode",
              label: "Pincode",
              icon: <FaCity className="text-gray-500 mr-2" />,
              placeholder: "Enter pincode",
            })}
          </div>

          <div className=" flex justify-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                // console.log("fetching lag-long");
                fetchCoordinates();
              }}
              className="bg-[#047294] text-white px-4 py-2 rounded"
            >
              <p className=" text-xs font-semibold">Get Latitude & Longitude</p>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {inputField({
              name: "lat",
              label: "Latitude",
              icon: <FaMapMarkerAlt className="text-gray-500 mr-2" />,
              placeholder: "Enter latitude",
            })}
            {inputField({
              name: "lng",
              label: "Longitude",
              icon: <FaMapMarkerAlt className="text-gray-500 mr-2" />,
              placeholder: "Enter longitude",
            })}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {inputField({
              name: "eventDate",
              label: "Event Date",
              icon: <FaCalendarAlt className="text-gray-500 mr-2" />,
              placeholder: "Select date",
              type: "date",
              validation: { required: "Event date is required" },
            })}
            {inputField({
              name: "eventTime",
              label: "Event Time",
              icon: <FaClock className="text-gray-500 mr-2" />,
              placeholder: "Select time",
              type: "time",
              validation: { required: "Event time is required" },
            })}
          </div>

          {inputField({
            name: "duration",
            label: "Duration",
            icon: <FaClock className="text-gray-500 mr-2" />,
            placeholder: "e.g. 2 hours",
          })}

          {inputField({
            name: "volunteersRequired",
            label: "Volunteers Required",
            icon: <FaUser className="text-gray-500 mr-2" />,
            placeholder: "Enter number",
            type: "number",
            validation: { required: "Volunteers required" },
          })}

          {inputField({
            name: "registrationDeadline",
            label: "Registration Deadline",
            icon: <FaCalendarAlt className="text-gray-500 mr-2" />,
            type: "date",
            validation: { required: "Registration deadline required" },
          })}

          <div className="grid grid-cols-3 gap-3">
            {inputField({
              name: "contactName",
              label: "Contact Name",
              icon: <FaUser className="text-gray-500 mr-2" />,
              placeholder: "Enter contact name",
              validation: { required: "Contact name is required" },
            })}
            {inputField({
              name: "contactEmail",
              label: "Contact Email",
              icon: <FaEnvelope className="text-gray-500 mr-2" />,
              placeholder: "Enter email",
              type: "email",
              validation: { required: "Email is required" },
            })}
            {inputField({
              name: "contactPhone",
              label: "Contact Phone",
              icon: <FaPhoneAlt className="text-gray-500 mr-2" />,
              placeholder: "Enter phone number",
              validation: { required: "Phone number is required" },
            })}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Event Type
            </label>
            <select
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#003840]"
              {...register("type", { required: true })}
            >
              <option value="Fundraiser">Fundraiser</option>
              <option value="Clean-up">Clean-up</option>
              <option value="Workshop">Workshop</option>
              <option value="Campaign">Campaign</option>
              <option value="Awareness Drive">Awareness Drive</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-[radial-gradient(circle_at_center,_#04687f,_#035466)] hover:brightness-110 hover:font-semibold text-white px-5 py-2 rounded text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Submit Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
