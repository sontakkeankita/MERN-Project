import React, { useEffect } from "react";
import axios from "axios";

const Favourites = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-favourite-books",
          { headers }
        );
        console.log(response.data.data); 
    };
    fetch();
  }, []);

  return <div>Favourites</div>;
};

export default Favourites;
