"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { StarRating } from "./star-rating"
import { Heart } from "lucide-react"

interface AnimeCardProps {
  id: string | number
  title: string
  posterUrl?: string
  averageRating: number
  reviewCount: number
  genre?: string
  isFavorited?: boolean
  onToggleFavorite?: (id: string | number) => void
}

export function AnimeCard({
  id,
  title,
  posterUrl,
  averageRating,
  reviewCount,
  genre,
  isFavorited,
  onToggleFavorite,
}: AnimeCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/anime/${id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {posterUrl ? (
          <Image
            src={posterUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <div className="text-2xl font-bold mb-2">アニメ</div>
              <div className="text-sm opacity-80">Anime Poster</div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#f74e6d] transition-colors">{title}</h3>

        {genre && <p className="text-sm text-gray-600 mb-2">{genre}</p>}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating rating={averageRating} size="sm" />
            <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {reviewCount} review{reviewCount !== 1 ? "s" : ""}
        </span>
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(id)
            }}
            className="mt-2"
          >
            <Heart className={`w-5 h-5 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
          </button>
        )}
      </div>
    </div>
  )
}
