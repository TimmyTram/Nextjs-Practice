import S3 from 'aws-sdk/clients/s3';
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
    const key = req.nextUrl.searchParams.get('key');
    if (!key) {
        return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    }


    const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Expires: 60,
    };

    const viewUrl = await s3.getSignedUrlPromise('getObject', s3Params);

    return NextResponse.json({ viewUrl });
}


