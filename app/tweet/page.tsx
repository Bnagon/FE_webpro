"use client";

import { BottomNav } from "@/components/bottom-nav";
import { Header } from "@/components/header";
import { TweetComposer } from "@/components/tweet-composer";
import { TweetPost } from "@/components/tweet-post";
import { getAllTweets, getProfile } from "@/services/api";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Sample tweet data with like counts

// Sample likes data to determine if current user liked each tweet
const sampleLikes = [
  {
    id: 1,
    user_id: "user_john",
    content_type: "tweet",
    content_id: 2,
    liked_at: "2023-05-22T10:30:00Z",
  },
  {
    id: 2,
    user_id: "user_john",
    content_type: "tweet",
    content_id: 3,
    liked_at: "2023-05-21T15:45:00Z",
  },
  // Other users' likes
  {
    id: 3,
    user_id: "user_jane",
    content_type: "tweet",
    content_id: 1,
    liked_at: "2023-05-20T09:15:00Z",
  },
  {
    id: 4,
    user_id: "user_tech",
    content_type: "tweet",
    content_id: 1,
    liked_at: "2023-05-19T14:20:00Z",
  },
];

export default function TweetPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("JohnDoe");
  const [userId, setUserId] = useState("user_john");
  const [tweets, setTweets] = useState<
    Array<{
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: string | null;
      description: string;
      author_id: number;
      author: {
        ID: number;
        CreatedAt: string;
        UpdatedAt: string;
        DeletedAt: string | null;
        email: string;
        username: string;
        password: string;
        user_image: string;
      };
    }>
  >([]);
  const [me, setMe] = useState(null);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const filteredTweets = searchQuery
    ? tweets.filter(
        (tweet) =>
          tweet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tweet.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tweets;

  // Function to check if current user liked a tweet
  const isLikedByCurrentUser = (tweetId: number) => {
    return sampleLikes.some(
      (like) =>
        like.user_id === userId &&
        like.content_type === "tweet" &&
        like.content_id === tweetId
    );
  };

  const handleTweetSubmit = (content: string, images: File[]) => {
    const imagePlaceholders = images.map(() => "placeholder");

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
    };

    setTweets([newTweet, ...tweets]);
  };

  const handleTweetEdit = (
    tweetId: string | number,
    newContent: string,
    newImages: File[]
  ) => {
    const imagePlaceholders = newImages.map(() => "placeholder");

    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              content: newContent,
              images: [...tweet.images, ...imagePlaceholders],
              isEdited: true,
            }
          : tweet
      )
    );
  };
  const fetchMe = async () => {
    try {
      const res = await getProfile();
      setMe(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };
  const fetchTweets = async () => {
    try {
      const res = await getAllTweets();
      setTweets(res.data);
      console.log("Fetched tweets:", res.data);
    } catch (err) {
      console.error("Error fetching tweets:", err);
    }
  };
  useEffect(() => {
    fetchMe();
    fetchTweets();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-3xl pb-24">
        {me && <div className="mb-8">{<TweetComposer userId={me.ID} />}</div>}

        {searchQuery && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              Showing results for: "{searchQuery}"
            </h2>
            <p className="text-sm text-gray-600">
              {filteredTweets.length} tweet
              {filteredTweets.length !== 1 ? "s" : ""} found
            </p>
          </div>
        )}

        {/* Tweet Feed with proper like counts and user like status */}
        {(tweets ?? []).map((tweet) => (
          <TweetPost
            key={tweet.ID}
            tweetId={tweet.ID}
            username={tweet.author.username}
            avatarUrl={tweet.author.user_image || ""}
            userId={tweet.author_id}
            date={tweet.CreatedAt}
            content={tweet.description}
            commentCount={tweet.commentCount}
            likeCount={
              sampleLikes.filter(
                (like) =>
                  like.content_type === "tweet" && like.content_id === tweet.id
              ).length
            }
            images={tweet.tweet_image}
            isEdited={tweet.isEdited}
            isLikedByCurrentUser={isLikedByCurrentUser(tweet.id)}
            onEdit={(newContent, newImages) =>
              handleTweetEdit(tweet.id, newContent, newImages)
            }
          />
        ))}

        {searchQuery && filteredTweets.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              No tweets found for "{searchQuery}"
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try searching with different keywords
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
