"use client";

import { User } from "./ChatUserList";

interface ChatHeaderProps {
  user: User;
}

export default function ChatHeader({ user }: ChatHeaderProps) {
  return (
    <div className="flex items-center p-4 bg-gray-200">
      {user.photo ? (
        <img
          src={user.photo}
          alt="Photo de profil"
          className="w-10 h-10 rounded-full mr-3"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-xs text-gray-600">
          N/A
        </div>
      )}
      <span className="font-bold text-gray-700">{user.email}</span>
    </div>
  );
}
