import React, { useState } from 'react'; // Import useState here
import {Link , useNavigate} from "react-router-dom";
import {authActions} from "../store/auth";
import axios from "axios"; // Correct
import {useDispatch} from "react-redux";

const LogIn = () => {
  const [Values, setValues] = useState({
    username:"",
    password:"",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const {name , value} = e.target;
    setValues({...Values,[name]:value});
  };
  const submit = async() => {
    try{
      if(
        Values.username === "" ||
        Values.password === "" 
      ){
        alert("All fields are required");
      }
      else{
        const response = await axios.post(
          "http://localhost:3000/api/v1/sign-in",
          Values
        );
       // console.log(response.data);
       dispatch(authActions.login());
       dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);
        navigate("/profile")
      }
    }catch(error){
      alert(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
      <div className="bg-zinc-800 rounded-lg px-8 py-8 w-full max-w-md">
        <p className="text-zinc-200 text-2xl font-semibold mb-6 text-center">Login</p>
        <div>
          <div>
            <label htmlFor="username" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-3 outline-none rounded"
              placeholder="username"
              name="username"
              required
              value = {Values.username}
              onChange = {change}
            />
          </div>

          <div className="mt-6">
            <label htmlFor="password" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-3 outline-none rounded"
              placeholder="password"
              name="password"
              required
              value = {Values.password}
              onChange = {change}
            />
          </div>

          <div className="mt-6">
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
            onClick = {submit}
            >
              Login
            </button>
          </div>

          <p className="flex mt-6 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Don't have an account? &nbsp;
            <Link to="/signup" className="hover:text-blue-500">
              <u>SignUp</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;