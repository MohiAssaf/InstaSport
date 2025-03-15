import { useState } from "react";
import { Link, useNavigate } from "react-router";
import validateForm from "../utils/validateForm";
import userServices from "../services/userServices";

export default function Register() {
    const navigate = useNavigate();
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [error, setError] = useState("");
    const [formValues, setFormValues] = useState({
      firstName: "",
      lastName: "",
      email: "",
      profileImg: "",
      password: "",
      repeatPassword: "",
  });
    

    const submitAction = async (e) => {
      e.preventDefault();
      setDisableSubmit(true);

      const userData = await userServices.getAllUsers();
      const users = Object.values(userData);

      if(users.some(user => user.email === formValues.email)){
        setError("A user with this email already exists");
        setDisableSubmit(false);
        return;
      }

      const errors = validateForm(formValues);
      if(errors.length > 0){
        setError(errors.join(" "));
        setDisableSubmit(false);
        return;
      }
      setError("")

      try { 
        await userServices.createUser(formValues);
        navigate("/login")
      } catch (error) {
        setError(error.message)
        setDisableSubmit(false)
      }
      setDisableSubmit(false)
    }

    const handleFormChange = (e) => {
      setFormValues(state => ({...state, [e.target.name]: e.target.value}))
    }

    return (
      <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-200 pt-50 pb-30">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          
          <form onSubmit={submitAction} className="space-y-8">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                onChange={handleFormChange}
                value={formValues.firstName}
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
                    onChange={handleFormChange}
                    value={formValues.lastName}
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
                onChange={handleFormChange}
                value={formValues.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="youremail@mail.com"
                required
                autoComplete="new-email"

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
                onChange={handleFormChange}
                value={formValues.password}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a password"
                required
                autoComplete="new-password"
                />
            </div>
            <div>
                <label htmlFor="repeatPassword" className="block text-gray-700 font-medium mb-2">
                    Confirm Password
                </label>
                <input 
                type="password"
                name="repeatPassword"
                onChange={handleFormChange}
                value={formValues.repeatPassword}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm password"
                required
                autoComplete="new-password"
                />
            </div>
  
            <div>
              <button
                type="submit"
                disabled={disableSubmit}
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Register
              </button>
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
  