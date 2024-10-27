import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader"; // Make sure to import Loader if it's being used
import { GrLanguage } from "react-icons/gr"; // Import the GrLanguage icon if it's used
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null); // Use null as the initial state

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/get-book-by-id/${id}`
      );
      console.log(response);
      setData(response.data.data); // Assuming the API sends `data.data` as the book object
    };
    fetch();
  }, [id]);

  return (
    <>
      {data ? (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full lg:w-3/6">
            <div className="flex justify-around bg-zinc-800 p-12 rounded">
              <img
                src={data.url}
                alt={data.title}
                className="h-[50vh] lg:h-[70vh] rounded object-cover"
              />
              <div className="flex md:flex-col">
                <button className="bg-white rounded-full text-3xl p-3 text-red-500">
                  <FaHeart />
                </button>
                <button className="bg-white rounded-full text-3xl p-3 mt-8 text-blue-500">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">{data.title}</h1>
            <p className="text-zinc-400 mt-1">by {data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
            <p className="flex mt-4 items-center text-zinc-400">
              <GrLanguage className="me-3" /> {data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price: Rs {data.price}
            </p>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
