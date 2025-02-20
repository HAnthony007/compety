'use client';

import { FiPhoneCall, FiVideo } from 'react-icons/fi';

interface ChatHeaderProps {
  currentUser: string;
}

export default function ChatHeader({ currentUser }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border border-gray-100 text-black rounded-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          
          {currentUser.charAt(0).toUpperCase()}
        </div>
        <span className="font-bold">{currentUser}</span>
      </div>

      <div className="flex items-center gap-10 mr-[100px]">
        <button className="hover:text-blue-400 transition-colors">
          <FiPhoneCall size={20} />
        </button>
        <button className="hover:text-blue-400 transition-colors">
          <FiVideo size={20} />
        </button>
      </div>
    </div>
  );
}
