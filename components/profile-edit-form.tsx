"use client";

import type React from "react";

import { getProfile, updateProfile } from "@/services/api";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ProfileEditFormProps {
  initialData: {
    username: string;
    email: string;
  };
  onSave: (data: any) => void;
  onCancel: () => void;
}
export function ProfileEditForm({
  initialData,
  onSave,
  onCancel,
}: ProfileEditFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const user = new FormData();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
      setAvatarPreview("");
    }
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("/usericon.png");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        const profile = data.data || {};

        setUsername(profile.username || "");
        setEmail(profile.email || "");

        if (profile.user_image) {
          setProfilePic(profile.user_image);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
      setProfilePic(imageUrl);
    }
  };
  const handleSave = async () => {
    user.append("username", formData.username);
    user.append("email", formData.email);

    if (selectedFile) {
      user.append("user_image", selectedFile);
    } else {
      user.append("user_image", profilePic);
    }
    console.log(user);
    try {
      const res = await updateProfile(user);
      console.log("Profile updated successfully:", res.data);
      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      router.push("/profile");
    } catch (error) {
      alert("เกิดข้อผิดพลาดขณะบันทึกข้อมูล");
      console.error("Save error:", error);
    }
  };
  const handleCancel = () => {
    // Clean up object URL
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }
    onCancel();
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-[#f74e6d]">
      <h3 className="text-xl font-bold mb-6">Edit Profile</h3>

      <div className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 bg-[#d9d9d9] rounded-full overflow-hidden">
              {avatarPreview ? (
                <Image
                  src={avatarPreview || "/placeholder.svg"}
                  alt="Avatar preview"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            {avatarPreview && (
              <button
                onClick={handleRemoveAvatar}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                handleAvatarSelect(e);
                handleImageChange(e);
              }}
              accept="image/*"
              // accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              onChange={handleImageChange}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              <Camera className="w-4 h-4" />
              Change Photo
            </button>
          </div>
        </div>

        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:border-transparent"
          />
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-full bg-[#f74e6d] text-white hover:bg-[#f74e6d]/90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
