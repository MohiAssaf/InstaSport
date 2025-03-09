import SubmitButton from "./SubmitButton";

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
    

const CreatePost = ({close}) => {
    const formSubmit = async (formData) => {
        const title = formData.get("postTitle")

    }


    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="fixed inset-0" onClick={close}></div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                    <h1 className="text-3xl font-bold text-center mb-4">Create Post</h1>
                    <button className="absolute top-4 right-5 cursor-pointer" onClick={close}>
                        <i className="fa-solid fa-circle-xmark text-2xl text-red-500 transition-colors hover:text-red-400"></i>
                    </button>
                    <form action={formSubmit} className="space-y-4">
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
                                {sportTypes.map(sport => (
                                    <option value={sport}>{sport}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <SubmitButton postType="Create"/>
                        </div>
                    </form>
                </div>
        </div>

    );
};

export default CreatePost;