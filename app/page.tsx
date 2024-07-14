'use client'
import { useEffect, useState } from 'react';
import ProfileCard from "./components/ProfileCard";

interface User {
  _id: string;
  name: string;
  profession: string;
  about: string;
  image: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  const fetchProfile = useCallback(async () => {
    if (session?.user?.email) {
      try {
        const response = await axios.get(`/api/profile?email=${session.user.email}`);
        setProfile(response.data);
        setEditedProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
  }, [session?.user?.email]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <ProfileCard key={user._id} user={user} />
        ))}
      </div>
    </main>
  );
}