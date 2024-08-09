import React, { useState, useContext } from 'react';
import { context } from '../context/index';
import Notification from "./Notification";
import {Link, useNavigate, useParams} from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const { theme, cart, auth } = useContext(context);
    const { isDarkTheme } = theme;
    const [showNotification, setShowNotification] = useState(false);

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
    };

    const cardBackgroundColor = isDarkTheme ? 'bg-gray-800' : 'bg-white';
    const textColor = isDarkTheme ? 'text-white' : 'text-black';
    const buttonColor = isDarkTheme ? 'bg-gray-600' : 'bg-black';
    const buttonTextColor = isDarkTheme ? 'text-white' : 'text-white';

    const handleAddToCart = () => {
        if (!auth.isLoggedIn) {
            alert('You must be logged in to add items to your cart');
            navigate('/login');
        }

        const itemToAdd = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
        };
        cart.addToCart(itemToAdd);
        setShowNotification(true);
    };

    return (
        <div className={`border rounded-lg p-4 relative overflow-hidden transition hover:shadow-xl transform hover:scale-105 ${cardBackgroundColor} ${textColor}`}>
            <div className="relative mb-4 cursor-pointer" onClick={() =>  navigate(`/product/${product._id}`)}>
                <div className={`absolute inset-0 ${isDarkTheme ? 'bg-black opacity-50' : 'bg-white opacity-0'} rounded-lg`}></div>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg z-50"
                />
            </div>

            <div>
                <h3 className={`text-lg font-bold mb-2 ${textColor} cursor-pointer`}
                    onClick={() =>  navigate(`/product/${product._id}`)}
                >{product.name}</h3>
                <p className={`mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}
                   onClick={() =>  navigate(`/product/${product._id}`)}
                >{product.description}</p>
                <p className={`font-bold text-xl ${isDarkTheme ? 'text-yellow-300' : 'text-blue-500'}`}>${product.pricing}</p>
            </div>

            <div className="flex items-center mt-2">
                <label className={`mr-2 ${textColor}`}>Quantity:</label>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className={`w-12 p-1 border ${isDarkTheme ? 'border-gray-700' : 'border-gray-400'} rounded ${textColor}`}
                />
                <button className={`ml-2 px-4 py-2 rounded-full ${buttonColor} ${buttonTextColor}`} onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>

            {showNotification && (
                <Notification
                    message="Item added to cart!"
                    onClose={() => setShowNotification(false)}
                />
            )}
        </div>
    );
};

export default ProductCard;
