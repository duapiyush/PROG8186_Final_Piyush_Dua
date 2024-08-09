import React, { useContext, useState } from 'react';
import { context } from '../context/index';
import AddressDialog from './AddressDialog';

const ShoppingCart = () => {
    const { cart, theme } = useContext(context);
    const { isDarkTheme } = theme;

    const tableClass = isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-black';
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleFinalizePurchase = () => {
        setIsDialogOpen(true);
    };

    const getTotalPrice = (quantity, price) => {
        return (quantity * price).toFixed(2);
    };

    const handleRemoveFromCart = (itemId) => {
        cart.removeFromCart(itemId);
    };

    const handleIncrement = (itemId) => {
        const currentItem = cart.cartItems.find(item => item.id === itemId);
        if (currentItem.quantity < 10) {
            cart.updateCartItemQuantity(itemId, currentItem.quantity + 1);
        }
    };

    const handleDecrement = (itemId) => {
        const currentItem = cart.cartItems.find(item => item.id === itemId);
        if (currentItem.quantity > 1) {
            cart.updateCartItemQuantity(itemId, currentItem.quantity - 1);
        }
    };

    return (
        <div className={`fixed inset-y-0 left-0 w-1/2 p-4 overflow-y-auto z-10 ${tableClass}`}>
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            {cart.cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <table className="w-full">
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.cartItems.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-full" />
                            </td>
                            <td>{item.name}</td>
                            <td>
                                <div className="flex items-center">
                                    <button className="text-lg font-bold" onClick={() => handleDecrement(item.id)}>-</button>
                                    <p className="font-bold mx-2">{item.quantity}</p>
                                    <button className="text-lg font-bold" onClick={() => handleIncrement(item.id)}>+</button>
                                </div>
                            </td>
                            <td>${+item.pricing}</td>
                            <td>${getTotalPrice(0, +item.price)}</td>
                            <td>
                                <button className="text-red-500 font-bold" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {cart.cartItems.length > 0 && (
                <div className="mt-4 flex justify-between">
                    <p className="font-bold">Gross Total:</p>
                    <p className="font-bold">${cart.cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)}</p>
                </div>
            )}
            {cart.cartItems.length > 0 && (
                <button className="bg-blue-500 text-white px-4 py-2 mt-4 w-full rounded-full" onClick={handleFinalizePurchase}>
                    Finalize Purchase
                </button>
            )}
            {isDialogOpen && <AddressDialog setIsDialogOpen={setIsDialogOpen} />}
        </div>
    );
};

export default ShoppingCart;
