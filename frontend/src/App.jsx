import React from "react";
import authHook, { AuthProvider } from "./context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/HomePage/Layout";
import TypeSelect from "./pages/Auth/TypeSelect";
import VolunteerLogin from "./pages/Auth/VolunteerLogin";
import VolunteerSignup from "./pages/Auth/VolunteerSignup";
import OrganizationLogin from "./pages/Auth/OrganizationLogin";
import OrganizationSignup from "./pages/Auth/OrganizationSignup";
import Homepage from "./pages/Volunteer/Homepage";
import AuthLayout from "./pages/Auth/AuthLayout";
import { Toaster } from "react-hot-toast";
import OrgHomePage from "./pages/Organization/OrgHomePage";

function App() {
  const { token, userdata } = authHook();

  const isVolunteer = token && userdata?.type === "volunteer";
  const isOrganization = token && userdata?.type === "organization";

  const routes = [
    {
      path: "/",
      element: isVolunteer ? (
        <Homepage />
      ) : isOrganization ? (
        <OrgHomePage />
      ) : (
        <Layout />
      ),
    },
    {
      path: "/auth/type",
      element: <TypeSelect />,
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "volunteerlogin",
          element: <VolunteerLogin />,
        },
        {
          path: "volunteersignup",
          element: <VolunteerSignup />,
        },
        {
          path: "organizationlogin",
          element: <OrganizationLogin />,
        },
        {
          path: "organizationsignup",
          element: <OrganizationSignup />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
