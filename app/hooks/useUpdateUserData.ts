import { useState } from 'react';

const useUpdateUserData = () => {
    const [loading, setLoading] = useState(false);

    const updateUserData = async (formData: any, session: any) => {
        setLoading(true);

        // user not logged in
        if(!session) return;

        try {
            const res = await fetch(`/api/users`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const data = await res.json();

            if(data.error) throw new Error(data.error);
            alert('User data updated successfully!');
        } catch(error: any) {
            //console.error(`[ERROR]: There was an error in hooks/useUpdateUserData.ts: ${error}`);
            alert(`${error.message}`);
            return;
        }
    }
    
    return { updateUserData, loading };
};

export default useUpdateUserData;