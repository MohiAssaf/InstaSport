import { Link, useNavigate, useParams } from "react-router";
import { useOptimistic, useState } from "react";
import { useDeletePost, usePost } from "../../api/postsApi";
import CommentsShow from "../Comments/CommentsShow";
import CommentCreate from "../Comments/CommentCreate";
import {
  useComments,
  useCreateComment,
  useDeleteComment,
} from "../../api/commentApi";
import { v4 as demoId } from "uuid";
import { useUser } from "../../api/authApi";
import DeleteForm from "../DeleteForm/DeleteForm";
import { useLikeCount, useLikeStatus } from "../../api/likeApi";

const DetailsPost = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const { post } = usePost(id);
  const { user } = useUser();

  const { create } = useCreateComment();
  const { comments, addComment, editCommnet, deleteComment } = useComments(id);
  const [optimisticComments, setOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );

  const { postLikes, addLike, removeLike } = useLikeCount(id);
  const { like, toggleLikeStatus } = useLikeStatus(id, user._id);

  const { delPost } = useDeletePost();
  const [delPostActive, setDelPostActive] = useState(false);

  const { delComment } = useDeleteComment();
  const [commentToDelete, setCommentToDelete] = useState(null);

  const isOwner = user._id === post._ownerId;

  const addCommentAction = async (formData) => {
    const comment = formData.get("postComment");
    if (comment === "") return;

    const newOptComment = {
      _ownerId: user._id,
      content: comment,
      postId: id,
      _createdOn: Date.now(),
      _id: demoId(),
      pending: true,
      author: { ...user },
    };

    setOptimisticComment(newOptComment);
    const newC = await create(comment, id);
    addComment({ ...newC, author: user });
  };

  const handleDeleteComment = async () => {
    await delComment(commentToDelete);
    deleteComment(commentToDelete);
    setCommentToDelete(null);
  };

  const handleDeletePost = async () => {
    await delPost(post._id);
    setDelPostActive(false);
    nav("/posts");
  };

  const likeHandler = async () => {
    toggleLikeStatus();
    like ? removeLike() : addLike();
  };

  return (
    <>
      <div className="relative min-h-screen flex justify-center items-center bg-gray-200 py-12 ml-[17%] flex-grow">
        <div className="w-full max-w-5xl h-[60vh] bg-white shadow-xl rounded-2xl flex flex-row gap-4 overflow-hidden transition-shadow duration-300">
          <div className="w-1/2 h-full flex justify-center items-center bg-gray-800 overflow-hidden">
            <img
              className="w-full h-full object-contain transition-transform duration-300"
              src={post.imageUrl}
              alt={`Post-${post._id}`}
            />
          </div>

          <div className="w-1/2 flex flex-col justify-between p-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-700">
                  <span className="text-gray-900">Title:</span> {post.title}
                </h2>
                <h2 className="text-lg font-bold text-gray-700 mt-1">
                  <span className="text-gray-900">Category:</span>{" "}
                  {post.sportType}
                </h2>
              </div>

              {isOwner && (
                <div className="flex gap-2 pb-6">
                  <Link
                    to={`/posts/edit/${id}`}
                    className="px-4 py-1 rounded-full bg-blue-500 text-white text-base font-medium border-4 border-blue-500 hover:bg-white hover:text-blue-500 transition-all"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDelPostActive(true)}
                    className="cursor-pointer px-4 py-1 rounded-full bg-red-500 text-white text-base font-medium border-4 border-red-500 hover:bg-white hover:text-red-500 transition-all"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="text-sm text-gray-600 mb-4">
              <h1>
                <span className="text-base font-semibold text-gray-800">
                  Description:
                </span>{" "}
                {post.description}
              </h1>
            </div>

            <CommentsShow
              postComments={optimisticComments}
              postOwner={isOwner}
              onEditComment={editCommnet}
              onDeleteComment={(comment) => setCommentToDelete(comment._id)}
              currentUser={user}
            />

            <div className="flex justify-between items-center mx-4 mt-4 text-xl">
              <div className="flex items-center gap-6 text-gray-700">
                <i
                  onClick={likeHandler}
                  className={`cursor-pointer transition-colors ${
                    like
                      ? "fa-solid fa-heart text-red-500"
                      : "fa-regular fa-heart"
                  }`}
                >
                  <span className="ml-1">{postLikes}</span>
                </i>
                <i className="fa-regular fa-comment">
                  <span className="ml-1">{comments.length}</span>
                </i>
              </div>
              <CommentCreate formSubmit={addCommentAction} />
            </div>
          </div>
        </div>
      </div>

      {delPostActive && (
        <DeleteForm
          text="post"
          closeForm={() => setDelPostActive(false)}
          onDelete={handleDeletePost}
        />
      )}

      {commentToDelete !== null && (
        <DeleteForm
          text="comment"
          closeForm={() => setCommentToDelete(null)}
          onDelete={handleDeleteComment}
        />
      )}
    </>
  );
};

export default DetailsPost;
