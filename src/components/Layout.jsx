import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {

  return (
    <div className="bg-red100 min-h-screen w-full fle">
      <div>
        <Header />
        <main className="">
          {/* <Link to={"subscribers"}>
            <h1 className="w-full text-4xl font-semibold my-5  ">
              Subscribers test
            </h1>
          </Link> */}
          <Outlet />
        </main>
        {/* <div className="mbauto mxauto">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default Layout;
