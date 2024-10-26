'use client';
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import useLocationSearch from "../hooks/useLocationSearch";
import LocationCard from "../components/LocationCard";

const Page = () => {
    const [query, setQuery] = useState('name=');
    const { locations, loading, error } = useLocationSearch(query);

    const handleSearch = (query: string) => {
        setQuery(`name=${query}`);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl text-white mb-4">Search</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p className="text-white">Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            <div className="flex flex-col items-center mt-4 space-y-4">
                {locations.map((location: any) => (
                    <LocationCard key={location.id} location={location} />
                ))}
            </div>
        </div>
    );
};

export default Page;
