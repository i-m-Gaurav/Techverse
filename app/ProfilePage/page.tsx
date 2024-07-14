'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import UserInterest from '../components/UserInterest';

interface UserProfile {
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

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);


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
        const response = await axios.put('/api/profile', updatedProfile);
        setProfile(response.data);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleAddInterest = async (category: string, newItem: string) => {
    if (session?.user?.email) {
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
    if (session?.user?.email) {
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

  if (status === "loading") {
    return <div>

      boading
    </div>;
  }

  if (status === "unauthenticated") {
    return <div>Please sign in to view your profile.</div>;
  }
  
  return (
    <div className="bg-[#000000] text-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto border-[#36363d] bg-[#000000] rounded-lg overflow-hidden shadow-lg">
        {profile && (
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 p-8 flex justify-center items-center">
              <Image
                src={profile.image}
                alt={profile.name}
                width={240}
                height={240}
                className="rounded-full border-4 border-[#36363d]"
              />
            </div>
            <div className="md:w-2/3 p-8">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={editedProfile?.name || ''}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#36363d] text-xs rounded px-3 py-2"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="profession"
                    value={editedProfile?.profession || ''}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#36363d] text-xs rounded px-3 py-2"
                    placeholder="Profession name"
                  />
                  <textarea
                    name="college"
                    value={editedProfile?.college || ''}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#36363d] text-xs rounded px-3 py-2"
                    placeholder="college"
                    rows={3}
                  />
                  <input
                    type="text"
                    name="city"
                    value={editedProfile?.city || ''}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#36363d] text-xs rounded px-3 py-2"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="github"
                    value={editedProfile?.github || ''}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#36363d] text-xs rounded px-3 py-2"
                    placeholder="GitHub"
                  />
                  <input
                    type="text"
                    name="instagram"
                    value={editedProfile?.instagram || ''}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#36363d] text-xs rounded px-3 py-2"
                    placeholder="Instagram"
                  />
                  <input
                    type="text"
                    name="twitter"
                    value={editedProfile?.twitter || ''}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#36363d] text-xs rounded px-3 py-2"
                    placeholder="Twitter"
                  />
                  <button
                    onClick={handleSave}
                    className="bg-[#0a0a0a] border border-[#36363d] hover:bg-[#cccccc] hover:text-black text-xs text-white font-bold py-2 px-4 rounded"
                  >
                    Save Profile
                  </button>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold mb-2">{profile?.name}</h1>
                  <p className="text-gray-400 text-sm mb-5">{profile?.profession || 'write u do like, student or developer or artist etc...'}</p>
                  <p className="text-gray-400 text-sm mb-5">{profile?.college || 'No college provided'}</p>
                  <div className="flex flex-col mb-6">
                    {profile?.city && (
                      <div className="flex items-center text-gray-400 mb-2">
                        <FaMapMarkerAlt size={16} />
                        <span className='ml-[4px] text-xs'>{profile?.city || 'Not specified'}</span>
                      </div>
                    )}
                    {profile?.email && (
                      <div className="flex items-center text-gray-400 mb-2">
                        <FaEnvelope size={16} />
                        <span className='ml-[4px] text-xs'>{profile?.email || 'Not specified'}</span>
                      </div>
                    )}
                    {profile?.github && (
                      <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 mb-1 flex items-center hover:text-white">
                        <FaGithub size={16} />
                        <span className='ml-[4px] text-xs'>{profile?.github}</span>
                      </a>
                    )}
                    {profile?.instagram && (
                      <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 mb-1 flex items-center hover:text-white">
                        <FaInstagram size={16} />
                        <span className='ml-[4px] text-xs'>{profile?.instagram}</span>
                      </a>
                    )}
                    {profile?.twitter && (
                      <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 flex items-center hover:text-white">
                        <FaTwitter size={16} />
                        <span className='ml-[4px] text-xs'>{profile?.twitter}</span>
                      </a>
                    )}
                  </div>
                  <button
                    onClick={handleEdit}
                    className="bg-gray-700 w-1/3 bg-transparent border-2  border-[#36363d] text-[#cccccc] hover:text-black hover:bg-[#cccccc] text-xs  py-1 px-4 rounded"
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mt-5 max-w-7xl mx-auto bg-[#000000] rounded-lg overflow-hidden shadow-lg">
        {profile && (
          <UserInterest
            links={profile.links}
            skills={profile.skills}
            youtubers={profile.youtubers}
            onAddInterest={handleAddInterest}
            onDeleteInterest={handleDeleteInterest}
            isEditable={isOwnProfile}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;