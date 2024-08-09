import React, {useState} from "react";
import Header from "../components/Header";
import Products from "../components/Products";
import Account from "../components/Account";

export const AccountPage = ({isLoggedIn}) => {
    return (
        <div className={"pb-10"}>
            <Header/>
            <Account/>
        </div>
    );
};
