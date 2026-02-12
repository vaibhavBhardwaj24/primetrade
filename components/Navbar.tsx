'use client';

import Link from 'next/link';
import { useAuth } from './AuthProvider';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-blue-400">
                    PrimeTrade
                </Link>
                <div className="space-x-4">
                    {user ? (
                        <>
                            <Link href="/dashboard" className="hover:text-blue-300 transition">
                                Dashboard
                            </Link>
                            {user.role === 'ADMIN' && (
                                <span className="text-xs bg-red-600 px-2 py-1 rounded">ADMIN</span>
                            )}
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="hover:text-blue-300 transition">
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
