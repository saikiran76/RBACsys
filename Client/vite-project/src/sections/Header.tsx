import { useState, useRef, useEffect } from 'react';
import UserIcon from '../components/icons/UserIcon';
// import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../utils/api';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

const Header = () => {
  const { auth } = useAuth();
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
    <header className={`absolute -top-2 z-40 min-w-[94%] ${
      isDarkMode ? 'bg-gray-900' : 'bg-white/70'
    }`}>
      <div className={`flex items-center justify-between px-4 py-2 min-w-[94%] border-b ${!isDarkMode ? 'border-gray-300 shadow-sm': 'border-white/15'}`}>
        <section className={`min-w-[94%] ${isDarkMode ? 'bg-gray-900' : 'bg-white/70'} font-sans ml-7`}>
          <div className="py-4 lg:py-2 w-full px-2">
            <div className={`grid grid-cols-2 ${
              isDarkMode ? 'border-white/15' : 'border-gray-600'
            } rounded p-5 px-7 md:pr-2 items-center`}>
              <div className='flex items-center gap-5'>
                <span className='flex items-center'>
                  <input type='text' placeholder='🔍 Search' 
                    className={`${
                      isDarkMode 
                        ? 'bg-lime-400 placeholder:text-gray-900/60 border-white/15' 
                        : 'bg-[#022213] placeholder:text-white/70 border-gray-600'
                    } border px-4 py-2 rounded-md text-sm font-bold ${
                      isDarkMode ? 'text-black' : 'text-white/70'
                    } hidden md:block
                    focus:outline-none focus:bg-lime-400 focus:text-black transition-all duration-300`}
                  />
                </span>
              </div>
              <div className='flex items-center justify-end gap-4 mr-5'>
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2"
                  >
                    <UserIcon className={`w-12 h-9 ${
                      isDarkMode ? 'text-lime-400 border-white/30' : 'text-[#022213] border-gray-600'
                    } border rounded-full`}/>
                    <span className={isDarkMode ? "text-white/80" : "text-gray-700"}>
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
              </div>
            </div>
          </div>
        </section>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
