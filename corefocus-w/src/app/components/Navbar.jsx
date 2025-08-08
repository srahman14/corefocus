'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useThemeStore } from "../store/useThemeStore";
import Magnet from "./Magnet";

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
            {/* <img src="/logo.svg" className="w-14 rounded-lg"></img> */}
            <p className="tracking-tighter font-semibold text-2xl text-[#b087fa]"><i>c</i>orefocus</p>
          </span>
        </div>

        <ul className={`flex space-x-8 ${isDark ? "text-white" : "text-black"}`}>
          <li className="hover:text-[#b087fa]/60 text-[#b087fa] transition-all duration-300 ease-in-out cursor-pointer font-semibold tracking-tighter text-xl p-1">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-[#b087fa]/60 text-[#b087fa] transition-all duration-300 ease-in-out cursor-pointer font-semibold tracking-tighter text-xl p-1">
            <Link href="/">Plans</Link>
          </li>
          <li className="hover:text-[#b087fa]/60 text-[#b087fa] transition-all duration-300 ease-in-out cursor-pointer font-semibold tracking-tighter text-xl p-1">
            <Link href="/login">Login</Link>
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