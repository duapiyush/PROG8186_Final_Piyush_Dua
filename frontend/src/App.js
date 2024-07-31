import React from 'react';
import {BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Headers';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

function App() {
  return (
      <CartProvider>
        <Router>
          <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </Router>
      </CartProvider>
  );
}

export default App;
