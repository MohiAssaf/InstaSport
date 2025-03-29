import React from 'react';
import { useGetInboxMess } from '../api/inboxApi';

const AdminInbox = () => {
    const {messages} = useGetInboxMess()

    return (
        <div className="min-h-screen bg-gray-50 p-40">
            <div className="mx-auto max-w-7xl w-full bg-white p-6 shadow-md rounded">
                <h1 className="text-3xl font-bold mb-6">Admin Inbox</h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">Full Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">Username</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">Message</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {messages.map((message) => (
                            <tr key={message.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-800 border-b">{message.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-800 border-b">{message.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-800 border-b">{message.username}</td>
                                <td className="px-6 py-4 text-sm text-gray-800 border-b break-words">{message.message}</td>
                                <td className="px-6 py-4 text-sm text-gray-800 flex justify-center items-center space-x-4 h-full">
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
                                        Contact
                                    </button>
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
                                        Solved
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminInbox;
