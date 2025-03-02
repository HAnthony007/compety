"use client";
import { useEffect, useState } from "react";

export interface Group {
  id_group: number;
  nom: string;
  description: string;
  photos?: string;
  created_at: string;
}

interface GroupListProps {
  userId: number;
  onSelectGroup: (post: Group) => void;
}

export default function GroupList({ userId, onSelectGroup }: GroupListProps) {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    console.log("userId :", userId);
    fetch(`http://localhost:3000/api/groups/getPost?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Données JSON :", data);
        setGroups(data);
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des groupes :", error)
      );
  }, [userId]);

  return (
    <div className="w-full p-4 border-t border-gray-200">
      <h2 className="text-lg font-bold mb-4">Voir les posts</h2>
      <ul className="list-none">
        {groups.map((group) => (
          <li
            key={group.id_group}
            className="mb-2 p-4 cursor-pointer hover:bg-gray-100 border border-gray-300 rounded-md"
            onClick={() => onSelectGroup(group)}
          >
            <h3 className="font-semibold text-xl">{group.nom}</h3>
            <p className="text-gray-600">{group.description}</p>
            {group.photos && (
              <img
                src={group.photos}
                alt={`Photo de ${group.nom}`}
                className="w-full h-auto mt-2 rounded"
              />
            )}
            <p className="text-sm text-gray-500">
              Créé le : {new Date(group.created_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
