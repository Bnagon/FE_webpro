"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { TweetPost } from "@/components/tweet-post"
import { TweetComposer } from "@/components/tweet-composer"
import { useSearchParams } from "next/navigation"

// Sample tweet data
const initialTweets = [
  {
    id: 1,
    username: "JaneDoe",
    date: "05/22/2023",
    content: "Just attended an amazing workshop on sustainable living! Can't wait to implement what I learned.",
    commentCount: 11,
    likeCount: 24,
    images: [],
    isEdited: false,
  },
  {
    id: 2,
    username: "TechGuru",
    date: "05/21/2023",
    content: "Check out these photos from the tech conference! The new innovations were mind-blowing.",
    commentCount: 2,
    likeCount: 15,
    images: ["placeholder", "placeholder"],
    isEdited: false,
  },
  {
    id: 3,
    username: "TravelExplorer",
    date: "05/20/2023",
    content: "Just got back from my trip to Japan. The cherry blossoms were absolutely breathtaking!",
    commentCount: 8,
    likeCount: 42,
    images: ["placeholder"],
    isEdited: false,
  },
]

export default function TweetPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("JohnDoe")
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

  const handleTweetSubmit = (content: string, images: File[]) => {
    // In a real app, you would upload the images to a server
    // and get back URLs to store in the database

    // For this demo, we'll create image placeholders based on the number of images
    const imagePlaceholders = images.map(() => "placeholder")

    const newTweet = {
      id: Date.now(), // Use timestamp as a simple unique ID
      username,
      date: new Date()
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "/"),
      content,
      commentCount: 0,
      likeCount: 0,
      images: imagePlaceholders,
      isEdited: false,
    }

    // Add the new tweet to the beginning of the list
    setTweets([newTweet, ...tweets])
  }

  const handleTweetEdit = (tweetId: string | number, newContent: string, newImages: File[]) => {
    // In a real app, you would send the edit to your API
    const imagePlaceholders = newImages.map(() => "placeholder")

    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              content: newContent,
              images: [...tweet.images, ...imagePlaceholders], // In a real app, you'd handle image updates properly
              isEdited: true,
            }
          : tweet,
      ),
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header isLoggedIn={isLoggedIn} username={username} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-3xl pb-24">
        {/* Demo toggle for logged in state */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="px-4 py-2 bg-[#526e0c] text-white rounded-md">
            {isLoggedIn ? "Simulate Logout" : "Simulate Login"}
          </button>
          {isLoggedIn && (
            <p className="mt-2 text-sm">
              Logged in as <strong>{username}</strong>
            </p>
          )}
        </div>

        {/* Tweet Composer (only shown when logged in) */}
        {isLoggedIn && (
          <div className="mb-8">
            <TweetComposer onSubmit={handleTweetSubmit} />
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

        {/* Tweet Feed */}
        {filteredTweets.map((tweet) => (
          <TweetPost
            key={tweet.id}
            id={tweet.id}
            username={tweet.username}
            date={tweet.date}
            content={tweet.content}
            commentCount={tweet.commentCount}
            likeCount={tweet.likeCount}
            images={tweet.images}
            currentUser={isLoggedIn ? username : undefined}
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
