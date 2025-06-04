"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { TweetPost } from "@/components/tweet-post"
import { TweetComposer } from "@/components/tweet-composer"
import { useSearchParams } from "next/navigation"

// Sample tweet data with like counts
const initialTweets = [
  {
    id: 1,
    username: "JaneDoe",
    userId: "user_jane",
    date: "05/22/2023",
    content: "Just attended an amazing workshop on sustainable living! Can't wait to implement what I learned.",
    commentCount: 11,
    likeCount: 24, // Total likes from all users
    images: [],
    isEdited: false,
  },
  {
    id: 2,
    username: "TechGuru",
    userId: "user_tech",
    date: "05/21/2023",
    content: "Check out these photos from the tech conference! The new innovations were mind-blowing.",
    commentCount: 2,
    likeCount: 15, // Total likes from all users
    images: ["placeholder", "placeholder"],
    isEdited: false,
  },
  {
    id: 3,
    username: "TravelExplorer",
    userId: "user_travel",
    date: "05/20/2023",
    content: "Just got back from my trip to Japan. The cherry blossoms were absolutely breathtaking!",
    commentCount: 8,
    likeCount: 42, // Total likes from all users
    images: ["placeholder"],
    isEdited: false,
  },
]

// Sample likes data to determine if current user liked each tweet
const sampleLikes = [
  { id: 1, user_id: "user_john", content_type: "tweet", content_id: 2, liked_at: "2023-05-22T10:30:00Z" },
  { id: 2, user_id: "user_john", content_type: "tweet", content_id: 3, liked_at: "2023-05-21T15:45:00Z" },
  // Other users' likes
  { id: 3, user_id: "user_jane", content_type: "tweet", content_id: 1, liked_at: "2023-05-20T09:15:00Z" },
  { id: 4, user_id: "user_tech", content_type: "tweet", content_id: 1, liked_at: "2023-05-19T14:20:00Z" },
]

export default function TweetPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("JohnDoe")
  const [userId, setUserId] = useState("user_john")
  const [tweets, setTweets] = useState(initialTweets)

  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  const filteredTweets = searchQuery
    ? tweets.filter(
        (tweet) =>
          tweet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tweet.username.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : tweets

  // Function to check if current user liked a tweet
  const isLikedByCurrentUser = (tweetId: number) => {
    return sampleLikes.some(
      (like) => like.user_id === userId && like.content_type === "tweet" && like.content_id === tweetId,
    )
  }

  const handleTweetSubmit = (content: string, images: File[]) => {
    const imagePlaceholders = images.map(() => "placeholder")

    const newTweet = {
      id: Date.now(),
      username,
      userId,
      date: new Date()
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "/"),
      content,
      commentCount: 0,
      likeCount: 0, // New tweets start with 0 likes
      images: imagePlaceholders,
      isEdited: false,
    }

    setTweets([newTweet, ...tweets])

    /*
    // In a real app, you would send this data to your API:
    const tweetData = {
      user_id: userId,
      username: username,
      content: content,
      images: images,
      created_at: new Date().toISOString()
    }
    
    fetch('/api/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweetData)
    })
    */
  }

  const handleTweetEdit = (tweetId: string | number, newContent: string, newImages: File[]) => {
    const imagePlaceholders = newImages.map(() => "placeholder")

    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              content: newContent,
              images: [...tweet.images, ...imagePlaceholders],
              isEdited: true,
            }
          : tweet,
      ),
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header/>

      <main className="container mx-auto px-4 py-6 max-w-3xl pb-24">
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="px-4 py-2 bg-[#526e0c] text-white rounded-md">
            {isLoggedIn ? "Simulate Logout" : "Simulate Login"}
          </button>
          {isLoggedIn && (
            <p className="mt-2 text-sm">
              Logged in as <strong>{username}</strong> (ID: {userId})
            </p>
          )}
        </div>

        {isLoggedIn && (
          <div className="mb-8">
            <TweetComposer onSubmittweet={handleTweetSubmit} />
          </div>
        )}

        {searchQuery && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">Showing results for: "{searchQuery}"</h2>
            <p className="text-sm text-gray-600">
              {filteredTweets.length} tweet{filteredTweets.length !== 1 ? "s" : ""} found
            </p>
          </div>
        )}

        {/* Tweet Feed with proper like counts and user like status */}
        {filteredTweets.map((tweet) => (
          <TweetPost
            key={tweet.id}
            id={tweet.id}
            username={tweet.username}
            date={tweet.date}
            content={tweet.content}
            commentCount={tweet.commentCount}
            likeCount={tweet.likeCount} // Total likes from all users
            images={tweet.images}
            currentUser={isLoggedIn ? username : undefined}
            currentUserId={isLoggedIn ? userId : undefined}
            initialLiked={isLoggedIn ? isLikedByCurrentUser(tweet.id) : false} // Whether current user liked it
            onEdit={handleTweetEdit}
            isEdited={tweet.isEdited}
          />
        ))}

        {searchQuery && filteredTweets.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No tweets found for "{searchQuery}"</p>
            <p className="text-gray-400 text-sm mt-2">Try searching with different keywords</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
