
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600 font-['Pacifico']">
              logo
            </div>
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              Dashboard
            </Link>
            <Link href="/create-bot" className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
              Tạo Chatbot
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
