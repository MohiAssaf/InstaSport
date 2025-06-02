import { Link } from "react-router";
import postDateConvertAgo from "../../utils/postDate";
import { useAuth } from "../../hooks/useAuthorization";
import { useComments } from "../../api/commentApi";
import { useLikeCount } from "../../api/likeApi";

const PostCard = ({ post }) => {
  const { isAuthenticated } = useAuth();
  const { comments } = useComments(post._id);
  const { postLikes } = useLikeCount(post._id);

  return (
    <div className="relative group bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ml-[17%] flex-grow max-h-[550px]">
      <img
        src={post.imageUrl}
        alt={`post-${post.title}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {post.title}
        </h3>
        <div className="flex justify-between mt-4">
          <div className="flex gap-3 text-gray-600 text-base">
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-heart"></i> {postLikes}
            </div>
            <div className="flex items-center gap-1">
              <i className="fa-regular fa-comment"></i> {comments.length}
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {postDateConvertAgo(post._createdOn)}
          </p>
        </div>
      </div>
      {isAuthenticated && (
        <Link
          to={`/posts/details/${post._id}`}
          className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl text-black px-5 py-2 rounded-lg text-base font-bold opacity-0 hover:scale-110 group-hover:opacity-100 transition duration-300"
        >
          View Details
        </Link>
      )}
    </div>
  );
};

export default PostCard;
