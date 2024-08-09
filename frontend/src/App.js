import React, {useContext, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {context, Provider} from "./context";
import {HomePage} from "./pages/HomePage";
import {ProductDetailPage} from "./pages/ProductDetailPage";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Account from "./components/Account";
import {AccountPage} from "./pages/Account";


function App() {
    const { auth } = useContext(context);
    const { isLoggedIn, setIsLoggedIn } = auth;

    return (
        <Provider value={{ auth: { isLoggedIn, setIsLoggedIn } }}>
            <Root isLoggedIn={isLoggedIn}/>
        </Provider>
    );
};

const Root = ({isLoggedIn}) => (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn}/>}/>
            <Route path="/product/:productId" element={<ProductDetailPage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/create-account" element={<CreateAccount/>} />
            <Route path="/account" element={<AccountPage isLoggedIn={isLoggedIn}/>} />
        </Routes>
    </Router>
);

export default App;
