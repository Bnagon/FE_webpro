"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

interface EventCardProps {
  id?: string | number
  title?: string
  date?: string
  imageUrl?: string
  href?: string
}

export function EventCard({ id = "1", title = "Title", date = "00/00/0000", imageUrl }: EventCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/event/${id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="block bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
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
      </div>
      <div className="p-4">
        <h3 className="font-bold text-[#1e1e1e]">{title}</h3>
        <p className="text-sm text-[#1e1e1e]">Date: {date}</p>
      </div>
    </div>
  )
}
