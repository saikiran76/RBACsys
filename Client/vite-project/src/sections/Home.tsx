import React from 'react'
import Card from '../components/Card'

const Home = () => {
  return (
    <section className='bg-gray-800 backdrop-blur-md mx-3 ml-8 rounded'>
        <h2 className='text-xl text-white/80 font-sans px-5 py-4'>Hey admin, Welcome back.</h2>
        <div className='grid grid-cols-3 gap-4 px-4 py-3'>
            <Card className='bg-gray-900 bg-opacity-50' title='Total Users'>
                <h2 className='text-white/80 text-xl font-semibold'>0</h2>
            </Card>
            <Card className='bg-gray-900 bg-opacity-50' title='Total Admins'>
                <h2 className='text-white/80 text-xl font-semibold'>0</h2>
            </Card>
            <Card className='bg-gray-900 bg-opacity-50' title='Total Roles'>
                <h2 className='text-white/80 text-xl font-semibold'>0</h2>
            </Card>
            
        </div>
      
    </section>
  )
}

export default Home
