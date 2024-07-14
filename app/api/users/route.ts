import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
    throw new Error('Please add the MONGODB_URI');
}

export async function GET(req: NextRequest) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db();

        const usersCollection = db.collection('users');

        const users = await usersCollection.find(
            {},
            { projection: { name: 1, profession: 1, image: 1, email: 1 } }
        ).toArray();

        if (users.length === 0) {
            return NextResponse.json({ error: 'No users found' }, { status: 404 });
        }

        return NextResponse.json(users);
        
    } catch (error: any) {
        console.log('Error in GET /api/users', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
        
    } finally {
        await client.close();
    }
}