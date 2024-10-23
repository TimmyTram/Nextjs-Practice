'use client';

import { useState } from 'react';

interface CommentPostProps {
    session: any; // Replace 'any' with the appropriate type if known
    locationId: any; // Replace 'any' with the appropriate type if known
}

export default function CommentPost({ session, locationId }: CommentPostProps) {

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // they are not logined in
        if (!session) return;
        console.log(`[INFO]: Comment: ${comment} | Rating: ${rating} | Location ID: ${locationId}`);
        // make a post request to the server
        try {
            const res = await fetch(`/api/reviews/createReview/${locationId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    rating: rating,
                }),
            });

            if (res.ok) {
                console.log(`[INFO]: Comment submitted successfully.`);
                alert("Comment submitted successfully.");
                setComment(''); // Clear comment input
                setRating(1); // Reset rating to 1
            } else {
                console.error(`[ERROR]: There was an error submitting the comment.`);
                alert("There was an error submitting the comment.");
            }

        } catch (error: any) {
            console.error(`[ERROR]: There was in error in commentPost.tsx: ${error}`);
            return;
        }
    };


    return (
        <div>
            <p>Create a Comment</p>
            <form className="flex items-start space-x-2" onSubmit={handleSubmit}>
                <textarea
                    className="bg-gray-700 text-white placeholder-gray-400 p-2 rounded-md w-full h-40"
                    placeholder="Type your review here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} // Update state on input change
                />
                <input
                    type="number"
                    className="bg-gray-700 text-white placeholder-gray-400 p-2 rounded-md w-24"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))} // Update rating state on input change
                    min="1" // Optional: set minimum value
                    max="5" // Optional: set maximum value
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}