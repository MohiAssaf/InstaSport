import React from 'react';
import { useGetInboxMess, useSolvedInboxMess } from '../api/inboxApi';
import InboxItems from '../components/Inbox/InboxItem';

const AdminInbox = () => {
    const {messages, updateOnSolved} = useGetInboxMess();
    const {solvedMessage} = useSolvedInboxMess();

    const onSolved = async (messageId) => {
        await solvedMessage(messageId)
        updateOnSolved(messageId)
    }

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
                            <InboxItems key={message._id} 
                            {...message} 
                            onSolved={() => onSolved(message._id)}/>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminInbox;
