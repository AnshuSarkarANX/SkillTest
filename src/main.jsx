/* eslint-disable react-refresh/only-export-components */

import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import TopBar from "./Components/TopBar.jsx";
import BottomBar from "./Components/BottomBar.jsx";
import { Toaster } from "react-hot-toast";
import { bottomBar, padding, topBar } from "./state/store.js";
import LoginPage from "./Pages/login/LoginPage.jsx";
import OtpPage from "./Pages/login/OtpPage.jsx";
import WelcomePage from "./Pages/welcome/WelcomePage.jsx";
import OnboardingPage from "./Pages/onboarding/OnboardingPage.jsx";
import Name from "./Pages/onboarding/Name.jsx";
import Gender from "./Pages/onboarding/Gender.jsx";
import BirthDate from "./Pages/onboarding/BirthDate.jsx";
import Qualification from "./Pages/onboarding/Qualification.jsx";
import Specialization from "./Pages/onboarding/Specialization.jsx";
import Details from "./Pages/onboarding/Details.jsx";
import SoftSkillsPage from "./Pages/onboarding/SoftSkillsPage.jsx";
import TechSkillsPage from "./Pages/onboarding/TechSkillsPage.jsx";
import Resource from "./Pages/resources/Resource.jsx";
import MyCourses from "./Pages/resources/MyCourses.jsx";
import Skills from "./Pages/skills/Skills.jsx";
import { useLocation } from "react-router";
import UploadCv from "./Pages/onboarding/UploadCv.jsx";
import Profile from "./Pages/profile/Profile.jsx";
import Certificates from "./Pages/certificates/Certificates.jsx";
import MyAccount from "./Pages/myAccount/MyAccount.jsx";
import EditProfile from "./Pages/profile/EditProfile.jsx";
import EditSoftSkils from "./Pages/profile/EditSoftSkils.jsx";
import EditTechSkills from "./Pages/profile/EditTechSkills.jsx";

const ProtectedRoute = ({ children }) => {
  {
    /*For number inputs only*/
  }
  document.addEventListener(
    "wheel",
    function (e) {
      if (document.activeElement.type === "number") {
        // Prevents scroll-based number increment/decrement
        e.preventDefault();
      }
    },
    { passive: false }
  );

  document.addEventListener("keydown", function (e) {
    if (document.activeElement.type === "number") {
      // Prevents arrow key-based number increment/decrement
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    }
  });
  // const { isLoggedIn, isPhoneVerified } = useSelector((state) => state.auth);
  // if (!isLoggedIn && !isPhoneVerified) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};
const AuthRoute = ({ children }) => {
  // const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  // if (isAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};

const AppLayout = () => {
  const useBottomBar = bottomBar((state) => state.isActive);
  const usePadding = padding((state) => state);
  const useTopBar = topBar((state) => state);
  const routerLocation = useLocation();
  useEffect(() => {
    if (routerLocation.pathname === "/") {
      usePadding.setActive(false);
      useTopBar.setHome(true);
      useTopBar.setHasBackButton(false);
    } else {
      usePadding.setActive(true);
      useTopBar.setHome(false);
      useTopBar.setHasBackButton(true);
    }
    console.log("location", routerLocation.pathname);
  }, [routerLocation.pathname]);
  return (
    <div className="max-w-[600px] mx-auto">
      <TopBar />
      <div className={`min-h-screen ${usePadding.isActive ? "px-[20px]" : ""}`}>
        <Outlet />
      </div>
      {useBottomBar && <BottomBar />}

      {/* Add ToastContainer here */}
      <Toaster />
    </div>
  );
};

const appRoute = createBrowserRouter([
  // Auth Routes
  {
    path: "/login",
    element: (
      <AuthRoute>
        <div className="max-w-[600px] mx-auto">
          <TopBar />
          <div className="min-h-screen">
            <LoginPage />
          </div>
          <Toaster />
        </div>
      </AuthRoute>
    ),
  },
  {
    path: "/otp",
    element: (
      <AuthRoute>
        <div className="max-w-[600px] mx-auto">
          <TopBar />
          <div className="min-h-screen">
            <OtpPage />
          </div>
          <Toaster />
        </div>
      </AuthRoute>
    ),
  },
  // Protected Routes
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/onboarding",
        element: <OnboardingPage />,
        children: [
          { path: "name", element: <Name /> },
          { path: "gender", element: <Gender /> },
          { path: "birthdate", element: <BirthDate /> },
          { path: "qualification", element: <Qualification /> },
          { path: "specialization", element: <Specialization /> },
          { path: "soft-skills", element: <SoftSkillsPage /> },
          { path: "tech-skills", element: <TechSkillsPage /> },
          { path: "details", element: <Details /> },
          { path: "upload-cv", element: <UploadCv /> },
        ],
      },
      { path: "/account", element: <MyAccount /> },
      { path: "/welcome", element: <WelcomePage /> },
      { path: "/resources", element: <Resource /> },
      { path: "/my-courses", element: <MyCourses /> },
      { path: "/add-resource", element: <MyCourses /> },
      { path: "/skills", element: <Skills /> },
      { path: "/profile", element: <Profile /> },
      { path: "/certificates", element: <MyCourses /> },
      { path: "/edit-profile", element: <EditProfile /> },
      { path: "/edit/soft-skills", element: <EditSoftSkils /> },
      { path: "/edit/tech-skills", element: <EditTechSkills /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRoute} />
);
