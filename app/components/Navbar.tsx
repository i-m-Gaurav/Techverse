// components/Navbar.tsx
"use client";
import React from "react";
import Link from "next/link";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

const Navbar = () => {

  return (
    <nav className="shadow-md">
      <div className="container mx-auto max-w-7xl flex items-center justify-between p-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/">
            <span className="text-lg font-semibold text-white">Techverse</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
          <SignedOut>
          <SignInButton/>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
          </li>
        </ul>

       
      </div>
    </nav>
  );
};

export default Navbar;