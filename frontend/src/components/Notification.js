import React, { useEffect, useState } from 'react';

const Notification = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 3000); // Hide the notification after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed bottom-10 right-10 p-4 rounded-md transition ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            <div className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
                {message}
            </div>
        </div>
    );
};

export default Notification;
