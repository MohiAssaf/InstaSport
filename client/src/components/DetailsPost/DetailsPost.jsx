import { useParams } from "react-router";
import styles from "./DetailsPost.module.css";
import { useState } from "react";
import { usePost } from "../../api/catalogApi";
import { useAuth } from "../../hooks/useAuthorization";
import CommentsShow from "../Comments/CommentsShow/CommentsShow";
import CommentCreate from "../Comments/CommentCreate/CommentCreate";
import { useComments, useCreateComment } from "../../api/commentApi";
import { useUser } from "../../api/userApi";

const DetailsPost = () => {
    const { id } = useParams();
    const {post} = usePost(id);
    const {user} = useUser();
    const {create} = useCreateComment();
    const {comments, addComment} = useComments(id);
    const [like, setLike] = useState(false);
    const [error, setError] = useState("");
    const isOwner = user._id === post._ownerId


    const formAction = async (formData) => {
        const comment = formData.get("postComment");

        if(comment === ''){
            setError("You can't add an empty comment");
            return
        }

        const newC = await create(comment, id);
        addComment({...newC, author: user})
    }

    const likeHandler = () => {
        setLike(state => !state)
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.detailsContainer}>
                <div className={styles.imgContainer}>
                    <img className={styles.postImg} src={post.imageUrl} alt={`Post-${post._id}`} />
                </div>
                <div className={styles.postDetails}>
                    {isOwner &&(
                        <div className={styles.postEditDel}>
                            <button className={styles.editBtn}>Edit</button>
                            <button className={styles.delBtn}>Delete</button>
                        </div>
                        )
                    }
                    <div className={styles.postTitle}>
                        <h1><span>Description:</span> {post.description}</h1>
                    </div>
                    <CommentsShow postComments={comments}/>
                    <div className={styles.postActions}>
                        <div className={styles.postLikeCom}>
                            <i 
                            className={like ? "fa-solid fa-heart text-red-500 transition-colors cursor-pointer" : "fa-regular fa-heart transition-colors cursor-pointer"}
                            onClick={likeHandler}>
                                <span>100</span>
                            </i> 
                            <i className="fa-regular fa-comment"><span>{comments.length}</span></i>
                        </div>
                        <div>
                            <CommentCreate error={error} formSubmit={formAction} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DetailsPost;
