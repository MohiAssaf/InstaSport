import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { useLogin } from "../api/authApi";
import '../assets/css/form.css'
import { toast } from "react-toastify";

export default function Login(){
    const {login} = useLogin();
    const {userLogin} = useAuthContext();
    const navigate = useNavigate();
    
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: ""
    })

    const submitAction = async (e) => {
      e.preventDefault()
      setDisableSubmit(true)

      try {
        const result = await login(formData);
        userLogin(result);
        toast.success('Successfull Login!')
        
        navigate("/");

      } catch (error) {
        toast.error(error.message)
      }finally{
        setDisableSubmit(false)
      }

    }

    const handleInputChange = (e) => {
      setFormData(state => ({...state, [e.target.name]: e.target.value}))
    }
    return (
        <div className="page">
          <div className="form-container">
            <h1 className="form-title">Login</h1>

            <form onSubmit={submitAction} className="form">
              <div className="form-group">
                  <label htmlFor="email" className="label">
                      Email
                  </label>
                  <input 
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="Enter a email"
                  autoComplete="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                      Password
                  </label>
                  <input 
                      type="password" 
                      name="password" 
                      className="input-field"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      onChange={handleInputChange}
                      value={formData.password}
                      required
                  />
              </div>
    
              <button
              disabled={disableSubmit}
              type="submit"
              className="px-10 py-2 text-xl text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Login
              </button>
            </form>
    
            <div className="redirect-link-container">
              <p>
                Don't have an account?
                <Link to="/register" className="redirect-link">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
}