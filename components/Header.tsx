"use client";

import Link from "next/link";
import Image from "next/image";
export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/image.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </Link>

                    <nav className="flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/create-bot"
                            className="text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                            Tạo Chatbot
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
