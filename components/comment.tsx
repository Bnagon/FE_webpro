import Image from "next/image"

interface CommentProps {
  username: string
  content: string
  date: string
  avatarUrl?: string
}

export function Comment({ username, content, date, avatarUrl }: CommentProps) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-[#d9d9d9] rounded-full flex-shrink-0 overflow-hidden">
          {avatarUrl ? (
            <Image
              src={avatarUrl || "/placeholder.svg"}
              alt={username}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <h3 className="font-bold">{username}</h3>
            <span className="text-xs text-gray-500">{date}</span>
          </div>
          <p className="mt-1 text-sm">{content}</p>
        </div>
      </div>
    </div>
  )
}
