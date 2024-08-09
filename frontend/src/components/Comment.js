import React, {useContext} from "react";
import {context} from "../context";

export const Comment = ({comment}) => {
    const { productComments, setProductComments } = useContext(context);
    const { theme } = useContext(context);
    const { isDarkTheme } = theme;

    const containerClass = isDarkTheme ? "border p-2 mb-2 bg-gray-800 text-white" : "border p-2 mb-2";


    return (
        <div className={`"max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl" ${containerClass}`}>
            <div className="md:flex">
                <div className="p-8">
                    <div
                        className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{comment.user !== undefined ?  comment.user.username : 'Anonymous'}</div>
                    <div className="text-sm text-gray-500">{comment.user !== undefined ? comment.user.email : "anonymous@gmail.com"  }</div>
                    <p className="mt-2 text-gray-500">{comment.text}</p>
                </div>
            </div>
        </div>
    );
};
