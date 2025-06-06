"use client";

import { BottomNav } from "@/components/bottom-nav";
import { EventCard } from "@/components/event-card";
import { Header } from "@/components/header";
import { ProfileEditForm } from "@/components/profile-edit-form";
import { TweetPost } from "@/components/tweet-post";
import { getMyEvents, getMyTweets, getProfile } from "@/services/api";
import { Calendar, Edit3, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"tweets" | "events">("tweets");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    id: "",
    username: "",
    email: "",
    createdAt: "",
    user_image: "",
  });
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  const [userTweets, setUserTweets] = useState<any[]>([]);
  const [userEvents, setUserEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setIsLoggedIn(true);
        console.log(isLoggedIn);
        setProfileData({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          createdAt: res.data.CreatedAt,
          user_image: res.data.user_image || "",
        });
        setIsLoggedIn(true);
        console.log("Profile data:", res.data.CreatedAt);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = (updatedData: any) => {
    setProfileData({ ...profileData, ...updatedData });
    setIsEditingProfile(false);
  };

  const handleTweetEdit = (
    tweetId: string | number,
    newContent: string,
    newImages: File[]
  ) => {
    // In a real app, you would update the tweet via API
    setUserTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === tweetId
          ? { ...tweet, content: newContent, isEdited: true }
          : tweet
      )
    );
  };
  const fetchMyTweets = async () => {
    try {
      const res = await getMyTweets();
      setUserTweets(res.data);
    } catch (err) {
      return console.log(err);
    }
  };
  const fetchMyEvents = async () => {
    try {
      const res = await getMyEvents();
      setUserEvents(res.data);
      console.log("Fetched user events:", res.data);
    } catch (err) {
      return console.log(err);
    }
  };
  useEffect(() => {
    fetchMyTweets();
    fetchMyEvents();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl pb-24">
        {!isLoggedIn ? (
          <div className="bg-white rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">
              Please log in to view your profile
            </h2>
            <p className="text-gray-600">
              You need to be logged in to access your profile page.
            </p>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  {profileData.user_image ? (
                    <img
                      src={profileData.user_image}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-[#d9d9d9] rounded-full flex-shrink-0" />
                  )}

                  <div>
                    <h1 className="text-2xl font-bold">
                      {profileData.username}
                    </h1>
                    <p className="text-gray-600 mb-2">{profileData.email}</p>
                    <p className="text-sm text-gray-500">
                      Joined {formatDate(profileData.createdAt)}
                    </p>
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
                  Tweets ({userTweets.length})
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
                  Events ({userEvents.length})
                </button>
              </div>

              <div className="p-6">
                {activeTab === "tweets" && (
                  <div>
                    {userTweets.length > 0 ? (
                      <div className="space-y-6">
                        {userTweets.map((tweet, index) => (
                          <TweetPost
                            key={index}
                            tweetId={tweet.ID}
                            username={tweet.username}
                            date={tweet.date}
                            content={tweet.content}
                            commentCount={tweet.commentCount}
                            likeCount={tweet.likeCount}
                            images={tweet.images}
                            currentUser={profileData.username}
                            onEdit={handleTweetEdit}
                            isEdited={tweet.isEdited}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">
                          No tweets yet
                        </h3>
                        <p className="text-gray-500">
                          Start sharing your thoughts with the community!
                        </p>
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
                            description={event.description}
                            date={event.date}
                            imageUrl={event.event_image}
                            href={`/event/${event.id}`}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">
                          No events created
                        </h3>
                        <p className="text-gray-500">
                          Create your first event to bring people together!
                        </p>
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
  );
}
