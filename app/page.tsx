'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCard from "./components/ProfileCard";
import { useSession } from 'next-auth/react';

interface User {
  _id: string;
  name: string;
  profession: string;
  image: string;
  email?: string; // Add email field to match with session user
  college: string;
}

interface HomeProps {
  initialUsers: User[];
}

export default function Home({ initialUsers }: HomeProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
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

    if (session) {
      fetchUsers();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[400px] bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    );
  }

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

  // Filter out the current user
  const filteredUsers = users.filter(user => user.email !== session?.user?.email);

  return (
    <main className="container max-w-7xl mx-auto py-8 bg-[#000000]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredUsers.slice().reverse().map((user) => (
          <ProfileCard key={user._id} user={user} />
        ))}
      </div>
    </main>
  );
}

// Fetch users from the server side
export async function getServerSideProps() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users`);
    return {
      props: {
        initialUsers: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      props: {
        initialUsers: [],
      },
    };
  }
}
