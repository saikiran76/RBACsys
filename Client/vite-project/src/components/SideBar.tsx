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
  return (
    <div className={twMerge('container bg-gray-900 text-white border-r border-gray-600 w-fit p-2 h-screen relative', className)}>
        <img src={logo} alt='logo' className='h-10 w-auto ml-6 mt-0 absolute top-8'/>
        <div className='grid-rows-2 justify-between'>
            <div className='p-3 flex flex-col justify-between h-full gap-y-3'>
                {
                    sides.map((side)=>(
                        <Link to={`/${side.name}`} key={side.name}>
                            <div className='group flex items-center gap-x-2 border border-gray-600 rounded-md p-3 w-fit bg-gray-800 backdrop-blur-md hover:bg-gradient-to-r hover:from-lime-400 hover:to-green-700 hover:text-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg'>
                                <span className='w-[80%]'>{side.icon}</span>
                                <span className='w-0 group-hover:w-20 overflow-hidden transition-all duration-300 whitespace-nowrap'>
                                    {side.name}
                                </span>
                            </div>
                        </Link>
                    ))
                }   
            </div>

            <div className='mt-2 flex items-center justify-center gap-4 rounded-md p-2 hover:scale-105 hover:shadow-lg transition-all duration-300 bg-gray-800 hover:bg-gradient-to-r group hover:from-lime-400 hover:to-green-700'>
                    <HelpIcon className='size-10 text-lime-400 group-hover:text-gray-900'/>
                    <span className='w-0 group-hover:w-20 overflow-hidden transition-all duration-300 whitespace-nowrap text-white group-hover:text-gray-900'>
                        Help
                    </span>
                </div>

           
        </div>
    </div>
  )
}

export default SideBar
