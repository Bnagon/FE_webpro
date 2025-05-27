"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageCircle, Heart, Edit3, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { TweetEditForm } from "./tweet-edit-form"

interface TweetPostProps {
  id?: string | number
  username?: string
  date?: string
  content?: string
  commentCount?: number
  likeCount?: number
  images?: string[]
  avatarUrl?: string
  isDetailView?: boolean
  initialLiked?: boolean
  onUnlike?: (id: string | number) => void
  onEdit?: (id: string | number, content: string, images: File[]) => void
  currentUser?: string
  isEdited?: boolean
}

export function TweetPost({
  id = "1",
  username = "Username",
  date = "00/00/0000",
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere.",
  commentCount = 0,
  likeCount = 0,
  images = [],
  avatarUrl,
  isDetailView = false,
  initialLiked = false,
  onUnlike,
  onEdit,
  currentUser,
  isEdited = false,
}: TweetPostProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [liked, setLiked] = useState(initialLiked)
  const [localLikeCount, setLocalLikeCount] = useState(likeCount)
  const [isEditing, setIsEditing] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  // Check if the current user owns this tweet
  const isOwnTweet = currentUser === username

  // Update liked state if initialLiked changes
  useEffect(() => {
    setLiked(initialLiked)
  }, [initialLiked])

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigation when clicking the like button

    // If we're on the favorites page and unliking a tweet
    if (pathname?.includes("/favorites") && liked && onUnlike) {
      onUnlike(id)
      return
    }

    if (liked) {
      setLocalLikeCount(localLikeCount - 1)
    } else {
      setLocalLikeCount(localLikeCount + 1)
    }
    setLiked(!liked)
  }

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigation when clicking the comment button
    if (!isDetailView) {
      router.push(`/tweet/${id}`)
    }
  }

  const handleTweetClick = () => {
    if (!isDetailView && !isEditing) {
      router.push(`/tweet/${id}`)
    }
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
    setShowMenu(false)
  }

  const handleEditSave = (newContent: string, newImages: File[]) => {
    if (onEdit) {
      onEdit(id, newContent, newImages)
    }
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setIsEditing(false)
  }

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowMenu(!showMenu)
  }

  if (isEditing) {
    return (
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#d9d9d9] rounded-full flex-shrink-0 overflow-hidden">
            {avatarUrl ? (
              <Image
                src={avatarUrl || "/placeholder.svg"}
                alt={username}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <div>
            <h2 className="text-xl font-bold">{username}</h2>
            <p className="text-sm text-gray-600">Date: {date}</p>
          </div>
        </div>
        <TweetEditForm
          initialContent={content}
          initialImages={images}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      </div>
    )
  }

  return (
    <div className={`mb-8 ${!isDetailView ? "cursor-pointer hover:opacity-95" : ""}`} onClick={handleTweetClick}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#d9d9d9] rounded-full flex-shrink-0 overflow-hidden">
          {avatarUrl ? (
            <Image
              src={avatarUrl || "/placeholder.svg"}
              alt={username}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{username}</h2>
              <p className="text-sm text-gray-600">
                Date: {date}
                {isEdited && <span className="ml-2 text-xs text-gray-500">(edited)</span>}
              </p>
            </div>
            {isOwnTweet && (
              <div className="relative">
                <button
                  onClick={handleMenuClick}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Tweet options"
                >
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-10 border">
                    <button
                      onClick={handleEditClick}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-3xl p-6">
        <p>{content}</p>

        {images && images.length > 0 && (
          <div className={`grid grid-cols-${Math.min(images.length, 2)} gap-4 mt-6`}>
            {images.map((image, index) => (
              <div key={index} className="border border-[#000000] rounded-md p-2 flex items-center justify-center">
                {image === "placeholder" ? (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" fill="white" />
                    <path d="M10 25L16 18L20 22L30 10" stroke="black" strokeWidth="2" />
                    <path d="M10 30L20 20L30 30" stroke="black" strokeWidth="2" />
                  </svg>
                ) : (
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Post image ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-2 gap-4">
        <button
          className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors"
          onClick={handleCommentClick}
        >
          <MessageCircle className="h-5 w-5" />
          {commentCount > 0 && <span>{commentCount}</span>}
        </button>
        <button
          className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
          onClick={handleLike}
        >
          <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          {localLikeCount > 0 && <span>{localLikeCount}</span>}
        </button>
      </div>
    </div>
  )
}
