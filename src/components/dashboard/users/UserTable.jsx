import React, { useEffect, useMemo, useState } from "react";

// react icons
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

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

  console.log(data);
  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  // Handle search
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // Handle sort
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  useEffect(() => {
    const handleCLick = (event) => {
      if (
        !event.target.closest(".zenui-table") &&
        !event.target.closest(".action-btn")
      ) {
        setOpenActionMenuId(null);
      }
    };
    document.addEventListener("click", handleCLick);
    return () => document.removeEventListener("click", handleCLick);
  }, []);

  return (
    <div className="customTable  w-full flex items-center flex-col gap-2 justify-center">
      <div className="w-full mx-auto p-4">
        <div className="mb-4">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
          />
        </div>

        <div className="customTable overflow-x-auto w-full rounded-md border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-medium text-gray-700">Id</th>
                <th className="p-3 text-left font-medium text-gray-700">
                  Name
                </th>
                <th className="p-3 text-left font-medium text-gray-700">
                  Email
                </th>
                <th className="p-3 text-left font-medium text-gray-700">
                  City
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item) => (
                <tr
                  key={item.id}
                  className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                >
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.address.city}</td>
                  <td className="p-3 relative">
                    <BsThreeDotsVertical
                      onClick={() => toggleActionMenu(item.id)}
                      className="action-btn text-gray-600 cursor-pointer"
                    />

                    <div
                      className={`${
                        openActionMenuId === item.id
                          ? "opacity-100 scale-[1] z-30"
                          : "opacity-0 scale-[0.8] z-[-1]"
                      }
                            ${data.length > 1 ? "bottom-[-90%]" : "top-[90%]"}
                            zenui-table absolute right-[90%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}
                    >
                      <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <IoEyeOutline />
                        View Details
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* {!sortedData?.length && (
            <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
              No data found!
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
