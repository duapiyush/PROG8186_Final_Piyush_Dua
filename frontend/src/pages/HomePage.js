import React, {useState} from "react";
import Header from "../components/Header";
import Products from "../components/Products";

export const HomePage = ({isLoggedIn}) => {
    return (
        <div className={"pb-10"}>
            <Header/>
            <Products/>
        </div>
    );
};
