import { useTheme } from '../context/ThemeContext';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg ${
        isDarkMode 
          ? 'bg-gray-700 hover:bg-gray-600' 
          : 'bg-[#022213] hover:bg-lime-400 text-white/70 hover:text-black'
      }`}
    >
      {isDarkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
    </button>
  );
};

export default ThemeToggle; 