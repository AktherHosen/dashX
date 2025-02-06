import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { HashLoader } from "react-spinners";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // ✅ Stop loading after fetching data
      }
    };

    fetchData();
  }, [id]); // ✅ Add id as a dependency

  return (
    <div className="mx-auto flex items-center justify-center space-x-4 w-full h-[80vh]">
      {loading ? (
        <div className="w-[400px] flex justify-center items-center ">
          <HashLoader color="#3498db" size={50} />
        </div>
      ) : (
        <>
          <div className="w-[400px] h-fit flex flex-col justify-center border px-4 py-2 rounded-sm shadow-sm">
            <h3 className="text-[1.5rem] font-bold">
              {user?.name}{" "}
              <span className="text-[0.8rem] text-gray-500">
                ( {user?.username} )
              </span>
            </h3>
            <p className="text-[0.9rem] text-gray-500">Email: {user?.email}</p>
            <p className="text-[0.9rem] text-gray-500">Phone: {user?.phone}</p>
            <p className="text-[0.9rem] text-gray-500">
              Address: {user?.address?.street}, {user?.address?.suite},{" "}
              {user?.address?.city}, {user?.address?.zipcode}
            </p>
            <p className="text-[0.9rem] text-gray-500">
              Company: {user?.company?.name}
            </p>
            <p className="text-[0.9rem] text-gray-500">
              Website: {user?.website}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetail;
