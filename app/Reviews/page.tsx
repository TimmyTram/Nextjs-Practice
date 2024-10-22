'use client';
import useReviewData from '../hooks/useReviewData';

interface Review {
    id: string;
    title: string;
    content: string;
    rating: number;
    creationDate: string;
}

const Page = () => {
    const { reviews, loading, error } = useReviewData();

    if (loading) {
        return <div>Loading . . .</div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6 bg-black min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-6">Reviews</h1>

            <ul className="space-y-6">
                {reviews.map((review: Review) => (
                    <li
                        key={review.id}
                        className="p-5 bg-gray-800 shadow-md rounded-lg border border-gray-700"
                    >
                        <p className="text-lg font-semibold text-white mb-2">Title: {review.title}</p>
                        <p className="text-gray-300 mb-1">Body: {review.content}</p>
                        <p className="text-gray-300 mb-1">Rating: {review.rating}</p>
                        <p className="text-gray-400">Created: {new Date(review.creationDate).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default Page;