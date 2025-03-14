import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import catalogServices from "../../services/catalogServices";

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
    const {user} = useAuth();
    const [error, setError] = useState("");

    const formSubmit = async (formData) => {
        const errors = [];
        const image = formData.get("postImg");
        const sportType = formData.get("postSport");

        if(!/^(https?:\/\/).*\.(jpg|png|jgeg)$/i.test(image)){
            errors.push("Invalid Image URL");
        }

        if(sportType === "none"){
            errors.push("Please choose a sport type");
        }

        if(errors){
            setError(errors.join(" "))
            setTimeout(() => {
                setError("")
            }, 2000)
            return;
        }

        const data = Object.fromEntries(formData);
        console.log(data)
        await catalogServices.createPost(data, user);

    }


    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-200">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-center mb-4">Create Post</h1>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p> }
                    <form id="create" action={formSubmit} className="space-y-4">
                        <div>
                            <label 
                            htmlFor="postTitle"
                            className="block text-2xl text-gray-700 font-medium mb-3"
                            >
                                Title
                            </label>
                            <input 
                            type="text" 
                            name="postTitle" 
                            placeholder="Enter the title of your post"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            />
                        </div>

                        <div>
                            <label 
                            htmlFor="postImg"
                            className="block text-2xl text-gray-700 font-medium mb-2"
                            >
                                Image
                            </label>
                            <input 
                            type="text" 
                            name="postImg" 
                            placeholder="Paste an image URL..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            />
                        </div>
                        <div>
                            <label 
                            htmlFor="postDesc"
                            className="block text-2xl text-gray-700 font-medium mb-2"
                            >
                                Description
                            </label>
                            <textarea
                            name="postDesc"
                            placeholder="A brief description of the post"
                            className="w-full min-h-[140px] resize-none px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                            </textarea> 
                        </div>
                        <div>
                            <label 
                            htmlFor="postSport"
                            className="block text-2xl text-gray-700 font-medium mb-2"
                            >
                                Sport Type
                            </label>

                            <select name="postSport" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md">
                                <option key="none" value="none">------</option>
                                {sportTypes.map(sport => (
                                    <option key={sport} value={sport}>{sport}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                        <button
                            type="submit"
                            //disabled={pending}
                            className="px-10 py-2 text-xl text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                            Create
                        </button>
                        </div>
                    </form>
                </div>
        </div>

    );
};

export default CreatePost;