import React, { useState, useRef, useEffect } from 'react';
import UserIcon from '../components/icons/UserIcon';
// import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../utils/api';

const Header = () => {
  const { auth } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className='bg-gray-900 font-sans [mask-image:linear-gradient(to_bottom,black_10%,black_80%,transparent)] ml-7'>
      <div className="py-4 lg:py-7 w-full px-2">
        <div className='grid grid-cols-2 border border-white/15 rounded p-3 px-7 md:pr-2 items-center'>
          <div className='flex items-center gap-5'>
            <span className='flex items-center'>
              <input type='text' placeholder='🔍 Search' 
                className='bg-lime-400 placeholder:text-gray-900/60 border border-white/15 px-4 py-2 rounded-md text-sm font-bold text-black hidden md:block
                focus:outline-none focus:bg-gradient-to-r focus:from-lime-400 focus:to-green-700 transition-all duration-300'/>
            </span>
          </div>
          <div className='flex items-center justify-end gap-4 mr-5'>
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2"
              >
                <UserIcon className='w-12 h-9 text-lime-400 border border-white/30 rounded-full'/>
                <span className="text-white/80">{auth.user?.name}</span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                  <button
                    onClick={() => authApi.logout()}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
