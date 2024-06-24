import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        {/* Body */}
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-600 mt-10">
        Developed By Vipul
      </div>
    </div>
  );
};

export default AppLayout;
