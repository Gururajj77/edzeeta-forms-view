'use client'

import React from 'react';
import Image from 'next/image';
import EdzeetaLogo from '../../public/EdzeetaLogo.svg';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  // Function to determine if formData is empty
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={EdzeetaLogo}  
            alt="Edzeeta Logo"
            width={150} 
            height={75} 
            className="object-contain cursor-pointer"
            onClick={() => router.push('/')}
          />
        </div>

      </div>
    </header>
  );
};

export default Header;