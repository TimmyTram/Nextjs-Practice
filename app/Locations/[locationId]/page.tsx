import { convertTo12HourFormat } from "../../utils/utils";


const Page = async ({ params }: { params: { locationId: string } }) => {

    // get the locationId from the URL
    const { locationId } = params;


    const locationResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations/${locationId}`);
    const reviewsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/locationReviews/${locationId}`);

    const location = await locationResponse.json();
    const reviews = await reviewsResponse.json();



    return (
        <div className="p-6 bg-black rounded-lg shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-white">{location.name}</h1>
            <p className="text-gray-300">{location.address}</p>
            <p className="text-gray-300">{location.phoneNumber}</p>
            <p className="text-gray-300">
                {location.hasWifi ? 'Has Wifi' : 'No Wifi'}
            </p>
            <p className="text-gray-300">Seating Capacity: {location.seatingCapacity}</p>
            <p className="text-gray-300">Category: {location.category}</p>
            <p className="text-gray-300">Rating: {location.rating}</p>
            <p className="text-gray-300">Busyness Status: {location.busynessStatus}</p>
            <p className="text-blue-400 hover:underline">
                <a href={location.imageWebLink} target="_blank" rel="noopener noreferrer">
                    View Image
                </a>
            </p>
            <p className="text-blue-400 hover:underline">
                <a href={location.locationWebsiteLink} target="_blank" rel="noopener noreferrer">
                    Visit Website
                </a>
            </p>
            <p className="text-gray-300">
                {location.animalFriendliness ? 'Animal Friendly' : 'Not Animal Friendly'}
            </p>

            <div className="border-t border-gray-600 pt-4">
                <h2 className="text-lg font-semibold text-white">Operating Hours</h2>
                <ul className="space-y-2">
                    {location.operatingHours.map((operatingHour: any) => (
                        <li key={operatingHour.day} className="flex justify-between items-center">
                            <p className="font-medium text-white">{operatingHour.day}</p>
                            <div className="space-x-2">
                                <span className="text-gray-400">{convertTo12HourFormat(operatingHour.openTime)}</span>
                                <span className="text-gray-400">-</span>
                                <span className="text-gray-400">{convertTo12HourFormat(operatingHour.closeTime)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="border-t border-gray-600 pt-4">
                <h2 className="text-lg font-semibold text-white">Reviews</h2>
                <ul className="space-y-4">
                    {reviews.length > 0 ? (
                        reviews.map((review: any) => (
                            <li key={review.id} className="bg-gray-800 p-4 rounded-md">
                                <p className="text-gray-300">{review.content}</p>
                                <p className="text-gray-400">User: {review.user.username}</p>
                                <p className="text-gray-400">Rating: {review.rating}</p>
                                <p className="text-gray-400">Date: {new Date(review.creationDate).toDateString()}</p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-400">No reviews available for this location.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Page;