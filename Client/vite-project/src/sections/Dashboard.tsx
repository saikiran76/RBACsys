import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import Header from './Header'
import { useTheme } from '../context/ThemeContext'

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header className='max-w-screen' />
      <div className="flex min-h-[20vh]">
        <SideBar className="bg-[#022213]"/>
        <main className={`flex-1 p-4 transition-all duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white/70'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard
