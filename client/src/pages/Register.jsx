import { Link, useNavigate } from "react-router";
import validatePassword from "../utils/validatePassword";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { useRegister } from "../api/authApi";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useRegister();
  const { userLogin } = useAuthContext();

  const submitAction = async (formData) => {
    const data = Object.fromEntries(formData);

    try {
      validatePassword(data.password, data.repeatPassword);

      const result = await register(data);
      userLogin(result);
      toast.success(`Successful Registeration ${data.username}`);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative min-h-full flex-grow flex justify-center items-center bg-gray-100 py-20 ml-[17%]">
      <div className="max-w-[512px] w-full bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-[30px] font-semibold text-center text-[#2d3748] mb-6">
          Register
        </h1>

        <form action={submitAction} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-base text-[#4a5568] font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border-2 border-[#e2e8f0] rounded-md text-base text-[#4a5568] shadow-sm focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
              placeholder="Enter your Full Name"
              required
            />
          </div>
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
              placeholder="Enter your email"
              autoComplete="new-email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-base text-[#4a5568] font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full p-3 border-2 border-[#e2e8f0] rounded-md text-base text-[#4a5568] shadow-sm focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
              placeholder="Enter a username"
              autoComplete="new-username"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="bio"
              className="text-base text-[#4a5568] font-medium mb-2"
            >
              Profile Bio
            </label>
            <textarea
              name="bio"
              placeholder="Write something about yourself..."
              className="p-3 min-h-[140px] resize-none border-2 border-[#e2e8f0] rounded-md shadow-sm  focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
              required
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="profileImg"
              className="text-base text-[#4a5568] font-medium mb-2"
            >
              Profile Picture
            </label>
            <input
              type="url"
              name="profileImg"
              placeholder="Paste an image URL..."
              className="w-full p-3 border-2 border-[#e2e8f0] rounded-md text-base text-[#4a5568] shadow-sm focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-base text-[#4a5568] font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border-2 border-[#e2e8f0] rounded-md text-base text-[#4a5568] shadow-sm focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
              placeholder="Enter a password"
              autoComplete="new-password"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="repeatPassword"
              className="text-base text-[#4a5568] font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="repeatPassword"
              className="w-full p-3 border-2 border-[#e2e8f0] rounded-md text-base text-[#4a5568] shadow-sm focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
              placeholder="Confirm password"
              autoComplete="new-password"
              required
            />
          </div>

          <SubmitButton btnText="Register" />
        </form>

        <div className="mt-6 text-center text-[#718096]">
          <p>
            Already have an account?
            <Link
              to="/login"
              className="text-[#3182ce] no-underline ml-1 hover:text-[#2b6cb0]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
