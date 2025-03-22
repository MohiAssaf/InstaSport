import { Link, useNavigate, useParams } from "react-router";
import styles from "./DetailsPost.module.css";
import { useOptimistic, useState } from "react";
import { useDeletePost, usePost } from "../../../api/catalogApi";
import CommentsShow from "../../Comments/CommentsShow/CommentsShow";
import CommentCreate from "../../Comments/CommentCreate/CommentCreate";
import { useComments, useCreateComment } from "../../../api/commentApi";
import { useUser } from "../../../api/userApi";
import {v4 as demoId} from 'uuid'
import DeletePostForm from "../DeletePost/DeletePost";

const DetailsPost = () => {
    const { id } = useParams();
    const nav = useNavigate()
    
    const {post} = usePost(id);
    const {user} = useUser();

    const {create} = useCreateComment();
    const {comments, addComment} = useComments(id);
    const [optimisticComments, addOptimisticComment] = useOptimistic(comments, (state, newComment) => [...state, newComment]);

    const [like, setLike] = useState(false);

    const {delPost} = useDeletePost(); 
    const [delFormActive, setDelFormActive] = useState(false);

    const isOwner = user._id === post._ownerId


    const formAction = async (formData) => {
        const comment = formData.get("postComment");

        if(comment === ''){
            return
        }

        const newOptComment = {
            _ownerId: user._id,
            content: comment,
            postId: id,
            _createdOn: Date.now(),
            _id: demoId(),
            pending: true,
            author: {
                ...user
            }
        }

        addOptimisticComment(newOptComment)

        const newC = await create(comment, id);

        addComment({...newC, author: user})
    }

    const handleDeletePost = async () => {
        await delPost(post._id)
        setDelFormActive(false);
        nav('/catalog')
    }

    const likeHandler = () => {
        setLike(state => !state)
    }

    
    return (
        <>
            <div className={styles.container}>
                <div className={styles.detailsContainer}>
                    <div className={styles.imgContainer}>
                        <img className={styles.postImg} src={post.imageUrl} alt={`Post-${post._id}`} />
                    </div>
                    <div className={styles.postDetails}>
                        <div className={styles.postHeader}>
                            <div className={styles.postTitle}>
                                <h2><span>Title: </span>{post.title}</h2>
                                <h2><span>Category: </span>{post.sportType}</h2>
                            </div>
                            {isOwner &&(
                                <div className={styles.postEditDel}>
                                    <Link to={`/catalog/edit/${id}`} className={styles.editBtn}>Edit</Link>
                                    <button onClick={() => setDelFormActive(true)} className={styles.delBtn}>Delete</button>
                                </div>
                                )
                            }
                        </div>
                        <div className={styles.postTitle}>
                            <h1><span>Description:</span> {post.description}</h1>
                        </div>
                        <CommentsShow postComments={optimisticComments}/>
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
                                <CommentCreate formSubmit={formAction} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {delFormActive && <DeletePostForm closeForm={() => setDelFormActive(false)} onDelete={handleDeletePost}/>}
        </>
    );
};

export default DetailsPost;
