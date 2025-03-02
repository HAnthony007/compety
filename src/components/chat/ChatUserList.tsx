"use client";

import React, { useMemo } from "react";
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

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des utilisateurs");
  }
  return res.json();
};

export default function ChatUserList({
  onSelectUser,
  currentUser,
}: ChatUserListProps) {
  const { data: users, error } = useSWR<User[]>("/api/users", fetcher);

  const filteredUsers = useMemo(() => {
    return users?.filter((user) => user.id_user !== currentUser?.id_user) || [];
  }, [users, currentUser]);

  if (error)
    return (
      <div className="text-red-500 text-center">
        Erreur de chargement des utilisateurs
      </div>
    );
  if (!users) return <div className="text-center">Chargement...</div>;

  return (
    <div className="w-1/4 p-4 bg-white">
      <h2 className="font-bold text-xl text-primary mb-4 text-center">
        Utilisateurs
      </h2>
      <ul className="list-none space-y-4">
        {filteredUsers.map((user) => (
          <li
            key={user.id_user}
            onClick={() => onSelectUser(user)}
            className={`p-4 cursor-pointer hover:bg-primary hover:text-white flex items-center transition-all ease-in-out ${
              currentUser && currentUser.id_user === user.id_user
                ? "bg-gray-100"
                : ""
            }`}
          >
            {user.photo ? (
              <img
                src={user.photo}
                alt="Photo de profil"
                className="w-10 h-10 mr-4 object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 mr-4" />
            )}
            <div className="font-medium text-primary">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
