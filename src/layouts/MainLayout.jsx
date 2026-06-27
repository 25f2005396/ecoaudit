import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      {/* Dynamic calculation subtracts the navbar height to prevent unnecessary vertical scrolling */}
      <main className="min-h-[calc(100vh-64px)] bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default MainLayout;