'use client';
interface ChatUserListProps {
  users: string[];
  onSelectUser: (user: string) => void;
  currentUser: string;
}

export default function ChatUserList({
  users,
  onSelectUser,
  currentUser,
}: ChatUserListProps) {
  return (
    <div className=" bg-white w-64 h-full rounded-lg border border-gray-200 overflow-y-auto ">
      <h2 className="p-4 font-bold text-xl border-b border-gray-300">Utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user}>
              <button
                onClick={() => onSelectUser(user)}
                className={`w-full py-4 text-left px-4 hover:bg-gray-200 flex ml-10 gap-3${
                  user === currentUser ? "bg-blue-100" : ""
                }`}
              >
                <img src="/test.jpg" alt="pdp" className="w-10 h-10 rounded-full"/>
                {user}
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
