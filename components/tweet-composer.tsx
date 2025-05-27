"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ImageIcon, X } from "lucide-react"
import Image from "next/image"

interface TweetComposerProps {
  onSubmit?: (content: string, images: File[]) => void
}

export function TweetComposer({ onSubmit }: TweetComposerProps) {
  const [content, setContent] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files)
      setImages((prev) => [...prev, ...newImages])

      // Create preview URLs
      const newPreviews = newImages.map((file) => URL.createObjectURL(file))
      setImagePreviews((prev) => [...prev, ...newPreviews])
    }
  }

  const handleRemoveImage = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviews[index])

    // Remove the image and its preview
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (content.trim() || images.length > 0) {
      onSubmit?.(content, images)

      // Clear form after submission
      setContent("")

      // Revoke all object URLs
      imagePreviews.forEach(URL.revokeObjectURL)

      setImages([])
      setImagePreviews([])
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <textarea
        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:border-transparent"
        placeholder="What's happening?"
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      {/* Image Previews */}
      {imagePreviews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={preview || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            multiple
            className="hidden"
          />

          {/* Button to trigger file input */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-full text-[#f74e6d] hover:bg-[#f74e6d]/10 transition-colors"
            aria-label="Add image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!content.trim() && images.length === 0}
          className="px-6 py-2 rounded-full bg-[#f74e6d] text-white hover:bg-[#f74e6d]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Tweet
        </button>
      </div>
    </div>
  )
}
