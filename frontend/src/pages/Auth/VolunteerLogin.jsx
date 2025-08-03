import axios from "axios";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import authHook from "../../context/AuthContext";
import { PropagateLoader } from "react-spinners";

function VolunteerLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { settoken, setuserdata } = authHook();
  const [loader, setloader] = useState(false);

  const onSubmit = async (data) => {
    setloader(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}users/login`,
        {
          email: data.email,
          password: data.password,
        }
      );

      const result = res.data;
      if (result?.token) {
        Cookies.set("token", result?.token, { expires: 7 });
        Cookies.set("user_data", JSON.stringify(result?.user), {
          expires: 7,
        });
      }

      settoken(result?.token);
      setuserdata(result?.user);
      toast.success("login successful.");
      setloader(false);
      navigate("/");
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login failed. Please try again.";

      toast.error(errorMessage);
      setloader(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        {/* <div className="flex items-center gap-2 justify-center mb-4">
          <div className="bg-[#003840] p-2 rounded-md">
            <span className="text-white text-xl font-bold">{"{...}"}</span>
          </div>
          <h1 className="text-xl font-semibold text-[#003840]">SoftQA</h1>
        </div> */}

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Welcome Back!
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Sign in to access your dashboard and continue optimizing your QA
            process.
          </p>
        </div>

        {loader && (
          <div className="flex justify-center items-center">
            <PropagateLoader color="#003840" size={15} />
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
            {/* <div className="text-right mt-1">
              <a href="#" className="text-sm text-[#003840] hover:underline">
                Forgot Password?
              </a>
            </div> */}
          </div>

          <button
            type="submit"
            disabled={loader}
            className={`w-full bg-[#003840] hover:bg-[#002b31] text-white font-medium py-2 rounded-md flex items-center justify-center h-10 ${
              loader ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {/* {loader ? (
              <div className="flex justify-center items-center h-full">
                <PropagateLoader color="#ffffff" size={10} />
              </div>
            ) : (
              "Sign In"
            )} */}
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-between gap-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className=" flex justify-center gap-1">
          <p className="flex text-center gap-1 text-sm text-gray-600 mt-4">
            Don't have an Account?{" "}
            <p
              onClick={() => navigate("/auth/volunteersignup")}
              className="text-[#003840] font-medium hover:underline cursor-pointer"
            >
              Sign Up
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VolunteerLogin;
