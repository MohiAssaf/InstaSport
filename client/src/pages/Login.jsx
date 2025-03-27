import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { useLogin } from "../api/authApi";
import '../assets/css/form.css'

export default function Login(){
    const {login} = useLogin();
    const {userLogin} = useAuthContext()
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const submitAction = async (formData) => {
      const data = Object.fromEntries(formData);

      try {
        const result = await login(data);
        userLogin(result);
        navigate("/");

      } catch (error) {
        setError(error.message);
        setTimeout(() => setError(""), 3000);
      }

    }
    return (
        <div className="page">
          <div className="form-container">
            <h1 className="form-title">Login</h1>

            {error && <p className="error-message">{error}</p>}
            
            <form action={submitAction} className="form">
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
                      autoComplete="password"
                      required
                  />
              </div>
    
              <SubmitButton btnText="Login"/>
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