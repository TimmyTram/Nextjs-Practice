'use client';
import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import useLocationSearch from "../../hooks/useLocationSearch";
import LocationCard from "../../components/LocationCard";
import useDeleteLocation from "../../hooks/useDeleteLocation"
import { useSession } from "next-auth/react";


const Page = () => {
    const { data: session, status } = useSession();
    const [query, setQuery] = useState('name=');
    const { locations, loading, error } = useLocationSearch(query);
    const { deleteLocation } = useDeleteLocation();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated" || session?.user.role !== 'ADMIN') {
        return <div>Unauthorized</div>;
    }

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
                    <div key={location.id}>
                        <LocationCard location={location} />
                        <button onClick={() => deleteLocation(location.id, session)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;