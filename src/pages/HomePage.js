import React, { useEffect, useState } from 'react';
import apiService from '../app/apiService';

function HomePage() {
    const [products, setproducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await apiService.get("/product");
            const { products } = res.data
            console.log(products)
            setproducts(products);
        }
        fetchProducts();
    }, [])

    return (
        <div>
            {products.map(e => (
                <div>
                    <p>{e.name}</p>
                    <p>{e.description}</p>
                    <p>{e.price}</p>
                    <img src={e.imageUrl} alt={e.name} />
                </div>
            ))}
        </div>
    );
};

export default HomePage;