import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "../../components/dashboard/products/ProductCard";
import { HashLoader } from "react-spinners";

const MyProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(id);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://api.restful-api.dev/objects/${id}`
        );
        console.log("API Response:", res);
        setProduct(res.data);
      } catch (err) {
        console.error(
          "Error fetching product:",
          err?.response?.data || err?.message
        );
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  return (
    <div className="max-w-[400px] mx-auto h-[80vh] flex items-center justify-center">
      {loading ? (
        <div className="w-[400px] flex justify-center items-center ">
          <HashLoader color="#3498db" size={50} />
        </div>
      ) : (
        <ProductCard product={product} />
      )}
    </div>
  );
};

export default MyProduct;
