import React from "react";
import Menu from "./Menu";
import { IoMdListBox } from "react-icons/io";
import { ImUsers } from "react-icons/im";
const SidebarMenu = ({ toggle }) => {
  return (
    <div>
      <Menu label="Users" address="/dashboard" icon={ImUsers} toggle={toggle} />
      <Menu
        label="Products"
        address="/dashboard/products"
        icon={IoMdListBox}
        toggle={toggle}
      />
    </div>
  );
};

export default SidebarMenu;
