'use client'

import React from 'react';
import Link from 'next/link';
import { useSession,signIn, signOut } from "next-auth/react";
import Image from 'next/image';

import {useRouter} from 'next/navigation'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const Navbar: React.FC = () => {
  const { data: session, status } = useSession()
  const router = useRouter();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <header className="border-b border-[#36363d] w-full  bg-[#0a0a0a] text-white">
      <nav className="container max-w-7xl mx-auto ">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Techverse
            </Link>
          </div>
          <div className="flex items-center">
            {status === "authenticated" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild >
                  <Button variant="ghost" className="rounded-full p-0 w-10 h-10 overflow-hidden">
                    {session.user?.image ? (
                      <Image 
                        src={session.user.image} 
                        alt="Profile" 
                        width={40} 
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white">
                        {getInitials(session.user?.name || 'User')}
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className='bg-[#0a0a0a] text-white border-[#36363d] rounded'>
                  <DropdownMenuItem onSelect={() => router.push("/ProfilePage")} className="font-medium">
                    {/* <Link href="/ProfilePage">
                      <h1>Profile</h1>
                    </Link> */}
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button className='px-4 py-1 rounded border border-[#36363d] bg-[#0a0a0a] hover:bg-[#cccccc] hover:text-black ' onClick={() => signIn('google')}> SignIn</button>

            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;