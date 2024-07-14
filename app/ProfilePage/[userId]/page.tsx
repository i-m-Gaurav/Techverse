// File: app/ProfilePage/[userId]/page.tsx
'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import UserInterest from '../../components/UserInterest';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  profession: string;
  image: string;
  city: string;
  phoneNumber: string;
  github: string;
  instagram: string;
  twitter: string;
  college: string;
  links: string[];
  skills: string[];
  youtubers: string[];
}

export default function UserProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const params = useParams();
  const userId = params.userId as string;

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios.get(`/api/profile/${userId}`);
      setProfile(response.data);
      setIsOwnProfile(session?.user?.email === response.data.email);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }, [userId, session?.user?.email]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (status === "loading" || !profile) {
    return <div>
      <div className="flex justify-center items-center h-[400px] bg-[#000000]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-400"></div>
      </div>
    </div>;
  }




  const handleAddInterest = async (category: string, newItem: string) => {
    if (isOwnProfile && session?.user?.email) {
      try {
        const response = await axios.post('/api/profile', {
          email: session.user.email,
          category,
          newItem,
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error adding interest:', error);
      }
    }
  };

  const handleDeleteInterest = async (category: string, item: string) => {
    if (isOwnProfile && session?.user?.email) {
      try {
        const response = await axios.delete('/api/profile', {
          data: {
            email: session.user.email,
            category,
            item,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error deleting interest:', error);
      }
    }
  };

  return (
    <div className="bg-[#000000] text-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-[#0a0a0a] border border-[#36363d] rounded overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-8 flex justify-center items-center">
            <Image
              src={profile.image}
              alt={profile.name}
              width={240}
              height={240}
              className="rounded-full border-4 border-gray-700"
            />
          </div>
          <div className="md:w-2/3 p-8">
            <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
            <p className="text-gray-400 text-sm mb-5">{profile.profession || 'No profession specified'}</p>
            <p className="text-gray-400 text-sm mb-5">{profile.college || 'No college specified'}</p>
            <div className="flex flex-col mb-6">
              {profile.city && (
                <div className="flex items-center text-gray-400 mb-2">
                  <FaMapMarkerAlt size={16} />
                  <span className='ml-[4px] text-xs'>{profile.city}</span>
                </div>
              )}
              {profile.email && (
                <div className="flex items-center text-gray-400 mb-2">
                  <FaEnvelope size={16} />
                  <span className='ml-[4px] text-xs'>{profile.email}</span>
                </div>
              )}
              {profile.github && (
                <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 mb-1 flex items-center hover:text-white">
                  <FaGithub size={16} />
                  <span className='ml-[4px] text-xs'>{profile.github}</span>
                </a>
              )}
              {profile.instagram && (
                <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 mb-1 flex items-center hover:text-white">
                  <FaInstagram size={16} />
                  <span className='ml-[4px] text-xs'>{profile.instagram}</span>
                </a>
              )}
              {profile.twitter && (
                <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 flex items-center hover:text-white">
                  <FaTwitter size={16} />
                  <span className='ml-[4px] text-xs'>{profile.twitter}</span>
                </a>
              )}
            </div>
            {isOwnProfile && (
              <Link href="/ProfilePage" className="bg-gray-700 w-1/3 bg-transparent border-2 border-[#36363d] text-white text-xs font-thin py-1 px-4 rounded-md">
                Edit Profile
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5 max-w-7xl mx-auto bg-[#000000] rounded-lg overflow-hidden shadow-lg">
        <UserInterest
          links={profile.links}
          skills={profile.skills}
          youtubers={profile.youtubers}
          onAddInterest={handleAddInterest}
          onDeleteInterest={handleDeleteInterest}
          isEditable={isOwnProfile}
        />
      </div>
    </div>
  );
}