'use client'
import { useState } from 'react';
import { useSession } from "next-auth/react";
import useUpdateUserData from '../hooks/useUpdateUserData';

const Page = () => {
    const { data: session, status } = useSession();
    const { loading, updateUserData } = useUpdateUserData();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        settings: {
            notifications: false,
            darkMode: false
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.email && !formData.password && !formData.settings) return;
        await updateUserData(formData, session);
    };

    return (
        <>
            {status === "authenticated" ? (
                <div className="p-6 max-w-md mx-auto bg-black text-white rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1 text-sm font-medium">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-1 text-sm font-medium">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center">
                            <label htmlFor="notifications" className="text-sm font-medium mr-2">Notifications:</label>
                            <input
                                type="checkbox"
                                id="notifications"
                                checked={formData.settings.notifications}
                                onChange={(e) => setFormData({ ...formData, settings: { notifications: e.target.checked, darkMode: formData.settings.darkMode } })}
                                className="rounded bg-gray-800 border-gray-600 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center">
                            <label htmlFor="darkMode" className="text-sm font-medium mr-2">Dark Mode:</label>
                            <input
                                type="checkbox"
                                id="darkMode"
                                checked={formData.settings.darkMode}
                                onChange={(e) => setFormData({ ...formData, settings: { notifications: formData.settings.notifications, darkMode: e.target.checked } })}
                                className="rounded bg-gray-800 border-gray-600 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none transition duration-200"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="p-6 bg-red-300 shadow-lg rounded-md">
                    <p className="text-red-700">You are not logged in.</p>
                </div>
            )}

        </>
    );
}

export default Page;