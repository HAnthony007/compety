// 'use client';

// import { useState } from "react";
// import { FiMoreVertical, FiTrash, FiCornerUpLeft, FiCopy } from "react-icons/fi";

// interface ChatMessageProps {
//   message: string;
//   sender: string;
//   isOwnMessage: boolean;
//   isSystemMessage?: boolean;
//   status?: "sent" | "seen";
// }

// export default function ChatMessage({
//   message,
//   sender,
//   isOwnMessage,
//   isSystemMessage = false,
//   status = "sent",
// }: ChatMessageProps) {
//   const [showOptions, setShowOptions] = useState(false);

//   const toggleOptions = () => setShowOptions((prev) => !prev);

//   const handleDelete = () => {
//     console.log("Supprimer le message");
//     setShowOptions(false);
//   };

//   const handleReply = () => {
//     console.log("Répondre au message");
//     setShowOptions(false);
//   };

//   const handleCopy = () => {
//     console.log("Copier le message");
//     setShowOptions(false);
//   };

//   return (
//     <div
//       className={`flex mb-4 overflow-y-visible ${
//         isSystemMessage
//           ? "justify-center"
//           : isOwnMessage
//           ? "justify-end"
//           : "justify-start"
//       }`}
//     >
//       <div className="relative flex flex-col items-end">
//         {/* Conteneur du message + options */}
//         <div className="flex items-center gap-2">
//           {/* Bulle de message */}
//           <div
//             className={`max-w-xs px-4 py-2 rounded-lg shadow-lg ${
//               isSystemMessage
//                 ? "bg-gray-800 text-white text-center text-xs"
//                 : isOwnMessage
//                 ? "bg-blue-500 text-white"
//                 : "bg-green-300 text-black"
//             }`}
//           >
//             {!isSystemMessage && !isOwnMessage && (
//               <p className="text-sm font-bold mb-1">{sender}</p>
//             )}
//             <p>{message}</p>
//           </div>

//           {/* Icône d'options en dehors du message */}
//           {isOwnMessage && (
//             <button
//               onClick={toggleOptions}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <FiMoreVertical size={18} />
//             </button>
//           )}
//         </div>

//         {/* Statut du message (Envoyé/Vu) */}
//         {isOwnMessage && (
//           <div className="mt-1 text-xs text-gray-500 self-end">
//             {status === "sent" ? "Envoyé" : "Vu"}
//           </div>
//         )}

//         {/* Menu des options (Répondre, Copier, Supprimer) */}
//         {showOptions && (
//           <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded z-10">
//             <ul>
//               <li
//                 onClick={handleReply}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
//               >
//                 <FiCornerUpLeft className="mr-2" size={16} />
//                 Répondre
//               </li>
//               <li
//                 onClick={handleCopy}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
//               >
//                 <FiCopy className="mr-2" size={16} />
//                 Copier
//               </li>
//               <li
//                 onClick={handleDelete}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
//               >
//                 <FiTrash className="mr-2" size={16} />
//                 Supprimer
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
