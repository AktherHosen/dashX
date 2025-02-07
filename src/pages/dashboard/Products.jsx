import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/dashboard/products/ProductCard';

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
        <h3 className='text-lg my-4'>Products</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
        {
            products.map(product => <ProductCard key={product.id} product={product} />)
        }
        </div>
    </div>
  )
}

export default Products