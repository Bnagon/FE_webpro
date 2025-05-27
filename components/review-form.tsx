"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { StarRating } from "./star-rating"

interface ReviewFormProps {
  animeTitle: string
  onSubmit: (rating: number, reviewText: string) => void
  onClose: () => void
}

export function ReviewForm({ animeTitle, onSubmit, onClose }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating > 0 && reviewText.trim()) {
      onSubmit(rating, reviewText)
      setRating(0)
      setReviewText("")
    }
  }

  const isFormValid = rating > 0 && reviewText.trim().length > 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Write a Review</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-gray-700 mb-2">{animeTitle}</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Your Rating*</label>
            <div className="flex items-center gap-2">
              <StarRating rating={rating} size="lg" interactive={true} onRatingChange={setRating} />
              {rating > 0 && <span className="text-sm text-gray-600 ml-2">{rating} out of 5 stars</span>}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-2">
              Your Review*
            </label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:border-transparent"
              placeholder="Share your thoughts about this anime..."
              required
            />
            <div className="text-right text-sm text-gray-500 mt-1">{reviewText.length}/500</div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="flex-1 py-3 bg-[#f74e6d] text-white rounded-full hover:bg-[#f74e6d]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
