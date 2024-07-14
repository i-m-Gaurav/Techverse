// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('techverse');
    const usersCollection = database.collection('users');

    const users = await usersCollection.find({}).toArray();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  } finally {
    await client.close();
  }
}
