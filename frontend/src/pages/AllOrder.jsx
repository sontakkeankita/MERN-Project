import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaUserLarge, FaCheck } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SeeUserData from "./SeeUserData";

const AllOrder = () => {
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState();
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null); // Set initial value to null
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://mern-project-1-krwa.onrender.com/api/v1/get-all-orders",
          { headers }
        );
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching all orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const setOptionButton = (index) => {
    setOptions(index);
  };

  const handleStatusChange = (e) => {
    setValues({ status: e.target.value });
  };

  const submitChanges = async (index) => {
    const id = AllOrders[index]?._id;
    if (!id) {
      console.error("Order ID not found.");
      return;
    }

    try {
      const response = await axios.put(
        `https://mern-project-1-krwa.onrender.com/api/v1/update-status/${id}`,
        Values,
        { headers }
      );
      alert(response.data.message);
      setOptions(-1);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Function to apply the correct status class
  const getStatusClass = (status) => {
    switch (status) {
      case "Order placed":
        return "text-yellow-500";
      case "Out for delivery":
        return "text-yellow-500"; // Yellow for Out for delivery
      case "Delivered":
        return "text-green-500";
      case "Canceled":
        return "text-red-500";
      default:
        return "text-gray-500"; // Default class if status is not recognized
    }
  };

  return (
    <>
      {!AllOrders ? (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : AllOrders.length > 0 ? (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]"><h1 className="text-center">Sr.</h1></div>
            <div className="w-[40%] md:w-[22%]"><h1>Books</h1></div>
            <div className="w-0 md:w-[45%] hidden md:block"><h1>Description</h1></div>
            <div className="w-[17%] md:w-[9%]"><h1>Price</h1></div>
            <div className="w-[30%] md:w-[16%]"><h1>Status</h1></div>
            <div className="w-[10%] md:w-[5%]"><h1><FaUserLarge /></h1></div>
          </div>

          {AllOrders.map((item, i) => (
            <div
              key={item?._id || i}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer"
            >
              <div className="w-[3%]"><h1 className="text-center">{i + 1}</h1></div>
              <div className="w-[40%] md:w-[22%]">
                {item?.book ? (
                  <Link
                    to={`/view-book-details/${item.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {item.book.title}
                  </Link>
                ) : (
                  <span>Book info unavailable</span>
                )}
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1>{item?.book?.desc?.slice(0, 50) || "No description available"}...</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1>{item?.book?.price || "N/A"}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => setOptionButton(i)}
                  >
                    <div className={getStatusClass(item.status)}>
                      {item.status}
                    </div>
                  </button>

                  <div className={`${Options === i ? "flex" : "hidden"} gap-2 mt-2`}>
                    <select
                      name="status"
                      className="bg-gray-800"
                      onChange={handleStatusChange}
                      defaultValue={item.status}
                    >
                      {["Order placed", "Out for delivery", "Delivered", "Canceled"].map((status, idx) => (
                        <option value={status} key={idx}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => submitChanges(i)}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(item.user || {}); // Ensure item.user is not undefined
                    console.log("User Data: ", item.user); // Debugging
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No orders available.</div>
      )}

      <SeeUserData
        userDivData={userDivData}
        userDiv={userDiv}
        setUserDiv={setUserDiv}
      />
    </>
  );
};

export default AllOrder;



