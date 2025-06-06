"use client";

import { BottomNav } from "@/components/bottom-nav";
import { EventCard } from "@/components/event-card";
import { EventForm } from "@/components/event-form";
import { Header } from "@/components/header";
import { getAllEvents, getProfile } from "@/services/api";
import { PlusCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Sample event data

export default function EventPage() {
  // In a real app, this would come from an authentication context or API
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("JohnDoe");
  const [userId, setUserId] = useState("user_john"); // Add user ID
  const [events, setEvents] = useState<any[]>([]);
  const [showEventForm, setShowEventForm] = useState(false);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const filteredEvents = searchQuery
    ? events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : events;

  const handleCreateEvent = (eventData: any) => {
    // In a real app, you would send this data to your API
    const newEvent = {
      id: Date.now(),
      title: eventData.title,
      date: formatDate(eventData.date),
      time: eventData.time,
      location: eventData.location,
      description: eventData.description,
      createdBy: userId, // Include user ID
      creatorName: username, // Include username
      // For this demo, we'll create image placeholders based on the number of images
      event_image: eventData.event_image.map(() => "placeholder"),
    };

    // Add the new event to the beginning of the list
    setEvents([newEvent, ...events]);
    setShowEventForm(false);

    // In a real app, you would send this data to your API:
    /*
    const eventPayload = {
      user_id: userId,
      creator_name: username,
      title: eventData.title,
      date: eventData.date,
      time: eventData.time,
      location: eventData.location,
      description: eventData.description,
      images: eventData.images, // These would be uploaded files
      created_at: new Date().toISOString()
    }
    
    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload)
    })
    */
  };
  const [me, setMe] = useState(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const fetchMe = async () => {
    try {
      const res = await getProfile();
      setMe(res.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };
  const fetchEvents = async () => {
    try {
      const res = await getAllEvents();
      setEvents(res.data);
      console.log("Fetched events:", res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };
  useEffect(() => {
    fetchMe();
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-[#526e0c]">Upcoming Event</h2>

          {me && !showEventForm && (
            <button
              onClick={() => setShowEventForm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f74e6d] text-white hover:bg-[#f74e6d]/90 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Create Event</span>
            </button>
          )}
        </div>

        {searchQuery && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              Showing results for: "{searchQuery}"
            </h2>
            <p className="text-sm text-gray-600">
              {filteredEvents.length} event
              {filteredEvents.length !== 1 ? "s" : ""} found
            </p>
          </div>
        )}

        {/* Event Form */}
        {showEventForm && (
          <div className="mb-8">
            <EventForm
              userID={me?.ID}
              onSubmit={handleCreateEvent}
              onCancel={() => setShowEventForm(false)}
            />
          </div>
        )}

        {/* Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events &&
            events.map((event) => (
              <EventCard
                key={event.ID}
                id={event.ID}
                title={event.title}
                imageUrl={event.event_image}
                date={new Date(event.date_time).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
                href={`/event/${event.id}`}
              />
            ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            {searchQuery ? (
              <>
                <p className="text-gray-500 text-lg">
                  No events found for "{searchQuery}"
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Try searching with different keywords
                </p>
              </>
            ) : (
              <p className="text-gray-500 text-lg">No events available.</p>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
