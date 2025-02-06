import React, { useEffect, useMemo, useState } from "react";

import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // Fetch Users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  const getValue = (obj, key) =>
    key.includes(".")
      ? key.split(".").reduce((acc, part) => acc && acc[part], obj)
      : obj[key];

  // Search Filter
  const filteredData = useMemo(() => {
    return data.filter((user) =>
      ["name", "email", "address.city"].some((key) => {
        const value = getValue(user, key);
        return value?.toString().toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [data, search]);

  // Sort Function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort Data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = getValue(a, sortConfig.key);
      const bValue = getValue(b, sortConfig.key);

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Close Action Menu on Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".zenui-table") &&
        !event.target.closest(".action-btn")
      ) {
        setOpenActionMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="customTable w-full flex items-center flex-col gap-2 justify-center">
      <div className="w-full mx-auto">
        {/* Search Input */}
        <div className="mb-4">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
          />
        </div>

        {/* Table */}
        <div className="customTable sidebar-container overflow-x-auto w-full rounded-md border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-medium text-gray-700">ID</th>
                <th
                  className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name <HiOutlineArrowsUpDown className="inline" />
                </th>
                <th
                  className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Email <HiOutlineArrowsUpDown className="inline" />
                </th>
                <th
                  className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                  onClick={() => handleSort("address.city")}
                >
                  City <HiOutlineArrowsUpDown className="inline" />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((user) => (
                <tr
                  key={user.id}
                  className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                >
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.address.city}</td>
                  <td className="p-3 relative">
                    {/* Action Button */}
                    <BsThreeDotsVertical
                      onClick={() => toggleActionMenu(user.id)}
                      className="action-btn text-gray-600 cursor-pointer"
                    />

                    {/* Action Menu */}
                    <div
                      className={`${
                        openActionMenuId === user.id
                          ? "opacity-100 scale-[1] z-30"
                          : "opacity-0 scale-[0.8] z-[-1]"
                      } ${
                        data.length > 1 ? "bottom-[-90%]" : "top-[90%]"
                      } zenui-table absolute right-[90%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}
                    >
                      <Link
                        to={`/user-detail/${user.id}`}
                        className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                      >
                        <IoEyeOutline />
                        View Details
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* No Data Message */}
          {!sortedData.length && (
            <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
              No data found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
