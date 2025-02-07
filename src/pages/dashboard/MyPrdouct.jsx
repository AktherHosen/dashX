import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductCard from '../../components/dashboard/products/ProductCard';

const MyProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`https://api.restful-api.dev/objects/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.log(err?.message); 
            }
        };
        getData();
    }, [id]); 

    if (!product) return <div>Loading...</div>; 

    return (
        <div className='max-w-[400px]'>
            <ProductCard product={product} /> 
        </div>
    );
};

export default MyProduct;
