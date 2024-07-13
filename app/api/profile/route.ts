import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import User from '@/models/User';


export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    console.log('Connecting to database...');
    await connectToDB();
    console.log('Connected to database successfully');

    const userProfile = await User.findOne(
      { email },
      'name email image city phoneNumber -_id'
    ).lean();

    if (!userProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(userProfile);
  } catch (error: any) {
    console.error('Error in GET /api/profile:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}



export async function PUT(req: NextRequest) {
    try {
      await connectToDB();
  
      const body = await req.json();
      console.log('Received data in PUT /api/profile:', body);
  
      const { email, name, city, phoneNumber, github, instagram, twitter } = body;
  
      if (!email || typeof email !== 'string') {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
      }
  
      // Find the user document
      const user = await User.findOne({ email });
  
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      // Create or update the fields
      user.name = name;
      user.city = city || user.city || null;
      user.phoneNumber = phoneNumber || user.phoneNumber || null;
      user.github = github || user.github || null;
      user.instagram = instagram || user.instagram || null;
      user.twitter = twitter || user.twitter || null;
  
      // Save the updated user document
      await user.save();
  
      console.log('Updated profile in database:', user);
  
      return NextResponse.json(user);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
  }