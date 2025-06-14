"use client"

import { loginUser } from "@/services/api"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, password })
    const res = await loginUser({ email, password })
    if(res.data){
      localStorage.setItem("token", res.data)
    }
    router.push("/tweet")
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fce4ec" }}>
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/tweet" className="inline-block hover:opacity-80 transition-opacity">
            <img src="/logo.svg" alt="Komyuniti" className="h-12 w-auto sm:h-14 md:h-16 lg:h-18 mx-auto" />
          </Link>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-[#F394A9]">
          <div className="mb-6">
            <button onClick={() => router.back()} className="mb-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold mb-2">Sign in</h2>
            <p className="text-gray-600">Don&#39;t have an account{" "}
              <Link href="/signup" className="text-[#f74e6d] font-medium">
                Sign Up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:bg-white transition-colors pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-linear-to-r from-[#F2A9BB] to-[#F74E6D] text-white rounded-full font-medium hover:bg-[#f74e6d]/90 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
