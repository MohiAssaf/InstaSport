import { Link } from "react-router";
import postDateConvertAgo from "../../../utils/postDate";
import styles from "./PostCard.module.css";
import { useAuth } from "../../../hooks/useAuthorization";
import { useComments } from "../../../api/commentApi";
import { useLikeCount } from "../../../api/likeApi";

const PostCard = ({ post }) => {
  const { isAuthenticated } = useAuth();
  const { comments } = useComments(post._id);
  const { postLikes } = useLikeCount(post._id);

  return (
    <div className={styles.postCard}>
      <img
        src={post.imageUrl}
        alt={`post-${post.title}`}
        className={styles.postImg}
      />
      <div className={styles.postContent}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <div className={styles.btnsContainer}>
          <div className={styles.actionsContainer}>
            <div className={styles.likeContainer}>
              <i className="fa-solid fa-heart"></i> {postLikes}
            </div>
            <div className={styles.commentContainer}>
              <i className="fa-regular fa-comment"></i> {comments.length}
            </div>
          </div>
          <div>
            <p className={styles.postDate}>
              {postDateConvertAgo(post._createdOn)}
            </p>
          </div>
        </div>
      </div>
      {isAuthenticated && (
        <Link to={`/posts/details/${post._id}`} className={styles.detailView}>
          View Details
        </Link>
      )}
    </div>
  );
};

export default PostCard;
