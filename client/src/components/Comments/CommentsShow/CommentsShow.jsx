import styles from './CommentsShow.module.css'
import CommentEdit from '../CommentEdit/CommentEdit';
import { useCallback, useState } from 'react';
import { useEditComment } from '../../../api/commentApi';

const CommentsShow = ({ postComments, postOwner, onEditComment, currentUser}) => {
    const {edit} = useEditComment();
    const [commentToEdit, setCommentToEdit] = useState(null);
    
    const editCommentAction = useCallback(async (formData) => {
        const updatedComment = formData.get("updatedComment");
        const {author, ...commentData} = commentToEdit;

        if(updatedComment === commentData.content || updatedComment === ''){
            setCommentToEdit(null);
            return
        }
        

        const editedComment = {...commentData, content: updatedComment};

        const newComment = await edit(editedComment._id, editedComment);
        onEditComment(commentToEdit._id, {...newComment, author});
        setCommentToEdit(null);

    }, [commentToEdit, onEditComment])
    
    return (
            <div className={styles.container}>
                {postComments.map(comment => {
                    const isCommentEditClicked= commentToEdit?._id === comment._id;
                    const isCommentAuthorUser = comment?.author._id ===currentUser._id                    
                    return (
                        <div key={comment._id} className={styles.comment} style={comment?.pending ? {opacity: 0.4}: {}}>

                            <div className={`${styles.commentConetent} ${isCommentEditClicked  ? styles.editActive: ''}`}>
                                <img src={comment?.author.profileImg} alt={`user-${comment?.author._id}`} />
                                {isCommentEditClicked? (
                                    <CommentEdit 
                                    commentData={commentToEdit}
                                    onSubmitForm={editCommentAction}
                                    onCancel={() => setCommentToEdit(null)}
                                    />
                                ): (<p>{comment?.author.username}: {comment.content}</p>)}

                            </div>

                            {((isCommentAuthorUser|| postOwner) && !isCommentEditClicked) &&
                            <div className={styles.commentActions}>
                                <>
                                    {isCommentAuthorUser && (
                                        <i 
                                        className="text-blue-600 fa-solid fa-pen-to-square"
                                        onClick={() => setCommentToEdit(comment)}
                                        ></i>

                                    )}

                                    <i 
                                    className="text-red-700 fa-solid fa-circle-xmark"
                                    ></i>

                                </>
                            
                            </div>
                            }
                        </div>
                    )
                })}
            </div>
    );
};

export default CommentsShow;