import React, { useState, useContext } from 'react';
import { context } from '../context/index';
import Notification from "./Notification";

const AddressDialog = ({ setIsDialogOpen }) => {
    const { theme } = useContext(context);
    const { isDarkTheme } = theme;

    const dialogBackground = isDarkTheme ? 'bg-gray-800' : 'bg-white';
    const dialogTextColor = isDarkTheme ? 'text-white' : 'text-black';
    const inputBorderColor = isDarkTheme ? 'border-gray-600' : 'border-gray-400';

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const handleConfirm = () => {
        console.log('Address details:', {
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode
        });
        setShowNotification(true);
        setTimeout(() => {
            setIsDialogOpen(false);
        }, 4000);

    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-20 bg-gray-500 bg-opacity-50">
            <div className={`p-8 rounded-lg ${dialogBackground} ${dialogTextColor}`}>
                <h2 className="text-xl font-bold mb-4">Enter Address Details</h2>
                <div className="mb-4">
                    <label htmlFor="addressLine1" className="block text-sm font-bold mb-1">Address Line 1:</label>
                    <input
                        type="text"
                        id="addressLine1"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        className={`border p-2 w-full rounded ${inputBorderColor}`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="addressLine2" className="block text-sm font-bold mb-1">Address Line 2:</label>
                    <input
                        type="text"
                        id="addressLine2"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        className={`border p-2 w-full rounded ${inputBorderColor}`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-bold mb-1">City:</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={`border p-2 w-full rounded ${inputBorderColor}`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="state" className="block text-sm font-bold mb-1">State:</label>
                    <input
                        type="text"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className={`border p-2 w-full rounded ${inputBorderColor}`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="postalCode" className="block text-sm font-bold mb-1">Postal Code:</label>
                    <input
                        type="text"
                        id="postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className={`border p-2 w-full rounded ${inputBorderColor}`}
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded" onClick={handleConfirm}>
                        Confirm
                    </button>
                    <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </div>
            {showNotification && (
                <Notification
                    message="Item shipped to address!"
                    onClose={() => setShowNotification(false)}
                />
            )}
        </div>
    );
};

export default AddressDialog;
