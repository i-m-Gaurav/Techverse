import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import User from '@/models/User';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const client = new MongoClient(uri);

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected to database successfully');

    const db = client.db();
    const usersCollection = db.collection('users');

    const userProfile = await usersCollection.findOne(
      { email },
      { projection: { _id: 0, name: 1, email: 1, image: 1, city: 1, phoneNumber: 1, github: 1, instagram: 1, twitter: 1 } }
    );

    if (!userProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(userProfile);
  } catch (error: any) {
    console.error('Error in GET /api/profile:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function PUT(req: NextRequest) {
    const client = new MongoClient(uri);

    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected to database successfully');

        const db = client.db();
        const usersCollection = db.collection('users');

        const body = await req.json();
        console.log('Received data in PUT /api/profile:', body);
        const { email, name, image, city, phoneNumber, github, instagram, twitter } = body;

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        console.log('Attempting to update user with email:', email);

        const updateObject = {
            $set: {
                name,
                image,
                city,
                phoneNumber,
                github,
                instagram,
                twitter
            }
        };

        Object.keys(updateObject.$set).forEach((key) => {
            if (key in updateObject.$set) {
              if (updateObject.$set[key as keyof typeof updateObject.$set] === undefined) {
                delete updateObject.$set[key as keyof typeof updateObject.$set];
              }
            }
          });
        console.log('Update object:', JSON.stringify(updateObject, null, 2));

        const result = await usersCollection.updateOne({ email }, updateObject);

        console.log('Update operation result:', JSON.stringify(result, null, 2));

        if (result.matchedCount === 0) {
            console.log('User not found for email:', email);
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (result.modifiedCount === 0) {
            console.log('No changes were made to the document');
            return NextResponse.json({ message: 'No changes were made' }, { status: 200 });
        }

        const updatedUser = await usersCollection.findOne(
          { email },
          { projection: { _id: 0, name: 1, email: 1, image: 1, city: 1, phoneNumber: 1, github: 1, instagram: 1, twitter: 1 } }
        );

        console.log('Updated profile in database:', JSON.stringify(updatedUser, null, 2));
        return NextResponse.json(updatedUser);
    } catch (error: any) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}