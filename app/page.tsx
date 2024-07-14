'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileCard from "./components/ProfileCard";
import { useSession } from 'next-auth/react';

interface User {
  _id: string;
  name: string;
  profession: string;
  image: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px] bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="container max-w-7xl mx-auto py-8 bg-[#000000]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {users.map((user) => (
          <ProfileCard key={user._id} user={user} />
        ))}
      </div>
    </main>
  );
}
