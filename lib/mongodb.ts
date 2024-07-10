// lib/mongodb.ts
import { MongoClient } from 'mongodb';
import { NextApiRequest } from 'next';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!(global as any).mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any).mongoClientPromise = client.connect();
  }
  clientPromise = (global as any).mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
