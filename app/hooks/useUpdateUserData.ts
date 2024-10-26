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

            if(res.ok) {
                console.log(`[INFO]: User data updated successfully.`);
                
                // TODO: Remove this alert in production
                // could use a react toast notification library here
                // this should be removed in production
                alert("User data updated successfully.");
            } else {
                console.error(`[ERROR]: There was an error updating the user data.`);
                
                // TODO: Remove this alert in production
                // could use a react toast notification library here
                // this should be removed in production
                alert("There was an error updating the user data.");
            }

        } catch(error: any) {
            console.error(`[ERROR]: There was an error in hooks/useUpdateUserData.ts: ${error}`);
            return;
        }
    }
    
    return { updateUserData, loading };
};

export default useUpdateUserData;