"use client";

import { BottomNav } from "@/components/bottom-nav";
import { Comment } from "@/components/comment";
import { CommentForm } from "@/components/comment-form";
import { Header } from "@/components/header";
import { TweetPost } from "@/components/tweet-post";
import { getProfile, getTweetById } from "@/services/api";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Sample tweet data (in a real app, this would come from an API)
const initialTweets = [
  {
    id: 1,
    username: "JaneDoe",
    date: "05/22/2023",
    content:
      "Just attended an amazing workshop on sustainable living! Can't wait to implement what I learned.",
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
    content:
      "Check out these photos from the tech conference! The new innovations were mind-blowing.",
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
    content:
      "Just got back from my trip to Japan. The cherry blossoms were absolutely breathtaking!",
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
];

export default function TweetDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const params = React.use(paramsPromise);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("JohnDoe");
  const [comments, setComments] = useState<any[]>([]);

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
    };

    setComments([...comments, newComment]);

    // Update the comment count on the tweet
    setTweet({
      ...tweet,
      commentCount: (tweet.commentCount || 0) + 1,
    });
  };
  const [me, setMe] = useState(null);
  const [tweet, setTweet] = useState(null);
  const sampleLikes = [];

  const isLikedByCurrentUser = (id: any) => false;
  const handleTweetEdit = (id: any, newContent: any, newImages: any) => {};

  const fetchMe = async () => {
    try {
      const res = await getProfile();
      console.log(res.data);
      setMe(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };
  const fetchTweetById = async (id: string) => {
    try {
      // Assuming getTweet needs to be imported: import { getTweet } from "@/services/api";
      const res = await getTweetById(id);
      console.log("Tweet data:", res.data);
      setTweet(res.data);
      // Set comments if they exist in the response
      if (res.data.comments) {
        setComments(res.data.comments);
      }
    } catch (err) {
      console.error("Error fetching tweet:", err);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchTweetById(params.id);
    }
  }, [params.id]);
  useEffect(() => {
    fetchMe();
  }, []);
  if (!tweet) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#fce4ec" }}
      >
        <p>Tweet not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-3xl pb-24">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 mb-4 text-[#526e0c] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to tweets
        </button>
        <TweetPost
          key={tweet.ID}
          tweetId={tweet.ID}
          username={tweet.author.username}
          avatarUrl={tweet.author.user_image || ""}
          date={tweet.CreatedAt}
          content={tweet.description}
          commentCount={0}
          likeCount={
            sampleLikes.filter(
              (like) =>
                like.content_type === "tweet" && like.content_id === tweet.id
            ).length
          }
          images={tweet.user_images || []}
          isEdited={tweet.isEdited}
          isLikedByCurrentUser={isLikedByCurrentUser(tweet.id)}
          onEdit={(newContent, newImages) =>
            handleTweetEdit(tweet.id, newContent, newImages)
          }
          onLike={() => {}}
          onUnlike={() => {}}
        />

        {/* Comments Section */}
        <div className="bg-white rounded-3xl p-6 mt-4">
          <h2 className="text-xl font-bold mb-4">
            Comments ({comments.length})
          </h2>

          {/* Comment Form (only shown when logged in) */}
          {me && (
            <CommentForm tweet_id={params.id} onSubmit={handleAddComment} />
          )}

          {/* Comments List */}
          <div className="mt-6 space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  username={comment.author.username}
                  content={comment.comment}
                  date={comment.CreatedAt}
                  avatarUrl={comment.author.user_image || ""}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
