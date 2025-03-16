import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import userServices from "../../services/userServices";
import SubmitButton from "../SubmitButton/SubmitButton";

export default function EditProfile() {
    const {id} = useParams()
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [error, setError] = useState("");

    useEffect(() => {
        userServices.getOne(id)
        .then(setData)
    }, [id])
    

    const submitAction = async (formData) => {
      const formValues = Object.fromEntries(formData);

      const isSame =  (
        data.firstName === formValues?.firstName &&
        data.lastName === formValues?.lastName &&
        data.username === formValues?.username &&
        data.profileImg === formValues?.profileImg
    );

      if(isSame){
        navigate("/profile")
      }


      const userData = await userServices.getAllUsers();
      const users = Object.values(userData);

      if(users.some(user => user.username === formValues.username)){
        setError("A user with this username already exists");
        setTimeout(() => {
            setError("")
        }, 3000)
        return;
      }

      
      await userServices.update({...formValues, password: data.password, repeatPassword: data.password, _id: data._id}, id);
      navigate("/profile")

    }

    return (
      <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-200 pt-50 pb-30">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Profile</h1>

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
                defaultValue={data?.firstName}
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
                    defaultValue={data?.lastName}
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
                defaultValue={data?.username}
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
                defaultValue={data?.profileImg}
                />
            </div>
  
            <div className="flex justify-between">
              <SubmitButton btnText="Update" /> 
              <Link to="/profile" className="px-10 py-2 text-xl text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                Go Back
            </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
  