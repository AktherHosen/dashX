import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/dashboard/products/ProductCard';
import { Link } from 'react-router';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await fetch(
                "https://api.restful-api.dev/objects"
              );
              const data = await response.json();
              setProducts(data);
            } catch (err) {
              console.log(err);
            }
          };
      
          fetchData();
    },[])
    
  return (
    <div>
        <div className='flex justify-between items-center'>
        <h3 className='text-lg my-4'>Products</h3>
        <Link to="/dashboard/add-product"  className="px-6 py-2 border text-white border-[#3e3939] hover:bg-[#000000]  hover:text-[#fff]  transition duration-300 rounded ">
              Add Product
        </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
        {
            products.map(product => <ProductCard key={product.id} product={product} />)
        }
        </div>
    </div>
  )
}

export default Products