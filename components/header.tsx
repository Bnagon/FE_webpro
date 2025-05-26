"use client"

import { Search, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface HeaderProps {
  isLoggedIn?: boolean
  username?: string
}

export function Header({ isLoggedIn = false, username = "User" }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <>
      {/* Header */}
      <header className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-serif tracking-tight">
            <span className="block leading-none">Komyu</span>
            <span className="block leading-none">niti</span>
          </h1>
          <div className="ml-2 w-8 h-8 relative">
            <div className="absolute w-6 h-6 bg-[#563b23] rounded-full bottom-0 left-0"></div>
            <div className="absolute w-6 h-6 bg-[#f74e6d] rounded-full top-0 right-0"></div>
          </div>
        </div>

        <div className="relative max-w-md w-full mx-4 hidden md:block">
          <div className="flex items-center bg-white rounded-full px-4 py-2">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input type="text" placeholder="Search" className="bg-transparent border-none outline-none flex-grow" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f74e6d] text-white hover:bg-[#f74e6d]/90 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>{username}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    onClick={() => {
                      // In a real app, this would call a logout function
                      alert("Logout functionality would go here")
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-6 py-2 rounded-full border border-[#f74e6d] text-[#f74e6d] hover:bg-[#f74e6d]/10 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2 rounded-full bg-[#f74e6d] text-white hover:bg-[#f74e6d]/90 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden px-4 mb-6">
        <div className="flex items-center bg-white rounded-full px-4 py-2">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input type="text" placeholder="Search" className="bg-transparent border-none outline-none flex-grow" />
        </div>
      </div>
    </>
  )
}
