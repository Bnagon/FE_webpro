"use client";

import { BottomNav } from "@/components/bottom-nav";
import { Header } from "@/components/header";
import { getEventById, getProfile, joinEvent } from "@/services/api";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Author = {
  username: string;
};

type ServerEvent = {
  ID: number;
  title: string;
  description: string;
  date_time: string; // ISO string
  location: string;
  author: Author;
  event_image: string;
  members: any[]; // Assuming members is an array of user objects
};

export default function EventDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = React.use(paramsPromise);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("JohnDoe");
  const [event, setEvent] = useState<ServerEvent | null>(null);
  const [attendees, setAttendees] = useState<any[]>([]);
  const [isAttending, setIsAttending] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Function to format date/time nicely
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleJoinEvent = async () => {
    const res = await joinEvent(params.id);
    console.log(res.data);
    fetchEvent();
  };
  const fetchMe = async () => {
    try {
      const res = await getProfile();
      setIsLoggedIn(true);
      setUsername(res.data.username);
      console.log("Fetched user profile:", res.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  async function fetchEvent() {
    try {
      const res = await getEventById(params.id);
      setEvent(res.data);
      console.log("Fetched event:", res.data);
      setAttendees([]);
    } catch (error) {
      console.error("Error fetching event:", error);
      setEvent(null);
    }
  }
  useEffect(() => {
    fetchMe();
    fetchEvent();
  }, []);
  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      alert("Please log in to favorite this event");
      return;
    }
    setIsFavorited(!isFavorited);
  };

  if (!event) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#fce4ec" }}
      >
        <p>Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-4xl pb-24">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 mb-4 text-[#526e0c] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All events
        </button>

        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{formatDate(event.date_time)}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{formatTime(event.date_time)}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2" />
              <span>{attendees.length} attending</span>
            </div>
            <div className="flex items-center text-gray-600"></div>
            <span>By {event.author.username}</span>
          </div>
          <img className="w-70 h-70 mr-2 p-5" src={event.event_image} />

          <div className="flex gap-3">
            <button
              onClick={handleJoinEvent}
              className={`px-6 py-2 rounded-full ${
                isAttending
                  ? "bg-white border border-[#f74e6d] text-[#f74e6d]"
                  : "bg-[#f74e6d] text-white hover:bg-[#f74e6d]/90"
              } transition-colors`}
            >
              {isAttending ? "Leave Event" : "Join Event"}
            </button>

            {/* <button
              onClick={handleToggleFavorite}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"
                }`}
              />
            </button> */}
          </div>
        </div>

        {/* Since server doesn't provide images, you may skip this or add fallback */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">About This Event</h2>
          <p className="whitespace-pre-line">{event.description}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">
            Attendees ({event.members.length})
          </h2>
          {event.members.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {event.members.map((attendee: any) => (
                <div key={attendee.id} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#d9d9d9] rounded-full">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={attendee.user_image || "/placeholder.svg"}
                      alt={attendee.username}
                    />
                  </div>
                  <span className="text-sm font-medium truncate">
                    {attendee.username}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No one has joined this event yet. Be the first!
            </p>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
