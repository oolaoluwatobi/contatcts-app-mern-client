import React from "react";
import { Outlet, Link } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {

  return (
    <div className="bg-red-100 min-h-screen flex">
      <div>
        <Header />
        <main className="flex-grow mx-auto">
          <Link to={"subscribers"}>
            <h1 className="w-full text-4xl font-semibold my-5  ">
              Subscribers
            </h1>
          </Link>
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
