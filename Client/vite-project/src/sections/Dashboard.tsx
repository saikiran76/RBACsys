import React from 'react'
import SideBar from '../components/SideBar'
import Header from './Header'

const Dashboard = () => {
  return (
    <div className='min-h-screen bg-gray-900'>
      <SideBar className='fixed left-0 top-0 py-28'/>
      <div className='flex-1'>
        <Header/>
        <main className='p-4'>
          {/* Your main content here */}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
