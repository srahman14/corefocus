'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useThemeStore } from "../store/useThemeStore";
import Magnet from "./Magnet";
import { Home, Leaf, LogIn } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isDark, toggleTheme } = useThemeStore();

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100 && currentScrollY > lastScrollY) {
      setIsScrolled(true);
    } else if (currentScrollY < 50) {
      setIsScrolled(false);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


  return (
    <nav
      className={`transition-all duration-300 ease-in-out fixed top-0 left-1/2 transform -translate-x-1/2 ${
        isScrolled
          ? "w-10/14 mt-8 bg-gray-500/50 backdrop-blur shadow-lg rounded-3xl border border-transparent"
          : "w-10/14 mt-8 bg-gray-500/50 backdrop-blur border border-gray-500 rounded-3xl"
      } py-4 px-8 z-50`
        }
    > 
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <span className={`flex items-center gap-1 ${isDark ? "text-white" : "text-black"}`}>
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500/50 to-indigo-600 hover:from-purple-500/90 duration-300 transition-all ease-in-out flex items-center justify-center">
                  <Link href={'/'}>
                    <Leaf className="text-white"/>
                  </Link>
                </div>
                <p className="hidden md:flex tracking-tighter font-semibold text-2xl text-white"><i>C</i>orefocus</p>
          </span>
        </div>

        <ul className={`flex md:space-x-8 ${isDark ? "text-white" : "text-black"}`}>
          <li className="hover:text-[#b087fa]/60 text-[#fff] transition-all duration-300 ease-in-out cursor-pointer font-semibold tracking-tighter text-xl p-1">
            <Link href="/">
              <Home className="flex md:hidden" />
              <p className="hidden md:flex">Home</p>
            </Link>
          </li>
          <li className="hover:text-[#b087fa]/60 text-white transition-all duration-300 ease-in-out cursor-pointer font-semibold tracking-tighter text-xl p-1">
            <Link href="/login" prefetch={true}>
              <LogIn className="flex md:hidden" />
              <p className="hidden md:flex">Login</p>
            </Link>
          </li>
          {/* <button
          onClick={toggleTheme}
          className="px-3 cursor-pointer rounded-lg bg-violet-500 text-white hover:bg-violet-600"
          >            
            {isDark ? <i className="fa-jelly fa-regular fa-sun"></i> : <i className="fa-jelly fa-regular fa-moon"></i>}
          </button> */}
        </ul>
      </div>
    </nav>
  );
}