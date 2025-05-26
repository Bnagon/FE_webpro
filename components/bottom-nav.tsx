"use client"

import { Home, Calendar, Heart, User, LogOut } from "lucide-react"

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl py-4">
      <div className="container mx-auto flex justify-center items-center gap-10">
        <button className="p-2">
          <Home className="w-6 h-6 text-[#939ea2]" />
        </button>
        <button className="p-2 bg-[#a9d196] rounded-full">
          <Calendar className="w-6 h-6 text-[#526e0c]" />
        </button>
        <button className="p-2">
          <Heart className="w-6 h-6 text-[#939ea2]" />
        </button>
        <button className="p-2">
          <User className="w-6 h-6 text-[#939ea2]" />
        </button>
        <button className="p-2">
          <LogOut className="w-6 h-6 text-[#939ea2]" />
        </button>
      </div>
    </div>
  )
}
