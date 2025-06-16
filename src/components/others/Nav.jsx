import Link from 'next/link';

const Nav = () => {
    return (
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ChatConnect
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">
              Features
            </Link>
            <Link href="#safety" className="text-gray-600 hover:text-purple-600 transition-colors">
              Safety
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-purple-600 transition-colors">
              About
            </Link>
          </div>
        </nav>
      </header>

    );
}

export default Nav;
