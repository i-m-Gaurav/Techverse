import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const metadata = {
            title: $('meta[property="og:title"]').attr('content') || $('title').text() || '',
            description: $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '',
            image: $('meta[property="og:image"]').attr('content') || '',
        };

        return NextResponse.json(metadata);
    } catch (error: any) {
        console.error('Error fetching metadata:', error);
        return NextResponse.json({ error: 'Error fetching metadata', details: error.message }, { status: 500 });
    }
}