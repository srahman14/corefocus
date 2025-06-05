'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100 && currentScrollY > lastScrollY) {
      setIsScrolled(true);
    } else if (currentScrollY < 100 || currentScrollY < lastScrollY) {
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
          ? "w-11/12 mt-4 bg-gray-500/50 backdrop-blur shadow-lg rounded-lg"
          : "w-full mt-2 bg-transparent border-2 border-b-gray-200 border-t-0 border-l-0 border-r-0"
      } py-4 px-8 z-50`}
    >
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>

        <ul className="flex space-x-8">
          <li className="hover:text-blue-600 transition-all cursor-pointer font-semibold tracking-tighter text-lg p-1">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer font-semibold tracking-tighter text-lg p-1">
            <Link href="/blog">Blogs</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer font-semibold tracking-tighter text-lg p-1">
            <Link href="/blog/new">Create</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}