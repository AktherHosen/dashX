import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa"; // Importing icons for view and delete
import { Link } from "react-router";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    price: "",
    cpuModel: "",
    hardDiskSize: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      data: {
        year: parseInt(formData.year),
        price: parseFloat(formData.price),
        "CPU model": formData.cpuModel,
        "Hard disk size": formData.hardDiskSize,
      }
    };

    try {
      // Sending product to API
      const response = await axios.post("https://api.restful-api.dev/objects", productData, {
        headers: { "Content-Type": "application/json" },
      });

      // Update the product list in state and localStorage
      const updatedProducts = [...products, response.data];
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      alert("Product added successfully!");

      // Reset the form
      setFormData({ name: "", year: "", price: "", cpuModel: "", hardDiskSize: "" });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product!");
    }
  };

  // Handle product deletion
  const handleDelete = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    alert("Product deleted successfully!");
  };

  
  return (
    <div className="container mx-auto mt-6 p-4">
      {/* Form to create a product */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-black border rounded-md w-96 mx-auto">
        <h2 className="text-xl font-bold text-white">Add Product</h2>

        {/* Product Name Input */}
        <div>
          <label className="block text-white">Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full text-black bg-white"
          />
        </div>

        {/* Year Input */}
        <div>
          <label className="block text-white">Year:</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full text-black bg-white"
          />
        </div>

        {/* Price Input */}
        <div>
          <label className="block text-white">Price:</label>
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

        {/* CPU Model Input */}
        <div>
          <label className="block text-white">CPU Model:</label>
          <input
            type="text"
            name="cpuModel"
            value={formData.cpuModel}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full text-black bg-white"
          />
        </div>

        {/* Hard Disk Size Input */}
        <div>
          <label className="block text-white">Hard Disk Size:</label>
          <input
            type="text"
            name="hardDiskSize"
            value={formData.hardDiskSize}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full text-black bg-white"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Submit
        </button>
      </form>

      {/* Display Products */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-white mb-2">Your Added Products</h2>
        <ul className="border p-4 rounded-md bg-gray-800 text-white">
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product.id} className="border-b p-2 flex justify-between items-center">
                <div>
                  <strong>{product.name}</strong> - {product.data?.price ? `$${product.data.price}` : "No Price"}
                </div>
                <div className="space-x-2 flex items-center gap-2">
                  <Link to={`/my-product/${product.id}`} className="text-blue-500">
                    <FaEye />
                  </Link>
                  <button onClick={() => handleDelete(product.id)} className="text-red-500">
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-white">No products added yet</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CreateProduct;
