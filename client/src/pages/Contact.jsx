import { useNavigate } from "react-router";
import { useCreateInboxMess } from "../api/inboxApi";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { toast } from "react-toastify";
import { useUser } from "../api/authApi";

const Contact = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { createMessage } = useCreateInboxMess();

  const submitAction = async (formData) => {
    const data = Object.fromEntries(formData);
    try {
      await createMessage(data);
      toast.success("Request sent! We’ll send a reply to your email soon.");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error("Request failed! Try again later.");
    }
  };

  return (
    <div className="relative min-h-full flex-grow flex justify-center items-center bg-gray-100 py-20 ml-[17%]">
      <div className="mx-auto max-w-4xl w-full bg-white p-15 shadow-md rounded">
        <h1 className="text-[30px] font-semibold text-center text-[#2d3748] mb-6">
          Contact us
        </h1>

        <form action={submitAction} className="flex flex-col gap-6">
          <div className="flex justify-between space-x-10">
            <div className="form-group w-full">
              <label
                htmlFor="name"
                className="text-base text-[#4a5568] font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-3 border-2 border-[#e2e8f0] rounded-md text-base text-[#4a5568] shadow-sm focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
                placeholder="Enter your Full Name"
                defaultValue={user?.name}
              />
            </div>
            <div className="form-group w-full">
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
                autoComplete="email"
                defaultValue={user?.email}
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-base text-[#4a5568] font-medium mb-2"
            >
              Username
            </label>
            <input
              type="username"
              name="username"
              className="w-full p-3 border-2 border-[#e2e8f0] rounded-md text-base text-[#4a5568] shadow-sm focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
              placeholder="Enter the username of the profile"
              defaultValue={user?.username}
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-base text-[#4a5568] font-medium mb-2"
            >
              Message
            </label>
            <textarea
              name="message"
              placeholder="Tell us what is the issue you are encountering"
              className="p-3 min-h-[140px] resize-none border-2 border-[#e2e8f0] rounded-md shadow-sm  focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
              required
            ></textarea>
          </div>

          <SubmitButton btnText="Send Message" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
