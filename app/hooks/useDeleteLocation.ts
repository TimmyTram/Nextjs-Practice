import { useState } from 'react';


const useDeleteLocation = () => {
    const [loading, setLoading] = useState(false);

    const deleteLocation = async (locationId: string, session: any) => {
        setLoading(true);

        if(!session || session?.user.role !== 'ADMIN') return;

        try {
            console.log("[INFO]: Got Location id: ", locationId);
            const res = await fetch(`/api/locations/${locationId}`, {
                method: 'DELETE'
            });

            const data = await res.json();
            
            if(data.error) throw new Error(data.error);

            alert('Location deleted successfully.');
        } catch (err: any) {
            alert('Error deleting location.');
            console.error(`[ERROR]: There was an error in hooks/useDeleteLocation.ts: ${err}`);
            return;
        } finally {
            setLoading(false);
        }
    };

    return { deleteLocation, loading };
};

export default useDeleteLocation;