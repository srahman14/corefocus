import Link from "next/link"

export default function Footer() {
    return (
      <footer className="bg-gray-50 text-gray p-4 border-2 border-t-gray-200 border-b-0 border-l-0 border-r-0 mt-20">
        <div className="container mx-auto flex justify-between">
          <div className="flex flex-col space-y-1">
            <h2 className="font-semibold mb-4">Pages</h2>
            <Link href="/" className="hover:underline text-gray-800 font-light">Home</Link>
            <Link href="/blog" className="hover:underline text-gray-800 font-light">Blog</Link>
            <Link href="/signup" className="hover:underline text-gray-800 font-light">Sign Up</Link>
            <Link href="/login" className="hover:underline text-gray-800 font-light">Login</Link>
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="font-semibold mb-4">Contact</h2>
            <span>
              <i className="fa-brands fa-linkedin text-gray-400 mr-1"></i>
              <a href="#" className="text-gray-800 font-light hover:text-gray-500 cursor-pointer">LinkedIn</a>
            </span>

            <span>
              <i className="fa-brands fa-github text-gray-400 mr-1"></i>
              <a href="#" className="text-gray-800 font-light hover:text-gray-500 cursor-pointer">Github</a>
            </span>
          </div>

          <div className="flex flex-col space-y-4">
            <h2 className="font-semibold mb-4">Legal</h2>
            <a href="/" className="hover:underline text-gray-800 font-light">Terms and conditions</a>
            <a href="/blog" className="hover:underline text-gray-800 font-light">Privacy policy</a>
            <p className="text-gray-800 font-light max-w-46 tracking-tighter">The Daily Scribbler is not affiliated with any news organistaion</p>
            <p className="text-gray-800 max-w-46 font-normal tracking-tighter">Copyright &copy; 2025 - All rights reserved</p>

          </div>

          <div className="flex flex-col space-x-4">
            <h2 className="font-semibold mb-4">Platforms</h2>
            <p>Coming soon!</p>
          </div>
        </div>
      </footer>
    )
  }
  