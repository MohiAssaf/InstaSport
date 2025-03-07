import { Link } from "react-router";

export default function Login(){

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-100">
          <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>
            
            <form className="space-y-8">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your username"
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
                  />
              </div>
    
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 cursor-pointer"
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