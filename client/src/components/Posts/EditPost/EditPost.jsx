import { useNavigate, useParams } from "react-router";
import { useEditPost, usePost } from "../../../api/catalogApi";
import SubmitButton from "../../SubmitButton/SubmitButton";
import { sportTypes } from "../../../constants/sportTypes";
import { useEffect, useRef } from "react";

const EditPost = () => {
  const { id } = useParams();
  const { post } = usePost(id);
  const { edit } = useEditPost();
  const nav = useNavigate();
  const sportTypeRef = useRef();

  useEffect(() => {
    if (post.sportType) {
      sportTypeRef.current.value = post.sportType;
    }
  }, [post]);

  const formAction = async (formData) => {
    const data = Object.fromEntries(formData);

    await edit(id, data);

    nav(`/catalog/details/${id}`);
  };

  return (
    <div className="relative min-h-full flex-grow flex justify-center items-center bg-gray-100 py-20 ml-[17%]">
      <div className="max-w-[512px] w-full bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-[30px] font-semibold text-center text-[#2d3748] mb-6">
          Edit Post
        </h1>

        <form action={formAction} className="flex flex-col gap-6">
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
              defaultValue={post.title}
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
              defaultValue={post.imageUrl}
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
              defaultValue={post.description}
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
              ref={sportTypeRef}
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

          <SubmitButton btnText="Edit" />
        </form>
      </div>
    </div>
  );
};

export default EditPost;
