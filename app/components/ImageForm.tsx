'use client';
import Image from 'next/image';
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';

interface ImageFormProps {
    setLocationImage: (imageUrl: string) => void;
}

const ImageForm = (props: ImageFormProps) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
        }

        const file = inputFileRef.current.files[0];

        const response = await fetch(
            `/api/image/upload?filename=${file.name}`,
            {
                method: 'POST',
                body: file,
            },
        );

        const newBlob = (await response.json()) as PutBlobResult;

        setBlob(newBlob);
        props.setLocationImage(newBlob.url);
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="file" ref={inputFileRef} type="file" required />
                <button type="submit">Upload</button>
            </form>
            {blob && (
                <div>
                    <Image src={blob.url} width={256} height={256} alt="Uploaded image" />
                </div>
            )}
        </div>
    );
};

export default ImageForm;