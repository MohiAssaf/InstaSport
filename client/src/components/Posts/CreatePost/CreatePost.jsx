import { useNavigate } from "react-router";
import SubmitButton from "../../SubmitButton/SubmitButton";
import { useCreatePost } from "../../../api/catalogApi";
import '../../../assets/css/form.css'

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
        <div className="page">
            <div className="form-container">
                    <h1 className="form-title">Create Post</h1>

                    <form className="form" action={formAction}>
                        <div className="form-group">
                            <label 
                            
                            htmlFor="title"
                            className="label"
                            >
                                Title
                            </label>
                            <input 
                            type="text" 
                            name="title" 
                            placeholder="Enter the title of your post"
                            className="input-field"
                            required
                            />
                        </div>

                        <div className="form-group">
                            <label 
                            htmlFor="imageUrl"
                            className="label"
                            >
                                Image
                            </label>
                            <input 
                            type="url" 
                            name="imageUrl" 
                            placeholder="Paste an image URL..."
                            className="input-field"
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label 
                            htmlFor="description"
                            className="label"
                            >
                                Description
                            </label>
                            <textarea
                            name="description"
                            placeholder="A brief description of the post"
                            className="input-field desc"
                            >
                            </textarea> 
                        </div>
                        <div className="form-group">
                            <label 
                            htmlFor="sportType"
                            className="label"
                            >
                                Sport Type
                            </label>

                            <select name="sportType" className="input-field" required>
                                <option key="none" value="">------</option>
                                {sportTypes.map(sport => (
                                    <option key={sport} value={sport}>{sport}</option>
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