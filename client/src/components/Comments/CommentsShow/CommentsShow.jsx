import { useState } from 'react';
import styles from './CommentsShow.module.css'

const CommentsShow = ({postComments, postOwner}) => {
    const [commentEdit, setCommentEdit] = useState({});

    const handleEditCommentClick = (comment) => {
        setCommentEdit({commentId: comment._id, commentContent: comment.content})
    }

    const handleEditCommentSubmit = () => {
        console.log(`comment edited: ${commentEdit.commentId}`)
    }

    
    return (
            <div className={styles.container}>
                {postComments.map(comment => (
                    <div key={comment._id} className={styles.comment} style={comment?.pending ? {opacity: 0.4}: {}}>
                        <div className={styles.commentConetent}>
                            <img src={comment?.author.profileImg} alt={`user-${comment?.author._id}`} />
                            {commentEdit?.commentId === comment._id ? (
                                <input 
                                type="text" 
                                placeholder='Edit comment'
                                defaultValue={commentEdit.commentContent}
                                className={styles.editCommentInput}
                                
                                />
                            ): (<p>{comment?.author.username}: {comment.content}</p>)}

                        </div>

                        {(comment?.author || postOwner) &&
                        <div className={styles.commentActions}>
                            {commentEdit?.commentId === comment._id ? (
                                <>
                                    <button
                                    className={styles.commentUpdateBtns}
                                    onClick={handleEditCommentSubmit}
                                    >Update
                                    </button>
                                    <button
                                    className={styles.commentUpdateBtns}
                                    onClick={() => setCommentEdit({})}
                                    >Cancel
                                    </button>
                                </>
                            ): (
                                <>
                                    {comment?.author &&  (
                                        <i 
                                        className="text-blue-600 fa-solid fa-pen-to-square"
                                        onClick={() => handleEditCommentClick(comment)}
                                        ></i>
                                    )}
                                    <i 
                                    className="text-red-700 fa-solid fa-circle-xmark"
                                    ></i>
                                </>
                            )}
                        </div>
                        }
                    </div>
                ))}
            </div>
    );
};

export default CommentsShow;