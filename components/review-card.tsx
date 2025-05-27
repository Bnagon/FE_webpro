import { StarRating } from "./star-rating"

interface ReviewCardProps {
  username: string
  rating: number
  reviewText: string
  date: string
  avatarUrl?: string
}

export function ReviewCard({ username, rating, reviewText, date, avatarUrl }: ReviewCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-[#d9d9d9] rounded-full flex-shrink-0 overflow-hidden">
          {avatarUrl && (
            <img src={avatarUrl || "/placeholder.svg"} alt={username} className="w-full h-full object-cover" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h4 className="font-semibold">{username}</h4>
              <StarRating rating={rating} size="sm" />
            </div>
            <span className="text-sm text-gray-500">{date}</span>
          </div>

          <p className="text-gray-700 leading-relaxed">{reviewText}</p>
        </div>
      </div>
    </div>
  )
}
