"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { handleregister } from "../../lib/register.js"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    } else {
      router.back()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
      await handleregister(formData)
      router.push("/login")
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

        {/* Sign Up Form */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-[#F394A9]">
          <div className="mb-6">
            <button onClick={handleBack} className="mb-4">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold mb-2">Sign up</h2>
            <p className="text-gray-600">
              have an account{" "}
              <Link href="/login" className="text-[#f74e6d] font-medium">
                Sign In
              </Link>
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="email"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:bg-white transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  placeholder="Username"
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:bg-white transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-linear-to-r from-[#F2A9BB] to-[#F74E6D] text-white rounded-full font-medium hover:bg-[#f74e6d]/90 transition-colors"
              >
                Next
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    placeholder="confirm password"
                    className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:bg-white transition-colors pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-linear-to-r from-[#F2A9BB] to-[#F74E6D] text-white rounded-full font-medium hover:bg-[#f74e6d]/90 transition-colors"
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
