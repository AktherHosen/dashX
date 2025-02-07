import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../api/utils";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const { setLoading, createUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const from = location?.state || "/dashboard";
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const profilePhoto = form.profilePhoto.files[0];
    const password = form.password.value;

    let image_url = "";
    if (profilePhoto) {
      try {
        image_url = await imageUpload(profilePhoto);
      } catch (err) {
        console.error("Image upload failed:", err.message);
        return;
      }
    }

    try {
      setLoading(true);
      const result = await createUser(email, password);
      await updateUserProfile(name, image_url);
      navigate(from);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="max-w-[1240px] h-[100vh] flex items-center justify-center mx-auto px-6 sm:px-5 lg:px-4">
        <div className="border rounded-md shadow-xs w-[450px] mx-auto ">
          <div className="px-4">
            <div className="mt-6">
              <h2 className="text-[1.2rem] font-semibold mx-auto text-center">
                Get Started
              </h2>
            </div>
            <form
              onSubmit={handleRegistration}
              className="flex flex-col gap-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="quickdrop"
                  className="ps-2 py-3 border-2 rounded-md w-full mt-1 focus:outline-none focus:ring-2  focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="hello@dashX.com"
                  className="ps-2 py-3 border rounded-md w-full mt-1 focus:outline-none focus:ring-2  focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="profilePhoto" className="text-sm">
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  id="profilePhoto"
                  accept="image/*"
                  className="file-input file-input-bordered file-input-md focus:outline-none focus:ring-2 outline-none focus:border-transparent  ps-2 py-3 border rounded-md w-full mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    name="password"
                    className="ps-2 py-3 border rounded-md w-full mt-1 focus:outline-none focus:ring-2  focus:border-transparent block"
                  />
                  <div
                    className="absolute right-3 top-[28%] cursor-pointer"
                    onClick={togglePassword}
                  >
                    {showPassword ? (
                      <IoMdEye className="text-xl" />
                    ) : (
                      <IoMdEyeOff className="text-xl" />
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-gray-800 text-darkText rounded-md w-full py-3 h-[48px] "
              >
                Register
              </button>
            </form>
            <h4 className="my-4 text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-[#1a32cb] hover:underline hover:underline-offset-2"
              >
                Login
              </Link>
            </h4>
          </div>
        </div>
      </section>
    </>
  );
};

export default Registration;
