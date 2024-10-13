import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard"; // Assuming there's a BookCard folder with the component inside
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState(null); // Use null as the initial state for cleaner checks

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-recent-books"
      );
      setData(response.data.data); // Assuming the API sends `data.data` as the book array
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recently added books</h4>
      
      {!data && (
        <div className="flex items-center justify-center my-8">
          <Loader /> {/* Display loader while data is being fetched */}
        </div>
      )}
      
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data &&
          data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
