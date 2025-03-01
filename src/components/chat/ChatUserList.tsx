"use client";

import React from "react";
import useSWR from "swr";

export interface User {
  id_user: string;
  email: string;
  photo: string;
  role: string;
  messages: any[]; 
}

interface ChatUserListProps {
  onSelectUser: (user: User) => void;
  currentUser?: User; 
}

// La fonction fetcher utilisée par SWR pour récupérer les données
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des utilisateurs");
  }
  return res.json();
};

// Composant ChatUserList
export default function ChatUserList({
  onSelectUser,
  currentUser,
}: ChatUserListProps) {
  // Utilisation de SWR pour récupérer la liste des utilisateurs depuis l'API
  const { data: users, error } = useSWR<User[]>("/api/users", fetcher);

  if (error) return <div>Erreur de chargement des utilisateurs</div>;
  if (!users) return <div>Chargement...</div>;
  console.log("Liste des utilisateurs :", users);

  return (
    <div className="w-1/4 p-4 border-r border-gray-200 text-gray-400">
      <h2 className="font-bold ml-[90px] mb-1">Utilisateurs</h2>
      <hr />
      <ul className="list-none mt-4">
        {users
          // n'est pas affiché user connté
          .filter((user) => user.id_user !== currentUser?.id_user)
          .map((user) => (
            <li
              key={user.id_user}
              onClick={() => onSelectUser(user)}
              className="mb-2 p-2 cursor-pointer hover:bg-gray-100 flex items-center"
            >
              {user.photo ? (
                <img
                  src={user.photo}
                  alt="Photo de profil"
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2" />
              )}
              <div className="text-blue-700 font-thin ">{user.email}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}
