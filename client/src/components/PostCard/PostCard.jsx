import postDateConvertAgo from '../../utils/postDate';
import styles from './PostCard.module.css';

const PostCard = ({post}) => {
  return (
    <div className={styles.postCard}>
        <img src={post.imageUrl} alt={`post-${post.title}`} className={styles.postImg} />
        <div className={styles.postContent}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <div className={styles.btnsContainer}>
            <div className={styles.actionsContainer}>
              <div className={styles.likeContainer}>
                  <i className="fa-solid fa-heart"></i> {post.likesCount}
              </div>
              <div className={styles.commentContainer}>
                  <i className="fa-regular fa-comment"></i> {post.commentsCount}
              </div>
            </div>
            <div>
              <p className={styles.postDate}>{postDateConvertAgo(post.createdAt)}</p>
            </div>
        </div>
        </div>
    </div>

  );
};

export default PostCard;