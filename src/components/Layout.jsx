import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {

  return (
    <div className="bg-red-100 min-h-screen flex">
      <div>
        <Header />
        <main className="flex-grow mx-auto">
          <Outlet />
        </main>
        <div className="mb-auto mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
