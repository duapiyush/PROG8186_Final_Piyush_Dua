import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleShippingAddressChange = (e) => setShippingAddress(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!email || !password || !username || !shippingAddress) {
            alert("All fields are required")
            return;
        }



        fetch('http://localhost:5012/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password, username, shippingAddress}),
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log(data);
                    navigate('/login')
                } else {
                    console.error('Login failed:', data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-1 font-bold text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 font-bold text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block mb-1 font-bold text-gray-700">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="shippingAddress" className="block mb-1 font-bold text-gray-700">Shipping
                            Address:</label>
                        <textarea
                            id="shippingAddress"
                            value={shippingAddress}
                            onChange={handleShippingAddressChange}
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
