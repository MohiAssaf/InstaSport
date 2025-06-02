import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { useLogin } from "../api/authApi";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useLogin();
  const { userLogin } = useAuthContext();
  const navigate = useNavigate();

  const [disableSubmit, setDisableSubmit] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submitAction = async (e) => {
    e.preventDefault();
    setDisableSubmit(true);

    try {
      const result = await login(formData);
      userLogin(result);
      toast.success("Successfull Login!");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setDisableSubmit(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  return (
    <div className="relative min-h-full flex-grow flex justify-center items-center bg-gray-100 py-20 ml-[17%]">
      <div className="max-w-[512px] w-full bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-[30px] font-semibold text-center text-[#2d3748] mb-6">
          Login
        </h1>

        <form onSubmit={submitAction} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-base text-[#4a5568] font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border-2 border-[#e2e8f0] rounded-md text-base text-[#4a5568] shadow-sm focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
              placeholder="Enter a email"
              autoComplete="email"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border-2 border-[#e2e8f0] rounded-md text-base text-[#4a5568] shadow-sm focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
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

        <div className="mt-6 text-center text-[#718096]">
          <p>
            Don't have an account?
            <Link
              to="/register"
              className="text-[#3182ce] no-underline ml-1 hover:text-[#2b6cb0]"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
