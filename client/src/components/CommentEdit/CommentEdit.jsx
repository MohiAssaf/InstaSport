import styles from './CommentEdit.module.css'

const CommentEdit = ({commentData, onSubmitForm, onCancel}) => {

    return (
        <form action={onSubmitForm} className={styles.formCont}>
            <input 
                type="text" 
                name="updatedComment"
                placeholder="Edit comment"
                defaultValue={commentData.content}
                className={styles.editCommentInput}
            />
            <div className={styles.buttonContainer}>
                <button type="submit" className={styles.commentUpdateBtns}>Edit</button>
                <button type="button" className={styles.commentUpdateBtns} onClick={onCancel}>Cancel</button>
            </div>
        </form>

    );
};

export default CommentEdit;