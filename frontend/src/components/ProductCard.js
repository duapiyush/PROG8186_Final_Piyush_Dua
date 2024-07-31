import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={product.imageUrl}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ${product.price}
                </Typography>
                <Button size="small" component={Link} to={`/product/${product.id}`}>
                    View Details
                </Button>
                <Button size="small" onClick={() => addToCart(product)}>
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
