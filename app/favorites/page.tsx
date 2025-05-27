"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { TweetPost } from "@/components/tweet-post"
import { EventCard } from "@/components/event-card"
import { AnimeCard } from "@/components/anime-card"
import { Heart, MessageSquare, Calendar, Star } from "lucide-react"

// Sample data for all types
const allTweets = [
  {
    id: 1,
    username: "JaneDoe",
    date: "05/22/2023",
    content: "Just attended an amazing workshop on sustainable living! Can't wait to implement what I learned.",
    commentCount: 11,
    likeCount: 24,
    images: [],
  },
  {
    id: 2,
    username: "TechGuru",
    date: "05/21/2023",
    content: "Check out these photos from the tech conference! The new innovations were mind-blowing.",
    commentCount: 2,
    likeCount: 15,
    images: ["placeholder", "placeholder"],
  },
  {
    id: 3,
    username: "TravelExplorer",
    date: "05/20/2023",
    content: "Just got back from my trip to Japan. The cherry blossoms were absolutely breathtaking!",
    commentCount: 8,
    likeCount: 42,
    images: ["placeholder"],
  },
  {
    id: 4,
    username: "FoodieAdventures",
    date: "05/19/2023",
    content: "Tried this new restaurant downtown and the food was incredible! Highly recommend the chef's special.",
    commentCount: 5,
    likeCount: 18,
    images: [],
  },
  {
    id: 5,
    username: "BookWorm",
    date: "05/18/2023",
    content: "Just finished reading this amazing novel. The character development was outstanding!",
    commentCount: 3,
    likeCount: 12,
    images: ["placeholder"],
  },
]

const allEvents = [
  {
    id: 1,
    title: "Summer Festival",
    date: "06/15/2023",
    location: "Central Park",
    description: "Annual summer celebration with music, food, and activities for all ages.",
  },
  {
    id: 2,
    title: "Tech Conference",
    date: "07/22/2023",
    location: "Convention Center",
    description: "Explore the latest innovations in technology and network with industry professionals.",
  },
  {
    id: 3,
    title: "Art Exhibition",
    date: "08/05/2023",
    location: "City Gallery",
    description: "Featuring works from local and international artists exploring themes of nature and technology.",
  },
  {
    id: 4,
    title: "Music Concert",
    date: "09/10/2023",
    location: "Riverside Amphitheater",
    description: "Live performances from top artists across multiple genres.",
  },
]

const allAnime = [
  {
    id: 1,
    title: "Attack on Titan",
    posterUrl: "",
    averageRating: 4.8,
    reviewCount: 1247,
    genre: "Action, Drama, Fantasy",
  },
  {
    id: 2,
    title: "Demon Slayer",
    posterUrl: "",
    averageRating: 4.6,
    reviewCount: 892,
    genre: "Action, Supernatural",
  },
  {
    id: 3,
    title: "My Hero Academia",
    posterUrl: "",
    averageRating: 4.4,
    reviewCount: 1156,
    genre: "Action, School, Superhero",
  },
  {
    id: 4,
    title: "Jujutsu Kaisen",
    posterUrl: "",
    averageRating: 4.7,
    reviewCount: 743,
    genre: "Action, Supernatural, School",
  },
]

