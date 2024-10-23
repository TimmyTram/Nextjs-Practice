'use client'
import { useState } from 'react';
import { DayOfWeek } from '@prisma/client';
import { useSession } from "next-auth/react";


const Page = () => {
    const { data: session, status } = useSession();

    if(status !== "authenticated" || session?.user.role !== "ADMIN") {
        return (
            <div className="text-center text-red-500">
                <h1>Unauthorized</h1>
                <p>You are not authorized to view this page.</p>
            </div>
        );
    }
    
  
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        hasWifi: false,
        seatingCapacity: 0,
        category: '',
        animalFriendliness: false,
        locationWebsiteLink: '',
        operatingHours: [
            { day: DayOfWeek.MONDAY, openTime: '', closeTime: '' },
            { day: DayOfWeek.TUESDAY, openTime: '', closeTime: '' },
            { day: DayOfWeek.WEDNESDAY, openTime: '', closeTime: '' },
            { day: DayOfWeek.THURSDAY, openTime: '', closeTime: '' },
            { day: DayOfWeek.FRIDAY, openTime: '', closeTime: '' },
            { day: DayOfWeek.SATURDAY, openTime: '', closeTime: '' },
            { day: DayOfWeek.SUNDAY, openTime: '', closeTime: '' }
        ]
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        formData.seatingCapacity = Number(formData.seatingCapacity);
        console.log(formData);

        try {
            const res = await fetch('/api/locations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                console.log('Location created successfully!');
                alert('Location created successfully!');
            } else {
                console.log('Error creating location.');
                alert('Error creating location.');
            }
        } catch (error: any) {
            console.log(`[ERROR]: Error in POST of app/Locations/page.tsx: ${error}`);
            return;
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-green-300 shadow-lg rounded-md">
            <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
                <input
                    type="text"
                    id="address"
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="hasWifi" className="block text-sm font-medium text-gray-700">Has Wifi:</label>
                <input
                    type="checkbox"
                    id="hasWifi"
                    className="form-checkbox text-blue-600"
                    checked={formData.hasWifi}
                    onChange={(e) => setFormData({ ...formData, hasWifi: e.target.checked })}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="seatingCapacity" className="block text-sm font-medium text-gray-700">Seating Capacity:</label>
                <input
                    type="text"
                    id="seatingCapacity"
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    value={formData.seatingCapacity}
                    onChange={(e) => setFormData({ ...formData, seatingCapacity: Number(e.target.value) })}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                <select
                    id="category"
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                    <option value="">Select a category</option> {/* Empty/default option */}
                    <option value="LIBRARY">Library</option>
                    <option value="CAFE">Cafe</option>
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="animalFriendliness" className="block text-sm font-medium text-gray-700">Animal Friendliness:</label>
                <input
                    type="checkbox"
                    id="animalFriendliness"
                    className="form-checkbox text-blue-600"
                    checked={formData.animalFriendliness}
                    onChange={(e) => setFormData({ ...formData, animalFriendliness: e.target.checked })}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="locationWebsiteLink" className="block text-sm font-medium text-gray-700">Location Website Link:</label>
                <input
                    type="text"
                    id="locationWebsiteLink"
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    value={formData.locationWebsiteLink}
                    onChange={(e) => setFormData({ ...formData, locationWebsiteLink: e.target.value })}
                />
            </div>


            {formData.operatingHours.map((operatingHour, index) => (
                <div key={operatingHour.day} className="space-y-2">
                    <label htmlFor={`openTime-${index}`} className="block text-sm font-medium text-gray-700">{operatingHour.day} Open Time:</label>
                    <input
                        type="time"
                        id={`openTime-${index}`}
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                        value={operatingHour.openTime}
                        onChange={(e) => {
                            const newOperatingHours = [...formData.operatingHours];
                            newOperatingHours[index].openTime = e.target.value;
                            setFormData({ ...formData, operatingHours: newOperatingHours });
                        }}
                    />

                    <label htmlFor={`closeTime-${index}`} className="block text-sm font-medium text-gray-700">{operatingHour.day} Close Time:</label>
                    <input
                        type="time"
                        id={`closeTime-${index}`}
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                        value={operatingHour.closeTime}
                        onChange={(e) => {
                            const newOperatingHours = [...formData.operatingHours];
                            newOperatingHours[index].closeTime = e.target.value;
                            setFormData({ ...formData, operatingHours: newOperatingHours });
                        }}
                    />
                </div>
            ))}




            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
                Submit
            </button>
        </form>

    );

};

export default Page;