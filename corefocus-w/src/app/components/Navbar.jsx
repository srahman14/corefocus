'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      className={`transition-all duration-400 fixed top-0 left-1/2 transform -translate-x-1/2 ${
        isScrolled
          ? "w-11/12 mt-4 bg-gray-500/50 backdrop-blur shadow-lg rounded-lg border-b-2 border-b-transparent"
          : "w-full mt-2 bg-transparent border-b-2 border-b-gray-200"
      } py-4 px-8 z-50`}
    >
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <span className="flex items-center gap-1">
            <img src="/logo.svg" className="w-8 rounded-lg"></img>
            <p className="tracking-tighter font-semibold">CoreFocus</p>
          </span>
        </div>

        <ul className="flex space-x-8">
          <li className="hover:text-blue-600 transition-all cursor-pointer font-semibold tracking-tighter text-lg p-1">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer font-semibold tracking-tighter text-lg p-1">
            <Link href="/">Plans</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer font-semibold tracking-tighter text-lg p-1">
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}