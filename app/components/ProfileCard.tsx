'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProfileCardProps {
  user: {
    _id: string;
    name: string;
    profession: string;
    about: string;
    image: string;
  }
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="bg-gray-900 p-8 rounded-3xl max-w-xs mx-auto h-[500px] flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
          <Image
            src={user.image}
            alt="Profile"
            className="w-full h-full object-cover"
            width={128}
            height={128}
          />
        </div>
        <h2 className="text-white text-2xl font-bold mb-2">{user.name}</h2>
        <p className="text-gray-400 text-sm mb-6">{user.profession}</p>
        <p className="text-gray-300 text-sm text-center mb-8">
          {user.about}
        </p>
      </div>
      <Link href={`/profile/${user._id}`} passHref>
        <button className="bg-blue-500 text-white py-3 px-6 rounded-full text-sm font-semibold hover:bg-blue-600 transition duration-300 w-full">
          View Profile
        </button>
      </Link>
    </div>
  );
};

export default ProfileCard;