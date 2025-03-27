import { useState } from "react";
import { Link, useNavigate } from "react-router";
import validatePassword from "../utils/validatePassword";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { useRegister } from "../api/authApi";
import { useAuthContext } from "../context/AuthContext";
import '../assets/css/form.css'

export default function Register() {
    const navigate = useNavigate();
    const {register} = useRegister();
    const {userLogin} = useAuthContext();
    const [error, setError] = useState("");
    

    const submitAction = async (formData) => {
      const data = Object.fromEntries(formData);
      const errors = validatePassword(data.password, data.repeatPassword);

      try {
        const result = await register(data);
        userLogin(result);
        navigate("/");

      } catch (error) {
        errors.push(error.message)
        setError(errors.join(" "));
        setTimeout(() => setError(""), 3000);
        return;
      }
    }

    return (
      <div className="page">
        <div className="form-container">
          <h1 className="form-title">Register</h1>

          {error && <p className="error-message">{error}</p>}
          
          <form action={submitAction} className="form">
            <div className="form-group">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="input-field"
                placeholder="Enter your Full Name"
                required
              />
            </div>
            <div className="form-group">
                <label htmlFor="email" className="label">
                    Email
                </label>
                <input 
                    type="email" 
                    name="email" 
                    className="input-field"
                    placeholder="Enter your email"
                    autoComplete="new-email"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="username" className="label">
                    Username
                </label>
                <input 
                type="text"
                name="username"
                className="input-field"
                placeholder="Enter a username"
                autoComplete="new-username"
                required
                />
            </div>
            <div className="form-group">
                <label 
                htmlFor="bio"
                className="label"
                >
                    Profile Bio
                </label>
                <textarea
                name="bio"
                placeholder="Write something about yourself..."
                className="input-field desc"
                required
                >
                </textarea> 
            </div>
            <div className="form-group">
                <label 
                htmlFor="profileImg"
                className="label"
                >
                    Profile Picture
                </label>
                <input 
                type="url" 
                name="profileImg" 
                placeholder="Paste an image URL..."
                className="input-field"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="label">
                    Password
                </label>
                <input 
                type="password"
                name="password"
                className="input-field"
                placeholder="Enter a password"
                autoComplete="new-password"
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="repeatPassword" className="label">
                    Confirm Password
                </label>
                <input 
                type="password"
                name="repeatPassword"
                className="input-field"
                placeholder="Confirm password"
                autoComplete="new-password"
                required
                />
            </div>
  
            
            <SubmitButton btnText="Register" /> 
          </form>
  
          <div className="redirect-link-container">
            <p>
              Already have an account?
              <Link to="/login" className="redirect-link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
  