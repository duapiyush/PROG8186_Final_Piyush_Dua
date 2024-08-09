import React from 'react';
import { Typography, List, ListItem, ListItemText, Button } from '@material-ui/core';
import { useCart } from '../context';

const CartPage = () => {
    const { cart, removeFromCart, adjustQuantity } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
            <List>
                {cart.map(item => (
                    <ListItem key={item.id}>
                        <ListItemText
                            primary={item.name}
                            secondary={`Quantity: ${item.quantity} - $${item.price * item.quantity}`}
                        />
                        <Button onClick={() => adjustQuantity(item.id, -1)}>-</Button>
                        <Button onClick={() => adjustQuantity(item.id, 1)}>+</Button>
                        <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        </div>
    );
};

export default CartPage;
