import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import Header from './Header'
import { useTheme } from '../context/ThemeContext'

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className='relative flex'>
            <SideBar className={`absolute z-50 top-0 py-28 ${!isDarkMode && 'bg-[#022213]'}`}/>
            <div className='flex-1 ml-[90px]'>
                <Header/>
                <main className={`p-4 absolute ${isDarkMode ? 'bg-gray-900' : 'bg-white/70'}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
