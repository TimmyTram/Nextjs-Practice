'use client'

import useLocationData from "../hooks/useLocationData";
import { DayOfWeek, LocationType } from "@prisma/client";
import { convertTo12HourFormat } from "../utils/utils";
import Link from "next/link";
import Image from "next/image";

interface Location {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    hasWifi: boolean;
    seatingCapacity: number;
    category: LocationType;
    rating: number;
    busynessStatus: number;
    imageWebLink: string;
    locationWebsiteLink: string;
    animalFriendliness: boolean;
    operatingHours: OperatingHour[];
}

interface OperatingHour {
    day: DayOfWeek;
    openTime: string;
    closeTime: string;
}

const Page = () => {
    const { locations, loading, error } = useLocationData();

    if (loading) {
        return <div>Loading . . .</div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="text-white p-6 bg-gray-900">
            <h1 className="text-3xl font-bold mb-6">Available Locations</h1>
            <ul className="space-y-8">
                {locations.map((location: Location) => (
                    <li key={location.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">

                        <Link href={`/Locations/${location.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View Details</Link>


                        <h2 className="text-2xl font-semibold mb-2">{location.name}</h2>
                        <p className="text-gray-300 mb-1"><span className="font-medium">Address:</span> {location.address}</p>
                        <p className="text-gray-300 mb-1"><span className="font-medium">Phone:</span> {location.phoneNumber}</p>
                        <p className={`mb-1 ${location.hasWifi ? 'text-green-400' : 'text-red-400'}`}>
                            {location.hasWifi ? 'Has Wifi' : 'No Wifi'}
                        </p>
                        <p className="text-gray-300 mb-1"><span className="font-medium">Seating Capacity:</span> {location.seatingCapacity}</p>
                        <p className="text-gray-300 mb-1"><span className="font-medium">Category:</span> {location.category}</p>
                        <p className="text-gray-300 mb-1"><span className="font-medium">Rating:</span> {location.rating}</p>
                        <p className="text-gray-300 mb-1"><span className="font-medium">Busyness Status:</span> {location.busynessStatus}</p>
                        <p className="text-blue-400 mb-1">
                            {location.imageWebLink && location.imageWebLink !== "N/A" ? (
                                <Image src={location.imageWebLink} alt={location.name} width={256} height={256} />
                            ) : (
                                <div>
                                    <p>No Image Available</p>
                                </div>
                            )}
                        </p>
                        <p className="text-blue-400 mb-4">
                            <a href={location.locationWebsiteLink} target="_blank" rel="noopener noreferrer">Website Link</a>
                        </p>
                        <p className={`mb-4 ${location.animalFriendliness ? 'text-green-400' : 'text-red-400'}`}>
                            {location.animalFriendliness ? 'Animal Friendly' : 'Not Animal Friendly'}
                        </p>
                        <h3 className="text-xl font-medium mb-2">Operating Hours</h3>
                        <ul className="pl-4 space-y-2">
                            {location.operatingHours.map((operatingHour: OperatingHour) => (
                                <li key={operatingHour.day} className="text-gray-300">
                                    <p><span className="font-medium">Day:</span> {operatingHour.day}</p>
                                    <p><span className="font-medium">Open:</span> {convertTo12HourFormat(operatingHour.openTime)}</p>
                                    <p><span className="font-medium">Close:</span> {convertTo12HourFormat(operatingHour.closeTime)}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;