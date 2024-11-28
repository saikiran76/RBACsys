import { useState, useRef, useEffect } from 'react';
import UserIcon from '../components/icons/UserIcon';
// import Button from '../components/Button';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../utils/api';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import { FiSearch } from 'react-icons/fi';
import { GiHamburgerMenu } from "react-icons/gi";
import { useSidebar } from '../context/SidebarContext';

const Header = ({className}:{className?:string}) => {
  const { auth } = useAuth();
  const { toggleMobileSidebar } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

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
    <header className={twMerge(
      'fixed top-0 right-0 left-0 z-40 md:relative',
      'bg-[#022213]',
      className
    )}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button 
            onClick={toggleMobileSidebar}
            className="md:hidden p-2 -ml-2"
          >
            <GiHamburgerMenu className={`text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}/>
          </button>
        </div>

        <div className="flex-1 flex items-center justify-between px-4">
          <div className="hidden md:flex items-center w-72">
            <span className="relative flex items-center w-full">
              <FiSearch className="absolute left-3 text-gray-400"/>
              <input 
                type="text"
                className={`w-full pl-10 pr-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'bg-lime-400 text-black placeholder:text-gray-900/60' 
                    : 'bg-[#022213] text-white/70 placeholder:text-white/70'
                }`}
              />
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2"
              >
                <UserIcon className={`w-10 h-8 ${isDarkMode ? 'text-lime-400' : 'text-lime-500'}`}/>
                <span className={`hidden md:block ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                  {auth.user?.email}
                </span>
              </button>
              {isDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-md shadow-lg py-1`}>
                  <button
                    onClick={() => authApi.logout()}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      isDarkMode 
                        ? 'text-white hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
