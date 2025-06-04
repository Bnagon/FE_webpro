"use client"

import { useState, useRef } from "react"
import { ImageIcon, X } from "lucide-react"
import Image from "next/image"

interface TweetComposerProps {
  onSubmittweet?: (content: string, imagesBase64: string[]) => void
  userId: string
  username: string
  onSubmitSuccess?: () => void
}



export function TweetComposer({ userId, username, onSubmittweet,onSubmitSuccess }: TweetComposerProps) {
  const [content, setContent] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files)
      setImages((prev) => [...prev, ...newImages])

      const newPreviews = newImages.map((file) => URL.createObjectURL(file))
      setImagePreviews((prev) => [...prev, ...newPreviews])
    }
  }

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index])
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const handleSubmit = async () => {
  if (!content.trim() && images.length === 0) return

  try {
    if (onSubmittweet) {
      const imagesBase64 = await Promise.all(images.map(toBase64))
      await onSubmittweet(content, imagesBase64)
    }

    imagePreviews.forEach(URL.revokeObjectURL)
    setContent("")
    setImages([])
    setImagePreviews([])

    if (onSubmitSuccess) onSubmitSuccess()
  } catch (err) {
    console.error("Tweet post failed:", err)
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

      {imagePreviews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={preview}
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
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            multiple
            className="hidden"
          />

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

