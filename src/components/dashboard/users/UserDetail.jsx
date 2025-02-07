import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { HashLoader } from "react-spinners";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="mx-auto flex items-center justify-center space-x-4 w-full h-[80vh]">
      {loading ? (
        <div className="w-[400px] flex justify-center items-center ">
          <HashLoader color="#3498db" size={50} />
        </div>
      ) : (
        <>
          <div className="w-[420px] bg-darkBg text-darkText px-4 py-4 rounded-md h-fit flex space-y-1 flex-col justify-center border shadow-sm">
            <h3 className="text-[1.5rem] font-bold">
              {user?.name}{" "}
              <span className="text-[0.8rem] ">( {user?.username} )</span>
            </h3>
            <p className="text-[0.9rem] ">Email: {user?.email}</p>
            <p className="text-[0.9rem] ">Phone: {user?.phone}</p>
            <p className="text-[0.9rem] ">
              Address: {user?.address?.street}, {user?.address?.suite},{" "}
              {user?.address?.city}, {user?.address?.zipcode}
            </p>
            <p className="text-[0.9rem] ">Company: {user?.company?.name}</p>
            <p className="text-[0.9rem]">Website: {user?.website}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetail;
