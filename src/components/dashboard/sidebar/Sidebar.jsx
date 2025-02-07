import React from "react";
import "./Sidebar.css";
import { TbLogin2 } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";

import { NavLink, useNavigate } from "react-router";
import SidebarMenu from "../../menu/SidebarMenu";
import useAuth from "../../../hooks/useAuth";

const Sidebar = ({ toggle }) => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <div
      className={`fixed text-darkText bg-darkBg h-full transition-all overscroll-y-scroll duration-300 ${
        toggle ? "w-[60px]" : "w-[200px] "
      }`}
      style={{ top: "64px" }}
    >
      <div className="h-full overflow-y-auto sidebar-container mt-1">
        <div className="flex items-center flex-col justify-between  min-h-[calc(100vh-64px)]">
          <SidebarMenu toggle={toggle} />
          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className={` w-fit flex gap-1  ${
                  toggle
                    ? " w-fit px-2"
                    : "w-[180px] px-10 flex justify-between items-center"
                }  py-1.5 my-5 transition-colors duration-300 rounded-md transform   
               bg-red-700  text-white 
                  
              }`}
              >
                <TbLogout2 className="w-4 h-4" />
                <span
                  className={`text-sm font-medium ${
                    toggle ? "hidden" : " block"
                  } `}
                >
                  Logout
                </span>
              </button>
            ) : (
              <NavLink
                to="/login"
                className={` w-fit flex gap-1  ${
                  toggle
                    ? " w-fit px-2 justify-center items-center"
                    : "w-[180px] px-10 flex justify-between items-center"
                }  py-1.5 my-5 transition-colors duration-300 rounded-md transform   
                 bg-green-700 text-white 
                    
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    toggle ? "hidden" : " block"
                  } `}
                >
                  Login
                </span>
                <TbLogin2 className="w-4 h-4" />
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
