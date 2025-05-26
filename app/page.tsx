"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"

export default function HomePage() {
  // In a real app, this would come from an authentication context or API
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("JohnDoe")

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header isLoggedIn={isLoggedIn} username={username} />

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-24">
        <h2 className="text-4xl font-bold text-[#526e0c] mb-8">Upcoming Event</h2>

        {/* Demo toggle for logged in state */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="px-4 py-2 bg-[#526e0c] text-white rounded-md">
            {isLoggedIn ? "Simulate Logout" : "Simulate Login"}
          </button>
          {isLoggedIn && (
            <p className="mt-2 text-sm">
              Logged in as <strong>{username}</strong>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-[4/3] relative">
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="border-2 border-[#1e1e1e] p-4">
                    <div className="w-12 h-8 bg-[#1e1e1e] clip-path-triangle"></div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#1e1e1e]">Title</h3>
                <p className="text-sm text-[#1e1e1e]">Date:00/00/0000</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
