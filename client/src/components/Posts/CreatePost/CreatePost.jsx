import { useNavigate } from "react-router";
import SubmitButton from "../../SubmitButton/SubmitButton";
import { useCreatePost } from "../../../api/catalogApi";
import { sportTypes } from "../../../constants/sportTypes";

const CreatePost = () => {
  const { createPost } = useCreatePost();
  const nav = useNavigate();

  const formAction = async (formData) => {
    const data = Object.fromEntries(formData);
    await createPost(data);
    nav("/catalog");
  };

  return (
    <div className="relative min-h-full flex-grow flex justify-center items-center bg-gray-100 py-20 ml-[17%]">
      <div className="max-w-[512px] w-full bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-[30px] font-semibold text-center text-[#2d3748] mb-6">
          Create Post
        </h1>

        <form className="flex flex-col gap-6" action={formAction}>
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-base text-[#4a5568] font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter the title of your post"
              className="w-full p-3 border-2 border-[#e2e8f0] rounded-md text-base text-[#4a5568] shadow-sm focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="imageUrl"
              className="text-base text-[#4a5568] font-medium mb-2"
            >
              Image
            </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="Paste an image URL..."
              className="w-full p-3 border-2 border-[#e2e8f0] rounded-md text-base text-[#4a5568] shadow-sm focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-base text-[#4a5568] font-medium mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="A brief description of the post"
              className="p-3 min-h-[140px] resize-none border-2 border-[#e2e8f0] rounded-md shadow-sm  focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="sportType"
              className="text-base text-[#4a5568] font-medium mb-2"
            >
              Sport Type
            </label>

            <select
              name="sportType"
              className="w-full p-3 border-2 border-[#e2e8f0] rounded-md text-base text-[#4a5568] shadow-sm focus:border-[#3182ce] focus:outline-none focus:ring-2 focus:ring-[#4299e1]/50"
              required
            >
              <option key="none" value="">
                ------
              </option>
              {sportTypes.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          <SubmitButton btnText="Create" />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
