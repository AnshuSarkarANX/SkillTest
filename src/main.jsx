/* eslint-disable react-refresh/only-export-components */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import TopBar from "./Components/TopBar.jsx";
import BottomBar from "./Components/BottomBar.jsx";
import { Toaster } from "react-hot-toast";
import {  bottomBar } from "./state/store.js";

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
  return (
    <div className="max-w-[600px] mx-auto">
      <TopBar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      {useBottomBar && <BottomBar />}

      {/* Add ToastContainer here */}
      <Toaster />
    </div>
  );
};

const appRoute = createBrowserRouter([
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
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRoute} />
);
