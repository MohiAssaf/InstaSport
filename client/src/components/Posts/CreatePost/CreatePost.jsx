import { useNavigate } from "react-router";
import SubmitButton from "../../SubmitButton/SubmitButton";
import { useCreatePost } from "../../../api/catalogApi";

const sportTypes = [
    "Football",
    "Basketball",
    "Cricket",
    "Tennis",
    "American Football",
    "Baseball",
    "Golf",
    "Mixed Martial Arts (MMA)",
    "Ice Hockey",
    "Other"
  ];
    

const CreatePost = () => {
    const {createPost} = useCreatePost()
    const nav = useNavigate();

    const formAction = async (formData) => {
        const data = Object.fromEntries(formData);
        await createPost(data);
        nav("/catalog")

    }


    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-200">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-center mb-4">Create Post</h1>

                    <form className="space-y-4" action={formAction}>
                        <div>
                            <label 
                            htmlFor="title"
                            className="block text-2xl text-gray-700 font-medium mb-3"
                            >
                                Title
                            </label>
                            <input 
                            type="text" 
                            name="title" 
                            placeholder="Enter the title of your post"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            />
                        </div>

                        <div>
                            <label 
                            htmlFor="imageUrl"
                            className="block text-2xl text-gray-700 font-medium mb-2"
                            >
                                Image
                            </label>
                            <input 
                            type="url" 
                            name="imageUrl" 
                            placeholder="Paste an image URL..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            />
                        </div>
                        <div>
                            <label 
                            htmlFor="description"
                            className="block text-2xl text-gray-700 font-medium mb-2"
                            >
                                Description
                            </label>
                            <textarea
                            name="description"
                            placeholder="A brief description of the post"
                            className="w-full min-h-[140px] resize-none px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                            </textarea> 
                        </div>
                        <div>
                            <label 
                            htmlFor="sportType"
                            className="block text-2xl text-gray-700 font-medium mb-2"
                            >
                                Sport Type
                            </label>

                            <select name="sportType" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md" required>
                                <option key="none" value="">------</option>
                                {sportTypes.map(sport => (
                                    <option key={sport} value={sport}>{sport}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-center pt-4">
                                <SubmitButton btnText="Create" />
                        </div>
                    </form>
                </div>
        </div>

    );
};

export default CreatePost;