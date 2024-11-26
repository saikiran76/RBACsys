import React from 'react'
import logo from '../assets/logo.svg'
import UserIcon from '../components/icons/UserIcon'
import Button from '../components/Button'

const Header = () => {
  return (
    <section className='bg-gray-900 font-sans [mask-image:linear-gradient(to_bottom,black_10%,black_80%,transparent)]'>
        {/* <div className='container'> */}
            <div className="py-4 lg:py-7 w-full px-2">
                <div className='grid grid-cols-2 border border-white/15 rounded-full p-3 px-7 md:pr-2 items-center'>
                  <div className='flex items-center gap-5'>
                    <img src={logo} alt='logo' className='h-9 w-auto ml-2'/>
                    <span className='flex items-center'><input type='text' placeholder='🔍 Search' className='bg-lime-400 placeholder:text-gray-900/60 border border-white/15 px-4 py-2 rounded-md text-sm font-bold text-black hidden md:block
                       focus:outline-none focus:bg-gradient-to-r focus:from-lime-400 focus:to-green-700 transition-all duration-300'></input></span>
                  </div>
                  <div className='flex items-center justify-end gap-4 mr-5'>
                    <Button className='h-9 bg-gray-800 backdrop-blur-lg text-gray-700/80 hover:bg-gradient-to-r hover:from-lime-400 hover:to-green-700 hover:text-gray-800 transition duration-300' variant='primary'>Create</Button>

                    <UserIcon className='w-12 h-9 text-lime-400 border border-white/30 rounded-full'/>
                  </div>
                    
                </div>

            </div>
        {/* </div>
       */}
    </section>
  )
}

export default Header