export default function FavoritesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("JohnDoe")
  const [activeTab, setActiveTab] = useState<"tweets" | "events" | "reviews">("tweets")

  // Simulate favorited items when user logs in
  const [favoritedTweets, setFavoritedTweets] = useState<any[]>([])
  const [favoritedEvents, setFavoritedEvents] = useState<any[]>([])
  const [favoritedAnime, setFavoritedAnime] = useState<any[]>([])

  useEffect(() => {
    if (isLoggedIn) {
      // Simulate some favorited items
      setFavoritedTweets(allTweets.filter((tweet) => [2, 3, 5].includes(tweet.id)))
      setFavoritedEvents(allEvents.filter((event) => [1, 3].includes(event.id)))
      setFavoritedAnime(allAnime.filter((anime) => [1, 2, 4].includes(anime.id)))
    } else {
      setFavoritedTweets([])
      setFavoritedEvents([])
      setFavoritedAnime([])
    }
  }, [isLoggedIn])

  // Function to unfavorite items
  const handleUnfavoriteTweet = (tweetId: number) => {
    setFavoritedTweets(favoritedTweets.filter((tweet) => tweet.id !== tweetId))
  }

  const handleUnfavoriteEvent = (eventId: string | number) => {
    setFavoritedEvents(favoritedEvents.filter((event) => event.id !== Number(eventId)))
  }

  const handleUnfavoriteAnime = (animeId: string | number) => {
    setFavoritedAnime(favoritedAnime.filter((anime) => anime.id !== Number(animeId)))
  }

  const getActiveContent = () => {
    switch (activeTab) {
      case "tweets":
        return favoritedTweets.length > 0 ? (
          <div className="space-y-6">
            {favoritedTweets.map((tweet) => (
              <TweetPost
                key={tweet.id}
                id={tweet.id}
                username={tweet.username}
                date={tweet.date}
                content={tweet.content}
                commentCount={tweet.commentCount}
                likeCount={tweet.likeCount}
                images={tweet.images}
                initialLiked={true}
                onUnlike={handleUnfavoriteTweet}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No favorite tweets</h3>
            <p className="text-gray-500">When you like tweets, they'll appear here for easy access.</p>
          </div>
        )

      case "events":
        return favoritedEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoritedEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                href={`/event/${event.id}`}
                isFavorited={true}
                onToggleFavorite={handleUnfavoriteEvent}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No favorite events</h3>
            <p className="text-gray-500">When you favorite events, they'll appear here for easy access.</p>
          </div>
        )

      case "reviews":
        return favoritedAnime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favoritedAnime.map((anime) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title}
                posterUrl={anime.posterUrl}
                averageRating={anime.averageRating}
                reviewCount={anime.reviewCount}
                genre={anime.genre}
                isFavorited={true}
                onToggleFavorite={handleUnfavoriteAnime}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No favorite anime</h3>
            <p className="text-gray-500">When you favorite anime, they'll appear here for easy access.</p>
          </div>
        )

      default:
        return null
    }
  }

  const getTabCount = (tab: "tweets" | "events" | "reviews") => {
    switch (tab) {
      case "tweets":
        return favoritedTweets.length
      case "events":
        return favoritedEvents.length
      case "reviews":
        return favoritedAnime.length
      default:
        return 0
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header isLoggedIn={isLoggedIn} username={username} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-6xl pb-24">
        <h1 className="text-3xl font-bold mb-6 text-[#526e0c]">Favorites</h1>

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

        {/* Content based on login state */}
        {!isLoggedIn ? (
          <div className="bg-white rounded-3xl p-8 text-center">
            <Heart className="w-16 h-16 text-[#f74e6d] mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Log in to see your favorites</h2>
            <p className="text-gray-600 mb-4">
              Your liked tweets, events, and anime will appear here once you're logged in.
            </p>
            <button
              onClick={() => setIsLoggedIn(true)}
              className="px-6 py-2 rounded-full bg-[#f74e6d] text-white hover:bg-[#f74e6d]/90 transition-colors"
            >
              Log in
            </button>
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("tweets")}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                    activeTab === "tweets"
                      ? "text-[#f74e6d] border-b-2 border-[#f74e6d] bg-[#f74e6d]/5"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  Tweets ({getTabCount("tweets")})
                </button>
                <button
                  onClick={() => setActiveTab("events")}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                    activeTab === "events"
                      ? "text-[#f74e6d] border-b-2 border-[#f74e6d] bg-[#f74e6d]/5"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  Events ({getTabCount("events")})
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                    activeTab === "reviews"
                      ? "text-[#f74e6d] border-b-2 border-[#f74e6d] bg-[#f74e6d]/5"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Star className="w-5 h-5" />
                  Anime ({getTabCount("reviews")})
                </button>
              </div>
            </div>

            {/* Active Tab Content */}
            {getActiveContent()}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
