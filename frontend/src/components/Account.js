import React, {useContext, useEffect, useState} from 'react';
import {context} from '../context';

const AccountEdit = () => {
    const {auth, theme} = useContext(context);
    const [password, setPassword] = useState('');
    const [shippingAddress, setShippingAddress] = useState(auth.user ? auth.user.shippingAddress : '');
    const [products, setProducts] = useState([]);

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleShippingAddressChange = (e) => setShippingAddress(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
    };


    const fetchProducts =() => {
        fetch('http://localhost:5012/api/products')
            .then(res => res.json())
            .then(json =>
                setProducts(json.slice(0, 2))
            )
    }


    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <div className="flex">
            <div className="flex items-center w-1/3">
                <div className="bg-white rounded-lg shadow-lg p-10 w-full">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">Account Edit</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-1 font-bold text-gray-700">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={auth?.user?.email}
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-400"
                                disabled
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1 font-bold text-gray-700">New
                                Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="block mb-1 font-bold text-gray-700">Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={auth?.user?.username}
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-400"
                                disabled
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
                            />
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">Dark Mode</span>
                            <label className="switch">
                                <input type="checkbox" onChange={() => theme.toggleTheme()}/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white font-bold transition-colors"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-1/3 mx-auto mx-24">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 py-4 flex justify-center">Purchase History</h2>
                <div className="grid grid-cols-1 gap-4">
                    {products.map(item => (
                        <div key={item.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
                            <img src={`../${item.name}.jpg`} alt={item.name} className="w-full h-32 object-cover rounded-lg mb-2"/>
                            <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                            <p className="text-gray-600">{item.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccountEdit;
