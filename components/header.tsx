"use client"

import type React from "react"

import { Search, User, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface HeaderProps {
  isLoggedIn?: boolean
  username?: string
}

export function Header({ isLoggedIn = false, username = "User" }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [searchType, setSearchType] = useState<"tweet" | "event">("tweet")
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      if (searchType === "tweet") {
        router.push(`/tweet?search=${encodeURIComponent(searchQuery.trim())}`)
      } else {
        router.push(`/event?search=${encodeURIComponent(searchQuery.trim())}`)
      }
    }
  }

  return (
    <>
      {/* Header */}
      <header className="container mx-auto py-4 px-4 flex items-center justify-between">
        <Link href="/tweet" className="flex items-center hover:opacity-80 transition-opacity">
          <img src="/logo.svg" alt="Komyuniti" className="h-8 w-auto sm:h-10 md:h-12 lg:h-14" />
        </Link>

        <div className="relative max-w-md w-full mx-4 hidden md:block">
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full">
            {/* Menu dropdown for search type */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSearchDropdownOpen(!isSearchDropdownOpen)}
                className="flex items-center px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {isSearchDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-10 border">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchType("tweet")
                      setIsSearchDropdownOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      searchType === "tweet" ? "bg-gray-50 font-medium" : ""
                    }`}
                  >
                    Tweet
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchType("event")
                      setIsSearchDropdownOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      searchType === "event" ? "bg-gray-50 font-medium" : ""
                    }`}
                  >
                    Event
                  </button>
                </div>
              )}
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${searchType}s...`}
              className="bg-transparent border-none outline-none flex-grow px-2 py-2"
            />
            <button type="submit" className="p-2">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#F2A9BB] to-[#F74E6D] text-white hover:bg-[#f74e6d]/90 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>{username}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
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
                className="px-6 py-2 rounded-full border-2 border-[#f74e6d] text-[#f74e6d] hover:bg-[#f74e6d]/10 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2 rounded-full bg-linear-to-r from-[#F2A9BB] to-[#F74E6D] text-white hover:bg-[#f74e6d]/90 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden px-4 mb-6">
        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full">
          {/* Menu dropdown for search type */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSearchDropdownOpen(!isSearchDropdownOpen)}
              className="flex items-center px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {isSearchDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-10 border">
                <button
                  type="button"
                  onClick={() => {
                    setSearchType("tweet")
                    setIsSearchDropdownOpen(false)
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    searchType === "tweet" ? "bg-gray-50 font-medium" : ""
                  }`}
                >
                  Tweet
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchType("event")
                    setIsSearchDropdownOpen(false)
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    searchType === "event" ? "bg-gray-50 font-medium" : ""
                  }`}
                >
                  Event
                </button>
              </div>
            )}
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${searchType}s...`}
            className="bg-transparent border-none outline-none flex-grow px-2 py-2"
          />
          <button type="submit" className="p-2">
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        </form>
      </div>
    </>
  )
}
