"use client";

import type React from "react";

import { getProfile, getTweetById } from "@/services/api";
import { Edit3, MessageCircle, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TweetEditForm } from "./tweet-edit-form";

export function TweetPost({
  tweetId,
  username,
  avatarUrl,
  date,
  content,
  images = [],
  commentCount = 0,
  likeCount = 0,
  initialLiked = false,
  isEdited = false,
  currentUserId,
  currentUser,
  isDetailView = false,
  onEdit,
  onUnlike,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [liked, setLiked] = useState(initialLiked);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Check if the current user owns this tweet
  const isOwnTweet = currentUser === username;

  // Update liked state if initialLiked changes
  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  // Update local like count if prop changes
  useEffect(() => {
    setLocalLikeCount(likeCount);
  }, [likeCount]);
  useEffect(() => {
    fetchAuthor();
    fetchTweets();
  }, []);
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking the like button

    // If we're on the favorites page and unliking a tweet
    if (pathname?.includes("/favorites") && liked && onUnlike) {
      onUnlike(tweetId);
      return;
    }

    const newLikedState = !liked;
    const newLikeCount = newLikedState
      ? localLikeCount + 1
      : localLikeCount - 1;

    // Optimistic update - immediately update UI
    setLiked(newLikedState);
    setLocalLikeCount(newLikeCount);
    try {
      if (newLikedState) {
        await fetch("/api/likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: currentUserId,
            content_type: "tweet",
            content_id: id,
          }),
        });

        // Also update the tweet's like count
        await fetch(`/api/tweets/${id}/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: currentUserId,
          }),
        });
        console.log(
          `Adding like: user_id=${currentUserId}, content_type=tweet, content_id=${id}`
        );
        console.log(`New like count: ${newLikeCount}`);
      } else {
        await fetch("/api/likes", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: currentUserId,
            content_type: "tweet",
            content_id: id,
          }),
        });

        // Also update the tweet's like count
        await fetch(`/api/tweets/${id}/unlike`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: currentUserId,
          }),
        });
        console.log(
          `Removing like: user_id=${currentUserId}, content_type=tweet, content_id=${tweetId}`
        );
        console.log(`New like count: ${newLikeCount}`);
      }
    } catch (error) {
      console.error("Error updating like:", error);
      // Revert optimistic update on error
      setLiked(!newLikedState);
      setLocalLikeCount(localLikeCount);
    }
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking the comment button
    if (!isDetailView) {
      router.push(`/tweet/${tweetId}`);
    }
  };

  const handleTweetClick = () => {
    if (!isDetailView && !isEditing) {
      router.push(`/tweet/${tweetId}`);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleEditSave = (newContent: string, newImages: File[]) => {
    if (onEdit) {
      onEdit(tweetId, newContent, newImages);
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  if (isEditing) {
    return (
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#d9d9d9] rounded-full flex-shrink-0 overflow-hidden">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
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
    );
  }
  interface UserProfile {
    username: string;
    [key: string]: any;
  }

  interface Tweet {
    tweet_image?: string;
    [key: string]: any;
  }

  const [author, setAuthor] = useState<UserProfile | null>(null);
  const [tweets, setTweets] = useState<Tweet | null>(null);

  const fetchAuthor = async () => {
    try {
      const res = await getProfile();
      setAuthor(res.data);
      console.log("Fetched user profile:", res.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };
  const fetchTweets = async () => {
    try {
      const res = await getTweetById(parseInt(tweetId));
      setTweets(res.data);
      console.log("Fetched tweet:", res.data);
    } catch (err) {
      console.error("Error fetching tweets:", err);
    }
  };

  return (
    <div
      className={`mb-8 rounded shadow- p-2 ${
        !isDetailView ? "cursor-pointer hover:opacity-95" : ""
      }`}
      onClick={handleTweetClick}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#d9d9d9] rounded-full flex-shrink-0 overflow-hidden">
          {tweets?.author && tweets?.author.username ? (
            <Image
              src={tweets?.author.user_image || "/placeholder.svg"}
              alt={tweets?.author.username}
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
                {tweets?.CreatedAt
                  ? new Date(tweets.CreatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : date}
                {isEdited && (
                  <span className="ml-2 text-xs text-gray-500">(edited)</span>
                )}
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
        <p>{tweets?.description}</p>
        {tweets?.tweet_image && (
          <div className="border border-[#000000] rounded-md p-2 flex items-center justify-center mt-3">
            <Image
              src={tweets.tweet_image || "/placeholder.svg"}
              alt="Tweet image"
              width={200}
              height={200}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>

      {/* Like and Comment buttons with counts */}
      <div className="flex justify-end mt-2 gap-4">
        <button
          className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors"
          onClick={handleCommentClick}
        >
          <MessageCircle className="h-5 w-5" />
          {commentCount > 0 && <span>{commentCount}</span>}
        </button>
        {/* <button
          className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
          onClick={handleLike}
        >
          <Heart
            className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`}
          />
          {/* This shows the total like count from all users */}
        {/* {localLikeCount > 0 && <span>{localLikeCount}</span>}
        </button> */}
      </div>
    </div>
  );
}
