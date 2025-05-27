"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ImageIcon, X } from "lucide-react"
import Image from "next/image"

interface TweetEditFormProps {
  initialContent: string
  initialImages: string[]
  onSave: (content: string, images: File[]) => void
  onCancel: () => void
}

export function TweetEditForm({ initialContent, initialImages, onSave, onCancel }: TweetEditFormProps) {
  const [content, setContent] = useState(initialContent)
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialImages)
  const [removedImages, setRemovedImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files)
      setImages((prev) => [...prev, ...newImages])

      // Create preview URLs for new images
      const newPreviews = newImages.map((file) => URL.createObjectURL(file))
      setImagePreviews((prev) => [...prev, ...newPreviews])
    }
  }

  const handleRemoveImage = (index: number) => {
    const imageToRemove = imagePreviews[index]

    // If it's an existing image (not a new upload), track it as removed
    if (initialImages.includes(imageToRemove)) {
      setRemovedImages((prev) => [...prev, imageToRemove])
    } else {
      // If it's a new upload, revoke the object URL
      URL.revokeObjectURL(imageToRemove)
      // Remove from the new images array
      const newImageIndex = imagePreviews.slice(initialImages.length).indexOf(imageToRemove)
      if (newImageIndex !== -1) {
        setImages((prev) => prev.filter((_, i) => i !== newImageIndex))
      }
    }

    // Remove from previews
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    onSave(content, images)

    // Clean up object URLs for new images
    imagePreviews.forEach((preview) => {
      if (!initialImages.includes(preview)) {
        URL.revokeObjectURL(preview)
      }
    })
  }

  const handleCancel = () => {
    // Clean up object URLs for new images
    imagePreviews.forEach((preview) => {
      if (!initialImages.includes(preview)) {
        URL.revokeObjectURL(preview)
      }
    })
    onCancel()
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-[#f74e6d]">
      <h3 className="text-lg font-bold mb-4">Edit Tweet</h3>

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
                {preview === "placeholder" ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" fill="white" />
                      <path d="M10 25L16 18L20 22L30 10" stroke="black" strokeWidth="2" />
                      <path d="M10 30L20 20L30 30" stroke="black" strokeWidth="2" />
                    </svg>
                  </div>
                ) : (
                  <Image
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                )}
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

        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="px-6 py-2 rounded-full bg-[#f74e6d] text-white hover:bg-[#f74e6d]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
