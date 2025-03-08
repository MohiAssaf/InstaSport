import { useState } from "react";
import { Link, useNavigate } from "react-router";
import userServices from "../services/userServices";
import { useAuth } from "../context/AuthContext";

export default function Login(){
    const { login } = useAuth();
    const navigation = useNavigate();
    const [error, setError] = useState("");
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [formValues, setFormValues] = useState({
      email: "",
      password: ""
    });
    
    const handleFormChange = (e) => {
      setFormValues(state => ({...state, [e.target.name]: e.target.value}));
    }

    const submitAction = async (e) => {
      e.preventDefault();

      try {
        setDisableSubmit(true);

        const userData = await userServices.getAllUsers();
        const users = Object.values(userData);
        const user = users.find(user => user.email === formValues.email && user.password === formValues.password)
        console.log(user)
        if(!user){
          setError("Invalid email or password");
          setDisableSubmit(false);
          return;
        }

        setDisableSubmit(false)
        login(user._id)
        navigation("/")
      } catch (error) {
        setError(error.message)
      }

    }
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-100">
          <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            <form onSubmit={submitAction} className="space-y-8">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleFormChange}
                  value={formValues.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                      Password
                  </label>
                  <input 
                      type="password" 
                      name="password" 
                      onChange={handleFormChange}
                      value={formValues.password}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                      required
                      autoComplete="password"
                  />
              </div>
    
              <div>
                <button
                  type="submit"
                  disabled={disableSubmit}
                  className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Login
                </button>
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