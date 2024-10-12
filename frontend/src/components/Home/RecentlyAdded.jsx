import React, {useEffect , useState} from "react";
import axios from "axios";
const RecentlyAdded = () => {
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:3000/api/v1/get-recent-books"
            );
            console.log(response);
        };
        fetch();
    },[]);

    return (
        <div className = "mt-8 px-4">
            <h4 className = "text-3xl text-yellow-100">
                Recently added books
            </h4>
        </div>
    );
};
export default RecentlyAdded;