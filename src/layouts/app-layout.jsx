import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <main className="min-h-screen container">
          <Header />
          {/* Body */}
          <Outlet />
        </main>
        <div className="p-10 text-center dark:bg-gray-900 bg-gray-400 mt-10">
          Developed By Vipul
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AppLayout;
