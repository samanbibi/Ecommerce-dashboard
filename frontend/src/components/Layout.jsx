import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar />
        <main className="p-6">
          {isHome ? (
            <div className="text-center mt-20">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                👋 Welcome to the E-commerce Admin Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Use the sidebar to manage revenue, inventory, and products efficiently.
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}
