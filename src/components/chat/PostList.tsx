"use client";
import { useEffect, useState } from "react";

export interface Group {
  id_group: number;
  nom: string;
}

interface GroupListProps {
  userId: number;
  onSelectGroup: (group: Group) => void;
}

export default function GroupList({ userId, onSelectGroup }: GroupListProps) {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    console.log("userId :", userId);
    fetch(`http://localhost:3000/api/groups/getPost?userId=${userId}`)
      .then((res) => {
        console.log("Statut de la réponse :", res.status);
        return res.text();
      })
      .then((text) => {
        console.log("Réponse brute :", text);
        try {
          const data = JSON.parse(text);
          console.log("Données JSON :", data);
          setGroups(data);
        } catch (e) {
          console.error("Erreur de parsing JSON :", e);
        }
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des groupes :", error)
      );
  }, [userId]);
  
  

  return (
    <div className="w-full p-4 border-t border-gray-200">
      <h2 className="text-lg font-bold mb-4">Groupes de discussion</h2>
      <ul className="list-none">
        {groups.map((group) => (
          <li
            key={group.id_group}
            className="mb-2 p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectGroup(group)}
          >
            {group.nom}
          </li>
        ))}
      </ul>
    </div>
  );
}
