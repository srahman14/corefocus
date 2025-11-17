import Link from "next/link"

export default function Footer() {
    return (
      // border-2 border-t-gray-200 border-b-0 border-l-0 border-r-0
      <footer className="bg-black text-white py-20 border-2 border-b-0 border-l-0 border-r-0 border-t-gray-200">
        <div className="container mx-auto flex justify-around md:justify-between">
          <div className="flex flex-col space-y-1">
            <h2 className="font-semibold mb-4">Pages</h2>
            <Link href="/" className="hover:underline text-white font-light">Home</Link>
            <Link href="/signup" className="hover:underline text-white font-light">Sign Up</Link>
            <Link href="/login" className="hover:underline text-white font-light">Login</Link>
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="font-semibold mb-4">Contact</h2>
            <span>
              <i className="fa-brands fa-linkedin text-gray-400 mr-1"></i>
              <a href="#" className="text-white font-light hover:text-gray-500 cursor-pointer">LinkedIn</a>
            </span>

            <span>
              <i className="fa-brands fa-github text-gray-400 mr-1"></i>
              <a href="#" className="text-white font-light hover:text-gray-500 cursor-pointer">Github</a>
            </span>
          </div>

          <div className="flex flex-col space-y-4">
            <h2 className="font-semibold mb-4">Legal</h2>
            <a href="/" className="hover:underline text-white font-light">Terms and conditions</a>
            <a href="/blog" className="hover:underline text-white font-light">Privacy policy</a>
            <p className="text-white font-light max-w-46 tracking-tighter">Corefocus is not affiliated with any organistaion and is independent</p>
            <p className="text-white max-w-46 font-normal tracking-tighter">Copyright &copy; 2025 - All rights reserved</p>

          </div>

        </div>
      </footer>
    )
  }
  