import React, {useState, useContext, useEffect} from 'react';
import ProductCard from './ProductCard';
import ShoppingCart from './ShoppingCart';
// import { products as data } from '../data/products';
import { context } from '../context';

const Products = () => {
    const { theme } = useContext(context);
    const { isDarkTheme } = theme;

    const cardBackgroundColor = isDarkTheme ? 'bg-gray-800' : 'bg-white';
    const textColor = isDarkTheme ? 'text-white' : 'text-black';

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [products, setProducts] = useState([]);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };


    const fetchProducts =() => {
        fetch('http://localhost:5012/api/products')
        .then(res => res.json())
        .then(json => setProducts(json))
    }


    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 ${cardBackgroundColor} ${textColor}`}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}

            <button onClick={toggleCart} className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-full">
                {isCartOpen ? 'Close Cart' : 'Open Cart'}
            </button>

            {isCartOpen && <ShoppingCart />}
        </div>
    );
};

export default Products;
