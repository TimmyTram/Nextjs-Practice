import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');

    if (!filename) {
        return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }
    if (!req.body) {
        return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
    }

    const blob = await put(filename, req.body, {
        access: 'public'
    });

    return NextResponse.json(blob);
}