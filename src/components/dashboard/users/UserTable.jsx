import React, { useEffect, useState } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleSort = (key) => {
    setSortOrder(sortKey === key && sortOrder === "asc" ? "desc" : "asc");
    setSortKey(key);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = sortKey.includes(".")
      ? sortKey.split(".").reduce((acc, part) => acc && acc[part], a)
      : a[sortKey];
    const bValue = sortKey.includes(".")
      ? sortKey.split(".").reduce((acc, part) => acc && acc[part], b)
      : b[sortKey];

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) =>
    ["name", "email", "address.city"].some((key) => {
      const value = key.includes(".")
        ? key.split(".").reduce((acc, part) => acc && acc[part], user)
        : user[key];
      return value?.toString().toLowerCase().includes(query.toLowerCase());
    })
  );

  return (
    <div className="table-container w-full flex items-center flex-col gap-2">
      <div className="w-full mx-auto">
        <input
          placeholder="Search user.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm py-2 my-2 px-4 border bg-white text-black border-gray-200 rounded-md outline-none focus:border-blue-300"
        />
        <div className="user-table overflow-x-auto w-full rounded-md border border-gray-200">
          <table className="w-full text-sm mb-10">
            <thead className="bg-darkText">
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
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="p-3 text-left font-medium text-gray-700"
                >
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.address.city}</td>
                  <td className="p-3 relative">
                    <BsThreeDotsVertical
                      onClick={() => toggleMenu(user.id)}
                      className="menu-btn text-gray-600 cursor-pointer"
                    />
                    {activeMenu === user.id && (
                      <div className="absolute right-[90%] p-2 bg-white shadow-md  rounded-md z-30">
                        <Link
                          to={`/dashboard/user-detail/${user.id}`}
                          className="flex items-center gap-2 text-gray-700 hover:bg-gray-50 p-2 rounded-md"
                        >
                          <IoEyeOutline /> View
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredUsers.length && (
            <p className="text-center text-gray-500 mb-2">No data found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
