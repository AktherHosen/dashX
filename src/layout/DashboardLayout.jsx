import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";
import Sidebar from "../components/dashboard/sidebar/Sidebar";
import { Link, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const [toggle, setToggle] = useState(false);
 
  const { user } = useAuth();
 console.log(user)
  return (
    <div className="w-full h-screen flex flex-col text-white">
      {/* Navbar */}
      <div className="flex bg-darkBg justify-between items-center py-4 px-5 fixed top-0 w-full h-[64px] z-10 shadow-sm">
        <div
          className={`flex justify-between items-center gap-2 ${
            toggle ? "w-[50px] justify-center" : "w-[200px]"
          }`}
        >
          <Link to="/" className={` ${toggle ? "hidden" : "flex"}`}>
            Quick Drop
          </Link>
          <span onClick={() => setToggle(!toggle)}>
            <BsReverseLayoutSidebarInsetReverse className="text-[19px]" />
          </span>
        </div>
        <p className="relative">
          {user &&
          <img src={user?.photoURL}  className="h-9 w-9 rounded-full"
          alt="Profile"  />  
          }
          
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 pt-[64px]">
        <div>
          <Sidebar toggle={toggle} />
        </div>

        {/* Scrollable Outlet Section */}
        <div
          className={`${
            toggle ? "ml-[60px]" : "ml-[60px] md:ml-[100px] lg:ml-[200px]"
          } flex-1 bg-darkText dark:bg-darkBg px-6 py-4 overflow-auto h-[calc(100vh-64px)]`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
