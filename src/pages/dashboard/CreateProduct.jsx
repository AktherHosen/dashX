import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    user_id: user?.uid,
    name: "",
    year: "",
    price: "",
    cpuModel: "",
    hardDiskSize: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const filteredProducts = storedProducts.filter(
      (product) => product.user_id === user?.uid
    );
    setProducts(filteredProducts);
  }, [user?.uid]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      user_id: user?.uid,
      data: {
        year: parseInt(formData.year),
        price: parseFloat(formData.price),
        "CPU model": formData.cpuModel,
        "Hard disk size": formData.hardDiskSize,
      },
    };

    try {
      const response = await axios.post(
        "https://api.restful-api.dev/objects",
        productData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("API Response:", response.data); // Debugging step

      const newProduct = response.data; // Get product with API-generated ID

      // Save to local storage with correct ID
      const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
      const updatedProducts = [...allProducts, newProduct];
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      setProducts(
        updatedProducts.filter((product) => product.user_id === user?.uid)
      );

      toast.success("Product added successfully!");
      setFormData({
        name: "",
        year: "",
        price: "",
        cpuModel: "",
        hardDiskSize: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product!");
    }
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const filteredAllProducts = allProducts.filter(
      (product) => product.id !== id
    );
    localStorage.setItem("products", JSON.stringify(filteredAllProducts));

    toast.success("Product deleted successfully!");
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 ">
        <form
          onSubmit={handleSubmit}
          className="px-6 py-6 bg-darkBg border rounded-md max-w-[420px]"
        >
          <h2 className=" font-bold text-white text-lg">Add Product</h2>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-white text-xs mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full text-black bg-white"
              />
            </div>

            <div>
              <label className="block text-white text-xs mb-1">Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full text-black bg-white"
              />
            </div>

            <div>
              <label className="block text-white text-xs mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full text-black bg-white"
              />
            </div>

            <div>
              <label className="block text-white text-xs mb-1">CPU Model</label>
              <input
                type="text"
                name="cpuModel"
                value={formData.cpuModel}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full text-black bg-white"
              />
            </div>

            <div className="col-span-2 mb-2">
              <label className="block text-white text-xs mb-1">
                Hard Disk Size
              </label>
              <input
                type="text"
                name="hardDiskSize"
                value={formData.hardDiskSize}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full text-black bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Submit
          </button>
        </form>
        <div>
          <ul className="border p-4 rounded-md bg-darkBg text-white">
            {products.length > 0 ? (
              products.map((product) => (
                <li
                  key={product.id}
                  className="border-b p-2 flex justify-between items-center"
                >
                  <div>
                    <strong>{product.name}</strong> -{" "}
                    {product.data?.price
                      ? `$${product.data.price}`
                      : "No Price"}
                  </div>
                  <div className="space-x-2 flex items-center gap-2">
                    <Link
                      to={`/dashboard/my-product/${product.id}`}
                      className="text-blue-500"
                    >
                      <FaEye />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-white">No products added yet!</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
