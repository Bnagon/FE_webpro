"use client"

import { useState } from "react"
import { Edit3, Calendar, MessageSquare } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { TweetPost } from "@/components/tweet-post"
import { EventCard } from "@/components/event-card"
import { ProfileEditForm } from "@/components/profile-edit-form"

// Sample user data
const userData = {
  username: "JohnDoe",
  email: "john.doe@example.com",
  bio: "Tech enthusiast and community builder. Love connecting with people and sharing experiences!",
  location: "San Francisco, CA",
  joinDate: "March 2023",
  avatarUrl: "",
}

// Sample user's tweets
const userTweets = [
  {
    id: 101,
    username: "JohnDoe",
    date: "05/24/2023",
    content: "Just finished setting up my new workspace! Productivity levels are about to go through the roof 🚀",
    commentCount: 5,
    likeCount: 12,
    images: [],
    isEdited: false,
  },
  {
    id: 102,
    username: "JohnDoe",
    date: "05/23/2023",
    content: "Had an amazing time at the local tech meetup yesterday. Met so many inspiring developers!",
    commentCount: 8,
    likeCount: 24,
    images: ["placeholder"],
    isEdited: true,
  },
  {
    id: 103,
    username: "JohnDoe",
    date: "05/22/2023",
    content: "Working on a new project that combines AI and community building. Excited to share more soon!",
    commentCount: 3,
    likeCount: 18,
    images: [],
    isEdited: false,
  },
]

// Sample user's events
const userEvents = [
  {
    id: 201,
    title: "Tech Networking Night",
    date: "06/30/2023",
    location: "Downtown Tech Hub",
    description: "Join us for an evening of networking with fellow tech professionals.",
  },
  {
    id: 202,
    title: "AI Workshop Series",
    date: "07/15/2023",
    location: "Innovation Center",
    description: "Learn the fundamentals of AI and machine learning in this hands-on workshop.",
  },
  {
    id: 203,
    title: "Community Hackathon",
    date: "08/20/2023",
    location: "University Campus",
    description: "48-hour hackathon focused on building solutions for local community challenges.",
  },
]

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("JohnDoe")
  const [activeTab, setActiveTab] = useState<"tweets" | "events">("tweets")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState(userData)

  const handleProfileUpdate = (updatedData: any) => {
    setProfileData({ ...profileData, ...updatedData })
    setIsEditingProfile(false)
  }

  const handleTweetEdit = (tweetId: string | number, newContent: string, newImages: File[]) => {
    // In a real app, you would update the tweet via API
    console.log("Edit tweet:", tweetId, newContent, newImages)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header isLoggedIn={isLoggedIn} username={username} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl pb-24">
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

        {!isLoggedIn ? (
          <div className="bg-white rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Please log in to view your profile</h2>
            <p className="text-gray-600">You need to be logged in to access your profile page.</p>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-[#d9d9d9] rounded-full flex-shrink-0"></div>
                  <div>
                    <h1 className="text-2xl font-bold">{profileData.username}</h1>
                    <p className="text-gray-600 mb-2">{profileData.email}</p>
                    <p className="text-sm text-gray-500">Joined {profileData.joinDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-[#f74e6d] text-[#f74e6d] rounded-full hover:bg-[#f74e6d]/10 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              {profileData.bio && (
                <div className="mb-4">
                  <p className="text-gray-700">{profileData.bio}</p>
                </div>
              )}

              {profileData.location && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">📍 {profileData.location}</p>
                </div>
              )}

              <div className="flex gap-6 text-sm text-gray-600">
                <span>
                  <strong>{userTweets.length}</strong> Tweets
                </span>
                <span>
                  <strong>{userEvents.length}</strong> Events
                </span>
              </div>
            </div>

            {/* Edit Profile Form */}
            {isEditingProfile && (
              <div className="mb-6">
                <ProfileEditForm
                  initialData={profileData}
                  onSave={handleProfileUpdate}
                  onCancel={() => setIsEditingProfile(false)}
                />
              </div>
            )}

            {/* Content Tabs */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
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
                  Tweets
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
                  Events
                </button>
              </div>

              <div className="p-6">
                {activeTab === "tweets" && (
                  <div>
                    {userTweets.length > 0 ? (
                      <div className="space-y-6">
                        {userTweets.map((tweet) => (
                          <TweetPost
                            key={tweet.id}
                            id={tweet.id}
                            username={tweet.username}
                            date={tweet.date}
                            content={tweet.content}
                            commentCount={tweet.commentCount}
                            likeCount={tweet.likeCount}
                            images={tweet.images}
                            currentUser={username}
                            onEdit={handleTweetEdit}
                            isEdited={tweet.isEdited}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No tweets yet</h3>
                        <p className="text-gray-500">Start sharing your thoughts with the community!</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "events" && (
                  <div>
                    {userEvents.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userEvents.map((event) => (
                          <EventCard
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            href={`/event/${event.id}`}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No events created</h3>
                        <p className="text-gray-500">Create your first event to bring people together!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
