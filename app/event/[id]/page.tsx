"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Heart } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"

// Sample event data (in a real app, this would come from an API)
const initialEvents = [
  {
    id: 1,
    title: "Summer Festival",
    date: "06/15/2023",
    time: "2:00 PM - 10:00 PM",
    location: "Central Park",
    description:
      "Join us for our annual summer celebration with live music, food vendors, games, and activities for all ages. This year features performances by local bands and artists, craft beer garden, and artisan market.",
    images: ["placeholder", "placeholder"],
    attendees: [
      { id: 101, username: "MusicLover" },
      { id: 102, username: "FoodieExplorer" },
      { id: 103, username: "ArtEnthusiast" },
      { id: 104, username: "LocalResident" },
      { id: 105, username: "SummerFun" },
    ],
  },
  {
    id: 2,
    title: "Tech Conference",
    date: "07/22/2023",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center",
    description:
      "Explore the latest innovations in technology and network with industry professionals. The conference includes keynote speakers, panel discussions, workshops, and product demonstrations covering AI, blockchain, cybersecurity, and more.",
    images: ["placeholder", "placeholder", "placeholder"],
    attendees: [
      { id: 201, username: "TechGuru" },
      { id: 202, username: "CodeMaster" },
      { id: 203, username: "DataScientist" },
    ],
  },
  {
    id: 3,
    title: "Art Exhibition",
    date: "08/05/2023",
    time: "10:00 AM - 8:00 PM",
    location: "City Gallery",
    description:
      "Featuring works from local and international artists exploring themes of nature and technology. The exhibition includes paintings, sculptures, digital art, and interactive installations that challenge our perception of the natural and digital worlds.",
    images: ["placeholder"],
    attendees: [
      { id: 301, username: "ArtLover" },
      { id: 302, username: "CreativeSpirit" },
      { id: 303, username: "GalleryVisitor" },
      { id: 304, username: "DesignEnthusiast" },
    ],
  },
  {
    id: 4,
    title: "Music Concert",
    date: "09/10/2023",
    time: "7:00 PM - 11:00 PM",
    location: "Riverside Amphitheater",
    description:
      "Live performances from top artists across multiple genres. The concert will feature a mix of established and emerging musicians, with special guest appearances and a spectacular light show.",
    images: ["placeholder", "placeholder"],
    attendees: [
      { id: 401, username: "MusicFan" },
      { id: 402, username: "ConcertGoer" },
      { id: 403, username: "RhythmSeeker" },
    ],
  },
  {
    id: 5,
    title: "Food Fair",
    date: "10/01/2023",
    time: "11:00 AM - 9:00 PM",
    location: "Downtown Plaza",
    description:
      "Sample cuisines from around the world with over 50 food vendors. The fair celebrates culinary diversity with dishes from Asia, Europe, Africa, and the Americas, along with cooking demonstrations and food competitions.",
    images: ["placeholder"],
    attendees: [
      { id: 501, username: "FoodLover" },
      { id: 502, username: "CulinaryExplorer" },
      { id: 503, username: "TasteSeeker" },
      { id: 504, username: "GlobalEater" },
      { id: 505, username: "FlavorHunter" },
      { id: 506, username: "GourmetFan" },
    ],
  },
  {
    id: 6,
    title: "Book Reading",
    date: "10/15/2023",
    time: "6:30 PM - 8:30 PM",
    location: "Public Library",
    description:
      "Meet the author and get your copy signed at this exclusive reading event. The author will read selected passages, discuss the writing process, and answer questions from the audience.",
    images: ["placeholder"],
    attendees: [
      { id: 601, username: "BookWorm" },
      { id: 602, username: "LiteraryFan" },
    ],
  },
  {
    id: 7,
    title: "Yoga Workshop",
    date: "11/05/2023",
    time: "9:00 AM - 12:00 PM",
    location: "Community Center",
    description:
      "Learn techniques for mindfulness and relaxation in this beginner-friendly workshop. The session includes guided meditation, gentle yoga poses, and breathing exercises suitable for all fitness levels.",
    images: ["placeholder"],
    attendees: [
      { id: 701, username: "YogaEnthusiast" },
      { id: 702, username: "MindfulPractitioner" },
      { id: 703, username: "WellnessSeeker" },
      { id: 704, username: "BalanceFinder" },
    ],
  },
  {
    id: 8,
    title: "Winter Market",
    date: "12/20/2023",
    time: "10:00 AM - 7:00 PM",
    location: "Town Square",
    description:
      "Holiday shopping with handcrafted gifts, decorations, and seasonal treats. The market features local artisans, festive music, hot beverages, and activities for children including visits with Santa.",
    images: ["placeholder", "placeholder"],
    attendees: [
      { id: 801, username: "HolidayShopper" },
      { id: 802, username: "WinterLover" },
      { id: 803, username: "FestiveSoul" },
      { id: 804, username: "GiftHunter" },
      { id: 805, username: "SeasonalBuyer" },
    ],
  },
]

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("JohnDoe")
  const [event, setEvent] = useState<any>(null)
  const [attendees, setAttendees] = useState<any[]>([])
  const [isAttending, setIsAttending] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch the event details from an API
    const foundEvent = initialEvents.find((e) => e.id.toString() === params.id)
    if (foundEvent) {
      setEvent(foundEvent)
      setAttendees(foundEvent.attendees || [])
    }
  }, [params.id])

  const handleJoinEvent = () => {
    if (!isLoggedIn) {
      alert("Please log in to join this event")
      return
    }

    if (isAttending) {
      // Remove user from attendees
      const updatedAttendees = attendees.filter((a) => a.username !== username)
      setAttendees(updatedAttendees)
      setIsAttending(false)
    } else {
      // Add user to attendees
      const newAttendee = {
        id: Date.now(),
        username,
      }
      setAttendees([...attendees, newAttendee])
      setIsAttending(true)
    }
  }

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      alert("Please log in to favorite this event")
      return
    }
    setIsFavorited(!isFavorited)
  }

  // Check if the current user is attending
  useEffect(() => {
    if (isLoggedIn && attendees.some((a) => a.username === username)) {
      setIsAttending(true)
    } else {
      setIsAttending(false)
    }
  }, [isLoggedIn, username, attendees])

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fce4ec" }}>
        <p>Event not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fce4ec" }}>
      <Header/>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl pb-24">
        {/* Back button */}
        <button onClick={() => router.back()} className="flex items-center gap-1 mb-4 text-[#526e0c] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to events
        </button>

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

        {/* Event Header */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{event.date}</span>
            </div>
            {event.time && (
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{event.time}</span>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-2" />
              <span>{attendees.length} attending</span>
            </div>
          </div>

          {/* Join Button */}
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

            <button
              onClick={handleToggleFavorite}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
            </button>
          </div>
        </div>

        {/* Event Images */}
        {event.images && event.images.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Event Photos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {event.images.map((image: string, index: number) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                  {image === "placeholder" ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="border-2 border-[#1e1e1e] p-4">
                        <div className="w-12 h-8 bg-[#1e1e1e] clip-path-triangle"></div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Event image ${index + 1}`}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Event Description */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">About This Event</h2>
          <p className="whitespace-pre-line">{event.description}</p>
        </div>

        {/* Attendees */}
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Attendees ({attendees.length})</h2>
          {attendees.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {attendees.map((attendee: any) => (
                <div key={attendee.id} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#d9d9d9] rounded-full"></div>
                  <span className="text-sm font-medium truncate">{attendee.username}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No one has joined this event yet. Be the first!</p>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
