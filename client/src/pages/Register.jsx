import { useState } from "react";
import { Link, useNavigate } from "react-router";
import validatePassword from "../utils/validatePassword";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { useRegister } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const navigate = useNavigate();
    const {register} = useRegister();
    const {setAccessToken} = useAuth();
    const [error, setError] = useState("");
    

    const submitAction = async (formData) => {
      const data = Object.fromEntries(formData);
      const errors = validatePassword(data);

      try {
        const response = await register(data);
        if(!response.accessToken){
          errors.push(response.message)
          setError(errors.join(" "));
          setTimeout(() => setError(""), 3000);
          return
        }

        setAccessToken(response.accessToken);
        navigate("/");

      } catch (e) {
        setError("Something went wrong. Please try again later.");
      }

    }

    return (
      <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-200 pt-50 pb-30">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          
          <form action={submitAction} className="space-y-8">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your First Name"
                required
              />
            </div>
            <div>
                <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                    Last Name
                </label>
                <input 
                    type="text" 
                    name="lastName" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your Last Name"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                </label>
                <input 
                    type="email" 
                    name="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    autoComplete="new-email"
                    required
                />
            </div>
            <div>
                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                    Username
                </label>
                <input 
                type="text"
                name="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a username"
                autoComplete="new-username"
                required
                />
            </div>
            <div>
                <label 
                htmlFor="profileImg"
                className="block text-gray-700 font-medium mb-2"
                >
                    Profile Picture
                </label>
                <input 
                type="url" 
                name="profileImg" 
                placeholder="Paste an image URL..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                </label>
                <input 
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a password"
                autoComplete="new-password"
                required
                />
            </div>
            <div>
                <label htmlFor="repeatPassword" className="block text-gray-700 font-medium mb-2">
                    Confirm Password
                </label>
                <input 
                type="password"
                name="repeatPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm password"
                autoComplete="new-password"
                required
                />
            </div>
  
            <div className="flex justify-center">
              <SubmitButton btnText="Register" /> 
            </div>
          </form>
  
          <div className="mt-6 text-center text-gray-600">
            <p>
              Already have an account?
              <Link to="/login" className="text-blue-500 hover:text-blue-700 ml-1">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
  