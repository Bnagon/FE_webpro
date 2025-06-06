"use client";

import { BottomNav } from "@/components/bottom-nav";
import { ReviewCard } from "@/components/review-card";
import { ReviewForm } from "@/components/review-form";
import { StarRating } from "@/components/star-rating";
import { getAnimeById, getProfile } from "@/services/api";
import { ArrowLeft, Edit3, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Sample anime data with detailed information
const animeData = {
  1: {
    id: 1,
    title: "Attack on Titan",
    posterUrl: "",
    averageRating: 4.8,
    reviewCount: 1247,
    genre: "Action, Drama, Fantasy",
    synopsis:
      "Humanity fights for survival against giant humanoid Titans that have brought civilization to the brink of extinction. When the Titans breach Wall Maria, young Eren Yeager witnesses his mother's death and vows to eliminate every Titan. Joining the Survey Corps with his childhood friends Mikasa and Armin, Eren discovers he has the power to transform into a Titan himself.",
    episodes: 87,
    status: "Completed",
    studio: "Mappa, Studio Pierrot",
    year: "2013-2023",
  },
  2: {
    id: 2,
    title: "Demon Slayer",
    posterUrl: "",
    averageRating: 4.6,
    reviewCount: 892,
    genre: "Action, Supernatural",
    synopsis:
      "Tanjiro Kamado's life changes forever when his family is slaughtered by demons, leaving only his sister Nezuko alive—but transformed into a demon herself. Determined to save his sister and avenge his family, Tanjiro embarks on a dangerous journey to become a demon slayer.",
    episodes: 44,
    status: "Ongoing",
    studio: "Ufotable",
    year: "2019-Present",
  },
  // Add more anime data as needed...
};

// Sample reviews data

export default function AnimeDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = React.use(paramsPromise);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anime, setAnime] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "highest" | "lowest"
  >("newest");
  const [isFavorited, setIsFavorited] = useState(false);
  const [me, setMe] = useState<{ ID: string } | null>(null);
  const [review, setReview] = useState();

  const getReviewsByAnimeId = async (animeId: string) => {
    try {
      const res = await getAnimeById(animeId);
      setReviews(res.data.reviews || []);
      console.log("Fetched reviews:", res.data.reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };
  useEffect(() => {
    fetchMe();
    fetchAnime();
  }, []);

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      alert("Please log in to favorite this anime");
      return;
    }
    setIsFavorited(!isFavorited);
  };

  // Sort reviews based on selected criteria
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });
  const fetchMe = async () => {
    try {
      const res = await getProfile();
      setMe(res.data);
      console.log("Fetched user profile:", res.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };
  const fetchAnime = async () => {
    try {
      const res = await getAnimeById((await params).id);
      setAnime(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching anime:", err);
    }
  };

  useEffect(() => {
    fetchMe();
    fetchAnime();
    getReviewsByAnimeId(params.id);
  }, []);

  if (!anime) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#fce4ec" }}
      >
        <p>Anime not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-6xl pb-24">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 mb-6 text-[#526e0c] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Reviews
        </button>

        {/* Demo toggle for logged in state */}

        {/* Anime Details */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Poster */}
            <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
              {anime.anime_image ? (
                <Image
                  src={anime.anime_image || "/placeholder.svg"}
                  alt={anime.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <div className="text-4xl font-bold mb-4">アニメ</div>
                    <div className="text-lg opacity-80">{anime.title}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <StarRating rating={anime.rating} size="lg" />
                  <span className="text-xl font-semibold">
                    {/* {anime.averageRating.toFixed(1)} */}
                  </span>
                </div>
                <span className="text-gray-600">
                  {anime.reviewCount} review{anime.reviewCount !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Genre:</span>
                  <p className="text-gray-600">{anime.genres}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Episodes:</span>
                  <p className="text-gray-600">{anime.episodes}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Status:</span>
                  <p className="text-gray-600">{anime.status}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Studio:</span>
                  <p className="text-gray-600">{anime.studio}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Synopsis</h3>
                <p className="text-gray-600 leading-relaxed">
                  {anime.description}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowReviewForm(true)}
                  disabled={!me}
                  className="flex items-center gap-2 px-6 py-3 bg-[#f74e6d] text-white rounded-full hover:bg-[#f74e6d]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Edit3 className="w-5 h-5" />
                  Write a Review
                </button>

                {/* <button
                  onClick={handleToggleFavorite}
                  className="p-3 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorited
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button> */}
              </div>
              {!isLoggedIn && (
                <p className="text-sm text-gray-500 mt-2">
                  Please log in to write a review
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Community Reviews ({reviews.length})
            </h2>

            {reviews.length > 0 && (
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "newest" | "oldest" | "highest" | "lowest"
                  )
                }
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            )}
          </div>

          {sortedReviews.length > 0 ? (
            <div>
              {sortedReviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  username={
                    review.author?.username || review.username || "Anonymous"
                  }
                  rating={review.rating}
                  reviewText={review.review}
                  date={review.date}
                  avatarUrl={review.author?.user_image || ""}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No reviews yet. Be the first to review this anime!
              </p>
              <button
                onClick={() => setShowReviewForm(true)}
                disabled={!isLoggedIn}
                className="px-6 py-2 bg-[#f74e6d] text-white rounded-full hover:bg-[#f74e6d]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Write the First Review
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          animeID={params.id}
          animeTitle={anime.title}
          onClose={() => setShowReviewForm(false)}
        />
      )}

      <BottomNav />
    </div>
  );
}
