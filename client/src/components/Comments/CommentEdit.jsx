const CommentEdit = ({ commentData, onSubmitForm, onCancel }) => {
  return (
    <form
      action={onSubmitForm}
      className="flex items-center justify-between w-full gap-1"
    >
      <input
        type="text"
        name="updatedComment"
        placeholder="Edit comment"
        defaultValue={commentData.content}
        className="w-full border-2 border-black pl-3 flex-grow "
      />
      <div className="flex space-x-2">
        <button
          type="submit"
          className="font-semibold cursor-pointer transition-all duration-200 ease-in-out px-2 py-1 bg-[#ddd] rounded hover:opacity-80"
        >
          Edit
        </button>
        <button
          type="button"
          className="font-semibold cursor-pointer transition-all duration-200 ease-in-out px-2 py-1 bg-[#ddd] rounded hover:opacity-80"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CommentEdit;
