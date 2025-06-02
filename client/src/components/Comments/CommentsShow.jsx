import CommentEdit from "./CommentEdit";
import { useCallback, useState } from "react";
import { useEditComment } from "../../api/commentApi";

const CommentsShow = ({
  postComments,
  postOwner,
  onEditComment,
  onDeleteComment,
  currentUser,
}) => {
  const { edit } = useEditComment();
  const [commentToEdit, setCommentToEdit] = useState(null);

  const editCommentAction = useCallback(
    async (formData) => {
      const updatedComment = formData.get("updatedComment");
      const { author, ...commentData } = commentToEdit;

      if (updatedComment === commentData.content || updatedComment === "") {
        setCommentToEdit(null);
        return;
      }

      const editedComment = { ...commentData, content: updatedComment };

      const newComment = await edit(editedComment._id, editedComment);
      onEditComment(commentToEdit._id, { ...newComment, author });
      setCommentToEdit(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [commentToEdit, onEditComment]
  );

  return (
    <div className="flex-grow overflow-y-auto mb-4 pr-4">
      {postComments.map((comment) => {
        const isCommentEditClicked = commentToEdit?._id === comment._id;
        const isCommentAuthorUser = comment?.author._id === currentUser._id;

        return (
          <div
            key={comment._id}
            className={`flex items-center justify-between gap-2 mb-4 text-sm ${
              comment?.pending ? "opacity-40" : ""
            }`}
          >
            <div
              className={`flex items-center w-full gap-2 ${
                isCommentEditClicked ? "justify-between" : ""
              }`}
            >
              <img
                src={comment?.author.profileImg}
                alt={`user-${comment?.author._id}`}
                className="w-[30px] h-[30px] rounded-full object-cover"
              />
              {isCommentEditClicked ? (
                <CommentEdit
                  commentData={commentToEdit}
                  onSubmitForm={editCommentAction}
                  onCancel={() => setCommentToEdit(null)}
                />
              ) : (
                <p className="text-[#555] m-0">
                  {comment?.author.username}: {comment.content}
                </p>
              )}
            </div>

            {(isCommentAuthorUser || postOwner) && !isCommentEditClicked && (
              <div className="flex items-center gap-1.5">
                {isCommentAuthorUser && (
                  <i
                    className="text-blue-600 fa-solid fa-pen-to-square cursor-pointer text-base transition-all duration-200 ease-in-out hover:opacity-80"
                    onClick={() => setCommentToEdit(comment)}
                  ></i>
                )}
                <i
                  className="text-red-700 fa-solid fa-circle-xmark cursor-pointer text-base transition-all duration-200 ease-in-out hover:opacity-80"
                  onClick={() => onDeleteComment(comment)}
                ></i>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentsShow;
