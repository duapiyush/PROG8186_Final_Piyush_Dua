import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { getProductById } from '../services/api';

const ProductDetailPage = ({ addToCart }) => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductById(id);
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <Typography variant="h4" gutterBottom>{product.name}</Typography>
            <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%' }} />
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="h6">Price: ${product.price}</Typography>
            <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
                Add to Cart
            </Button>
        </div>
    );
};

export default ProductDetailPage;
