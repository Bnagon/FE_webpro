"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, X } from "lucide-react"
import Image from "next/image"

interface ProfileEditFormProps {
  initialData: {
    username: string
    email: string
    bio: string
    location: string
  }
  onSave: (data: any) => void
  onCancel: () => void
}

export function ProfileEditForm({ initialData, onSave, onCancel }: ProfileEditFormProps) {
  const [formData, setFormData] = useState(initialData)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatar(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleRemoveAvatar = () => {
    setAvatar(null)
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview)
      setAvatarPreview("")
    }
  }

  const handleSave = () => {
    onSave({
      ...formData,
      avatar,
    })

    // Clean up object URL
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview)
    }
  }

  const handleCancel = () => {
    // Clean up object URL
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview)
    }
    onCancel()
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-[#f74e6d]">
      <h3 className="text-xl font-bold mb-6">Edit Profile</h3>

      <div className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-[#d9d9d9] rounded-full overflow-hidden">
              {avatarPreview ? (
                <Image
                  src={avatarPreview || "/placeholder.svg"}
                  alt="Avatar preview"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            {avatarPreview && (
              <button
                onClick={handleRemoveAvatar}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <div>
            <input type="file" ref={fileInputRef} onChange={handleAvatarSelect} accept="image/*" className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              <Camera className="w-4 h-4" />
              Change Photo
            </button>
          </div>
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:border-transparent"
          />
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:border-transparent"
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:border-transparent"
            placeholder="Where are you located?"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-full bg-[#f74e6d] text-white hover:bg-[#f74e6d]/90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
