import React, { useState, useEffect } from "react";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import { MdEventNote } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import axios from "axios";
import { useNavigate } from "react-router";
import authHook from "../../context/AuthContext";
import moment from "moment";
import defaultProfile from "../../assets/default_profile_img.png";
import { FaCamera } from "react-icons/fa";
import ProfileSkeleton from "../../skeleton/ProfileSkeleton";

function Profile() {
  const [userdata, setuserdata] = useState();
  const [loding, setloding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    profileImage: null,
  });
  const navigate = useNavigate();
  const { token, logout } = authHook();

  const getUserData = async () => {
    setloding(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}users/profile`,
        {
          headers: {
            authentication: `Bearer ${token}`,
          },
        }
      );
      setuserdata(res.data.user);
      setFormData({
        name: res.data.user.name || "",
        email: res.data.user.email || "",
        phone: res.data.user.phone || "",
        gender: res.data.user.gender || "",
        dob: res.data.user.dob ? res.data.user.dob.split("T")[0] : "",
        address: res.data.user.address || "",
        profileImage: res.data.user.profileImage || null,
      });
    } catch (err) {
      console.error(err);
    }
    setloding(false);
  };

  useEffect(() => {
    if (token) getUserData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files.length > 0) {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        phone: formData.phone,
        gender: formData.gender,
        dob: formData.dob,
        address: formData.address,
        profileImage: formData.profileImage,
      };

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}users/update-profile`,
        updatedData,
        {
          headers: {
            authentication: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status) {
        setuserdata(res.data.user);
        document.getElementById("edit_profile_modal").close();
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const onImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "HireConnectResumePDF");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/raw/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data?.secure_url);

    const result = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}users/updateProfileImage`,
      { profileImage: data?.secure_url },
      {
        headers: {
          authentication: `Bearer ${token}`,
        },
      }
    );

    if (result.data.status) {
      setuserdata((prev) => ({ ...prev, profileImage: data?.secure_url }));
      //setuserdata(result.data.user);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-[#f6f6f6] w-full min-h-screen h-screen flex flex-col">
      <div className="h-[7%] shadow-md ">
        <VolunteerNavbar />
      </div>

      <div className="flex w-full flex-grow h-[93%] overflow-hidden">
        <div className="w-[15%] bg-white h-full flex-shrink-0">
          <ul className="flex flex-col">
            <li
              onClick={() => navigate("/volunteer")}
              className="px-4 py-3 flex gap-2 items-center cursor-pointer hover:bg-[#047294] hover:text-white transition-colors"
            >
              <MdEventNote size={18} />
              <p>Events</p>
            </li>
            <li
              onClick={() => navigate("/volunteer/my-application")}
              className="px-4 py-3 flex gap-2 items-center cursor-pointer hover:bg-[#047294] hover:text-white transition-colors"
            >
              <IoDocumentText size={18} />
              <p>My Application</p>
            </li>
            <li
              onClick={() => navigate("/volunteer/profile")}
              className="px-4 py-2 flex gap-2 font-bold items-center cursor-pointer hover:bg-[#047294] hover:text-white transition-colors"
            >
              <ImProfile size={17} />
              <p>Profile</p>
            </li>
          </ul>
        </div>

        {loding ? (
          <ProfileSkeleton />
        ) : (
          <div className="overflow-y-auto w-[85%] h-full px-5 bg-[#f6f6f6] p-4">
            <div className="relative bg-white flex gap-5 p-5 px-8">
              <div className="relative w-44 h-44">
                <img
                  src={userdata?.profileImage || defaultProfile}
                  alt="Profile"
                  className="w-44 h-44 object-cover"
                />

                {/* Camera Button */}
                <label
                  htmlFor="profileImageUpload"
                  className="absolute bottom-1 right-1 bg-white shadow-md rounded-full p-2 cursor-pointer hover:bg-gray-100"
                >
                  <FaCamera size={20} className="text-gray-700" />
                </label>

                {/* Hidden File Input */}
                <input
                  id="profileImageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onImageChange}
                />
              </div>

              <div className="flex flex-col gap-2 justify-center">
                <p>
                  <span className="font-semibold">Name: </span>
                  {userdata?.name}
                </p>
                <p>
                  <span className="font-semibold">Email: </span>
                  {userdata?.email}
                </p>
                <p>
                  <span className="font-semibold">No of events applied: </span>3
                </p>
                <p>
                  <span className="font-semibold">Created At: </span>
                  {moment(userdata?.createdAt).format("MMMM Do YYYY")}
                </p>
                <button
                  onClick={handleLogout}
                  className=" bg-red-600 text-white text-sm font-semibold rounded-3xl px-2 py-1.5 w-20"
                >
                  Logout
                </button>
              </div>

              <button
                className="btn absolute top-4 right-4 text-sm"
                onClick={() =>
                  document.getElementById("edit_profile_modal").showModal()
                }
              >
                Edit Profile
              </button>
            </div>

            <div className=" bg-white mt-4 p-5 px-8">
              <h2 className="text-lg font-semibold mb-4">
                Additional Information
              </h2>
              <div className="flex flex-col gap-2">
                <p>
                  <span className="font-semibold">Phone: </span>
                  {userdata?.phone || "-"}
                </p>
                <p>
                  <span className="font-semibold">Gender: </span>
                  {userdata?.gender || "-"}
                </p>
                <p>
                  <span className="font-semibold">Date of Birth: </span>
                  {userdata?.dob
                    ? moment(userdata.dob).format("YYYY-MM-DD")
                    : "-"}
                </p>
                <p>
                  <span className="font-semibold">Address: </span>
                  {userdata?.address || "-"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Edit Profile</h3>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block font-medium">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* <div>
              <label className="block font-medium">Profile Image</label>
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                className="file-input file-input-bordered w-full"
              />
            </div> */}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[radial-gradient(circle_at_center,_#04687f,_#035466)] hover:brightness-110 hover:font-semibold text-white px-5 py-2 rounded text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Profile;
