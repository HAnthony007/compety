"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  onAuthenticated: (user: any) => void;
}

export default function LoginModal({ onAuthenticated }: LoginModalProps) {
  const [idUser, setIdUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Réinitialiser l'erreur avant une nouvelle tentative

    try {
      const res = await fetch("/api/chatLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_user: idUser.trim(), password: password.trim() }), // Trim pour éviter les erreurs d'espaces
      });

      const text = await res.text(); // Lire la réponse brute
      console.log("Réponse brute de l'API:", text);

      const data = JSON.parse(text); // Vérifier que c'est bien un JSON

      if (!res.ok) {
        throw new Error(data.error || "Échec de la connexion");
      }

      onAuthenticated(data);
    } catch (err) {
      console.error("Erreur de login :", err);
      setError("Identifiants invalides ou erreur de connexion");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-gray-400 text-center">veuillez entrer votre informations</h1>
        <input
          type="text"
          placeholder="ID utilisateur"
          value={idUser}
          onChange={(e) => setIdUser(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
}
