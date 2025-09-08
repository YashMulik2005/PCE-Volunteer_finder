import React from "react";
import authHook, { AuthProvider } from "./context/AuthContext";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
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
import EventDeatils from "./pages/Volunteer/EventDeatils";
import OrgLayout from "./pages/Organization/OrgLayout";
import OrgEvents from "./pages/Organization/OrgEvents";
import EventVolunteers from "./pages/Organization/EventVolunteers";
import AddEvent from "./pages/Organization/AddEvent";
import MyApplication from "./pages/Volunteer/MyApplication";
import Profile from "./pages/Volunteer/Profile";

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
        <Navigate to="/organization" replace />
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
    {
      path: "/volunteer",
      element: <Homepage />,
    },
    {
      path: "/volunteer/my-application",
      element: <MyApplication />,
    },
    {
      path: "/volunteer/profile",
      element: <Profile />,
    },
    {
      path: "/event/:id",
      element: <EventDeatils />,
    },
    {
      path: "/organization",
      element: <OrgLayout />,
      children: [
        {
          index: true,
          element: <OrgHomePage />,
        },
        {
          path: "homepage",
          element: <OrgHomePage />,
        },
        {
          path: "events",
          element: <OrgEvents />,
        },
        {
          path: "events/:id/volunteers",
          element: <EventVolunteers />,
        },
        {
          path: "events/add",
          element: <AddEvent />,
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
