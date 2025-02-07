import { NavLink } from "react-router";

const Menu = ({ label, address, icon: Icon, toggle }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        ` flex items-center ${
          toggle ? "justify-center w-fit" : "w-[180px]"
        }  px-3 py-2 my-5 transition-color duration-300 rounded-sm transform   ${
          isActive ? "bg-gray-600 bg-opacity-80 text-white " : "text-gray-300"
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className={`font-medium ${toggle ? "hidden" : " block"} ml-2`}>
        {label}
      </span>
    </NavLink>
  );
};

export default Menu;
