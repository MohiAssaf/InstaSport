const InboxItems = ({
    name,
    email,
    username,
    message,
    onSolved
}) => {

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800 border-b">{name}</td>
            <td className="px-6 py-4 text-sm text-gray-800 border-b">{email}</td>
            <td className="px-6 py-4 text-sm text-gray-800 border-b">{username}</td>
            <td className="px-6 py-4 text-sm text-gray-800 border-b break-words">{message}</td>
            <td className="px-6 py-4 text-sm text-gray-800 flex justify-center items-center space-x-4 h-full">
                <a 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                    href={`mailto:${email}?subject=${encodeURIComponent(`Issue Report from ${username}`)}&body=${encodeURIComponent(`Hello ${name},\n\nWe've received your issue:\n\n${message}\n\n [solution here] \n\n\nHave a nice day!!,\nInstaSport Team`)}`}>
                    Contact
                </a>


                <button 
                onClick={onSolved}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
                        Solved
                </button>
            </td>
        </tr>

    );
};

export default InboxItems;