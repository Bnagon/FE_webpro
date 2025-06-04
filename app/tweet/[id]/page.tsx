"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { TweetPost } from "@/components/tweet-post"
import { Comment } from "@/components/comment"
import { CommentForm } from "@/components/comment-form"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

// Sample tweet data (in a real app, this would come from an API)
const initialTweets = [
  {
    id: 1,
    username: "JaneDoe",
    date: "05/22/2023",
    content: "Just attended an amazing workshop on sustainable living! Can't wait to implement what I learned.",
    commentCount: 2,
    likeCount: 24,
    images: [],
    comments: [
      {
        id: 101,
        username: "EcoFriend",
        content: "That sounds amazing! Which workshop was it?",
        date: "05/22/2023",
      },
      {
        id: 102,
        username: "GreenLiving",
        content: "I'd love to hear more about what you learned!",
        date: "05/22/2023",
      },
    ],
  },
  {
    id: 2,
    username: "TechGuru",
    date: "05/21/2023",
    content: "Check out these photos from the tech conference! The new innovations were mind-blowing.",
    commentCount: 1,
    likeCount: 15,
    images: ["placeholder", "placeholder"],
    comments: [
      {
        id: 201,
        username: "GadgetLover",
        content: "Wow! Those look amazing. What was your favorite innovation?",
        date: "05/21/2023",
      },
    ],
  },
  {
    id: 3,
    username: "TravelExplorer",
    date: "05/20/2023",
    content: "Just got back from my trip to Japan. The cherry blossoms were absolutely breathtaking!",
    commentCount: 3,
    likeCount: 42,
    images: ["placeholder"],
    comments: [
      {
        id: 301,
        username: "Wanderlust",
        content: "Japan is on my bucket list! Which cities did you visit?",
        date: "05/20/2023",
      },
      {
        id: 302,
        username: "PhotoEnthusiast",
        content: "Your photos are stunning! What camera do you use?",
        date: "05/20/2023",
      },
      {
        id: 303,
        username: "CultureBuff",
        content: "Did you get to experience any traditional ceremonies?",
        date: "05/21/2023",
      },
    ],
  },
]

export default function TweetDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("JohnDoe")
  const [tweet, setTweet] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])

  useEffect(() => {
    // In a real app, you would fetch the tweet and comments from an API
    const foundTweet = initialTweets.find((t) => t.id.toString() === params.id)
    if (foundTweet) {
      setTweet(foundTweet)
      setComments(foundTweet.comments || [])
    }
  }, [params.id])

  const handleAddComment = (content: string) => {
    const newComment = {
      id: Date.now(),
      username,
      content,
      date: new Date()
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "/"),
    }

    setComments([...comments, newComment])

    // Update the comment count on the tweet
    setTweet({
      ...tweet,
      commentCount: (tweet.commentCount || 0) + 1,
    })
  }

  if (!tweet) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fce4ec" }}>
        <p>Tweet not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header/>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-3xl pb-24">
        {/* Back button */}
        <button onClick={() => router.back()} className="flex items-center gap-1 mb-4 text-[#526e0c] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to tweets
        </button>

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

        {/* Tweet */}
        <TweetPost
          id={tweet.id}
          username={tweet.username}
          date={tweet.date}
          content={tweet.content}
          commentCount={tweet.commentCount}
          likeCount={tweet.likeCount}
          images={tweet.images}
          isDetailView={true}
        />

        {/* Comments Section */}
        <div className="bg-white rounded-3xl p-6 mt-4">
          <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>

          {/* Comment Form (only shown when logged in) */}
          {isLoggedIn && <CommentForm onSubmit={handleAddComment} />}

          {/* Comments List */}
          <div className="mt-6 space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment key={comment.id} username={comment.username} content={comment.content} date={comment.date} />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
