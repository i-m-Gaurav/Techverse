import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('Please add the MONGODB_URI');
}

export const dynamic = 'force-dynamic'; // This forces the route to be dynamic
export const revalidate = 0; // This disables caching for this route

export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        
        const usersCollection = mongoose.connection.collection('users');
       
        const users = await usersCollection.find(
            {},
            { projection: { name: 1, profession: 1, college: 1, image: 1, email: 1 } }
        ).toArray();

        if (users.length === 0) {
            return NextResponse.json({ error: 'No users found' }, { status: 404 });
        }

        return NextResponse.json(users);
        
    } catch (error: any) {
        console.error('Error in GET /api/users', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}