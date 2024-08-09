import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { context } from '../context';

const Header = () => {
    const { theme, auth } = useContext(context);
    const { isDarkTheme, toggleTheme } = theme;

    console.log(auth);

    const themeClass = isDarkTheme ? 'bg-gray-800 text-white' : 'bg-purple-500 text-white';

    const handleLogout = () => {
        auth.setIsLoggedIn(false);
        auth.setUser({});
    }

    return (
        <header className={`p-4 flex justify-between items-center ${themeClass}`}>
            <div className="text-2xl font-bold">AIRXPRS</div>
            <nav className="mt-4">
                <Link to="/" className="mr-4">Home</Link>
                {!auth.isLoggedIn ?  <Link to="/login">Login</Link> : <Link to="/login" onClick={handleLogout}>Logout</Link>}
                {!auth.isLoggedIn && <Link to="/create-account" className="ml-4">Register</Link>}
                {auth.isLoggedIn && <Link to="/account" className="ml-4">Account</Link>}
            </nav>
        </header>
    );
};

export default Header;
