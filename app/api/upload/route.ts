import S3 from 'aws-sdk/clients/s3';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const s3 = new S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION,
    signatureVersion: 'v4',
});

export async function GET(req: NextRequest) {
    const extension = (req.nextUrl.searchParams.get('fileType') as string).split('/')[1];
    console.log(`[INFO]: Extension: ${extension}`);
    const Key = `${randomUUID()}.${extension}`

    const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key,
        Expires: 60,
        ContentType: `image/${extension}`,
    };

    const uploadUrl = await s3.getSignedUrlPromise('putObject', s3Params);

    return NextResponse.json({ uploadUrl, Key });
}