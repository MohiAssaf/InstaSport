const DeleteForm = ({ text, closeForm, onDelete }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md">
      <div className="relative text-center py-10 px-8 rounded-md bg-white shadow-lg">
        <i
          className="fa-solid fa-circle-xmark absolute top-5 right-5 text-2xl text-red-500 cursor-pointer hover:opacity-90"
          onClick={closeForm}
        ></i>
        <h1 className="p-8 text-xl leading-8">
          Are you sure you want to delete this {text}
        </h1>
        <div className="flex justify-center items-center gap-4">
          <button
            className="text-white px-10 py-3 rounded-md text-xl cursor-pointer bg-red-500 hover:opacity-90 transition-all ease-in-out"
            onClick={onDelete}
          >
            Yes
          </button>
          <button
            className="text-white px-10 py-3 rounded-md text-xl cursor-pointer bg-blue-500 hover:opacity-90 transition-all ease-in-out"
            onClick={closeForm}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;
