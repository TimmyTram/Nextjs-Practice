'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ImageDisplayProps {
    imageKey: string;
}

function ImageDisplay({ imageKey }: ImageDisplayProps) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        async function fetchImageUrl() {
            try {
                const response = await fetch(`/api/getImage?key=${imageKey}`);
                if (response.ok) {
                    const data = await response.json();
                    setImageUrl(data.viewUrl); // Set the presigned URL to state
                } else {
                    console.error("Failed to fetch image URL");
                }
            } catch (error) {
                console.error("Error fetching image URL:", error);
            }
        }

        if (imageKey) {
            fetchImageUrl();
        }
    }, [imageKey]);

    
    return (
        <div>
            {imageUrl ? (
                <Image src={imageUrl} alt="Fetched from S3" />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
}

export default ImageDisplay;
