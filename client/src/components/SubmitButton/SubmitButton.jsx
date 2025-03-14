import {useFormStatus} from "react-dom"

const SubmitButton = ({btnText}) => {
    const {pending} = useFormStatus();
    
  return (
    <button
        type="submit"
        disabled={pending}
        className="px-10 py-2 text-xl text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
        {pending? "Submiting..." : btnText}
    </button>

  );
};

export default SubmitButton;