import { useNavigate, useParams } from "react-router";
import { useEditPost, usePost } from "../../../api/catalogApi";
import SubmitButton from "../../SubmitButton/SubmitButton";
import { sportTypes } from "../../../constants/sportTypes";
import '../../../assets/css/form.css'
import { useEffect, useRef } from "react";

const EditPost = () => {
    const {id} = useParams();
    const {post} = usePost(id);
    const {edit} = useEditPost();
    const nav = useNavigate();
    const sportTypeRef = useRef();

    useEffect(() => {
        if(post.sportType){
            sportTypeRef.current.value = post.sportType
        }
    }, [post])

    const formAction = async (formData) => {
        const data = Object.fromEntries(formData);

        await edit(id, data);

        nav(`/catalog/details/${id}`)

    }

  
    return (        
        <div className="page">
            <div className="form-container">
                    <h1 className="form-title">Edit Post</h1>

                    <form action={formAction} className="form" >
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
                            defaultValue={post.title}
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
                            defaultValue={post.imageUrl}
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
                            defaultValue={post.description}
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

                            <select name="sportType" className="input-field" ref={sportTypeRef} required>
                            <option key="none" value="">------</option>
                                {sportTypes.map(sport => (
                                    <option key={sport} value={sport}>{sport}</option>
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