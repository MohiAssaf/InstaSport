import styles from './PostCard.module.css';

const PostCard = ({post}) => {
  return (
    <div className={styles.postCard}>
        <img src={post.image_url} alt={`post-${post.title}`} className={styles.postImg} />
        <div className={styles.postContent}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <div className={styles.btnsContainer}>
            <div className={styles.actionsContainer}>
              <div className={styles.likeContainer}>
                  <i className="fa-solid fa-heart"></i> {post.likes_count}
              </div>
              <div className={styles.commentContainer}>
                  <i className="fa-regular fa-comment"></i> {post.comments_count}
              </div>
            </div>
            <div>
              <p className={styles.postDate}>{post.created_at.substring(0, 16).replace("T", " ")}</p>
            </div>
        </div>
        </div>
    </div>

  );
};

export default PostCard;