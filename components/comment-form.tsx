"use client"

import type React from "react"

import { useState } from "react"

interface CommentFormProps {
  onSubmit: (content: string) => void
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit(content)
      setContent("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex flex-col">
        <textarea
          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f74e6d] focus:border-transparent"
          placeholder="Write a comment..."
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={!content.trim()}
            className="px-4 py-1.5 rounded-full bg-[#f74e6d] text-white hover:bg-[#f74e6d]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Comment
          </button>
        </div>
      </div>
    </form>
  )
}
