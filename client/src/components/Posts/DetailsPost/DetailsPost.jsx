import { Link, useNavigate, useParams } from "react-router";
import styles from "./DetailsPost.module.css";
import { useOptimistic, useState } from "react";
import { useDeletePost, usePost } from "../../../api/catalogApi";
import CommentsShow from "../../Comments/CommentsShow/CommentsShow";
import CommentCreate from "../../Comments/CommentCreate/CommentCreate";
import { useComments, useCreateComment, useDeleteComment } from "../../../api/commentApi";
import {v4 as demoId} from 'uuid'
import { useUser } from "../../../api/authApi";
import DeleteForm from "../../DeleteForm/DeleteForm";
import { useLikeCount, useLikeStatus } from "../../../api/likeApi";

const DetailsPost = () => {
    const { id } = useParams();
    const nav = useNavigate()
    
    const {post} = usePost(id);
    const {user} = useUser();

    const {create} = useCreateComment();
    const {comments, addComment, editCommnet, deleteComment} = useComments(id);
    const [optimisticComments, setOptimisticComment] = useOptimistic(comments, (state, newComment) => [...state, newComment]);

    const {postLikes, addLike, removeLike} = useLikeCount(id);
    const {like, toggleLikeStatus} = useLikeStatus(id, user._id)

    const {delPost} = useDeletePost(); 
    const [delPostActive, setDelPostActive] = useState(false);

    const {delComment} = useDeleteComment()
    const [commentToDelete, setCommentToDelete] = useState(null);


    const isOwner = user._id === post._ownerId;

    const addCommentAction = async (formData) => {
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

        setOptimisticComment(newOptComment)

        const newC = await create(comment, id);

        addComment({...newC, author: user})
    }

    const handleDeleteComment = async () => {
        await delComment(commentToDelete);
        deleteComment(commentToDelete);
        setCommentToDelete(null);
        
    };
    

    const handleDeletePost = async () => {
        await delPost(post._id)
        setDelPostActive(false);
        nav('/catalog')
    }

    const likeHandler = async () => {
        toggleLikeStatus();
        if(like){
            removeLike()
        }else{
            addLike()
        } 
        
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
                                    <button onClick={() => setDelPostActive(true)} className={styles.delBtn}>Delete</button>
                                </div>
                                )
                            }
                        </div>
                        <div className={styles.postTitle}>
                            <h1><span>Description:</span> {post.description}</h1>
                        </div>
 
                        <CommentsShow 
                            postComments={optimisticComments} 
                            postOwner={isOwner} 
                            onEditComment={editCommnet}
                            onDeleteComment={(comment) => setCommentToDelete(comment._id)}
                            currentUser={user}
                        />

                        <div className={styles.postActions}>
                            <div className={styles.postLikeCom}>
                                <i 
                                className={like ? "fa-solid fa-heart text-red-500 transition-colors cursor-pointer" : "fa-regular fa-heart transition-colors cursor-pointer"}
                                onClick={likeHandler}>
                                    <span>{postLikes}</span>
                                </i> 
                                <i className="fa-regular fa-comment"><span>{comments.length}</span></i>
                            </div>
                            <div>
                                <CommentCreate formSubmit={addCommentAction} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {delPostActive && <DeleteForm text="post" closeForm={() => setDelPostActive(false)} onDelete={handleDeletePost}/>}
            {commentToDelete !== null && <DeleteForm text="comment" closeForm={() => setCommentToDelete(null)} onDelete={handleDeleteComment}/>}
        </>
    );
};

export default DetailsPost;
