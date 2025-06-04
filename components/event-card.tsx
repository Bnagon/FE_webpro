"use client"

import type React from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"

interface EventCardProps {
  id?: string | number
  title?: string
  date?: string
  imageUrl?: string
  href?: string
  isFavorited?: boolean
  onToggleFavorite?: (id: string | number) => void
  currentUserId?: string
}

export function EventCard({
  id = "1",
  title = "Title",
  date = "00/00/0000",
  imageUrl,
  isFavorited = false,
  onToggleFavorite,
  currentUserId = "user_john", // Default for demo
}: EventCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/event/${id}`)
  }

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigation when clicking favorite button

    if (onToggleFavorite) {
      onToggleFavorite(id)
    }

    // In a real app, you would call the API to add/remove like
    try {
      if (!isFavorited) {
        // Add like
        /*
        await fetch('/api/likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: currentUserId,
            content_type: 'event',
            content_id: id
          })
        })
        */
        console.log(`Adding like: user_id=${currentUserId}, content_type=event, content_id=${id}`)
      } else {
        // Remove like
        /*
        await fetch('/api/likes', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: currentUserId,
            content_type: 'event',
            content_id: id
          })
        })
        */
        console.log(`Removing like: user_id=${currentUserId}, content_type=event, content_id=${id}`)
      }
    } catch (error) {
      console.error("Error updating like:", error)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="block bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative"
    >
      <div className="aspect-[4/3] relative">
        {imageUrl ? (
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="border-2 border-[#1e1e1e] p-4">
              <div className="w-12 h-8 bg-[#1e1e1e] clip-path-triangle"></div>
            </div>
          </div>
        )}

        {/* Favorite button */}
        {onToggleFavorite && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <Heart className={`w-5 h-5 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-[#1e1e1e]">{title}</h3>
        <p className="text-sm text-[#1e1e1e]">Date: {date}</p>
      </div>
    </div>
  )
}
