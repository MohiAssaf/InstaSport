import styles from './CommentCreate.module.css'

const CommentCreate = ({formSubmit}) => {

    return (
        <form action={formSubmit} className={styles.commentForm}>
            <input 
            type="text"
            placeholder="Add comment.." 
            name="postComment"
            className={styles.postAddComment}
            />
            <button type="submit"><i className="fa-regular fa-circle-up"></i></button>
        </form>

    );
};

export default CommentCreate;