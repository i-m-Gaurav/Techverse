import React from 'react';
import Image from 'next/image'

const ProfileCard = () => {
  return (
    <div className="bg-gray-900 p-8 rounded-3xl max-w-xs mx-auto h-[500px] flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
          <Image
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
            alt="Profile" 
            className="w-full h-full object-cover"
            width={10}
            height={10}
          />
        </div>
        <h2 className="text-white text-2xl font-bold mb-2">Gaurav kumar</h2>
        <p className="text-gray-400 text-sm mb-6">FrontEnd Dev</p>
        <p className="text-gray-300 text-sm text-center mb-8">
          Here u must write about some unique things about u, no matter what it is, just write it.
        </p>
      </div>
      <button className="bg-blue-500 text-white py-3 px-6 rounded-full text-sm font-semibold hover:bg-blue-600 transition duration-300 w-full">
        View Profile
      </button>
    </div>
  );
};

export default ProfileCard;