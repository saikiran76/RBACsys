import { useSidebar } from '../context/SidebarContext';
import { useTheme } from '../context/ThemeContext';
import { FiX } from 'react-icons/fi';
import {Link} from 'react-router-dom'
import HomeIcon from './icons/HomeIcon'
import UsersIcon from './icons/UsersIcon'
import SettingsIcon from './icons/SettingsIcon'
import { twMerge } from 'tailwind-merge'
import HelpIcon from './icons/HelpIcon'
import logo from '../assets/logo-cropped.svg'

const sides = [
    {
        name: 'Home',
        icon: <HomeIcon className='size-10'/>,
        path: 'Home'
    },
    {
        name: 'Users',
        icon: <UsersIcon className='size-10'/>,
        path: 'Users'
    },
    {
        name: 'Settings',
        icon: <SettingsIcon className='size-10'/>,
        path: 'Home'
    }
]

const SideBar = ({className}:{className?:string}) => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();
  const { isDarkMode } = useTheme();

  return (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      <aside className={twMerge(
        'bg-gray-900 text-white border-r border-gray-600 h-[100vh] md:h-[91.2vh] ',
        'fixed md:sticky top-0 left-0',
        'w-[100px] min-w-[80px]',
        'transform transition-transform duration-300 ease-in-out',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        'z-50',
        className
      )}>
        <button 
          onClick={toggleMobileSidebar}
          className="absolute top-4 right-4 p-2 md:hidden text-white"
        >
          <FiX className="w-6 h-6" />
        </button>
        
        <img src={logo} alt='logo' className='h-10 w-auto ml-6 mt-0 absolute top-8'/>
        <div className='grid-rows-2 justify-between mt-24'>
            <div className='p-3 flex flex-col justify-between h-full gap-y-3'>
                {sides.map((side)=>(
                    <Link 
                      to={`/${side.path.toLowerCase()}`} 
                      key={side.name}
                      onClick={() => {
                        if (window.innerWidth < 768) {
                          toggleMobileSidebar();
                        }
                      }}
                    >
                        <div className='group flex items-center gap-x-2 border border-gray-600 rounded-md p-3 w-fit bg-gray-800 backdrop-blur-md hover:bg-gradient-to-r hover:from-lime-400 hover:to-green-700 hover:text-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
                            <span className='w-[80%]'>{side.icon}</span>
                            <span className='w-0 group-hover:w-20 overflow-hidden transition-all duration-300 whitespace-nowrap'>
                                {side.name}
                            </span>
                        </div>
                    </Link>
                ))}   
            </div>

            <div className='mt-2 flex items-center justify-center gap-4 rounded-md p-2 hover:scale-105 hover:shadow-lg transition-all duration-300 bg-gray-800 hover:bg-gradient-to-r group hover:from-lime-400 hover:to-green-700'>
                <HelpIcon className='size-10 text-lime-400 group-hover:text-gray-900'/>
                <span className='w-0 group-hover:w-20 overflow-hidden transition-all duration-300 whitespace-nowrap text-white group-hover:text-gray-900'>
                    Help
                </span>
            </div>
        </div>
      </aside>
    </>
  )
}

export default SideBar
