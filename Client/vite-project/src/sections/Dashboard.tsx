import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import Header from './Header'

const Dashboard = () => {
  return (
    <div className='min-h-screen bg-gray-900'>
        <div className='relative flex'>
            <SideBar className='absolute z-50 top-0 py-28'/>
            <div className='flex-1 ml-[90px]'>
                <Header/>
                <main className='p-4 absolute'>
                    <Outlet />
                </main>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
