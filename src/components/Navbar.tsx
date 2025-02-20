'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Philometry
            </Link>
          </div>
          
          <div className="flex gap-6">
            <Link 
              href="/" 
              className={`text-sm ${pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
            >
              Home
            </Link>
            <Link 
              href="/#examples" 
              className={`text-sm ${pathname.includes('#examples') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
            >
              Examples
            </Link>
            <Link 
              href="/#about" 
              className={`text-sm ${pathname.includes('#about') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}