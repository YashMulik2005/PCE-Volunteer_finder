import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaBuilding, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";

function OrganizationSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setloader] = useState(false);

  const onSubmit = async (data) => {
    setloader(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/organizations/signup",
        {
          org_name: data.organizationName,
          mail: data.email,
          password: data.password,
          mobile_no: data.mobile,
        }
      );

      if (res?.data?.status) {
        navigate("/auth/organizationlogin");
        toast.success("Signup sucessfully.");
        setloader(false);
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login failed. Please try again.";

      toast.error(errorMessage);
      console.error("Login error:", err);
      setloader(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome!</h2>
          <p className="text-sm text-gray-600 mt-1">
            Sign up to access your organization dashboard.
          </p>
        </div>

        {loader && (
          <div className="flex justify-center items-center">
            <PropagateLoader color="#003840" size={15} />
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Organization Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Organization Name
            </label>
            <div
              className={`flex items-center border rounded-md px-3 py-2 focus-within:ring-2 ${
                errors.organizationName
                  ? "border-red-500 ring-red-300"
                  : "focus-within:ring-[#003840]"
              }`}
            >
              <FaBuilding className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Enter organization name"
                className="outline-none w-full text-sm bg-transparent"
                {...register("organizationName", {
                  required: "Organization name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
            </div>
            {errors.organizationName && (
              <p className="text-sm text-red-600 mt-1">
                {errors.organizationName.message}
              </p>
            )}
          </div>

          {/* Email */}
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

          {/* Password */}
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
                  type={showPassword ? "text" : "password"}
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
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-gray-500 text-sm"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Mobile Number */}
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
              <FaPhone className="text-gray-500 mr-2" />
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loader}
            className={`w-full bg-[#003840] hover:bg-[#002b31] text-white font-medium py-2 rounded-md flex items-center justify-center h-10 ${
              loader ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center justify-between gap-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex justify-center gap-1">
          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/auth/organizationlogin")}
              className="text-[#003840] font-medium hover:underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrganizationSignup;
