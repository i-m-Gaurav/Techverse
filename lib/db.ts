import { connectToDB } from './database';
import User from '@/models/User';

export async function getUser(email: string) {
  await connectToDB(); // Ensure database connection
  return User.findOne({ email });
}

export async function createUser(userData: { 
  name: string; 
  email: string; 
  image?: string;
  city?: string;
  phone?: string;
  github?: string;
  instagram?: string;
  twitter?: string;
}) {
  await connectToDB(); // Ensure database connection
  console.log('Creating user with data:', userData);
  const newUser = await User.create(userData);
  console.log('New user created:', newUser);
  return newUser;
}

export async function updateUserProfile(email: string, profileData: {
  name?: string;
  city?: string;
  phone?: string;
  github?: string;
  instagram?: string;
  twitter?: string;
  image?: string;
}) {
  await connectToDB(); // Ensure database connection
  return User.findOneAndUpdate({ email }, profileData, { new: true });
}