'use client';

import ImageDisplay from "@/app/components/ImageDisplay";
import { ChangeEvent } from "react";


async function uploadToS3(e: ChangeEvent<HTMLFormElement>) {
    const formData = new FormData(e.target);

    const file = formData.get('file');


    if(!file) return null;

    // @ts-expect-error | This actually exists
    const fileType = encodeURIComponent(file.type);

    const response = await fetch(`/api/upload?fileType=${fileType}`);
    
    if(!response.ok) {
        console.error('Failed to get signed URL');
        return;
    }

    const data = await response.json();

    const { uploadUrl, Key } = data;

    await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
            // @ts-expect-error | This actually exists
            'Content-Type': file.type,
        },
    });

    console.log("[INFO]: Key is: ", Key);
    return Key;
}


const Page = () => {

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        const key = await uploadToS3(e);
        
    };

    return (
        <div>
            <p>Upload Image</p>

            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/jpeg image/png image/jpg" name="file" />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
};

export default Page;