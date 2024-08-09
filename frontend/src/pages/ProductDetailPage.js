import React, {useState} from "react";
import {Provider} from "../context/index";
import Header from "../components/Header";
import ProductDetail from "../components/ProductDetail";

export const ProductDetailPage = ({isLoggedIn}) => {
    return (
        <div className={"pb-10"}>
            <Header/>
            <ProductDetail/>
        </div>
    );
};
