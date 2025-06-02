const CommentCreate = ({ formSubmit }) => {
  return (
    <form action={formSubmit} className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Add comment.."
        name="postComment"
        className="text-base border-2 border-[#333] rounded-2xl px-2 py-1 transition-colors duration-300 ease-in-out focus:border-[#3b82f6] outline-0"
      />
      <button type="submit">
        <i className="fa-regular fa-circle-up cursor-pointer transition-all text-[#333] text-3xl hover:text-[#3b82f6] ease-in-out"></i>
      </button>
    </form>
  );
};

export default CommentCreate;
