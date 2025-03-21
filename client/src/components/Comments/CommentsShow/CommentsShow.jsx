import styles from './CommentsShow.module.css'

const CommentsShow = ({postComments}) => {

    return (
            <div className={styles.container}>
                {postComments.map(comment => (
                    <div key={comment._id} className={styles.comment}>
                        <img src={comment?.author.profileImg} alt={`user-${comment?.author._id}`} />
                        <p>{comment?.author.username}: {comment.content}</p>
                    </div>
                ))}
            </div>
    );
};

export default CommentsShow;