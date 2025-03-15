import { useState } from "react";
import { Link, useNavigate } from "react-router";
import userServices from "../services/userServices";
import { useAuth } from "../context/AuthContext";
import SubmitButton from "../components/SubmitButton/SubmitButton";

export default function Login(){
    const { login } = useAuth();
    const navigation = useNavigate();
    const [error, setError] = useState("");

    const submitAction = async (formData) => {
      const data = Object.fromEntries(formData);
      const allUsers = await userServices.getAllUsers();

      const user = Object.values(allUsers).find(user => user.username === data.username && user.password === data.password)

      if(!user){
        setError("Invalid username or password");
        return;
      }

      login(user._id)
      navigation("/")

    }
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-200">
          <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            <form action={submitAction} className="space-y-8">
              <div>
                  <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                      Username
                  </label>
                  <input 
                  type="text"
                  name="username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a username"
                  autoComplete="username"
                  required
                  />
              </div>
              <div>
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                      Password
                  </label>
                  <input 
                      type="password" 
                      name="password" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                      autoComplete="password"
                      required
                  />
              </div>
    
              <div className="flex justify-center">
                <SubmitButton btnText="Login"/>
              </div>
            </form>
    
            <div className="mt-6 text-center text-gray-600">
              <p>
                Don't have an account?
                <Link to="/register" className="text-blue-500 hover:text-blue-700 ml-1">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
}