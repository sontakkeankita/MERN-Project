import React from "react";
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setUserDiv }) => {
  // Don't render the modal if there's no user data
  if (!userDivData) {
    return null; 
  }

  // Close the modal
  const handleClose = () => {
    setUserDiv("hidden"); // Set to 'hidden' to hide the modal
  };

  return (
    <>
      {/* Background overlay */}
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}
        onClick={handleClose} // Clicking anywhere on the background will close the modal
      ></div>

      {/* Modal content */}
      <div className="bg-white text-black rounded p-6 w-[80%] md:w-[50%] lg:w-[40%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">User Information</h1>
          <button onClick={handleClose}>
            <RxCross1 className="text-black" />
          </button>
        </div>
        <div className="mt-4">
          <div className="mt-2">
            <label className="font-semibold">Username: </label>
            <span>{userDivData?.username || "N/A"}</span>
          </div>
          <div className="mt-2">
            <label className="font-semibold">Email: </label>
            <span>{userDivData?.email || "N/A"}</span>
          </div>
          <div className="mt-2">
            <label className="font-semibold">Address: </label>
            <span>{userDivData?.address || "N/A"}</span>
          </div>
          <div className="mt-2">
            <label className="font-semibold">Avatar: </label>
            <img
              src={userDivData?.avatar || "https://via.placeholder.com/150"}
              alt="User Avatar"
              className="w-16 h-16 rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;





