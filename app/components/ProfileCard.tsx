'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProfileCardProps {
  user: {
    _id: string;
    name: string;
    profession: string;
    image: string;
    college:string;
  }
}



const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {


  console.log(user.college);

  let bio = user.college;

  console.log(typeof bio);


  const shortenBio = (bio: string) => {
    return bio.length > 10 ? `${bio.substring(0, 100)}...` : bio;
  };

  try {
    bio = shortenBio(user.college);
  } catch (error) {
    console.error('Error shortening bio:', error);
  }

  return (
    <div className="bg-[#0a0a0a] border border-[#36363d] shadow-md p-8 rounded-xl w-full max-w-[300px] min-w-[280px] mx-auto h-[400px] flex flex-col justify-between items-center">
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
       <div className='flex flex-col justify-center items-center'>
       <h2 className="text-white text-2xl font-bold mb-1">{user.name}</h2>
        <p className="text-gray-300 text-xs mb-8">{user.profession}</p>
        <p className="text-gray-400 text-center text-xs mb-6">{bio}</p>
       </div>
        
      </div>
      <div className="mt-auto">
        <Link href={`/ProfilePage/${user._id}`} passHref>
          <button className="px-8 py-2 rounded-full relative bg-transparent text-white text-sm   transition duration-200 border border-slate-600">
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            <span className="relative z-20">
              View Profile
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;