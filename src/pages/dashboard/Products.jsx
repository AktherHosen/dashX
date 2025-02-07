import React, { useEffect, useState } from "react";
import ProductCard from "../../components/dashboard/products/ProductCard";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.restful-api.dev/objects");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        toast.error(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[80vh]">
      <div className="flex justify-between items-center">
        <h3 className="text-lg my-4">Products</h3>
        <Link
          to="/dashboard/add-product"
          className="px-4 py-1.5 border text-darkText border-[#3e3939] bg-darkBg transition duration-300 rounded"
        >
          Add Product
        </Link>
      </div>

      <div className="mx-auto w-full flex justify-center items-center">
        {loading ? (
          <HashLoader color="#3498db" size={50} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
