import {useFormStatus} from "react-dom"

export default function SubmitButton({postType}) {
    const { pending } = useFormStatus();
    return (
      <div className="mt-10 flex justify-center">
        <button
          type="submit"
          disabled={pending}
          className="px-10 py-2 text-xl text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {pending ? "Submitting..." : postType}
        </button>
      </div>
    );
  }