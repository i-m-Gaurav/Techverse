'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';

interface UserProfile {
  name: string;
  email: string;
  image: string;
  city: string;
  phoneNumber: string;
  github: string;
  instagram: string;
  twitter: string;
}

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);

  const fetchProfile = useCallback(async () => {
    if (session?.user?.email) {
      try {
        const response = await axios.get(`/api/profile?email=${session.user.email}`);
        console.log(response.data)
        setProfile(response.data);
        setEditedProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
  }, [session?.user?.email]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (session?.user?.email && editedProfile) {
      try {
        const updatedProfile = { ...editedProfile, email: session.user.email };
        console.log('Sending updated profile to server:', updatedProfile);
        const response = await axios.put('/api/profile', updatedProfile);
        console.log('Response from server:', response.data);
        setProfile(response.data);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => prev ? { ...prev, [name]: value } : null);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {profile && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editedProfile?.name || ''}
                onChange={handleChange}
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Name"
              />
              <input
                type="text"
                name="city"
                value={editedProfile?.city || ''}
                onChange={handleChange}
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="City"
              />
              <input
                type="tel"
                name="phoneNumber"
                value={editedProfile?.phoneNumber || ''}
                onChange={handleChange}
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Phone Number"
              />
              <input
                type="text"
                name="github"
                value={editedProfile?.github || ''}
                onChange={handleChange}
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="GitHub"
              />
              <input
                type="text"
                name="instagram"
                value={editedProfile?.instagram || ''}
                onChange={handleChange}
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Instagram"
              />
              <input
                type="text"
                name="twitter"
                value={editedProfile?.twitter || ''}
                onChange={handleChange}
                className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Twitter"
              />
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p className="mb-2"><strong>Name:</strong> {profile.name}</p>
              <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
              <p className="mb-2"><strong>City:</strong> {profile.city || 'Not specified'}</p>
              <p className="mb-2"><strong>Phone Number:</strong> {profile.phoneNumber || 'Not specified'}</p>
              <p className="mb-2"><strong>GitHub:</strong> {profile.github || 'Not specified'}</p>
              <p className="mb-2"><strong>Instagram:</strong> {profile.instagram || 'Not specified'}</p>
              <p className="mb-2"><strong>Twitter:</strong> {profile.twitter || 'Not specified'}</p>
              {profile.image && (
                <Image src={profile.image} alt={profile.name} width={80} height={80} className="rounded-full mb-4" />
              )}
              <button
                onClick={handleEdit}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;