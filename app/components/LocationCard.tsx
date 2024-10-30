'use client';
import { DayOfWeek, LocationType } from "@prisma/client";

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

interface LocationCardProps {
    location: Location;
}

const LocationCard = ({ location }: LocationCardProps) => {
    return (
        <div className="bg-black text-white border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200 h-40 w-72 flex flex-col justify-between">
            <p className="text-lg font-bold">{location.name}</p>
            <p className="text-gray-300">{location.address}</p>
            <p className="text-gray-400">{location.phoneNumber}</p>
        </div>
    );
};

export default LocationCard;