import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

function VolunteerSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    // Handle signup logic here
    const res = await axios.post("http://localhost:3000/api/users/signup", {
      email: data.email,
      password: data.password,
      name: data.name,
    });

    if (res?.data?.status) {
      navigate("/auth/volunteerlogin");
      toast.success("Signup sucessfully.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome!</h2>
          <p className="text-sm text-gray-600 mt-1">
            Sign up to access your dashboard and start optimizing your QA
            process.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              <FaUser className="text-gray-500 mr-2" />
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
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
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
              <FaEnvelope className="text-gray-500 mr-2" />
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

          {/* Password Field */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Password
            </label>
            <div
              className={`flex items-center border rounded-md px-3 py-2 justify-between focus-within:ring-2 ${
                errors.password
                  ? "border-red-500 ring-red-300"
                  : "focus-within:ring-[#003840]"
              }`}
            >
              <div className="flex items-center flex-grow">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="outline-none w-full text-sm bg-transparent"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </div>
              <button type="button" className="text-gray-500 text-sm">
                👁️
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#003840] hover:bg-[#002b31] text-white font-medium py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center justify-between gap-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className=" flex justify-center gap-1">
          <p className="text-center flex gap-1 text-sm text-gray-600 mt-4">
            Already have an Account?{" "}
            <p
              onClick={() => navigate("/auth/volunteerlogin")}
              className="text-[#003840] font-medium hover:underline cursor-pointer"
            >
              Sign In
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VolunteerSignup;
