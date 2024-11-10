import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("https://mern-project-1-krwa.onrender.com/api/v1/get-user-cart", { headers });
      setCart(res.data.data);
    };
    fetch();
  }, [headers]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `https://mern-project-1-krwa.onrender.com/api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.forEach((items) => {
        total += items.price;
      });
      setTotal(total);
    }
  }, [Cart]);

  const PlaceOrder = async() => {
    try{
      const response = await axios.post(
        `https://mern-project-1-krwa.onrender.com/api/v1/place-order`,
        {order:Cart},
        {headers}
      );
      alert(response.data.message);
      setCart([]);
      navigate("/profile/orderHistory");

    }catch(error){
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-900 px-8 py-8 min-h-screen text-white">
      {!Cart && <Loader />}

      {Cart && Cart.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400 mb-4">Empty Cart</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="empty cart"
            className="lg:h-[40vh] h-[30vh] object-cover"
          />
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-4xl font-bold text-zinc-500 mb-10">Your Cart</h1>
          <div className="space-y-6">
            {Cart.map((item, index) => (
              <div
                key={index}
                className="w-full flex flex-col md:flex-row items-center p-6 bg-zinc-800 rounded-lg shadow-lg"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-40 w-40 object-cover rounded-md md:mr-6"
                />
                <div className="flex flex-col flex-grow mt-4 md:mt-0 md:flex-row justify-between items-center md:items-start w-full">
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-semibold text-zinc-200">{item.title}</h2>
                    <p className="text-zinc-400 mt-2 text-sm md:text-base lg:hidden">
                      {item.desc.slice(0, 100)}...
                    </p>
                    <p className="text-zinc-400 mt-2 text-sm hidden lg:block">
                      {item.desc.slice(0, 200)}...
                    </p>
                  </div>
                  <div className="flex items-center mt-4 md:mt-0 space-x-6">
                    <span className="text-2xl font-bold text-zinc-300">RS {item.price}</span>
                    <button
                      className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                      onClick={() => deleteItem(item._id)}
                    >
                      <AiFillDelete className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Amount and Place Order Button */}
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-3xl text-zinc-200 font-semibold">Total Amount</h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-300">
                <h2>{Cart.length} books</h2> 
                <h2>RS {Total}</h2>
              </div>
              <div className="w-[100%] mt-3">
                <button
                  className="bg-indigo-600 text-white rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-indigo-700"
                  onClick={PlaceOrder} // Add the onClick to call PlaceOrder
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
