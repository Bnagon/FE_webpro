"use client";

import type React from "react";

import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { StarRating } from "./star-rating";

interface AnimeCardProps {
  id: string | number;
  title: string;
  posterUrl?: string;
  rating: number;
  reviewCount: number;
  genre?: string;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string | number) => void;
  currentUserId?: string;
}

export function AnimeCard({
  id,
  title,
  posterUrl,
  rating,
  reviewCount,
  genre,
  isFavorited,
  onToggleFavorite,
  currentUserId = "user_john", // Default for demo
}: AnimeCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/anime/${id}`);
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking favorite button

    if (onToggleFavorite) {
      onToggleFavorite(id);
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
            content_type: 'anime',
            content_id: id
          })
        })
        */
        console.log(
          `Adding like: user_id=${currentUserId}, content_type=anime, content_id=${id}`
        );
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
            content_type: 'anime',
            content_id: id
          })
        })
        */
        console.log(
          `Removing like: user_id=${currentUserId}, content_type=anime, content_id=${id}`
        );
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };
  useEffect(() => {
    console.log(`rating: ${rating}`);
  }, []);

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group relative"
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

        {/* Favorite button */}
        {onToggleFavorite && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-[#f74e6d] transition-colors">
          {title}
        </h3>

        {genre && <p className="text-sm text-gray-600 mb-2">{genre}</p>}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating rating={rating} size="sm" />
            {/* <span className="text-sm font-medium">{averageRating.toFixed(1)}</span> */}
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {reviewCount} review{reviewCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
