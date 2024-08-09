import React, { createContext, useState } from 'react';


const context = createContext({
    auth: {
        isLoggedIn: false,
        setIsLoggedIn: () => {},
        user: {},
        setUser: () => {},
    },
    cart: {
        cartItems: [],
    },
    theme: {
        isDarkTheme: false,
        toggleTheme: () => {},
    },
});

const Provider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [user, setUser] = useState({});


    const addToCart = (item) => {
        setCartItems((prevCartItems) => [...prevCartItems, item]);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.id !== itemId)
        );
    };

    const updateCartItemQuantity = (itemId, newQuantity) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleTheme = () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
    };

    return (
        <context.Provider
            value={{
                auth: {
                    isLoggedIn,
                    setIsLoggedIn,
                    user,
                    setUser
                },
                cart: {
                    cartItems,
                    addToCart,
                    removeFromCart,
                    updateCartItemQuantity,
                    clearCart,
                },
                theme: {
                    isDarkTheme,
                    toggleTheme,
                },
            }}
        >
            {children}
        </context.Provider>
    );
}

export { context, Provider };
