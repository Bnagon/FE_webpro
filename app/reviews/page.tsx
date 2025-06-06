"use client";

import { AnimeCard } from "@/components/anime-card";
import { BottomNav } from "@/components/bottom-nav";
import { Header } from "@/components/header";
import { getAllAnimes, getProfile } from "@/services/api";
import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";

// Sample anime data
const animeList = [
  {
    id: 1,
    title: "Attack on Titan",
    posterUrl: "",
    averageRating: 4.8,
    reviewCount: 1247,
    genre: "Action, Drama, Fantasy",
    synopsis:
      "Humanity fights for survival against giant humanoid Titans that have brought civilization to the brink of extinction.",
  },
  {
    id: 2,
    title: "Demon Slayer",
    posterUrl: "",
    averageRating: 4.6,
    reviewCount: 892,
    genre: "Action, Supernatural",
    synopsis:
      "A young boy becomes a demon slayer to save his sister and avenge his family.",
  },
  {
    id: 3,
    title: "My Hero Academia",
    posterUrl: "",
    averageRating: 4.4,
    reviewCount: 1156,
    genre: "Action, School, Superhero",
    synopsis:
      "In a world where most people have superpowers, a powerless boy dreams of becoming a hero.",
  },
  {
    id: 4,
    title: "Jujutsu Kaisen",
    posterUrl: "",
    averageRating: 4.7,
    reviewCount: 743,
    genre: "Action, Supernatural, School",
    synopsis:
      "Students at a school for jujutsu sorcerers learn to combat cursed spirits.",
  },
  {
    id: 5,
    title: "One Piece",
    posterUrl: "",
    averageRating: 4.9,
    reviewCount: 2134,
    genre: "Adventure, Comedy, Action",
    synopsis:
      "A young pirate searches for the ultimate treasure known as One Piece.",
  },
  {
    id: 6,
    title: "Naruto",
    posterUrl: "",
    averageRating: 4.5,
    reviewCount: 1876,
    genre: "Action, Adventure, Martial Arts",
    synopsis:
      "A young ninja seeks recognition and dreams of becoming the Hokage.",
  },
  {
    id: 7,
    title: "Death Note",
    posterUrl: "",
    averageRating: 4.8,
    reviewCount: 1432,
    genre: "Psychological, Supernatural, Thriller",
    synopsis:
      "A high school student discovers a supernatural notebook that can kill anyone whose name is written in it.",
  },
  {
    id: 8,
    title: "Spirited Away",
    posterUrl: "",
    averageRating: 4.9,
    reviewCount: 987,
    genre: "Adventure, Family, Fantasy",
    synopsis:
      "A young girl enters a world ruled by gods and witches where humans are changed into beasts.",
  },
];

export default function ReviewsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("JohnDoe");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "title">(
    "rating"
  );
  const [favoritedAnime, setFavoritedAnime] = useState<number[]>([]);
  const [me, setMe] = useState(null);
  const [reviews, setReviews] = useState<any>([]);
  const handleToggleFavorite = (animeId: string | number) => {
    if (!isLoggedIn) {
      alert("Please log in to favorite anime");
      return;
    }

    const id = Number(animeId);
    setFavoritedAnime((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  // Filter and sort anime based on search and sort criteria
  const filteredAndSortedAnime = animeList
    .filter(
      (anime) =>
        anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.genre.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.averageRating - a.averageRating;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  const fetchMe = async () => {
    try {
      const res = await getProfile();
      setMe(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };
  const fetchReviews = async () => {
    try {
      const res = await getAllAnimes();
      console.log("Fetched reviews:", res.data);
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchMe();
    fetchReviews();
    console.log(reviews);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header isLoggedIn={isLoggedIn} username={username} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#526e0c]">Anime Reviews</h1>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anime by title or genre..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:border-transparent"
              />
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "rating" | "reviews" | "title")
                }
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:border-transparent appearance-none bg-white"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {reviews.map((review, index) => (
            <AnimeCard
              key={index}
              id={review.ID}
              title={review.title}
              posterUrl={review.anime_image}
              rating={review.rating}
              reviewCount={review.reviewCount}
              genre={review.genre}
              isFavorited={favoritedAnime.includes(Number(review.id))}
              onToggleFavorite={isLoggedIn ? handleToggleFavorite : undefined}
            />
          ))}
        </div>

        {filteredAndSortedAnime.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No anime found matching your search criteria.
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
