// File: app/api/profile/[...slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

export async function GET(req: NextRequest, { params }: { params: { slug: string[] } }) {
    const [userId] = params.slug;
    
    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const client = new MongoClient(uri);

    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected to database successfully');

        const db = client.db();
        const usersCollection = db.collection('users');

        const userProfile = await usersCollection.findOne(
            { _id: new ObjectId(userId) },
            { projection: { 
                name: 1, 
                profession: 1, 
                college: 1, 
                email: 1, 
                image: 1, 
                city: 1, 
                phoneNumber: 1, 
                github: 1, 
                instagram: 1, 
                twitter: 1, 
                links: 1, 
                skills: 1, 
                youtubers: 1 
            } }
        );

        if (!userProfile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        return NextResponse.json(userProfile);
        
    } catch (error: any) {
        console.error('Error in GET /api/profile/[...slug]', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
        
    } finally {
        await client.close();
    }
}