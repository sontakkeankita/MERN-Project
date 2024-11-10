import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Settings = () => {
  const [value, setValue] = useState({ address: '' });
  const [profileData, setProfileData] = useState(null);
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };
 const change = (e) => {
  const {name , value} = e.target;
  setValue({...value,[name]:value});
 }

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          'https://mern-project-1-krwa.onrender.com/api/v1/get-user-information',
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
    fetch();
  }, []);
  
  const submitAddress = async() => {
    const response = await axios.put(
      "https://mern-project-1-krwa.onrender.com/api/v1/update-address",
      value,
      {headers}
    );
    alert(response.data.message);
  }
  return (
    <>
      {!profileData ? (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Settings</h1>
          <div className="flex gap-12">
            <div>
              <label>Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
            <div>
              <label>Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label>Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              value={value.address}
             onChange = {change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
            onClick= {submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
