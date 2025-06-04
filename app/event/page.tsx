"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { EventCard } from "@/components/event-card"
import { EventForm } from "@/components/event-form"
import { useSearchParams } from "next/navigation"

// Sample event data
const initialEvents = [
  {
    id: 1,
    title: "Summer Festival",
    date: "06/15/2023",
    location: "Central Park",
    description: "Annual summer celebration with music, food, and activities for all ages.",
    createdBy: "user_admin",
    creatorName: "EventAdmin",
  },
  {
    id: 2,
    title: "Tech Conference",
    date: "07/22/2023",
    location: "Convention Center",
    description: "Explore the latest innovations in technology and network with industry professionals.",
    createdBy: "user_tech",
    creatorName: "TechGuru",
  },
  {
    id: 3,
    title: "Art Exhibition",
    date: "08/05/2023",
    location: "City Gallery",
    description: "Featuring works from local and international artists exploring themes of nature and technology.",
    createdBy: "user_artist",
    creatorName: "ArtLover",
  },
  {
    id: 4,
    title: "Music Concert",
    date: "09/10/2023",
    location: "Riverside Amphitheater",
    description: "Live performances from top artists across multiple genres.",
    createdBy: "user_music",
    creatorName: "MusicFan",
  },
  {
    id: 5,
    title: "Food Fair",
    date: "10/01/2023",
    location: "Downtown Plaza",
    description: "Sample cuisines from around the world with over 50 food vendors.",
    createdBy: "user_foodie",
    creatorName: "FoodExplorer",
  },
  {
    id: 6,
    title: "Book Reading",
    date: "10/15/2023",
    location: "Public Library",
    description: "Meet the author and get your copy signed at this exclusive reading event.",
    createdBy: "user_reader",
    creatorName: "BookWorm",
  },
  {
    id: 7,
    title: "Yoga Workshop",
    date: "11/05/2023",
    location: "Community Center",
    description: "Learn techniques for mindfulness and relaxation in this beginner-friendly workshop.",
    createdBy: "user_wellness",
    creatorName: "YogaTeacher",
  },
  {
    id: 8,
    title: "Winter Market",
    date: "12/20/2023",
    location: "Town Square",
    description: "Holiday shopping with handcrafted gifts, decorations, and seasonal treats.",
    createdBy: "user_market",
    creatorName: "MarketOrganizer",
  },
]

export default function EventPage() {
  // In a real app, this would come from an authentication context or API
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("JohnDoe")
  const [userId, setUserId] = useState("user_john") // Add user ID
  const [events, setEvents] = useState(initialEvents)
  const [showEventForm, setShowEventForm] = useState(false)

  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  const filteredEvents = searchQuery
    ? events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : events

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
      images: eventData.images.map(() => "placeholder"),
    }

    // Add the new event to the beginning of the list
    setEvents([newEvent, ...events])
    setShowEventForm(false)

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
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header/>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-[#526e0c]">Upcoming Event</h2>

          {isLoggedIn && !showEventForm && (
            <button
              onClick={() => setShowEventForm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f74e6d] text-white hover:bg-[#f74e6d]/90 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Create Event</span>
            </button>
          )}
        </div>

        {/* Demo toggle for logged in state */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="px-4 py-2 bg-[#526e0c] text-white rounded-md">
            {isLoggedIn ? "Simulate Logout" : "Simulate Login"}
          </button>
          {isLoggedIn && (
            <p className="mt-2 text-sm">
              Logged in as <strong>{username}</strong> (ID: {userId})
            </p>
          )}
        </div>

        {searchQuery && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">Showing results for: "{searchQuery}"</h2>
            <p className="text-sm text-gray-600">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
            </p>
          </div>
        )}

        {/* Event Form */}
        {showEventForm && (
          <div className="mb-8">
            <EventForm onSubmit={handleCreateEvent} onCancel={() => setShowEventForm(false)} />
          </div>
        )}

        {/* Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} id={event.id} title={event.title} date={event.date} href={`/event/${event.id}`} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            {searchQuery ? (
              <>
                <p className="text-gray-500 text-lg">No events found for "{searchQuery}"</p>
                <p className="text-gray-400 text-sm mt-2">Try searching with different keywords</p>
              </>
            ) : (
              <p className="text-gray-500 text-lg">No events available.</p>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
