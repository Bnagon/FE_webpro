"use client";

import { Home, Calendar, Heart, Star, User, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("calendar");

  // Update active tab based on current path
  useEffect(() => {
    if (pathname === "/" || pathname === "/tweet") {
      setActiveTab("home");
    } else if (pathname === "/event") {
      setActiveTab("calendar");
    } else if (pathname === "/favorites") {
      setActiveTab("favorites");
    } else if (pathname === "/reviews") {
      setActiveTab("reviews");
    } else if (pathname === "/profile") {
      setActiveTab("profile");
    }
  }, [pathname]);

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);

    switch (tab) {
      case "home":
        router.push("/tweet");
        break;
      case "calendar":
        router.push("/event");
        break;
      case "favorites":
        router.push("/favorites");
        break;
      case "reviews":
        router.push("/reviews");
        break;
      case "profile":
        router.push("/profile");
        break;
      case "logout":
        localStorage.removeItem("token"); // 🔐 ลบ JWT
        setActiveTab("calendar"); // 👉 รีเซ็ต tab ไม่ให้ logout ค้างไว้
        window.location.href = "/tweet"; // 🔁 เปลี่ยนหน้าไป login
        break;
    }
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 bg-white rounded-full p-4 w-1/3 mx-auto">
      <div className="w-full flex justify-between items-center max-w-lg mx-auto">
        <button
          className={`p-2 ${
            activeTab === "home" ? "bg-[#a9d196] rounded-2xl" : ""
          }`}
          onClick={() => handleNavigation("home")}
        >
          <Home
            className={`w-6 h-6 ${
              activeTab === "home" ? "text-[#ffffff]" : "text-[#939ea2]"
            }`}
          />
        </button>
        <button
          className={`p-2 ${
            activeTab === "calendar" ? "bg-[#a9d196] rounded-2xl" : ""
          }`}
          onClick={() => handleNavigation("calendar")}
        >
          <Calendar
            className={`w-6 h-6 ${
              activeTab === "calendar" ? "text-[#ffffff]" : "text-[#939ea2]"
            }`}
          />
        </button>
        {/* <button
          className={`p-2 ${activeTab === "favorites" ? "bg-[#a9d196] rounded-2xl" : ""}`}
          onClick={() => handleNavigation("favorites")}
        >
          <Heart className={`w-6 h-6 ${activeTab === "favorites" ? "text-[#ffffff]" : "text-[#939ea2]"}`} />
        </button> */}

        <button
          className={`p-2 ${
            activeTab === "reviews" ? "bg-[#a9d196] rounded-2xl" : ""
          }`}
          onClick={() => handleNavigation("reviews")}
        >
          <Star
            className={`w-6 h-6 ${
              activeTab === "reviews" ? "text-[#ffffff]" : "text-[#939ea2]"
            }`}
          />
        </button>

        <button
          className={`p-2 ${
            activeTab === "profile" ? "bg-[#a9d196] rounded-2xl" : ""
          }`}
          onClick={() => handleNavigation("profile")}
        >
          <User
            className={`w-6 h-6 ${
              activeTab === "profile" ? "text-[#ffffff]" : "text-[#939ea2]"
            }`}
          />
        </button>
        <button
          className={`p-2 ${
            activeTab === "logout" ? "bg-[#a9d196] rounded-2xl" : ""
          }`}
          onClick={() => handleNavigation("logout")}
        >
          <LogOut
            className={`w-6 h-6 ${
              activeTab === "logout" ? "text-[#ffffff]" : "text-[#939ea2]"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
