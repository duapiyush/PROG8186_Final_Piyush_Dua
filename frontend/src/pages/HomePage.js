import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Featured Products
            </Typography>
            <Grid container spacing={3}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default HomePage;
