import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Comment } from './Comment';
// import { comments as commentData } from '../data/comments';
// import { products as productsData } from '../data/products';
import { context } from '../context';
import ShoppingCart from './ShoppingCart';
import Notification from './Notification';

const ProductDetail = () => {
    const { productId } = useParams();
    const { theme, cart, auth } = useContext(context);
    const { isDarkTheme } = theme;

    const containerClass = isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-black';
    const itemContainerClass = 'max-w-3xl mx-auto p-6 border rounded-lg mt-8 mb-8';

    const [comment, setComment] = useState('');
    const [productComments, setProductComments] = useState([]);

    const [product, setProduct] = useState({});
    const fetchProduct =() => {
        fetch(`http://localhost:5012/api/products/${productId}`)
        .then(res => res.json())
        .then(json => setProduct(json))
    }

    const fetchComments =() => {
        fetch(`http://localhost:5012/api/comment/${productId}`)
        .then(res => res.json())
        .then(json => setProductComments(json))
    }

    const handleCommentChange = event => {
        setComment(event.target.value);
    };

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleCommentSubmit = () => {
        if (!auth.isLoggedIn) {
            alert('You must be logged in to comment!');
            return;
        }
        const newComment = {
            product: productId,
            user: auth.user.id,
            rating: 5,
            image: "../Image1.jpg",
            text: comment
        };

        fetch('http://localhost:5012/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        })
            .then(response => response.json())
            .then(data => {
                setProductComments([...productComments, data]);
                setComment('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleAddToCart = () => {
        const itemToAdd = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        };
        cart.addToCart(itemToAdd);
        setShowNotification(true);
    };


    React.useEffect(() => {
        fetchProduct()
        fetchComments()
    }, [comment]);

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${containerClass}`}>
            <div className="flex w-full max-w-3xl">
                <div className="w-1/2 p-6">
                    <img src={`../${product.name}.jpg`} alt={product.name} className="w-full h-auto rounded-lg" />
                </div>
                <div className={`w-1/2 p-6 ${itemContainerClass} ${containerClass}`}>
                    <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                    <p className="mb-4">{product.description}</p>
                    <p className="font-bold text-xl mb-4">${product?.price}</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className={`w-2/3 ${itemContainerClass} mt-4 ${containerClass}`}>
                <h2 className="text-xl font-bold mb-4">Comments</h2>
                {productComments.map(comment => (
                    <Comment key={comment._id} comment={comment} />
                ))}
            </div>
            <div className={`w-2/3 ${itemContainerClass} mt-4 ${containerClass}`}>
                <h2 className="text-xl font-bold mb-2">Add a Comment</h2>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Type your comment here"
                    className={`border p-2 w-full rounded ${containerClass}`}
                />
                <button onClick={handleCommentSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2">
                    Submit Comment
                </button>
            </div>

            <button
                onClick={toggleCart}
                className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-full"
            >
                {isCartOpen ? 'Close Cart' : 'Open Cart'}
            </button>

            {isCartOpen && <ShoppingCart />}

            {showNotification && (
                <Notification
                    message="Item added to cart!"
                    onClose={() => setShowNotification(false)}
                />
            )}
        </div>
    );
};

export default ProductDetail;
