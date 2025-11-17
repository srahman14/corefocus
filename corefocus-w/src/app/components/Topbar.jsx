import React from 'react'
import { useAuth } from '../context/AuthContext'
import { format, startOfMonth, endOfMonth } from "date-fns";
import { AnimatedThemeToggler } from './magicui/animated-theme-toggler';
import NavigationDrawer from './NavigationDrawer';
const Topbar = () => {
    const { currentUser, logout, userData } = useAuth();
    let name = userData?.username;
    if(name) {
         name = capitalizeFirstLetter(name)
    } 

    return (    
      <div className="px-2 sm:px-3 md:px-4 lg:px-6 py-3 sm:py-4 md:py-5 lg:py-6 w-[85%] md:w-full flex flex-row justify-start md:justify-between items-start gap-2 sm:gap-4 md:gap-6 lg:gap-12 border-b border-white/10">
        <div className="dark:text-white text-black font-bold min-w-fit">
          <p className='text-xs sm:text-sm md:text-lg lg:text-xl font-bold tracking-tight'>Logged in: {name}</p>
          <h1 className="text-black dark:text-white text-xs sm:text-sm md:text-base">{format(new Date(), "dd MMM yyyy")}</h1>
        </div>
        <div className="flex flex-row items-center gap-1.5 sm:gap-2 md:gap-3 text-violet-400 ml-auto flex-shrink-0">
            <AnimatedThemeToggler className={'bg-white hover:bg-white/90 ease-in-out duration-200 p-1 rounded-lg text-purple-900 cursor-pointer text-sm sm:text-base'} />
          <button onClick={logout}>
            <i className="fa-solid fa-right-from-bracket text-sm sm:text-base md:text-lg cursor-pointer bg-white hover:bg-white/90 ease-in-out duration-200 text-purple-900 p-2 rounded-lg"></i>
          </button>
            <NavigationDrawer />
        </div>
      </div>
  )
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default Topbar
