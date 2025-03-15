import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import userServices from "../services/userServices";

const Profile = () => {
    const {user, logout} = useAuth();
    const navigation = useNavigate();

    const [data, setData] = useState([]);

    useEffect(() => {
      userServices.getOne(user)
      .then(setData)
    }, [user])
    

    return (
      <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-100">      
        <div className="relative w-full max-w-md p-8 bg-white bg-opacity-80 rounded-2xl shadow-xl backdrop-blur-lg">
          
          <div className="flex justify-center mb-6">
            <img 
              src={data?.profileImg ? data.profileImg: "https://brsc.sa.edu.au/wp-content/uploads/2018/09/placeholder-profile-sq.jpg"} 
              alt="Profile Picture" 
              className="w-32 h-32 rounded-full border-4 border-gray-100 shadow-lg"
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            {data?.firstName} {data?.lastName}
          </h2>

          <p className="text-center text-gray-600 mb-4">{data?.email}</p>

          <div className="flex justify-evenly items-center mt-6">
            <button className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer">
              Edit
            </button>
            
            <button type="submit" onClick={() => {
              logout()
              navigation("/")
              }} 
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 cursor-pointer">
              Logout
            </button>
          </div>

        </div>
      </div>
    );
};

export default Profile;
